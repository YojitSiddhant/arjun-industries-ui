import type { Metadata } from "next";
import type { SiteContent } from "@/lib/content";

const DEFAULT_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!envUrl) {
    return DEFAULT_SITE_URL;
  }

  const siteUrl = envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;

  return siteUrl.replace(/\/$/, "");
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image,
  imageAlt = "Arjun Industries fabrication work in Bhopal",
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
}): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = new URL(path, siteUrl).toString();
  const imageUrl = new URL(
    image || "/uploads/upload-1774696291895-oqdidjo2amd.webp",
    siteUrl
  ).toString();

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Arjun Industries",
      locale: "en_IN",
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function buildLocalBusinessSchema(content: SiteContent) {
  const siteUrl = getSiteUrl();
  const phone = content.contact.phone.replace(/\s+/g, "");
  const image = new URL(
    content.globals.logoFooter ||
      content.globals.logoNavbar ||
      content.home.hero.slides[0]?.src ||
      "/favicon.ico",
    siteUrl
  ).toString();
  const sameAs = [
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: content.globals.businessName,
    description: content.globals.footerBlurb,
    url: siteUrl,
    image,
    logo: new URL(
      content.globals.logoFooter || content.globals.logoNavbar || "/favicon.ico",
      siteUrl
    ).toString(),
    telephone: phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: content.contact.address,
      addressLocality: "Bhopal",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
      postalCode: "462047",
    },
    areaServed: content.home.coverageAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    geo: {
      "@type": "GeoCoordinates",
      latitude: Number(content.contact.mapLat),
      longitude: Number(content.contact.mapLng),
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:30",
        closes: "19:30",
      },
    ],
    makesOffer: content.services.items.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.details.join(", "),
        serviceType: service.category,
        areaServed: content.home.coverageAreas.join(", "),
      },
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    sameAs,
  };
}

export function buildWebsiteSchema(content: SiteContent) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: content.globals.businessName,
    alternateName: `${content.globals.businessName} Bhopal`,
    url: siteUrl,
    inLanguage: "en-IN",
    description: content.globals.footerBlurb,
    publisher: {
      "@id": `${siteUrl}/#localbusiness`,
    },
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).toString(),
    })),
  };
}

export function buildServiceListSchema(content: SiteContent) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/services#services`,
    name: "Fabrication and welding services in Bhopal",
    itemListElement: content.services.items.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${siteUrl}/services#${service.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`,
        name: service.title,
        description: service.details.join(", "),
        serviceType: service.category,
        provider: {
          "@id": `${siteUrl}/#localbusiness`,
        },
        areaServed: content.home.coverageAreas.map((area) => ({
          "@type": "Place",
          name: area,
        })),
      },
    })),
  };
}

export function buildImageGallerySchema(content: SiteContent) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${siteUrl}/gallery#gallery`,
    name: content.gallery.title,
    description: content.gallery.subtitle,
    image: content.gallery.items.map((item) => ({
      "@type": "ImageObject",
      name: item.title,
      caption: `${item.category} - ${item.title}`,
      contentUrl: new URL(item.image, siteUrl).toString(),
    })),
  };
}

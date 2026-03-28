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

  return envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = new URL(path, siteUrl).toString();
  const imageUrl = new URL("/uploads/upload-1772979085437-fvqwnmtvfz6.png", siteUrl).toString();

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
          alt: "Arjun Industries logo",
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
    content.globals.logoFooter || content.globals.logoNavbar || "/favicon.ico",
    siteUrl
  ).toString();

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: content.globals.businessName,
    description: content.globals.footerBlurb,
    url: siteUrl,
    image,
    telephone: phone,
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    sameAs: [],
  };
}

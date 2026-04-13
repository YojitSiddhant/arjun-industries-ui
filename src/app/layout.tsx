import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import {
  buildLocalBusinessSchema,
  buildPageMetadata,
  buildWebsiteSchema,
  getSiteUrl,
} from "@/lib/seo";
import "./globals.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Arjun Industries | Welding, Metal and Fabrication Services in Bhopal",
      template: "%s | Arjun Industries",
    },
    applicationName: "Arjun Industries",
    authors: [{ name: "Arjun Industries", url: siteUrl }],
    category: "Fabrication and welding services",
    referrer: "origin-when-cross-origin",
    creator: "Arjun Industries",
    publisher: "Arjun Industries",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...buildPageMetadata({
      title: "Arjun Industries | Welding, Metal and Fabrication Services in Bhopal",
      description:
        "Arjun Industries provides welding, metal fabrication, sheds, gates, grills, repairs, and farm equipment work in Bhopal and nearby areas.",
      keywords: [
        "Arjun Industries",
        "fabrication work in Bhopal",
        "welding services in Bhopal",
        "metal fabrication Bhopal",
        "shed fabrication",
        "gate and grill work",
        "farm equipment fabrication",
      ],
      image: "/uploads/upload-1774696291895-oqdidjo2amd.webp",
      imageAlt: "Heavy-duty fabrication work by Arjun Industries in Bhopal",
    }),
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    manifest: "/manifest.webmanifest",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const localBusinessSchema = buildLocalBusinessSchema(content);
  const websiteSchema = buildWebsiteSchema(content);

  return (
    <html lang="en">
      <body className="bg-stone-50 text-slate-800 font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <div className="min-h-screen bg-stone-50 text-slate-800 flex flex-col smooth-fade">
          {children}
        </div>
      </body>
    </html>
  );
}


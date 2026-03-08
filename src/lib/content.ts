import fs from "fs/promises";
import path from "path";

export type SiteContent = {
  globals: {
    businessName: string;
    tagline: string;
    footerBlurb: string;
    footerNote: string;
    copyright: string;
    logoNavbar?: string;
    logoFooter?: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      ctaPhoneLabel: string;
      ctaWhatsappLabel: string;
      slides: Array<{ src: string; alt: string }>;
    };
    intro: {
      eyebrow: string;
      title: string;
      subtitle: string;
    };
    quickStats: Array<{ title: string; description: string }>;
    servicesTeaser: Array<{ label: string; title: string; points: string[] }>;
    coverageAreas: string[];
    testimonials: Array<{ name: string; role: string; quote: string }>;
    stats: Array<{ value: string; label: string }>;
    cta: string;
  };
  about: {
    title: string;
    intro: string;
    body: string;
    focusCards: Array<{ title: string; description: string }>;
    capabilities: string[];
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{ category: string; title: string; details: string[] }>;
    cta: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; category: string; image: string }>;
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    whatsapp: string;
    address: string;
    hours: string[];
    mapLat: string;
    mapLng: string;
  };
};

const contentPath = path.join(process.cwd(), "data", "siteContent.json");

export async function getContent(): Promise<SiteContent> {
  const raw = await fs.readFile(contentPath, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveContent(content: SiteContent): Promise<void> {
  await fs.mkdir(path.dirname(contentPath), { recursive: true });
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), "utf-8");
}

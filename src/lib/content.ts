import fs from "fs/promises";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import {
  assertWritableStorage,
  getLatestBlobPath,
  hasBlobStorage,
  readJsonBlob,
  writeJsonBlob,
} from "@/lib/storage";

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
const contentBlobPath = "data/siteContent.json";
const contentBlobPrefix = "data/siteContent-";

async function loadFileContent(): Promise<SiteContent> {
  const raw = await fs.readFile(contentPath, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

async function saveFileContent(content: SiteContent): Promise<void> {
  await fs.mkdir(path.dirname(contentPath), { recursive: true });
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), "utf-8");
}

export async function getContent(): Promise<SiteContent> {
  noStore();
  const latestBlobPath = await getLatestBlobPath(contentBlobPrefix);
  if (latestBlobPath) {
    const latestContent = await readJsonBlob<SiteContent>(latestBlobPath);
    if (latestContent) {
      return latestContent;
    }
  }

  const blobContent = await readJsonBlob<SiteContent>(contentBlobPath);
  if (blobContent) {
    return blobContent;
  }

  return loadFileContent();
}

export async function getContentVersion(): Promise<string> {
  noStore();
  if (hasBlobStorage()) {
    return (await getLatestBlobPath(contentBlobPrefix)) ?? "blob";
  }

  const stats = await fs.stat(contentPath);
  return `${stats.mtimeMs}`;
}

export async function saveContent(content: SiteContent): Promise<void> {
  if (hasBlobStorage()) {
    await writeJsonBlob(`${contentBlobPrefix}${Date.now()}.json`, content);
    return;
  }

  assertWritableStorage();
  await saveFileContent(content);
}

import fs from "fs/promises";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import {
  assertWritableStorage,
  hasBlobStorage,
  readJsonBlob,
  writeJsonBlob,
} from "@/lib/storage";

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  projectType: string;
  location: string;
  message: string;
  createdAt: string;
};

const enquiriesPath = path.join(process.cwd(), "data", "enquiries.json");
const enquiriesBlobPath = "data/enquiries.json";

async function ensureEnquiriesFile() {
  await fs.mkdir(path.dirname(enquiriesPath), { recursive: true });
  try {
    await fs.access(enquiriesPath);
  } catch {
    await fs.writeFile(enquiriesPath, "[]", "utf-8");
  }
}

export async function getEnquiries(): Promise<Enquiry[]> {
  noStore();
  const blobEnquiries = await readJsonBlob<Enquiry[]>(enquiriesBlobPath);
  if (blobEnquiries) {
    return blobEnquiries.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  await ensureEnquiriesFile();
  const raw = await fs.readFile(enquiriesPath, "utf-8");
  const parsed = JSON.parse(raw) as Enquiry[];
  return parsed.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addEnquiry(
  enquiry: Omit<Enquiry, "id" | "createdAt">
): Promise<Enquiry> {
  const existing = await getEnquiries();
  const nextEntry: Enquiry = {
    ...enquiry,
    id: `enquiry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };

  const next = [nextEntry, ...existing];

  if (hasBlobStorage()) {
    await writeJsonBlob(enquiriesBlobPath, next);
  } else {
    assertWritableStorage();
    await fs.writeFile(enquiriesPath, JSON.stringify(next, null, 2), "utf-8");
  }

  return nextEntry;
}

export async function removeEnquiry(id: string): Promise<boolean> {
  const existing = await getEnquiries();
  const next = existing.filter((enquiry) => enquiry.id !== id);

  if (next.length === existing.length) {
    return false;
  }

  if (hasBlobStorage()) {
    await writeJsonBlob(enquiriesBlobPath, next);
  } else {
    assertWritableStorage();
    await fs.writeFile(enquiriesPath, JSON.stringify(next, null, 2), "utf-8");
  }

  return true;
}

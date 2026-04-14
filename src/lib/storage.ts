import { get, put } from "@vercel/blob";

const missingBlobMessage =
  "Production admin saves need Vercel Blob. Add BLOB_READ_WRITE_TOKEN to this Vercel project, redeploy, and try again.";

export class StorageConfigurationError extends Error {
  constructor(message = missingBlobMessage) {
    super(message);
    this.name = "StorageConfigurationError";
  }
}

export function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function isVercelRuntime(): boolean {
  return Boolean(process.env.VERCEL);
}

export function assertWritableStorage(): void {
  if (isVercelRuntime() && !hasBlobStorage()) {
    throw new StorageConfigurationError();
  }
}

export function getStorageErrorMessage(
  error: unknown,
  fallback = "Could not save content."
): string {
  if (error instanceof StorageConfigurationError) {
    return error.message;
  }

  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "EROFS"
  ) {
    return missingBlobMessage;
  }

  return fallback;
}

export async function readJsonBlob<T>(pathname: string): Promise<T | null> {
  if (!hasBlobStorage()) {
    return null;
  }

  const result = await get(pathname, {
    access: "private",
    useCache: false,
  });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return null;
  }

  const raw = await new Response(result.stream).text();
  return JSON.parse(raw) as T;
}

export async function writeJsonBlob(pathname: string, value: unknown): Promise<void> {
  await put(pathname, JSON.stringify(value, null, 2), {
    access: "private",
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

export async function writePublicBlob({
  pathname,
  body,
  contentType,
}: {
  pathname: string;
  body: File | Buffer;
  contentType?: string;
}): Promise<string> {
  const blob = await put(pathname, body, {
    access: "public",
    allowOverwrite: false,
    contentType,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  });

  return blob.url;
}

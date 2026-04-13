import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getAdminToken } from "@/lib/adminAuth";
import { hasBlobStorage, writePublicBlob } from "@/lib/storage";

function isAuthorized(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  return cookieHeader.includes(`admin_token=${getAdminToken()}`);
}

function sanitizeExt(filename: string) {
  const ext = path.extname(filename).toLowerCase().replace(/[^a-z0-9.]/g, "");
  return ext.length <= 6 ? ext : "";
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ message: "Invalid upload." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Missing file." }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = sanitizeExt(file.name) || ".jpg";
  const filename = `upload-${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

  if (hasBlobStorage()) {
    const url = await writePublicBlob({
      pathname: `uploads/${filename}`,
      body: file,
      contentType: file.type || undefined,
    });

    return NextResponse.json({ path: url });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.writeFile(path.join(uploadsDir, filename), buffer);

  return NextResponse.json({ path: `/uploads/${filename}` });
}

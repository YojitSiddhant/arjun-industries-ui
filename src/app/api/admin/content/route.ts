import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminToken } from "@/lib/adminAuth";
import { getContent, saveContent } from "@/lib/content";
import { getStorageErrorMessage } from "@/lib/storage";

function isAuthorized(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  return cookieHeader.includes(`admin_token=${getAdminToken()}`);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
  }

  try {
    await saveContent(body);
  } catch (error) {
    return NextResponse.json(
      { message: getStorageErrorMessage(error) },
      { status: 500 }
    );
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/gallery");
  revalidatePath("/contact");
  revalidatePath("/admin");

  return NextResponse.json({ ok: true });
}

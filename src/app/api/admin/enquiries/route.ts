import { NextResponse } from "next/server";
import { getAdminToken } from "@/lib/adminAuth";
import { getEnquiries, removeEnquiry } from "@/lib/enquiries";

function isAuthorized(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  return cookieHeader.includes(`admin_token=${getAdminToken()}`);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const enquiries = await getEnquiries();
  return NextResponse.json(enquiries);
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const id = body?.id;

  if (typeof id !== "string" || !id.trim()) {
    return NextResponse.json({ message: "Invalid enquiry id." }, { status: 400 });
  }

  const removed = await removeEnquiry(id);

  if (!removed) {
    return NextResponse.json({ message: "Enquiry not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

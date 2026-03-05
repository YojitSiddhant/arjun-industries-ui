import { NextResponse } from "next/server";
import { getAdminPassword, getAdminToken } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.password !== "string") {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (body.password !== getAdminPassword()) {
    return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_token", getAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}

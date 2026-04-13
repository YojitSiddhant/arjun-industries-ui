import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminToken } from "./src/lib/adminAuth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;
  if (token === getAdminToken()) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
}

export const config = {
  matcher: ["/api/admin/:path*"],
};

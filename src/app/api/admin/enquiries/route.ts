import { NextResponse } from "next/server";
import { getAdminToken } from "@/lib/adminAuth";
import { getEnquiries } from "@/lib/enquiries";

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

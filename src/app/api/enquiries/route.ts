import { NextResponse } from "next/server";
import { addEnquiry } from "@/lib/enquiries";
import { getStorageErrorMessage } from "@/lib/storage";

type EnquiryPayload = {
  name?: string;
  phone?: string;
  projectType?: string;
  location?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as EnquiryPayload | null;

  if (!body?.name?.trim() || !body?.phone?.trim() || !body?.projectType?.trim()) {
    return NextResponse.json(
      { message: "Name, phone, and project type are required." },
      { status: 400 }
    );
  }

  try {
    const enquiry = await addEnquiry({
      name: body.name.trim(),
      phone: body.phone.trim(),
      projectType: body.projectType.trim(),
      location: body.location?.trim() ?? "",
      message: body.message?.trim() ?? "",
    });

    return NextResponse.json({ ok: true, enquiry });
  } catch (error) {
    return NextResponse.json(
      { message: getStorageErrorMessage(error, "Could not submit enquiry.") },
      { status: 500 }
    );
  }
}

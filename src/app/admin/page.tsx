import AdminEditor from "@/components/admin/AdminEditor";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { getEnquiries } from "@/lib/enquiries";
import { isAdminAuthenticated } from "@/lib/adminSession";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    redirect("/admin/login?next=/admin");
  }

  const content = await getContent();
  const enquiries = await getEnquiries();

  return (
    <main className="theme-indigo min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.10),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(20,184,166,0.10),_transparent_24%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] text-slate-800">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdminEditor initialContent={content} initialEnquiries={enquiries} />
      </div>
    </main>
  );
}




import AdminEditor from "@/components/admin/AdminEditor";
import { getContent } from "@/lib/content";

export default async function AdminPage() {
  const content = await getContent();

  return (
    <main className="theme-indigo min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.10),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(20,184,166,0.10),_transparent_24%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] text-slate-800">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdminEditor initialContent={content} />
      </div>
    </main>
  );
}




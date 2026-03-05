import AdminEditor from "@/components/admin/AdminEditor";
import { getContent } from "@/lib/content";

export default async function AdminPage() {
  const content = await getContent();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <AdminEditor initialContent={content} />
      </div>
    </main>
  );
}

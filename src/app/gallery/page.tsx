import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryClient from "@/components/GalleryClient";
import { getContent } from "@/lib/content";

export default async function GalleryPage() {
  const content = await getContent();

  return (
    <main className="theme-rose bg-stone-50 text-slate-800">
      <Navbar
        businessName={content.globals.businessName}
        logoPath={content.globals.logoNavbar}
      />

      <section className="py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in space-y-4 text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
              Gallery
            </span>
            <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">
              {content.gallery.title}
            </h1>
            <p className="text-sm text-slate-600 sm:text-base">
              {content.gallery.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <GalleryClient items={content.gallery.items} />
        </div>
      </section>

      <Footer globals={content.globals} contact={content.contact} />
    </main>
  );
}




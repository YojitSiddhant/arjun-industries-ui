import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

const focusIcons = [
  <svg
    key="focus-1"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 4v16" />
    <path d="M17 4v16" />
  </svg>,
  <svg
    key="focus-2"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 6l4 4-9 9H5v-4l9-9z" />
    <path d="M16 4l4 4" />
  </svg>,
  <svg
    key="focus-3"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2l3 6 6 .9-4.5 4.4 1.1 6.2L12 16.8 6.4 19.5 7.5 13 3 8.9 9 8z" />
  </svg>,
];

export default async function AboutPage() {
  const content = await getContent();

  return (
    <main className="bg-slate-50 text-slate-800">
      <Navbar businessName={content.globals.businessName} />

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
              About
            </span>
            <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">
              {content.about.title}
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {content.about.intro}
            </p>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {content.about.body}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {content.about.focusCards.map((card, index) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-sky-600">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 bg-sky-50">
                      {focusIcons[index] ?? focusIcons[0]}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
                What we can handle
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {content.about.capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 text-sky-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12l4 4L19 6" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer globals={content.globals} contact={content.contact} />
    </main>
  );
}

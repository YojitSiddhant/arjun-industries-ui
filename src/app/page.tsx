import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import StatsGrid from "@/components/StatsGrid";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { getContent, getContentVersion } from "@/lib/content";
import { toPhoneHref, toWhatsAppHref } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Welding, Metal and Fabrication Services in Bhopal",
  description:
    "Arjun Industries builds industrial sheds, gates, grills, repair work, and farm equipment with on-site support across Bhopal and nearby areas.",
  keywords: [
    "welding services Bhopal",
    "fabrication services Bhopal",
    "industrial shed fabrication",
    "custom metal work",
    "farm equipment repair",
  ],
});

const quickStatIcons = [
  <svg
    key="quick-1"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 7h18" />
    <path d="M7 7v10" />
    <path d="M12 7v6" />
    <path d="M17 7v8" />
  </svg>,
  <svg
    key="quick-2"
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
    key="quick-3"
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
];

export default async function Home() {
  const content = await getContent();
  const assetVersion = await getContentVersion();
  const phoneHref = toPhoneHref(content.contact.phone);
  const whatsappHref = toWhatsAppHref(content.contact.whatsapp);

  return (
    <main className="theme-sky bg-stone-50 text-slate-800">
      <Navbar
        businessName={content.globals.businessName}
        logoPath={content.globals.logoNavbar}
        assetVersion={assetVersion}
      />

      <HeroSlider
        hero={content.home.hero}
        contact={content.contact}
        assetVersion={assetVersion}
      />

      <section className="py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
            <div className="animate-fade-in rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm glass-soft sm:p-6 md:text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                {content.home.intro.eyebrow}
              </span>
              <h2 className="mt-3 text-2xl font-semibold text-slate-800 sm:text-3xl">
                {content.home.intro.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                {content.home.intro.subtitle}
              </p>
              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                <a
                  href={phoneHref}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover-bg-accent-600 hover:-translate-y-0.5"
                >
                  <FiPhone className="h-4 w-4" />
                  {content.home.hero.ctaPhoneLabel}
                </a>
                <a
                  href={whatsappHref}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  {content.home.hero.ctaWhatsappLabel}
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {content.home.quickStats.map((item, index) => (
                <div
                  key={item.title}
                  className="animate-fade-up rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm glass-soft"
                >
                  <div className="flex flex-col items-center gap-3 text-accent-600">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent-200 bg-accent-50">
                      {quickStatIcons[index] ?? quickStatIcons[0]}
                    </span>
                    <h3 className="text-base font-semibold text-slate-800">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm glass-soft sm:p-8 md:text-left">
            <div className="flex flex-col gap-3 md:items-start">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                What we fabricate
              </span>
              <h2 className="text-2xl font-semibold text-slate-800">
                Built for industrial, residential, and agricultural needs
              </h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.home.servicesTeaser.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover-border-accent-300 hover:shadow-md glass-soft"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
                    {service.label}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-800">
                    {service.title}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm glass-soft sm:p-8 md:text-left">
            <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-200 bg-accent-50 text-accent-600">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 7h18" />
                  <path d="M3 12h18" />
                  <path d="M3 17h18" />
                </svg>
              </span>
              <h2 className="text-2xl font-semibold text-slate-800">Areas we serve</h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {content.home.coverageAreas.join(", ")}.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
              {content.home.coverageAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition duration-200 hover-border-accent-300 hover-text-accent-700 glass-soft"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <StatsGrid items={content.home.stats} />
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm glass-soft sm:p-8 md:text-left">
            <div className="flex flex-col gap-3 md:items-start">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                Testimonials
              </span>
              <h2 className="text-2xl font-semibold text-slate-800">
                What clients say about our work
              </h2>
            </div>
            <div className="mt-6 grid items-stretch gap-4 md:grid-cols-3">
              {content.home.testimonials.map((item) => (
                <div
                  key={item.name}
                  className="flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover-border-accent-300 hover:shadow-md glass-soft"
                >
                  <p className="flex-1 text-sm text-slate-600">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-slate-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-slate-50 via-white to-slate-50">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 text-center sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:text-left">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
              Ready to start?
            </span>
            <p className="text-lg font-semibold text-slate-800">
              {content.home.cta}
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href={phoneHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover-bg-accent-600 hover:-translate-y-0.5"
            >
              <FiPhone className="h-4 w-4" />
              Call
            </a>
            <a
              href={whatsappHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5"
            >
              <FaWhatsapp className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer
        globals={content.globals}
        contact={content.contact}
        assetVersion={assetVersion}
      />
    </main>
  );
}




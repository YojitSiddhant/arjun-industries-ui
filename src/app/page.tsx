import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FiAward, FiBriefcase, FiMapPin, FiUsers } from "react-icons/fi";
import { getContent } from "@/lib/content";
import { toPhoneHref, toWhatsAppHref } from "@/lib/format";

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

const statIcons = [FiAward, FiBriefcase, FiMapPin, FiUsers];

export default async function Home() {
  const content = await getContent();
  const phoneHref = toPhoneHref(content.contact.phone);
  const whatsappHref = toWhatsAppHref(content.contact.whatsapp);

  return (
    <main className="bg-slate-50 text-slate-800">
      <Navbar businessName={content.globals.businessName} />

      <HeroSlider hero={content.home.hero} contact={content.contact} />

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
            <div className="animate-fade-in rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
                {content.home.intro.eyebrow}
              </span>
              <h1 className="mt-3 text-2xl font-semibold text-slate-800 sm:text-3xl">
                {content.home.intro.title}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                {content.home.intro.subtitle}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-sky-600 hover:-translate-y-0.5"
                >
                  <FiPhone className="h-4 w-4" />
                  {content.home.hero.ctaPhoneLabel}
                </a>
                <a
                  href={whatsappHref}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5"
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
                  className="animate-fade-up rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3 text-sky-600">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 bg-sky-50">
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

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
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
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
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

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-600">
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
              <h2 className="text-2xl font-semibold text-slate-800">
              Areas we serve
            </h2>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            {content.home.coverageAreas.join(", ")}.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {content.home.coverageAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition duration-200 hover:border-sky-300 hover:text-sky-700"
              >
                {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.home.stats.map((item, index) => {
              const Icon = statIcons[index] ?? FiAward;
              return (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-2 hover:border-sky-300 hover:shadow-md"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-2xl font-semibold text-slate-800">
                    {item.value}
                  </p>
                  <p className="text-sm text-slate-600">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
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
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md"
                >
                  <p className="text-sm text-slate-600 flex-1">"{item.quote}"</p>
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
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
              Ready to start?
            </span>
            <p className="text-lg font-semibold text-slate-800">
              {content.home.cta}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-sky-600 hover:-translate-y-0.5"
            >
              <FiPhone className="h-4 w-4" />
              Call
            </a>
            <a
              href={whatsappHref}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5"
            >
              <FaWhatsapp className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer globals={content.globals} contact={content.contact} />
    </main>
  );
}

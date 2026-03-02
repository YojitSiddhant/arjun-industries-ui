import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const quickStats = [
  {
    title: "On-site measurement",
    description: "Accurate measurements and installation support.",
    icon: (
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
        <path d="M7 7v10" />
        <path d="M12 7v6" />
        <path d="M17 7v8" />
      </svg>
    ),
  },
  {
    title: "Heavy MS sections",
    description: "Strong frames with clean finishing.",
    icon: (
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
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 4v16" />
        <path d="M17 4v16" />
      </svg>
    ),
  },
  {
    title: "Repair and upgrade",
    description: "Fast modifications and reinforcement.",
    icon: (
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
        <path d="M14 6l4 4-9 9H5v-4l9-9z" />
        <path d="M16 4l4 4" />
      </svg>
    ),
  },
];

const servicesTeaser = [
  {
    label: "Structures",
    title: "Sheds and structures",
    points: ["MS industrial sheds", "Warehouse and workshop fabrication"],
  },
  {
    label: "Gates",
    title: "Gates and grills",
    points: ["Main gates and railings", "Custom grills and windows"],
  },
  {
    label: "Farm",
    title: "Farm equipment",
    points: ["Tractor trolleys", "Water tankers and cultivators"],
  },
  {
    label: "Support",
    title: "Repair and custom work",
    points: ["On-site welding", "Reinforcement and modifications"],
  },
];

const coverageAreas = [
  "Bhopal",
  "Sehore",
  "Raisen",
  "Hoshangabad (Narmadapuram)",
  "Nearby rural areas",
];

export default function Home() {
  return (
    <main className="bg-slate-50 text-slate-800">
      <Navbar />

      <HeroSlider />

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
            <div className="animate-fade-in rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
                Welding, Metal and Fabrication Specialist
              </span>
              <h1 className="mt-3 text-2xl font-semibold text-slate-800 sm:text-3xl">
                Heavy-duty fabrication for sheds, gates, and farm equipment
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                Arjun Industries delivers precision fabrication for industrial,
                residential, and agricultural needs. From warehouse sheds to
                custom gates and farm machinery, we build durable structures
                that last.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="tel:09893031717"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-amber-600 hover:-translate-y-0.5"
                >
                  <FiPhone className="h-4 w-4" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/919893031717"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  WhatsApp Enquiry
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {quickStats.map((item) => (
                <div
                  key={item.title}
                  className="animate-fade-up rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3 text-amber-600">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-amber-50">
                      {item.icon}
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
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
                What we fabricate
              </span>
              <h2 className="text-2xl font-semibold text-slate-800">
                Built for industrial, residential, and agricultural needs
              </h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {servicesTeaser.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
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
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-600">
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
              Bhopal, Sehore, Raisen, Hoshangabad (Narmadapuram), nearby rural
              areas.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {coverageAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition duration-200 hover:border-amber-300 hover:text-amber-700"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-slate-50 via-white to-slate-50">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
              Ready to start?
            </span>
            <p className="text-lg font-semibold text-slate-800">
              Share your measurements or photos on WhatsApp for a quick estimate.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:09893031717"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-amber-600 hover:-translate-y-0.5"
            >
              <FiPhone className="h-4 w-4" />
              Call
            </a>
            <a
              href="https://wa.me/919893031717"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5"
            >
              <FaWhatsapp className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

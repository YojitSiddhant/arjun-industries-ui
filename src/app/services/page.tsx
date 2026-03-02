import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const services = [
  {
    category: "Industrial",
    title: "Sheds and warehouse structures",
    details: [
      "MS sheds with truss or portal frames",
      "Warehouse fabrication and installation",
      "Tin shed roofing with profile sheets",
    ],
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
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    category: "Residential",
    title: "Gates, grills and railings",
    details: [
      "Custom main gates and compound gates",
      "Window grills, balcony and stair railings",
      "Channel gates and sliding gates",
    ],
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
        <path d="M4 20V4" />
        <path d="M10 20V4" />
        <path d="M16 20V4" />
        <path d="M22 20V4" />
      </svg>
    ),
  },
  {
    category: "Agriculture",
    title: "Farm equipment fabrication",
    details: [
      "Tractor trolleys and water tankers",
      "Cultivators, boni machines, dhan ki chakri",
      "Reinforced frames for heavy use",
    ],
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
        <circle cx="8" cy="16" r="3" />
        <circle cx="16" cy="16" r="3" />
        <path d="M3 16h2l2-6h8l2 6h2" />
      </svg>
    ),
  },
  {
    category: "Support",
    title: "Repair and custom work",
    details: [
      "On-site welding and reinforcement",
      "Modification of existing structures",
      "Custom fabrication on demand",
    ],
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
  {
    category: "Wholesale",
    title: "Shed material supply",
    details: [
      "Profile colour coated sheets",
      "Angle, channel, flat, bar, MS material",
      "Bulk orders for contractors",
    ],
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
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-slate-50 text-slate-800">
      <Navbar />

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
              Services
            </span>
            <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">
              Fabrication and welding services
            </h1>
            <p className="text-sm text-slate-600 sm:text-base">
              Heavy-duty fabrication for industrial sheds, gates, grills, and farm
              equipment, with reliable installation and repair support.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3 text-sky-600">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 bg-sky-50">
                    {service.icon}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
                    {service.category}
                  </p>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-800">
                  {service.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {service.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
            <p className="text-sm text-slate-600">
              Need something custom? Call or WhatsApp for quick guidance.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:09893031717"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-sky-600 hover:-translate-y-0.5"
              >
                <FiPhone className="h-4 w-4" />
                Call
              </a>
              <a
                href="https://wa.me/919893031717"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5"
              >
                <FaWhatsapp className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

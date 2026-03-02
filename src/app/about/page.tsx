import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const focusCards = [
  {
    title: "Durable fabrication",
    description: "Built with heavy MS sections for long-term performance.",
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
    title: "Custom work as per site",
    description: "Measurements, design, and finishing tailored to your needs.",
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
    title: "Reliable support",
    description: "On-time delivery with repair and modification support.",
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
        <path d="M12 2l3 6 6 .9-4.5 4.4 1.1 6.2L12 16.8 6.4 19.5 7.5 13 3 8.9 9 8z" />
      </svg>
    ),
  },
];

const capabilities = [
  "Industrial sheds and structures",
  "Main gates, grills, windows",
  "Warehouse fabrication",
  "Farm equipment and trolleys",
  "Repair and reinforcement",
];

export default function AboutPage() {
  return (
    <main className="bg-slate-50 text-slate-800">
      <Navbar />

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
              About
            </span>
            <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">
              About Arjun Industries
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Arjun Industries is a trusted fabrication and welding workshop in
              Bhopal, serving industrial, residential, and agricultural clients.
              We specialize in custom metal work, durable MS structures, and
              precision finishing for projects of all sizes.
            </p>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Our team handles site measurements, material planning, fabrication,
              and installation. From sheds and gates to farm equipment and repair
              work, we deliver quality craftsmanship backed by reliable service.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {focusCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-amber-600">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-amber-50">
                      {card.icon}
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
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
                What we can handle
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 text-amber-500"
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

      <Footer />
    </main>
  );
}

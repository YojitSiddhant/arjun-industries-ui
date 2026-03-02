import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="bg-slate-50 text-slate-800">
      <Navbar />

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
              CONTACT
            </span>
            <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">
              Contact Arjun Industries
            </h1>
            <p className="text-sm text-slate-600 sm:text-base">
              Call or WhatsApp for fabrication work, sheds, gates, and farm equipment.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
                <FiPhone className="h-5 w-5" />
                Phone
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-800">
                +91 98930 31717
              </p>
              <a
                href="tel:+919893031717"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-sky-600 hover:-translate-y-0.5"
              >
                <FiPhone className="h-5 w-5" />
                Call Now
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-800">
                +91 98930 31717
              </p>
              <a
                href="https://wa.me/919893031717"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5"
              >
                <FaWhatsapp className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
                <FiMapPin className="h-5 w-5" />
                Workshop
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Bhairopur, Narmadapuram Rd, in front of IPS School, Bhopal, Madhya Pradesh 462047
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md">
            <h2 className="text-lg font-semibold text-slate-800">Working hours</h2>
            <p className="mt-3 text-sm text-slate-600">
              Monday to Saturday: 9:30 AM - 7:30 PM
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Sunday: By appointment or urgent work
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md">
            <h2 className="text-lg font-semibold text-slate-800">Location on map</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                title="Arjun Industries map"
                src="https://www.google.com/maps?q=23.1481814,77.4799711&z=17&output=embed"
                className="h-64 w-full md:h-80"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

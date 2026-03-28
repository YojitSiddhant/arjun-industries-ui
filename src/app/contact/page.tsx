import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactLeadForm from "@/components/ContactLeadForm";
import { FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { getContent, getContentVersion } from "@/lib/content";
import { toPhoneHref, toWhatsAppHref } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact Arjun Industries",
  description:
    "Contact Arjun Industries in Bhopal for fabrication, welding, sheds, gates, grills, and farm equipment work. Call or WhatsApp for a quick estimate.",
  path: "/contact",
  keywords: [
    "contact Arjun Industries",
    "fabrication contact Bhopal",
    "welding company phone number",
    "WhatsApp fabrication enquiry",
  ],
});

export default async function ContactPage() {
  const content = await getContent();
  const assetVersion = await getContentVersion();
  const phoneHref = toPhoneHref(content.contact.phone);
  const whatsappHref = toWhatsAppHref(content.contact.whatsapp);
  const mapUrl = `https://www.google.com/maps?q=${content.contact.mapLat},${content.contact.mapLng}&z=17&output=embed`;

  return (
    <main className="theme-purple bg-stone-50 text-slate-800">
      <Navbar
        businessName={content.globals.businessName}
        logoPath={content.globals.logoNavbar}
        assetVersion={assetVersion}
      />

      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
              CONTACT
            </span>
            <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">
              {content.contact.title}
            </h1>
            <p className="text-sm text-slate-600 sm:text-base">
              {content.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-200 hover:shadow-md glass-soft">
              <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                <FiPhone className="h-5 w-5" />
                Phone
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-800">
                {content.contact.phone}
              </p>
              <a
                href={phoneHref}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover-bg-accent-600 hover:-translate-y-0.5 sm:w-auto"
              >
                <FiPhone className="h-5 w-5" />
                Call Now
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-200 hover:shadow-md glass-soft">
              <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-800">
                {content.contact.whatsapp}
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5 sm:w-auto"
              >
                <FaWhatsapp className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-200 hover:shadow-md glass-soft">
              <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                <FiMapPin className="h-5 w-5" />
                Workshop
              </p>
              <p className="mt-3 text-sm text-slate-600">
                {content.contact.address}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ContactLeadForm />
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-200 hover:shadow-md glass-soft">
            <h2 className="text-lg font-semibold text-slate-800">Working hours</h2>
            {content.contact.hours.map((line) => (
              <p key={line} className="mt-2 text-sm text-slate-600">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-200 hover:shadow-md glass-soft">
            <h2 className="text-lg font-semibold text-slate-800">Location on map</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                title="Arjun Industries map"
                src={mapUrl}
                className="h-64 w-full md:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
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




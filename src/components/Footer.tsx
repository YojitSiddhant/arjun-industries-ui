import Link from "next/link";
import { FiHome, FiInfo, FiLayers, FiImage, FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import type { SiteContent } from "@/lib/content";
import { toPhoneHref, toWhatsAppHref } from "@/lib/format";

type FooterProps = {
  globals: SiteContent["globals"];
  contact: SiteContent["contact"];
};

export default function Footer({ globals, contact }: FooterProps) {
  const phoneHref = toPhoneHref(contact.phone);
  const whatsappHref = toWhatsAppHref(contact.whatsapp);
  const mapHref = `https://www.google.com/maps?q=${encodeURIComponent(
    contact.address || `${contact.mapLat},${contact.mapLng}`
  )}`;

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-100 text-slate-800">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-base font-semibold text-slate-800">
              {globals.businessName.toUpperCase()}
            </p>
            <p className="text-sm text-slate-600">
              {globals.tagline}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {globals.footerBlurb}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-800">COMPANY</p>
            <div className="flex flex-col gap-2">
              <Link href="/" className="flex items-center gap-2 text-slate-600 transition duration-200 hover:text-sky-600">
                <FiHome className="h-5 w-5 text-slate-700" />
                Home
              </Link>
              <Link href="/about" className="flex items-center gap-2 text-slate-600 transition duration-200 hover:text-sky-600">
                <FiInfo className="h-5 w-5 text-slate-700" />
                About Us
              </Link>
              <Link href="/services" className="flex items-center gap-2 text-slate-600 transition duration-200 hover:text-sky-600">
                <FiLayers className="h-5 w-5 text-slate-700" />
                Services
              </Link>
              <Link href="/gallery" className="flex items-center gap-2 text-slate-600 transition duration-200 hover:text-sky-600">
                <FiImage className="h-5 w-5 text-slate-700" />
                Gallery
              </Link>
              <Link href="/contact" className="flex items-center gap-2 text-slate-600 transition duration-200 hover:text-sky-600">
                <FiPhone className="h-5 w-5 text-slate-700" />
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-800">CONTACT</p>
            <div className="flex flex-col items-start gap-3">
              <a
                href={phoneHref}
                className="inline-flex w-32 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
              >
                <FiPhone className="h-4 w-4" />
                Call
              </a>
              <a
                href={whatsappHref}
                className="inline-flex w-32 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-700"
              >
                <FaWhatsapp className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={mapHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-32 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
              >
                <FiMapPin className="h-4 w-4" />
                Location
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>{globals.copyright}</p>
          <p>{globals.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}

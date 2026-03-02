import Link from "next/link";
import {
  FiHome,
  FiInfo,
  FiLayers,
  FiImage,
  FiPhone,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-100 text-slate-800">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-base font-semibold text-slate-800">ARJUN INDUSTRIES</p>
            <p className="text-sm text-slate-600">
              Welding, Metal and Fabrication Specialist
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We deliver fabrication, welding, sheds, gates, and industrial metal
              work with strong finishing and reliable service.
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
            <div className="flex flex-col gap-2 text-sm text-slate-600 leading-relaxed">
              <div className="flex items-center gap-2">
                <FiPhone className="h-5 w-5 text-slate-700" />
                09893091717
              </div>
              <div className="flex items-center gap-2">
                <FaWhatsapp className="h-5 w-5 text-slate-700" />
                09893091717
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="h-5 w-5 scale-110 text-slate-700" />
                Bhairopur, Narmadapuram Rd, in front of IPS School, Bhopal, Madhya Pradesh 462047
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="h-5 w-5 text-slate-700" />
                10:00 AM - 7:00 PM
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>(c) 2026 Arjun Industries. All rights reserved.</p>
          <p>Welding, metal and fabrication services in Bhopal and nearby areas.</p>
        </div>
      </div>
    </footer>
  );
}

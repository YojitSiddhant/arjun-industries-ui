"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiHome, FiInfo, FiLayers, FiImage, FiPhone, FiTool, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/about", label: "About Us", icon: FiInfo },
  { href: "/services", label: "Services", icon: FiLayers },
  { href: "/gallery", label: "Gallery", icon: FiImage },
  { href: "/contact", label: "Contact", icon: FiPhone },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="w-full border-b border-slate-200 bg-white text-slate-800 shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold text-slate-800 transition hover:text-sky-600"
        >
          <FiTool className="h-4 w-4 text-sky-600" />
          Arjun Industries
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition duration-200 ${
                  active
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-800 hover:bg-slate-50 hover:text-sky-600"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    active ? "text-sky-600" : "text-slate-500"
                  }`}
                />
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-200 p-2 text-slate-600 transition duration-200 hover:border-sky-300 hover:text-sky-600 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`md:hidden ${
          menuOpen ? "max-h-96 border-t border-slate-200" : "max-h-0"
        } overflow-hidden bg-white transition-all duration-300`}
      >
        <div className="flex flex-col gap-2 px-4 py-4 sm:px-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm transition duration-200 ${
                  active
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-800 hover:bg-slate-50 hover:text-sky-600"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <Icon
                  className={`h-4 w-4 ${
                    active ? "text-sky-600" : "text-slate-500"
                  }`}
                />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

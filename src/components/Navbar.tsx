"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiHome, FiInfo, FiLayers, FiImage, FiPhone, FiTool, FiMenu, FiX } from "react-icons/fi";
import { withAssetVersion } from "@/lib/assets";

const navLinks = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/about", label: "About Us", icon: FiInfo },
  { href: "/services", label: "Services", icon: FiLayers },
  { href: "/gallery", label: "Gallery", icon: FiImage },
  { href: "/contact", label: "Contact", icon: FiPhone },
];

export default function Navbar({
  businessName,
  logoPath,
  assetVersion,
}: {
  businessName: string;
  logoPath?: string;
  assetVersion: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white text-slate-800 shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 max-w-[calc(100%-3.5rem)] items-center gap-2 text-base font-semibold text-slate-800 transition hover-text-accent-600 md:max-w-none"
        >
          {logoPath ? (
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center sm:h-12 sm:w-12">
              <img
                src={withAssetVersion(logoPath, assetVersion)}
                alt={`${businessName} logo`}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </span>
          ) : (
            <FiTool className="h-4 w-4 flex-shrink-0 text-accent-600" />
          )}
          <span className="truncate text-sm sm:text-base">{businessName}</span>
        </Link>

        <div className="hidden items-center gap-6 md:ml-auto md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition duration-200 ${
                  active
                    ? "bg-accent-50 text-accent-700"
                    : "text-slate-800 hover-bg-accent-50 hover-text-accent-600"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    active
                      ? "text-accent-600"
                      : "text-slate-500 group-hover-text-accent-600"
                  }`}
                />
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-slate-200 p-2 text-slate-600 transition duration-200 hover-border-accent-300 hover-text-accent-600 md:ml-auto md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`md:hidden ${
          menuOpen ? "max-h-96 border-t border-slate-200" : "max-h-0"
        } overflow-hidden glass-soft transition-all duration-300`}
      >
        <div className="flex flex-col items-stretch gap-2 px-4 py-4 sm:px-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm transition duration-200 ${
                  active
                    ? "bg-accent-50 text-accent-700"
                    : "text-slate-800 hover-bg-accent-50 hover-text-accent-600"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <Icon
                  className={`h-4 w-4 ${
                    active
                      ? "text-accent-600"
                      : "text-slate-500 group-hover-text-accent-600"
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



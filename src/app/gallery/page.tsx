"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type GalleryCategory = "All" | "Sheds" | "Gates and grills" | "Farm equipment" | "Other";

const filters: GalleryCategory[] = [
  "All",
  "Sheds",
  "Gates and grills",
  "Farm equipment",
  "Other",
];

const galleryItems = [
  {
    title: "Industrial shed framing",
    category: "Sheds" as GalleryCategory,
    image: "/gallery/gallery1.jpg",
  },
  {
    title: "Warehouse tin shed",
    category: "Sheds" as GalleryCategory,
    image: "/gallery/gallery2.jpg",
  },
  {
    title: "Custom main gate",
    category: "Gates and grills" as GalleryCategory,
    image: "/gallery/gallery3.jpg",
  },
  {
    title: "Balcony grills",
    category: "Gates and grills" as GalleryCategory,
    image: "/gallery/gallery4.jpg",
  },
  {
    title: "Tractor trolley build",
    category: "Farm equipment" as GalleryCategory,
    image: "/gallery/gallery5.jpg",
  },
  {
    title: "Water tanker fabrication",
    category: "Farm equipment" as GalleryCategory,
    image: "/gallery/gallery6.jpg",
  },
  {
    title: "On-site repair work",
    category: "Other" as GalleryCategory,
    image: "/gallery/gallery1.jpg",
  },
];

const filterIcons: Record<GalleryCategory, JSX.Element> = {
  All: (
    <svg
      className="h-4 w-4"
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
  ),
  Sheds: (
    <svg
      className="h-4 w-4"
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
  "Gates and grills": (
    <svg
      className="h-4 w-4"
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
  "Farm equipment": (
    <svg
      className="h-4 w-4"
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
  Other: (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9c0 .7.4 1.3 1 1.6.2.1.4.2.6.2H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  ),
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("All");

  const visibleItems = useMemo(() => {
    if (activeFilter === "All") {
      return galleryItems;
    }
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="bg-slate-50 text-slate-800">
      <Navbar />

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
              Gallery
            </span>
            <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">
              Work gallery
            </h1>
            <p className="text-sm text-slate-600 sm:text-base">
              A glimpse of recent fabrication projects and on-site work delivered
              by Arjun Industries.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition duration-200 ${
                  activeFilter === filter
                    ? "border-amber-300 bg-amber-50 text-amber-700"
                    : "border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700"
                }`}
              >
                {filterIcons[filter]}
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleItems.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition duration-300 hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                    {item.category}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type GalleryItem = {
  title: string;
  category: string;
  image: string;
};

type GalleryClientProps = {
  items: GalleryItem[];
};

const filterIcons: Record<string, JSX.Element> = {
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

export default function GalleryClient({ items }: GalleryClientProps) {
  const categories = Array.from(new Set(items.map((item) => item.category)));
  const filters = ["All", ...categories];
  const [activeFilter, setActiveFilter] = useState(filters[0] ?? "All");

  const visibleItems = useMemo(() => {
    if (activeFilter === "All") {
      return items;
    }
    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter, items]);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition duration-200 ${
              activeFilter === filter
                ? "border-accent-300 bg-accent-50 text-accent-700"
                : "border-slate-200 text-slate-600 hover-border-accent-300 hover-text-accent-700"
            }`}
          >
            {filterIcons[filter] ?? filterIcons.All}
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleItems.map((item) => (
          <div
            key={`${item.title}-${item.image}`}
            className="rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover-border-accent-300 hover:shadow-md glass-soft"
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
            <div className="mt-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
                {item.category}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}



"use client";

import { useEffect, useState } from "react";

const highlights = [
  {
    title: "Strong industrial sheds with MS structure",
    description: "Fabrication for warehouses, workshops, and heavy-duty sheds.",
  },
  {
    title: "Custom main gates and grills as per site",
    description: "Precision work for homes, factories, and commercial spaces.",
  },
  {
    title: "Tractor trolleys and farm equipment",
    description: "Built for rough rural use with reliable finishing.",
  },
  {
    title: "Repair, reinforcement and on-site welding",
    description: "Fast support for modifications, repairs, and upgrades.",
  },
  {
    title: "Wholesale shed materials available",
    description: "Profile sheets, angle, channel, flat, bar, and MS material.",
  },
];

export default function HighlightSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % highlights.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition duration-200 hover:shadow-md glass-soft">
      <span className="inline-flex rounded-full border border-accent-300 bg-accent-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-700">
        Key Highlights
      </span>
      <div className="mt-4">
        <p className="text-lg font-semibold text-slate-800 transition">
          {highlights[activeIndex].title}
        </p>
        <p className="mt-2 text-sm text-slate-600">
          {highlights[activeIndex].description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        {highlights.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index === activeIndex
                ? "bg-accent-500"
                : "bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to highlight ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}



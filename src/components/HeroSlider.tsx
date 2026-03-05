"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import type { SiteContent } from "@/lib/content";
import { toPhoneHref, toWhatsAppHref } from "@/lib/format";

type HeroProps = {
  hero: SiteContent["home"]["hero"];
  contact: SiteContent["contact"];
};

export default function HeroSlider({ hero, contact }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = hero.slides.length
    ? hero.slides
    : [
        { src: "/hero/hero1.jpg", alt: "Welding work 1" },
        { src: "/hero/hero2.jpg", alt: "Welding work 2" },
        { src: "/hero/hero3.jpg", alt: "Welding work 3" },
      ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full">
      <div className="relative h-[320px] w-full overflow-hidden bg-slate-50 sm:h-[420px] md:h-[520px]">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.src} className="relative h-full w-full flex-shrink-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={slide.src === "/hero/hero1.jpg"}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-transparent" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl space-y-4 text-white">
              <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                {hero.eyebrow}
              </span>
              <h1 className="text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                {hero.title}
              </h1>
              <p className="text-sm text-white/80 sm:text-base">{hero.subtitle}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={toPhoneHref(contact.phone)}
                  className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-sky-600 hover:-translate-y-0.5"
                >
                  <FiPhone className="h-4 w-4" />
                  {hero.ctaPhoneLabel}
                </a>
                <a
                  href={toWhatsAppHref(contact.whatsapp)}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-300 px-5 py-2 text-sm font-semibold text-emerald-100 transition duration-200 hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  {hero.ctaWhatsappLabel}
                </a>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white shadow-sm transition duration-200 hover:border-white/70 hover:text-white sm:left-4"
        >
          <span className="text-lg">&lt;</span>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white shadow-sm transition duration-200 hover:border-white/70 hover:text-white sm:right-4"
        >
          <span className="text-lg">&gt;</span>
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeIndex
                  ? "bg-sky-400"
                  : "bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

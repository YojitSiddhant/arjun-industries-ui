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
  }, [slides.length]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full">
      <div className="relative min-h-[420px] w-full overflow-hidden bg-slate-50 sm:min-h-[500px] md:min-h-[560px]">
        <div
          className="absolute inset-0 flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.src} className="relative h-full min-w-full flex-shrink-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                priority={slide.src === "/hero/hero1.jpg"}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/45 to-slate-900/20 md:bg-gradient-to-r md:from-slate-900/70 md:via-slate-900/40 md:to-transparent" />
            </div>
          ))}
        </div>

        <div className="relative z-10">
          <div className="mx-auto flex min-h-[420px] w-full max-w-6xl items-end px-4 pb-20 pt-10 sm:min-h-[500px] sm:px-6 sm:pb-24 sm:pt-12 md:min-h-[560px] md:items-center md:px-8 md:pb-16">
            <div className="flex w-full max-w-xl flex-col items-center space-y-4 text-center text-white md:items-start md:text-left">
              <span className="inline-flex max-w-full rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80 sm:text-xs sm:tracking-[0.3em]">
                {hero.eyebrow}
              </span>
              <h1 className="text-[1.9rem] font-semibold leading-[1.05] sm:text-4xl md:text-5xl">
                {hero.title}
              </h1>
              <p className="max-w-lg text-sm leading-6 text-white/85 sm:text-base">
                {hero.subtitle}
              </p>
              <div className="flex w-full flex-col justify-center gap-3 pt-2 sm:flex-row md:justify-start">
                <a
                  href={toPhoneHref(contact.phone)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover-bg-accent-600 hover:-translate-y-0.5"
                >
                  <FiPhone className="h-4 w-4" />
                  {hero.ctaPhoneLabel}
                </a>
                <a
                  href={toWhatsAppHref(contact.whatsapp)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-300 bg-black/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition duration-200 hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5"
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
          className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white shadow-sm transition duration-200 hover:border-white/70 hover:text-white md:flex"
        >
          <span className="text-lg">&lt;</span>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white shadow-sm transition duration-200 hover:border-white/70 hover:text-white md:flex"
        >
          <span className="text-lg">&gt;</span>
        </button>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeIndex
                  ? "bg-accent-400"
                  : "bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}



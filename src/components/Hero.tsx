"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/LocaleProvider";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Radial gold glow behind logo */}
      <div className="radial-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Scarab Logo */}
        <div
          className="animate-fade-in-up mb-8"
          style={{ animationDelay: "0ms" }}
        >
          <Image
            src="/logo.png"
            alt="Reich Elyra"
            width={120}
            height={120}
            className="animate-float"
            priority
          />
        </div>

        {/* Tagline */}
        <p
          className="animate-fade-in-up text-xs tracking-[0.3em] uppercase text-neutral-500 mb-6"
          style={{ animationDelay: "100ms" }}
        >
          {t("hero.tagline")}
        </p>

        {/* Main Title */}
        <h1
          className="animate-fade-in-up text-5xl md:text-7xl font-bold leading-tight text-gradient-gold mb-6"
          style={{ animationDelay: "200ms" }}
        >
          {t("hero.title")}
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up text-lg md:text-xl text-neutral-400 max-w-2xl mb-12"
          style={{ animationDelay: "350ms" }}
        >
          {t("hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-up flex flex-col sm:flex-row gap-4"
          style={{ animationDelay: "500ms" }}
        >
          <a href="#services" className="btn-primary">
            {t("hero.cta")}
          </a>
          <a href="#contact" className="btn-outline">
            {t("common.contactUs")}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="animate-fade-in-up absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animationDelay: "700ms" }}
      >
        <span className="text-xs text-neutral-600 uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-5 h-5 animate-bounce">
          <div
            className="w-3 h-3 border-b-2 border-r-2 border-neutral-500 rotate-45 mx-auto"
          />
        </div>
      </div>

      {/* Decorative gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
    </section>
  );
}

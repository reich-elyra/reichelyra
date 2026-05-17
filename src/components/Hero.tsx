"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/i18n/LocaleProvider";

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="counter-value">
      {count}{suffix}
    </span>
  );
}

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="grid-bg absolute inset-0" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-glow/[0.03] blur-[80px] animate-float" style={{ animationDelay: "3s" }} />

      {/* Radial gold glow behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-glow pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-in-up mb-6" style={{ animationDelay: "0ms" }}>
          <span className="floating-badge">
            <span className="pulse-dot" />
            {t("hero.tagline")}
          </span>
        </div>

        {/* Scarab Logo */}
        <div className="animate-fade-in-up mb-8" style={{ animationDelay: "100ms" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl animate-float" />
            <Image
              src="/logo.png"
              alt="Reich Elyra"
              width={100}
              height={100}
              className="relative animate-float"
              priority
            />
          </div>
        </div>

        {/* Main Title */}
        <h1
          className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-gradient-gold mb-6"
          style={{ animationDelay: "200ms" }}
        >
          {t("hero.title")}
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mb-10 leading-relaxed"
          style={{ animationDelay: "350ms" }}
        >
          {t("hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-up flex flex-col sm:flex-row gap-4 mb-16"
          style={{ animationDelay: "500ms" }}
        >
          <a href="#services" className="btn-primary">
            {t("hero.cta")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn-outline">
            {t("common.contactUs")}
          </a>
        </div>

        {/* Stats counters */}
        <div
          className="animate-fade-in-up grid grid-cols-3 gap-8 sm:gap-16"
          style={{ animationDelay: "650ms" }}
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gold mb-1">
              <AnimatedCounter end={6} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider">{t("hero.stats.sectors")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gold mb-1">
              <AnimatedCounter end={2} />
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider">{t("hero.stats.countries")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gold mb-1">
              <AnimatedCounter end={3} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider">{t("hero.stats.platforms")}</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="animate-fade-in-up absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animationDelay: "800ms" }}
      >
        <div className="w-5 h-8 border border-neutral-600 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-gold rounded-full animate-bounce" />
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}

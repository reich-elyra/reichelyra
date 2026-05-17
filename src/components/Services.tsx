"use client";

import { type ReactNode } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

const serviceKeys = ["ai", "legaltech", "investment", "infrastructure", "saas", "consulting"];

const serviceIcons: Record<string, ReactNode> = {
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
      <path d="M8 14s-4 1-4 4v2h16v-2c0-3-4-4-4-4" />
      <circle cx="12" cy="6" r="1.5" />
    </svg>
  ),
  legaltech: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M12 3v18M3 7l9-4 9 4M3 7v2l9 4 9-4V7" />
    </svg>
  ),
  investment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M3 20h18M6 16v4M10 12v8M14 8v12M18 4v16" />
    </svg>
  ),
  infrastructure: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="2" y="3" width="20" height="6" rx="1" />
      <rect x="2" y="13" width="20" height="6" rx="1" />
    </svg>
  ),
  saas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M18 10a4 4 0 0 0-7.46-2A3.5 3.5 0 1 0 7 14h11a3 3 0 0 0 0-6" />
    </svg>
  ),
  consulting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    </svg>
  ),
};

export default function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="floating-badge mb-4 inline-flex">{t("services.badge")}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-gold">
            {t("services.title")}
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, index) => (
            <div
              key={key}
              className="gradient-border-card group hover-lift reveal"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="icon-box text-gold">
                  {serviceIcons[key]}
                </div>
                <span className="text-xs font-mono text-neutral-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-200 mb-3 group-hover:text-gold transition-colors">
                {t(`services.${key}.title`)}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t(`services.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

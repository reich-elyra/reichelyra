"use client";

import { useLocale } from "@/i18n/LocaleProvider";

const services = [
  {
    key: "ai",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#C9A84C]">
        <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
        <path d="M8 14s-4 1-4 4v2h16v-2c0-3-4-4-4-4" />
        <circle cx="12" cy="6" r="1.5" />
        <path d="M9 3.5 7 2M15 3.5 17 2M12 1v1" />
      </svg>
    ),
  },
  {
    key: "legaltech",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#C9A84C]">
        <path d="M12 3v18M3 7l9-4 9 4M3 7v2l9 4 9-4V7M3 9l9 4M21 9l-9 4" />
      </svg>
    ),
  },
  {
    key: "investment",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#C9A84C]">
        <path d="M3 20h18M6 16v4M10 12v8M14 8v12M18 4v16" />
      </svg>
    ),
  },
  {
    key: "infrastructure",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#C9A84C]">
        <rect x="2" y="3" width="20" height="6" rx="1" />
        <rect x="2" y="13" width="20" height="6" rx="1" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="6" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "saas",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#C9A84C]">
        <path d="M18 10a4 4 0 0 0-7.46-2A3.5 3.5 0 1 0 7 14h11a3 3 0 0 0 0-6v2" />
      </svg>
    ),
  },
  {
    key: "consulting",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#C9A84C]">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <path d="m16.24 7.76-2.83 2.83M10.59 13.41l-2.83 2.83" />
      </svg>
    ),
  },
];

export default function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] bg-clip-text text-transparent">
            {t("services.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.key}
              className={`glass-card p-8 group hover:border-t-2 hover:border-t-[#C9A84C] transition-all duration-300 reveal reveal-delay-${index + 1}`}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">
                {t(`services.${service.key}.title`)}
              </h3>
              <p className="text-muted-foreground">
                {t(`services.${service.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

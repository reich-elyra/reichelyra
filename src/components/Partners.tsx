"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function Partners() {
  const { t, tArray } = useLocale();

  const domains = tArray("partners.domains");

  return (
    <section className="py-16 overflow-hidden border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <p className="text-center text-sm uppercase tracking-[0.2em] text-neutral-500">
          {t("partners.title")}
        </p>
      </div>
      <div className="relative" aria-hidden="true">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...domains, ...domains].map((domain, i) => (
            <span
              key={i}
              className="mx-8 text-lg font-medium text-neutral-600 hover:text-gold transition-colors duration-300 cursor-default"
            >
              {domain}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

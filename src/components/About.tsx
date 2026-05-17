"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function About() {
  const { t } = useLocale();

  return (
    <section id="about" className="py-24 px-6 relative">
      {/* Decorative gradient line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <div className="max-w-6xl mx-auto reveal">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] bg-clip-text text-transparent">
          {t("about.title")}
        </h2>

        <p className="text-muted-foreground text-lg text-center max-w-3xl mx-auto mb-16">
          {t("about.description")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Founded */}
          <div className="glass-card p-8 text-center reveal">
            <div className="text-3xl font-bold text-[#C9A84C] mb-2">2025</div>
            <div className="text-muted-foreground">{t("about.founded")}</div>
          </div>

          {/* Location */}
          <div className="glass-card p-8 text-center reveal">
            <div className="text-lg font-semibold text-[#C9A84C] mb-2">
              Cairo, Egypt &rarr; Madrid, Spain
            </div>
            <div className="text-muted-foreground">{t("about.location")}</div>
          </div>

          {/* Legal Entity */}
          <div className="glass-card p-8 text-center reveal">
            <div className="text-lg font-semibold text-[#C9A84C] mb-2">
              LLC
            </div>
            <div className="text-muted-foreground">{t("about.legalEntity")}</div>
            <div className="text-sm text-muted-foreground/70 mt-1">
              {t("about.investmentLaw")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

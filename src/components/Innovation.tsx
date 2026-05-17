"use client";

import { useLocale } from "@/i18n/LocaleProvider";

const pillarIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /><circle cx="12" cy="12" r="4" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M9 12l2 2 4-4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
  </svg>,
];

export default function Innovation() {
  const { t } = useLocale();

  const pillars = [0, 1, 2, 3].map((i) => ({
    title: t(`innovation.pillars.${i}.title`),
    desc: t(`innovation.pillars.${i}.desc`),
    icon: pillarIcons[i],
  }));

  return (
    <section id="innovation" className="relative py-28 px-6 overflow-hidden">
      <div className="grid-bg absolute inset-0 pointer-events-none opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="floating-badge mb-4 inline-flex">{t("innovation.badge")}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-gold">
            {t("innovation.title")}
          </h2>
          <p className="text-neutral-400 text-lg mb-4">
            {t("innovation.subtitle")}
          </p>
          <p className="text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            {t("innovation.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="gradient-border-card group hover-lift reveal"
            >
              <div className="flex items-start gap-5">
                <div className="icon-box text-gold group-hover:bg-gold/15 transition-colors">
                  {pillar.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-gold/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold text-neutral-200 group-hover:text-gold transition-colors">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

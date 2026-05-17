"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function Innovation() {
  const { t } = useLocale();

  const pillars = [0, 1, 2, 3].map((i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: t(`innovation.pillars.${i}.title`),
    desc: t(`innovation.pillars.${i}.desc`),
  }));

  return (
    <section id="innovation" className="relative py-24 px-6 overflow-hidden">
      <div className="grid-bg absolute inset-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-gold">
            {t("innovation.title")}
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            {t("innovation.subtitle")}
          </p>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("innovation.description")}
          </p>
        </div>

        <div className="space-y-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl reveal"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-6">
                <span className="text-5xl font-bold bg-gradient-to-b from-gold to-amber-300 bg-clip-text text-transparent shrink-0">
                  {pillar.number}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
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

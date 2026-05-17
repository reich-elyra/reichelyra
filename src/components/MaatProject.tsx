"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function MaatProject() {
  const { t } = useLocale();

  const featureIndices = [0, 1, 2, 3];

  return (
    <section id="maat" className="relative py-24 px-6 overflow-hidden">
      <div className="radial-glow-blue absolute inset-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-gold">
            {t("maat.title")}
          </h2>
          <p className="text-neutral-400 text-lg">{t("maat.subtitle")}</p>
        </div>

        <div className="glass-card scarab-border glow-gold p-8 md:p-10 reveal">
          <p className="text-neutral-300 text-lg leading-relaxed mb-10">
            {t("maat.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {featureIndices.map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]"
              >
                <svg
                  className="w-5 h-5 mt-0.5 shrink-0"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z"
                    fill="#c9a84c"
                    opacity="0.8"
                  />
                </svg>
                <span className="text-neutral-300 text-sm leading-relaxed">
                  {t(`maat.features.${i}`)}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#contact" className="btn-outline">
              {t("common.learnMore")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

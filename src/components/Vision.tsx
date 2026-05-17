"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function Vision() {
  const { t } = useLocale();

  return (
    <section id="vision" className="bg-navy relative py-24 px-6 overflow-hidden">
      <div className="radial-glow absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent reveal">
          {t("vision.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="glass-card p-8 rounded-2xl reveal">
            <div className="mb-6">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-gold"
              >
                <path d="M12 2l2.09 6.26L21 9.27l-5 3.64L17.18 20 12 16.77 6.82 20 8 12.91l-5-3.64 6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("vision.vision")}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {t("vision.visionText")}
            </p>
          </div>

          {/* Mission Card */}
          <div className="glass-card p-8 rounded-2xl reveal">
            <div className="mb-6">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-gold"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="22" />
                <line x1="2" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="22" y2="12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("vision.mission")}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {t("vision.missionText")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function Vision() {
  const { t } = useLocale();

  return (
    <section id="vision" className="relative py-28 px-6 overflow-hidden bg-navy">
      <div className="radial-glow absolute inset-0 pointer-events-none" />
      <div className="grid-bg absolute inset-0 opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-gold">
            {t("vision.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="gradient-border-card hover-lift reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-100">{t("vision.vision")}</h3>
            </div>
            <p className="text-neutral-300 leading-relaxed text-base">
              {t("vision.visionText")}
            </p>
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-sm text-gold/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l2.09 6.26L21 9.27l-5 3.64L17.18 20 12 16.77 6.82 20 8 12.91l-5-3.64 6.91-1.01L12 2z" />
                </svg>
                {t("vision.visionHighlight")}
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="gradient-border-card hover-lift reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-100">{t("vision.mission")}</h3>
            </div>
            <p className="text-neutral-300 leading-relaxed text-base">
              {t("vision.missionText")}
            </p>
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-sm text-gold/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
                {t("vision.missionHighlight")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

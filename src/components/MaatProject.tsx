"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";

export default function MaatProject() {
  const { t } = useLocale();

  const features = [0, 1, 2, 3];

  return (
    <section id="maat" className="relative py-28 px-6 overflow-hidden">
      <div className="radial-glow-blue absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="floating-badge mb-4 inline-flex">
            <span className="pulse-dot" />
            {t("maat.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-gold">
            {t("maat.title")}
          </h2>
          <p className="text-neutral-400 text-lg">{t("maat.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Description + Features */}
          <div className="reveal">
            <p className="text-neutral-300 text-base leading-relaxed mb-8">
              {t("maat.description")}
            </p>

            <div className="space-y-4">
              {features.map((i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-neutral-300 text-sm leading-relaxed">
                    {t(`maat.features.${i}`)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary">
                {t("maat.cta")}
              </a>
              <Link href="/maat" className="btn-outline">
                Learn more →
              </Link>
            </div>
          </div>

          {/* Right: Mock Dashboard Visual */}
          <div className="reveal">
            <div className="gradient-border-card relative overflow-hidden">
              {/* Mock header bar */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-3 text-xs text-neutral-600 font-mono">maat.reichelyra.com</span>
              </div>

              {/* Mock UI content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-neutral-300">{t("maat.mockui.title")}</div>
                  <div className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                    {t("maat.mockui.status")}
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-neutral-500 mb-1">
                      <span>{t("maat.mockui.compliance")}</span>
                      <span>94%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[94%] bg-gradient-to-r from-gold to-gold-light rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-neutral-500 mb-1">
                      <span>{t("maat.mockui.risk")}</span>
                      <span>12%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[12%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-neutral-500 mb-1">
                      <span>{t("maat.mockui.contracts")}</span>
                      <span>847</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[78%] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Mini cards */}
                <div className="grid grid-cols-3 gap-3 pt-4">
                  <div className="bg-white/[0.02] rounded-lg p-3 text-center border border-white/5">
                    <div className="text-lg font-bold text-gold">24</div>
                    <div className="text-[10px] text-neutral-600">{t("maat.mockui.jurisdictions")}</div>
                  </div>
                  <div className="bg-white/[0.02] rounded-lg p-3 text-center border border-white/5">
                    <div className="text-lg font-bold text-blue-400">99.7%</div>
                    <div className="text-[10px] text-neutral-600">{t("maat.mockui.accuracy")}</div>
                  </div>
                  <div className="bg-white/[0.02] rounded-lg p-3 text-center border border-white/5">
                    <div className="text-lg font-bold text-emerald-400">3.2s</div>
                    <div className="text-[10px] text-neutral-600">{t("maat.mockui.speed")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

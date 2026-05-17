"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function About() {
  const { t } = useLocale();

  const stats = [
    { icon: "\u{1F3DB}️", value: "2025", label: t("about.stats.founded") },
    { icon: "\u{1F30D}", value: "2", label: t("about.stats.countries") },
    { icon: "⚖️", value: "LLC", label: t("about.stats.entity") },
    { icon: "\u{1F4DC}", value: "72/2017", label: t("about.stats.law") },
  ];

  const values = [
    { title: t("about.values.innovation.title"), desc: t("about.values.innovation.desc"), icon: "\u{1F4A1}" },
    { title: t("about.values.integrity.title"), desc: t("about.values.integrity.desc"), icon: "\u{1F6E1}️" },
    { title: t("about.values.excellence.title"), desc: t("about.values.excellence.desc"), icon: "⭐" },
    { title: t("about.values.bridge.title"), desc: t("about.values.bridge.desc"), icon: "\u{1F309}" },
  ];

  return (
    <section id="about" className="py-28 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 section-divider" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="floating-badge mb-4 inline-flex">{t("about.badge")}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
            {t("about.title")}
          </h2>
          <p className="text-neutral-400 text-lg max-w-3xl mx-auto leading-relaxed">
            {t("about.description")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 reveal">
          {stats.map((stat, i) => (
            <div key={i} className="gradient-border-card text-center hover-lift">
              <div className="text-3xl mb-3"><span aria-hidden="true">{stat.icon}</span></div>
              <div className="text-xl font-bold text-gold mb-1">{stat.value}</div>
              <div className="text-sm text-neutral-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="reveal">
          <h3 className="text-2xl font-bold text-center mb-10 text-neutral-200">{t("about.valuesTitle")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div key={i} className="glass-card p-6 flex items-start gap-4">
                <div className="icon-box text-2xl"><span aria-hidden="true">{value.icon}</span></div>
                <div>
                  <h4 className="font-semibold text-neutral-200 mb-2">{value.title}</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

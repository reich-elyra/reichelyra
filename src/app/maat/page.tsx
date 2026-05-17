import Link from "next/link";
import type { Metadata } from "next";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  productJsonLd,
  webPageJsonLd,
} from "@/lib/structured-data";

const SITE_URL = "https://reichelyra.com";
const PAGE_URL = `${SITE_URL}/maat`;

export const metadata: Metadata = {
  title: "MAAT Platform — AI-Powered Legal Intelligence",
  description:
    "MAAT is Reich Elyra's flagship AI-driven legal technology platform. Intelligent contract analysis, automated regulatory compliance, jurisdictional risk scoring, and predictive litigation analytics for cross-border enterprises.",
  alternates: { canonical: "/maat" },
  openGraph: {
    title: "MAAT Platform — AI-Powered Legal Intelligence | Reich Elyra",
    description:
      "Where ancient wisdom meets modern intelligence. MAAT applies frontier AI to law, compliance, and cross-border governance across Egypt and the EU.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MAAT Platform" }],
  },
  robots: { index: true, follow: true },
};

// ---------------------------------------------------------------------------
// Page content — hardcoded EN for server-rendered static export.
// (The homepage MaatProject section remains the locale-aware version.)
// ---------------------------------------------------------------------------

interface Capability {
  title: string;
  description: string;
}

interface UseCase {
  name: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface Faq {
  question: string;
  answer: string;
}

const CAPABILITIES: ReadonlyArray<Capability> = [
  {
    title: "Contract Intelligence",
    description:
      "Extract obligations, parties, key dates, and risk clauses from contracts in seconds. Trained on hundreds of thousands of cross-border commercial agreements.",
  },
  {
    title: "Regulatory Compliance Engine",
    description:
      "Live monitoring of Egyptian Investment Law 72/2017, GDPR, MiCA, and EU directives — with automated alerts when changes affect your portfolio.",
  },
  {
    title: "Jurisdictional Risk Scoring",
    description:
      "Quantitative risk model mapping enforcement patterns, regulator behavior, and dispute outcomes across 24 jurisdictions.",
  },
  {
    title: "Predictive Litigation Analytics",
    description:
      "Forecast dispute outcomes, suggest settlement ranges, and surface precedent — grounded in real case law, not pattern-matched fluff.",
  },
];

const USE_CASES: ReadonlyArray<UseCase> = [
  {
    name: "In-house counsel at multinationals",
    description: "Review hundreds of vendor contracts a quarter without missing a clause or a deadline.",
  },
  {
    name: "Cross-border M&A advisors",
    description: "Run due diligence on Egyptian and EU targets in parallel — same workspace, same risk model.",
  },
  {
    name: "Compliance and RegTech teams",
    description: "Map every regulatory change to the policies, contracts, and processes it actually affects.",
  },
  {
    name: "Investment platforms and family offices",
    description: "Underwrite cross-border deals with quantified legal and regulatory risk, not gut-feel.",
  },
];

const STEPS: ReadonlyArray<Step> = [
  {
    number: "01",
    title: "Connect your document corpus",
    description:
      "Securely ingest contracts, policies, and case files from your existing systems — DMS, email, SharePoint, or upload directly.",
  },
  {
    number: "02",
    title: "MAAT structures and indexes everything",
    description:
      "Documents are parsed, clause-mapped, entity-tagged, and indexed against the regulatory graph in under five minutes per file.",
  },
  {
    number: "03",
    title: "Query, monitor, and decide",
    description:
      "Ask natural-language questions, set up regulatory monitors, run risk scoring on new deals — all from one workspace.",
  },
];

const FAQS: ReadonlyArray<Faq> = [
  {
    question: "When will MAAT be generally available?",
    answer:
      "MAAT is in private preview with a small group of design partners. General availability is planned for 2026. Request early access to be considered for the next cohort.",
  },
  {
    question: "What jurisdictions does MAAT cover today?",
    answer:
      "The first release focuses on Egypt and the EU-27, with full coverage of Egyptian Investment Law 72/2017, GDPR, MiCA, DSA, and key sector-specific regulations. Additional jurisdictions are added quarterly.",
  },
  {
    question: "How is MAAT priced?",
    answer:
      "MAAT is sold as an annual enterprise subscription with seat-based and document-volume tiers. Contact our team for a tailored proposal — design partners receive preferential pricing.",
  },
  {
    question: "Where is the data stored?",
    answer:
      "Customer data is stored in the region of your choice (EU or MENA), encrypted at rest and in transit. MAAT supports SOC 2 controls and is being prepared for ISO 27001 audit.",
  },
  {
    question: "Does MAAT replace our legal team?",
    answer:
      "No. MAAT augments lawyers and compliance professionals — it handles the high-volume mechanical work so your team can focus on judgment, strategy, and client-facing work.",
  },
  {
    question: "Can MAAT be integrated with our existing DMS or CLM?",
    answer:
      "Yes. MAAT ships with connectors for the major DMS, CLM, and ERP systems, plus a REST API for custom integrations.",
  },
];

const STATS = [
  { value: "99.7%", label: "Contract clause accuracy" },
  { value: "24", label: "Jurisdictions supported" },
  { value: "3.2s", label: "Average analysis time" },
  { value: "12", label: "Supported languages" },
] as const;

// ---------------------------------------------------------------------------
// Structured data
// ---------------------------------------------------------------------------

const maatStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({
      name: "MAAT Platform — AI-Powered Legal Intelligence",
      description:
        "MAAT is Reich Elyra's flagship AI-driven legal technology platform for cross-border enterprises.",
      url: PAGE_URL,
    }),
    breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "MAAT Platform", url: PAGE_URL },
    ]),
    productJsonLd(),
    faqPageJsonLd(FAQS),
  ].map((obj) => {
    const { "@context": _ctx, ...rest } = obj as Record<string, unknown>;
    return rest;
  }),
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MaatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(maatStructuredData) }}
      />

      <div className="min-h-screen grid-bg relative overflow-hidden">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-gold font-semibold">
              Reich Elyra
            </Link>
            <Link
              href="/"
              className="text-sm text-neutral-400 hover:text-gold transition-colors"
            >
              &larr; Back to Home
            </Link>
          </div>
        </header>

        <div className="radial-glow-blue absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none" />

        {/* Hero */}
        <section className="relative pt-40 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <span className="floating-badge mb-6 inline-flex">
              <span className="pulse-dot" />
              Flagship Product
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-gold text-glow-gold">
              MAAT Platform
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 mb-4 font-light">
              Where Ancient Wisdom Meets Modern Intelligence
            </p>
            <p className="text-base md:text-lg text-neutral-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Named after the ancient Egyptian principle of truth, justice, and order — MAAT
              applies frontier AI to the practice of law, compliance, and cross-border
              governance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact" className="btn-primary">
                Request Early Access
              </Link>
              <Link href="/#contact" className="btn-outline">
                Talk to the Team
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-6 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-neutral-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="relative px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
                Built for the cross-border legal stack
              </h2>
              <p className="text-neutral-400 text-lg max-w-3xl mx-auto">
                Four engines, one platform — designed for enterprises operating between
                Egypt, the EU, and the wider MENA region.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {CAPABILITIES.map((cap) => (
                <article
                  key={cap.title}
                  className="gradient-border-card hover-lift"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {cap.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="relative px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gradient-gold">
              How it works
            </h2>
            <ol className="space-y-8">
              {STEPS.map((step) => (
                <li
                  key={step.number}
                  className="glass-card p-8 flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="text-5xl font-bold text-gold/40 font-mono flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Use Cases */}
        <section className="relative px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gradient-gold">
              Built for teams that operate across borders
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {USE_CASES.map((uc) => (
                <article
                  key={uc.name}
                  className="glass-card p-6"
                >
                  <h3 className="text-base font-semibold text-gold mb-2">
                    {uc.name}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {uc.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gradient-gold">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="glass-card p-6 group"
                >
                  <summary className="cursor-pointer text-foreground font-semibold list-none flex items-center justify-between gap-4">
                    <span>{faq.question}</span>
                    <span className="text-gold text-2xl leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-neutral-400 text-sm leading-relaxed mt-4">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative px-6 py-24">
          <div className="max-w-3xl mx-auto text-center glass-card p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
              Want a closer look?
            </h2>
            <p className="text-neutral-400 text-base mb-8 leading-relaxed">
              Request early access and the MAAT team will walk you through a live demo on
              your own documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact" className="btn-primary">
                Request Early Access
              </Link>
              <Link href="/#contact" className="btn-outline">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative px-6 py-10 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} Reich Elyra. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-gold transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-gold transition-colors">
                Terms
              </Link>
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

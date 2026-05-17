import Link from "next/link";
import type { Metadata } from "next";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/structured-data";

const SITE_URL = "https://reichelyra.com";
const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "About Reich Elyra",
  description:
    "Reich Elyra is an Egyptian limited liability company registered under Investment Law 72/2017, founded by Ahmed Madi Farag Zeidan to bridge AI, LegalTech, and cross-border investment between Egypt and Spain.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Reich Elyra | Founded in Cairo, Building for the World",
    description:
      "How Reich Elyra came to be, the founder's story, and the principles that guide the company across AI, LegalTech, and investment.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Reich Elyra" }],
  },
  robots: { index: true, follow: true },
};

interface Principle {
  title: string;
  description: string;
}

interface Pillar {
  label: string;
  value: string;
}

const PRINCIPLES: ReadonlyArray<Principle> = [
  {
    title: "Relentless Innovation",
    description:
      "We push the boundaries of what technology can achieve, combining cutting-edge AI with deep domain expertise to create solutions that didn't exist before.",
  },
  {
    title: "Uncompromising Integrity",
    description:
      "Every decision we make is grounded in transparency, ethical governance, and full regulatory compliance across all jurisdictions we operate in.",
  },
  {
    title: "Operational Excellence",
    description:
      "We deliver enterprise-grade quality in everything we build — from code architecture to client relationships — setting the standard for our industry.",
  },
  {
    title: "Bridging Worlds",
    description:
      "We connect Egypt and Europe through technology and investment, creating pathways that benefit businesses, economies, and communities on both sides.",
  },
];

const PILLARS: ReadonlyArray<Pillar> = [
  { label: "Founded", value: "2025" },
  { label: "Headquarters", value: "Maadi, Cairo" },
  { label: "Legal Form", value: "Egyptian LLC" },
  { label: "Regulator", value: "Investment Law 72/2017" },
];

const aboutStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageJsonLd({
      name: "About Reich Elyra",
      description:
        "Egyptian investment and technology company founded by Ahmed Madi Farag Zeidan.",
      url: PAGE_URL,
    }),
    breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "About", url: PAGE_URL },
    ]),
    organizationJsonLd(),
  ].map((obj) => {
    const { "@context": _ctx, ...rest } = obj as Record<string, unknown>;
    return rest;
  }),
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutStructuredData) }}
      />

      <div className="min-h-screen grid-bg relative overflow-hidden">
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

        <div className="radial-glow absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none" />

        {/* Hero */}
        <section className="relative pt-40 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="floating-badge mb-6 inline-flex">
              <span className="pulse-dot" />
              Who We Are
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-gold text-glow-gold">
              About Reich Elyra
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
              An Egyptian limited liability company at the intersection of artificial
              intelligence, legal technology, and cross-border investment — building from
              Cairo, with horizons across the Mediterranean.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="relative px-6 pb-20">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {PILLARS.map((p) => (
              <div key={p.label} className="glass-card p-5 text-center">
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
                  {p.label}
                </div>
                <div className="text-base font-semibold text-gold">{p.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="relative px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-12 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Our story
              </h2>
              <p className="text-neutral-300 leading-relaxed">
                Reich Elyra was founded with a clear thesis: the next decade of value
                creation between MENA and Europe will be built by companies that take both
                regulation and technology equally seriously — not as separate disciplines,
                but as a single, unified practice.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                We are an Egyptian limited liability company registered under Investment
                Law No. 72/2017, with operations rooted in Maadi, Cairo and a deliberate
                outlook toward Spain and the wider European Union. Our work spans AI
                infrastructure, LegalTech platforms, cross-border investment advisory, and
                enterprise software.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                Everything we build reflects a single principle: enterprise-grade
                engineering, applied to problems that genuinely matter.
              </p>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="relative px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="gradient-border-card">
              <div className="text-xs uppercase tracking-wider text-gold mb-3">
                Founder
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ahmed Madi Farag Zeidan
              </h2>
              <p className="text-neutral-400 text-sm mb-6">
                Founder &amp; Managing Director, Reich Elyra LLC
              </p>
              <div className="space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  Ahmed founded Reich Elyra to channel two decades of accumulated insight
                  across technology and cross-border business into a single operating
                  platform. The company is structured to deliver on a long-held conviction:
                  that thoughtful application of AI to the practice of law, compliance, and
                  investment can compress decades of operational friction into months.
                </p>
                <p>
                  Under his leadership, Reich Elyra has set out to make Egyptian
                  engineering and regulatory expertise visible on the world stage — through
                  products like the MAAT platform, through cross-border investment
                  advisory, and through a disciplined commitment to building things that
                  last.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="relative px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gradient-gold">
              Our core principles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {PRINCIPLES.map((p) => (
                <article key={p.title} className="gradient-border-card hover-lift">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {p.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {p.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 py-20">
          <div className="max-w-3xl mx-auto text-center glass-card p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gradient-gold">
              Work with us
            </h2>
            <p className="text-neutral-400 mb-8 leading-relaxed">
              Whether you're exploring a partnership, an investment opportunity, or a pilot
              of one of our platforms — the fastest path is a short conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact" className="btn-primary">
                Contact the Team
              </Link>
              <Link href="/maat" className="btn-outline">
                Explore MAAT
              </Link>
            </div>
          </div>
        </section>

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

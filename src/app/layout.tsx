import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { homepageStructuredData } from "@/lib/structured-data";

// ---------------------------------------------------------------------------
// Global SEO Metadata
// ---------------------------------------------------------------------------

const SITE_URL = "https://reichelyra.com";

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────
  title: {
    default: "Reich Elyra | AI, LegalTech & Investment — Egypt & Spain",
    template: "%s | Reich Elyra",
  },
  description:
    "Reich Elyra is an Egyptian investment and technology company specializing in Artificial Intelligence, LegalTech, SaaS platforms, cloud infrastructure, and cross-border innovation between Egypt and Spain.",
  keywords: [
    "Reich Elyra",
    "AI company Egypt",
    "LegalTech Egypt",
    "artificial intelligence",
    "legal technology",
    "investment technology",
    "cross-border investment Egypt Spain",
    "SaaS platforms",
    "cloud infrastructure",
    "enterprise software",
    "MAAT platform",
    "AI-powered legal intelligence",
    "digital transformation",
    "regulatory compliance",
    "RegTech",
    "Egyptian tech company",
    "technology consulting",
    "machine learning",
    "contract analysis AI",
    "compliance monitoring",
  ],
  authors: [{ name: "Reich Elyra", url: SITE_URL }],
  creator: "Reich Elyra",
  publisher: "Reich Elyra",

  // ── Canonical & Alternates ────────────────────────────────────────────
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "ar": "/?lang=ar",
    },
  },

  // ── OpenGraph ─────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG", "es_ES"],
    url: SITE_URL,
    siteName: "Reich Elyra",
    title: "Reich Elyra | AI, LegalTech & Investment — Egypt & Spain",
    description:
      "Egyptian investment and technology company pioneering AI, LegalTech, and cross-border innovation. Building intelligent systems that bridge continents.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reich Elyra — AI, LegalTech & Investment",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Reich Elyra | AI, LegalTech & Investment",
    description:
      "Egyptian investment and technology company pioneering AI, LegalTech, and cross-border innovation between Egypt and Spain.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Reich Elyra — AI, LegalTech & Investment",
      },
    ],
    // Uncomment when Twitter/X account is created:
    // site: "@reichelyra",
    // creator: "@reichelyra",
  },

  // ── Robots / Indexing ─────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification ───────────────────────────────────────────────────────
  verification: {
    google: "5ltQ1XNm6eu6fvFZOMZKbR-Ntnh-qc_m1TnSxsjJbSY",
  },

  // ── Icons ─────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.png",
  },

  // ── Other ─────────────────────────────────────────────────────────────
  category: "technology",
};

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ── Resource hints ────────────────────────────────────────── */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* ── JSON-LD Structured Data ───────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homepageStructuredData()),
          }}
        />
      </head>
      <body className="noise-overlay">
        <Analytics />
        {children}
      </body>
    </html>
  );
}

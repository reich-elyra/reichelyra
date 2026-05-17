import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import Providers from "@/components/Providers";
import { homepageStructuredData } from "@/lib/structured-data";

// ---------------------------------------------------------------------------
// Fonts — self-hosted via next/font (non-blocking, instant)
// ---------------------------------------------------------------------------

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-arabic",
  preload: false, // Loaded on Arabic locale only
});

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
    other: {
      "msvalidate.01": "9AD443EE49AB5ED312B22A7A9706273D",
    },
  },

  // ── Icons ─────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.png",
  },

  // ── PWA Manifest ──────────────────────────────────────────────────────
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Reich Elyra",
    statusBarStyle: "black-translucent",
  },

  // ── Other ─────────────────────────────────────────────────────────────
  category: "technology",
};

// Theme color for browser chrome (mobile address bar)
export const viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${ibmPlexArabic.variable}`}
    >
      <head>
        {/* ── Resource hints ────────────────────────────────────────── */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

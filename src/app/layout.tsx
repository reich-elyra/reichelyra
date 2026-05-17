import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "Reich Elyra | AI, LegalTech & Investment",
  description:
    "Reich Elyra is an Egyptian investment and technology company specializing in Artificial Intelligence, LegalTech, Infrastructure, SaaS platforms, and cross-border innovation between Egypt and Spain.",
  keywords: [
    "Reich Elyra",
    "AI",
    "LegalTech",
    "Investment",
    "Egypt",
    "Technology",
    "SaaS",
    "Infrastructure",
    "MAAT",
    "Enterprise Software",
  ],
  authors: [{ name: "Reich Elyra" }],
  creator: "Reich Elyra",
  publisher: "Reich Elyra",
  metadataBase: new URL("https://reichelyra.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_EG",
    url: "https://reichelyra.com",
    siteName: "Reich Elyra",
    title: "Reich Elyra | AI, LegalTech & Investment",
    description:
      "Egyptian investment and technology company pioneering AI, LegalTech, and cross-border innovation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reich Elyra - Technology & Investment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reich Elyra | AI, LegalTech & Investment",
    description:
      "Egyptian investment and technology company pioneering AI, LegalTech, and cross-border innovation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
      </head>
      <body className="noise-overlay">
        <Analytics />
        {children}
      </body>
    </html>
  );
}

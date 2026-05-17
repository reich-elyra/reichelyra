/**
 * JSON-LD structured data generators for SEO.
 *
 * Each function returns a plain object conforming to schema.org types.
 * Render via <script type="application/ld+json"> in layout or page head.
 */

const SITE_URL = "https://reichelyra.com";
const COMPANY = "Reich Elyra";
const LOGO_URL = `${SITE_URL}/logo.png`;

// ---------------------------------------------------------------------------
// Organization
// ---------------------------------------------------------------------------

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY,
    legalName: "Reich Elyra LLC",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/og-image.png`,
    description:
      "Egyptian investment and technology company specializing in Artificial Intelligence, LegalTech, and cross-border innovation between Egypt and Spain.",
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      name: "Reich Elyra",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Maadi, Cairo",
      addressCountry: "EG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@reichelyra.com",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic", "Spanish"],
    },
    sameAs: [
      // Add social profiles when available:
      // "https://linkedin.com/company/reichelyra",
      // "https://twitter.com/reichelyra",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Legal Technology",
      "Cross-Border Investment",
      "Cloud Infrastructure",
      "SaaS Platforms",
      "Enterprise Software",
      "AI-Powered Legal Intelligence",
      "Digital Transformation",
      "Regulatory Compliance",
    ],
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Spain" },
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
  };
}

// ---------------------------------------------------------------------------
// WebSite (enables Google sitelinks search box)
// ---------------------------------------------------------------------------

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: COMPANY,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["en", "ar"],
    // SearchAction omitted — site has no search functionality
  };
}

// ---------------------------------------------------------------------------
// WebPage (per-page metadata)
// ---------------------------------------------------------------------------

interface WebPageParams {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
}

export function webPageJsonLd({
  name,
  description,
  url,
  dateModified = "2026-05-17",
}: WebPageParams): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    dateModified,
    inLanguage: "en",
  };
}

// ---------------------------------------------------------------------------
// Services (ProfessionalService for each offering)
// ---------------------------------------------------------------------------

interface ServiceDef {
  name: string;
  description: string;
  slug: string;
}

const SERVICES: ServiceDef[] = [
  {
    name: "AI Solutions",
    description:
      "Custom artificial intelligence systems, machine learning models, and intelligent automation for enterprise operations.",
    slug: "ai",
  },
  {
    name: "LegalTech Platforms",
    description:
      "AI-powered legal intelligence platforms for compliance monitoring, contract analysis, and regulatory technology.",
    slug: "legaltech",
  },
  {
    name: "Investment Advisory",
    description:
      "Cross-border investment advisory services connecting Egyptian and Spanish markets with strategic capital deployment.",
    slug: "investment",
  },
  {
    name: "Cloud Infrastructure",
    description:
      "Scalable cloud infrastructure solutions, data center operations, and enterprise IT architecture services.",
    slug: "infrastructure",
  },
  {
    name: "SaaS Platforms",
    description:
      "End-to-end SaaS product development, deployment, and management for enterprise-grade software solutions.",
    slug: "saas",
  },
  {
    name: "Strategic Consulting",
    description:
      "Technology strategy consulting, digital transformation roadmaps, and enterprise innovation advisory.",
    slug: "consulting",
  },
];

export function servicesJsonLd(): Record<string, unknown>[] {
  return SERVICES.map((svc) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service-${svc.slug}`,
    name: svc.name,
    description: svc.description,
    url: `${SITE_URL}/#services`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["Egypt", "Spain", "Middle East", "Europe"],
    serviceType: svc.name,
  }));
}

// ---------------------------------------------------------------------------
// Product (MAAT Platform — flagship)
// ---------------------------------------------------------------------------

export function productJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#maat`,
    name: "MAAT Platform",
    description:
      "AI-Powered Legal Intelligence platform for compliance monitoring, risk assessment, and contract management.",
    url: `${SITE_URL}/#maat`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      description: "Contact for enterprise pricing",
    },
    creator: { "@id": `${SITE_URL}/#organization` },
    featureList: [
      "AI-Powered Compliance Monitoring",
      "Risk Assessment Dashboard",
      "Contract Analysis Engine",
      "Regulatory Intelligence",
      "Multi-jurisdiction Support",
    ],
  };
}

// ---------------------------------------------------------------------------
// FAQPage (for product/help pages)
// ---------------------------------------------------------------------------

interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageJsonLd(items: ReadonlyArray<FaqItem>): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList (for sub-pages)
// ---------------------------------------------------------------------------

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(
  items: BreadcrumbItem[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// Aggregate: all homepage structured data in one array
// ---------------------------------------------------------------------------

export function homepageStructuredData(): Record<string, unknown> {
  // Strip per-item @context — the @graph wrapper provides it once.
  const stripContext = (obj: Record<string, unknown>): Record<string, unknown> => {
    const { "@context": _ctx, ...rest } = obj;
    return rest;
  };

  const items = [
    organizationJsonLd(),
    websiteJsonLd(),
    webPageJsonLd({
      name: "Reich Elyra | AI, LegalTech & Investment",
      description:
        "Egyptian investment and technology company specializing in Artificial Intelligence, LegalTech, and cross-border innovation between Egypt and Spain.",
      url: SITE_URL,
    }),
    productJsonLd(),
    ...servicesJsonLd(),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": items.map(stripContext),
  };
}

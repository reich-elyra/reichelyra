import Link from "next/link";
import type { Metadata } from "next";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Reich Elyra privacy policy — how we collect, use, and safeguard your personal data under Egyptian Investment Law No. 72/2017.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Reich Elyra",
    description:
      "How Reich Elyra collects, uses, and protects your data.",
    url: "https://reichelyra.com/privacy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const privacyStructuredData = [
  webPageJsonLd({
    name: "Privacy Policy — Reich Elyra",
    description:
      "Reich Elyra privacy policy — how we collect, use, and safeguard your personal data.",
    url: "https://reichelyra.com/privacy",
  }),
  breadcrumbJsonLd([
    { name: "Home", url: "https://reichelyra.com" },
    { name: "Privacy Policy", url: "https://reichelyra.com/privacy" },
  ]),
];

export default function PrivacyPolicy() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyStructuredData),
        }}
      />
    <div className="min-h-screen grid-bg relative overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-gold font-semibold">Reich Elyra</a>
          <a href="/" className="text-sm text-neutral-400 hover:text-gold transition-colors">&larr; Back to Home</a>
        </div>
      </header>
      <div className="radial-glow absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none" />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-gold transition-colors mb-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-gradient-gold text-4xl md:text-5xl font-bold mb-4 text-glow-gold">
              Privacy Policy
            </h1>
            <p className="text-text-secondary text-sm">
              Last updated: May 2026
            </p>
          </div>

          {/* Content */}
          <div className="glass-card p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Introduction
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                Reich Elyra LLC (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;),
                registered under Egyptian Investment Law No. 72/2017, is
                committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you visit our website reichelyra.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Information We Collect
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                We may collect information about you in a variety of ways:
              </p>
              <ul className="list-disc list-inside text-text-secondary text-sm leading-relaxed space-y-2 ml-2">
                <li>
                  <strong className="text-foreground">Personal Data:</strong>{" "}
                  Name, email address, phone number, and other contact details
                  you voluntarily provide through our contact forms.
                </li>
                <li>
                  <strong className="text-foreground">Usage Data:</strong>{" "}
                  Browser type, operating system, pages visited, time spent, and
                  referring URLs collected automatically through analytics tools.
                </li>
                <li>
                  <strong className="text-foreground">
                    Cookies and Tracking:
                  </strong>{" "}
                  We use cookies and similar technologies to enhance your
                  browsing experience and analyze site traffic.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-text-secondary text-sm leading-relaxed space-y-2 ml-2">
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve our website and services</li>
                <li>To send periodic communications related to our services</li>
                <li>To comply with legal obligations under Egyptian law</li>
                <li>To detect and prevent fraud or unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Cookies
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                Our website uses cookies to distinguish you from other users.
                This helps us provide you with a good experience and allows us to
                improve our site. You can set your browser to refuse all or some
                cookies, or to alert you when websites set or access cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Third-Party Services
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                We may employ third-party companies and services to facilitate
                our operations, provide analytics, or assist us in analyzing how
                our site is used. These third parties have access to your
                information only to perform these tasks on our behalf and are
                obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Data Security
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                We use administrative, technical, and physical security measures
                to protect your personal information. While we have taken
                reasonable steps to secure the information you provide to us, no
                method of transmission over the Internet or electronic storage is
                100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Your Rights
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                Depending on your location and applicable law, you may have the
                right to:
              </p>
              <ul className="list-disc list-inside text-text-secondary text-sm leading-relaxed space-y-2 ml-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Changes to This Policy
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Contact Us
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                If you have questions about this Privacy Policy, please contact
                us:
              </p>
              <div className="mt-3 text-text-secondary text-sm space-y-1">
                <p>
                  <strong className="text-foreground">Reich Elyra LLC</strong>
                </p>
                <p>Maadi, Cairo, Egypt</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@reichelyra.com"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    info@reichelyra.com
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a
                    href="https://reichelyra.com"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    reichelyra.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

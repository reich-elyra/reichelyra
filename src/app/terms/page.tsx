import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Reich Elyra",
  description: "Reich Elyra terms of service - legal terms governing the use of our services.",
};

export default function TermsOfService() {
  return (
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
              Terms of Service
            </h1>
            <p className="text-text-secondary text-sm">
              Last updated: May 2026
            </p>
          </div>

          {/* Content */}
          <div className="glass-card p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Agreement to Terms
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                By accessing or using the website reichelyra.com operated by
                Reich Elyra LLC, registered under Egyptian Investment Law
                No. 72/2017, you agree to be bound by these Terms of Service. If
                you do not agree to all of these terms, do not use this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Use of the Website
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                You agree to use this website only for lawful purposes and in
                accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside text-text-secondary text-sm leading-relaxed space-y-2 ml-2">
                <li>
                  Use the website in any way that violates applicable Egyptian or
                  international law
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the website
                  or its related systems
                </li>
                <li>
                  Introduce viruses, malware, or any harmful code to the website
                </li>
                <li>
                  Reproduce, distribute, or modify any content without prior
                  written consent
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Intellectual Property
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                All content on this website, including but not limited to text,
                graphics, logos, images, software, and design elements, is the
                property of Reich Elyra LLC and is protected by Egyptian and
                international intellectual property laws. Unauthorized use of
                any content may violate copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Services Information
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                The information provided on this website regarding our services,
                including AI solutions, LegalTech, infrastructure, and SaaS
                platforms, is for general informational purposes only. It does
                not constitute a binding offer or contractual obligation. Actual
                service agreements are subject to separate contracts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Limitation of Liability
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                To the fullest extent permitted by Egyptian law, Reich Elyra LLC
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising from your use of or
                inability to use this website, even if we have been advised of
                the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Disclaimers
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                This website is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis. We make no warranties, expressed or
                implied, regarding the operation of the website or the
                information, content, or materials included therein. We do not
                warrant that the website will be uninterrupted or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Third-Party Links
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                Our website may contain links to third-party websites or
                services that are not owned or controlled by Reich Elyra LLC. We
                have no control over, and assume no responsibility for, the
                content, privacy policies, or practices of any third-party
                websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Governing Law
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                These Terms shall be governed and construed in accordance with
                the laws of the Arab Republic of Egypt. Any disputes arising
                under these Terms shall be subject to the exclusive jurisdiction
                of the Egyptian courts located in Cairo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Changes to Terms
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                We reserve the right to modify or replace these Terms at any
                time. Material changes will be posted on this page with an
                updated revision date. Your continued use of the website after
                any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. Contact Us
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                If you have questions about these Terms of Service, please
                contact us:
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
  );
}

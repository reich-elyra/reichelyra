"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";

export default function Footer() {
  const { t } = useLocale();

  const navLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.vision"), href: "#vision" },
    { label: t("nav.maat"), href: "#maat" },
    { label: t("nav.innovation"), href: "#innovation" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="bg-navy-dark pt-0 pb-8">
      <div className="gradient-line" />

      <div className="container mx-auto px-6 pt-12">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Image src="/logo.png" alt="Reich Elyra" width={32} height={32} />
            <span className="text-lg font-semibold tracking-wide text-foreground">
              REICH ELYRA
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            {t("footer.tagline")}
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Reich Elyra. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-gold transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-gold transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

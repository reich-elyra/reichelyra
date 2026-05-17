"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLocale } from "@/i18n/LocaleProvider";

const navLinks = [
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.vision", href: "#vision" },
  { key: "nav.maat", href: "#maat" },
  { key: "nav.innovation", href: "#innovation" },
  { key: "nav.contact", href: "#contact" },
];

export default function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-navy/80 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Company Name */}
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Reich Elyra Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              REICH ELYRA
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-gray-200 hover:text-amber-400 transition-colors duration-300"
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Language Switcher and Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLocale}
              className="px-3 py-1 text-sm border border-amber-400/50 rounded text-amber-400 hover:bg-amber-400/10 transition-all duration-300"
            >
              {locale === "en" ? "AR" : "EN"}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-gray-200 transition-transform duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-200 transition-opacity duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-200 transition-transform duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="backdrop-blur-xl bg-navy/90 border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-gray-200 hover:text-amber-400 transition-colors duration-300 py-2"
            >
              {t(link.key)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

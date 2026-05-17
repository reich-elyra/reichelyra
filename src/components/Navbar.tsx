"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLocale } from "@/i18n/LocaleProvider";

const navLinks = [
  { key: "nav.about", href: "#about", id: "about" },
  { key: "nav.services", href: "#services", id: "services" },
  { key: "nav.vision", href: "#vision", id: "vision" },
  { key: "nav.maat", href: "#maat", id: "maat" },
  { key: "nav.innovation", href: "#innovation", id: "innovation" },
  { key: "nav.contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) => document.getElementById(link.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "ar" : "en");
  }, [locale, setLocale]);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl bg-background/80 shadow-[0_1px_0_rgba(201,168,76,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-3 group"
            >
              <Image
                src="/logo.png"
                alt="Reich Elyra"
                width={36}
                height={36}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-lg font-bold tracking-wider text-gradient-gold">
                REICH ELYRA
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md ${
                    activeSection === link.id
                      ? "text-gold"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {t(link.key)}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                  )}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLocale}
                className="px-3 py-1.5 text-xs font-semibold tracking-wider border border-gold/30 rounded-full text-gold hover:bg-gold/10 transition-all duration-300"
              >
                {locale === "en" ? "عربي" : "EN"}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <span
                  className={`absolute block w-5 h-0.5 bg-neutral-200 transition-all duration-300 ${
                    mobileOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute block w-5 h-0.5 bg-neutral-200 transition-all duration-300 ${
                    mobileOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`absolute block w-5 h-0.5 bg-neutral-200 transition-all duration-300 ${
                    mobileOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-45 h-full w-72 bg-navy/95 backdrop-blur-2xl border-l border-white/5 transform transition-transform duration-500 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 45 }}
      >
        <div className="flex flex-col pt-24 px-6 gap-2">
          {navLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => handleNavClick(link.href)}
              className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                activeSection === link.id
                  ? "text-gold bg-gold/10"
                  : "text-neutral-300 hover:text-gold hover:bg-white/5"
              }`}
            >
              {t(link.key)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

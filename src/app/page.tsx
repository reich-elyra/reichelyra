"use client";

import { useEffect } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import useReveal from "@/lib/useReveal";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import Vision from "@/components/Vision";
import MaatProject from "@/components/MaatProject";
import Innovation from "@/components/Innovation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const { locale, dir } = useLocale();
  useReveal();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.body.style.fontFamily =
      dir === "rtl"
        ? "var(--font-ibm-arabic), 'Noto Sans Arabic', sans-serif"
        : "var(--font-inter), system-ui, sans-serif";
  }, [locale, dir]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Partners />
        <Vision />
        <MaatProject />
        <Innovation />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

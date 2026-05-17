"use client";

import { LocaleProvider } from "@/i18n/LocaleProvider";
import CookieBanner from "@/components/CookieBanner";

/**
 * Client-side providers wrapper.
 *
 * Wraps the entire app with:
 *  - LocaleProvider (i18n context)
 *  - CookieBanner (renders only on first visit when GA is configured)
 *
 * Mounted in the root layout so all pages (/, /privacy, /terms, etc.)
 * share the same locale context and show the consent banner.
 */
interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <LocaleProvider>
      {children}
      <CookieBanner />
    </LocaleProvider>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { grantConsent, denyConsent, isGAEnabled } from "@/lib/gtag";

/**
 * GDPR-compliant cookie consent banner.
 *
 * - Shows on first visit (no localStorage entry).
 * - Calls gtag('consent', 'update', ...) on user choice.
 * - Persists choice in localStorage ('cookie-consent' = 'granted' | 'denied').
 * - Returns null if user has already chosen, or if GA is not configured.
 */

const STORAGE_KEY = "cookie-consent";
type ConsentChoice = "granted" | "denied";

function readStoredChoice(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

function writeStoredChoice(choice: ConsentChoice): void {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // localStorage unavailable (private mode, etc.) — fail silently.
  }
}

export default function CookieBanner(): React.ReactNode {
  const { t, dir } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show the banner if GA is configured AND user has not chosen yet.
    if (!isGAEnabled()) return;
    if (readStoredChoice() === null) {
      setVisible(true);
    }
  }, []);

  function handleAccept(): void {
    writeStoredChoice("granted");
    grantConsent();
    setVisible(false);
  }

  function handleDecline(): void {
    writeStoredChoice("denied");
    denyConsent();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-body"
      dir={dir}
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6 animate-fade-in-up"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-navy/95 backdrop-blur-xl shadow-2xl shadow-black/50">
        <div className="p-5 sm:p-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="space-y-1.5">
            <h2
              id="cookie-banner-title"
              className="text-sm font-semibold text-foreground"
            >
              {t("cookies.title")}
            </h2>
            <p
              id="cookie-banner-body"
              className="text-xs text-text-muted leading-relaxed"
            >
              {t("cookies.body")}{" "}
              <Link
                href="/privacy"
                className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
              >
                {t("cookies.learnMore")}
              </Link>
            </p>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handleDecline}
              className="px-4 py-2 text-xs font-medium text-text-muted hover:text-foreground border border-white/10 hover:border-white/20 rounded-lg transition-colors"
            >
              {t("cookies.decline")}
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-2 text-xs font-semibold text-navy bg-gold hover:bg-gold-light rounded-lg transition-colors"
            >
              {t("cookies.accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID, isGAEnabled, pageView } from "@/lib/gtag";

/**
 * Google Analytics 4 loader.
 *
 * - Renders the gtag.js <Script> tags (afterInteractive for perf).
 * - Tracks page views on client-side route changes.
 * - Initialises consent-mode defaults (denied until user opts in).
 * - Returns null when NEXT_PUBLIC_GA_MEASUREMENT_ID is unset.
 */
export default function Analytics(): React.ReactNode {
  // Track page views on popstate (back/forward browser navigation).
  // Full navigations between static pages (/, /privacy, /terms) are
  // handled by the initial gtag('config', ...) on each HTML document.
  useEffect(() => {
    if (!isGAEnabled()) return;

    function handleRouteChange(): void {
      pageView(window.location.pathname);
    }

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  if (!isGAEnabled()) {
    return null;
  }

  return (
    <>
      {/* Consent-mode defaults — analytics denied until explicit grant. */}
      <Script id="ga-consent-defaults" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>

      {/* Load gtag.js asynchronously after hydration. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />

      {/* Initialise GA4 measurement. */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}

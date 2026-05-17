"use client";

import { useEffect } from "react";

/**
 * Registers /sw.js on mount (client-only).
 *
 * Service workers provide:
 *  - Offline support (cached pages still load when offline)
 *  - Faster repeat visits (static assets served from cache)
 *  - "Install to home screen" capability on mobile (with manifest)
 *
 * Skipped in development to avoid stale cache during HMR.
 */
export default function ServiceWorkerRegistration(): null {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    const register = (): void => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {
          // Registration failed — silently ignore (offline support is progressive enhancement).
        });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }
  }, []);

  return null;
}

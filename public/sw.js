/**
 * Reich Elyra — Service Worker
 *
 * Strategy:
 *  - Cache-first for hashed static assets (/_next/static/*).
 *  - Network-first with cache fallback for HTML pages.
 *  - Bypass cache for analytics, API calls, and POST requests.
 *
 * Updates: bump CACHE_VERSION to invalidate old caches.
 */

const CACHE_VERSION = "v1";
const STATIC_CACHE = `reich-static-${CACHE_VERSION}`;
const PAGE_CACHE = `reich-pages-${CACHE_VERSION}`;
const PRECACHE_URLS = ["/", "/privacy", "/terms", "/manifest.webmanifest"];

// ─────────────────────────────────────────────────────────────────────────
// Install — precache critical pages
// ─────────────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGE_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// ─────────────────────────────────────────────────────────────────────────
// Activate — purge old caches
// ─────────────────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.endsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ─────────────────────────────────────────────────────────────────────────
// Fetch — routing strategy
// ─────────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Bypass: non-GET, cross-origin (analytics, etc.), and POST endpoints
  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  // Cache-first for hashed static assets (immutable)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Network-first for HTML pages
  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(networkFirst(request, PAGE_CACHE));
    return;
  }
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Last resort: offline fallback to homepage
    return caches.match("/");
  }
}

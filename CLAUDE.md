# Reich Elyra — Project Reference

## Stack

- **Framework**: Next.js 16 with Turbopack, `output: "export"` (static HTML)
- **Language**: TypeScript 5, React 19
- **Styling**: Tailwind CSS 4 (`@theme inline`), globals.css design tokens
- **Fonts**: `next/font/google` — Inter (Latin) + IBM Plex Sans Arabic (self-hosted, non-blocking)
- **i18n**: Custom React Context (`LocaleProvider`) — English + Arabic (RTL)
- **Testing**: Vitest 3 + Testing Library (jsdom)
- **Deployment**: Cloudflare Pages (`npx wrangler pages deploy out`) + workspace at Replit
- **Analytics**: Google Analytics 4 (`G-66BKZ2ZEJN`) via `next/script` + consent mode + cookie banner
- **PWA**: `/manifest.webmanifest` + `/sw.js` service worker (offline support, install to home screen)
- **Contact**: Formspree (endpoint via env var) — falls back to mailto when unconfigured
- **SEO**: JSON-LD `@graph` (14 valid items), sitemap.xml, robots.txt (blocks AI crawlers)
- **Search Indexing**: Google Search Console + Bing Webmaster Tools (both verified, sitemap submitted)
- **Security**: HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy via `public/_headers`
- **DNS**: DNSSEC enabled (Cloudflare default)

## Commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build → out/
npm run lint         # ESLint (flat config)
npx vitest run       # Run tests
npx wrangler pages deploy out --project-name=reichelyra  # Deploy
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Formspree form URL (e.g. `https://formspree.io/f/xAbCdEfG`) |
| `NEXT_PUBLIC_SENTRY_DSN` | Optional Sentry browser DSN — when set, `errorLogger` reports to Sentry |

Copy `.env.example` → `.env.local` for local dev. Set in Cloudflare Pages dashboard for production.

## Architecture

```
src/
  app/
    layout.tsx        — Root layout, metadata, next/font, manifest, viewport, Providers
    page.tsx          — Main SPA (all sections) — wrapped by root Providers
    globals.css       — Design system tokens + utilities
    maat/page.tsx     — MAAT product page (capabilities, use cases, FAQ, Product+FAQPage JSON-LD)
    about/page.tsx    — Company story + founder bio (Ahmed Madi Farag Zeidan)
    privacy/page.tsx  — Privacy policy (server component)
    terms/page.tsx    — Terms of service (server component)
    not-found.tsx     — Custom 404 with quick-nav links
  components/         — 16 React components (all client)
    Providers.tsx               — Wraps app with LocaleProvider + CookieBanner + SW registration
    CookieBanner.tsx            — GDPR consent banner (calls grantConsent/denyConsent)
    ServiceWorkerRegistration   — Registers /sw.js in production only
    Analytics.tsx               — GA4 loader (afterInteractive, consent-mode defaults inline)
  i18n/
    index.ts          — Translation lookup + tArray()
    LocaleProvider.tsx — Context provider with locale/dir/t/tArray (lazy init + validation)
    locales/en.json   — English translations (includes cookies block)
    locales/ar.json   — Arabic translations (includes cookies block)
  lib/
    gtag.ts           — GA4 typed utilities (pageView, event, grantConsent, denyConsent)
    structured-data.ts — JSON-LD generators (Organization, Service, Product, FAQPage, Breadcrumb)
    errorLogger.ts    — Centralized error reporting (Sentry-ready, set NEXT_PUBLIC_SENTRY_DSN)
    useReveal.ts      — IntersectionObserver scroll-reveal hook
  test/
    setup.ts          — jest-dom, IntersectionObserver + matchMedia mocks
    home.test.tsx     — Smoke test (wraps with <Providers>)
    i18n.test.ts      — EN/AR key parity check
public/
  _headers            — Cloudflare security + cache headers
  manifest.webmanifest — PWA manifest (theme: navy/gold)
  sw.js               — Service worker (network-first pages, cache-first hashed assets)
  sitemap.xml         — XML sitemap (hreflang en/ar)
  robots.txt          — Allows Google/Bing, blocks GPTBot/CCBot/Claude-Web/etc.
  favicon.svg, logo.png, og-image.png
scripts/
  copy-artifacts.mjs  — Cross-platform copy out/ → artifacts/reich-elyra/dist/public
```

## Design System

- **Background**: navy `#030712`, navy-light `#0a1628`
- **Accent**: gold `#c9a84c`, gold-light `#d4b668`
- **Text**: neutral-200/400/500/600
- **Cards**: `gradient-border-card` + `hover-lift` utilities
- **Animations**: `animate-float`, `animate-marquee`, `animate-fade-in-up`
- **Reduced motion**: Fully supported via `@media (prefers-reduced-motion: reduce)`

## Lighthouse Scores (mobile, last measured 2026-05-17)

| Metric | Score |
|--------|-------|
| Performance | 73 → improving (next/font deployed) |
| Accessibility | 96 |
| Best Practices | 96 |
| SEO | 92 |

**Core Web Vitals (all green):** LCP 0.7s · CLS 0.003 · TBT 60ms · FCP 0.7s

## Still pending (need user action)

- **Formspree form**: register at formspree.io, set `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
- **Email mailbox**: configure Google Workspace or Zoho for `info@reichelyra.com`
- **Social accounts**: LinkedIn, Twitter/X for the company — then add URLs to `structured-data.ts` `sameAs` array

## Important note

After major changes, update this file. Keep it up-to-date with the project status.
Test all bugs in all project and fix them all.

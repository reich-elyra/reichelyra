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
- **DNS — USER'S FINAL DECISION 2026-07-11 (do NOT "fix" this)**: `reichelyra.com` + `www` + `app` + `api` → A records (proxied) → `92.5.123.131` = **"Z App"** (SvelteKit, Arabic, MAAT·ZEUS platform). **Z App IS the user's main production site by explicit choice.** This Next.js repo's site lives ONLY at `reichelyra.pages.dev` (custom domains removed from the Pages project on purpose). If the apex ever serves this Next.js site again, that is a REGRESSION against the user's decision — restore the A records to `92.5.123.131`.

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

- **Email mailbox**: configure Zoho Mail (free plan) for `info@reichelyra.com` — needs domain TXT verification + MX records (`mx.zoho.com`, `mx2.zoho.com`, `mx3.zoho.com`) added in Cloudflare DNS
- **Social accounts**: LinkedIn, Twitter/X for the company — then add URLs to `structured-data.ts` `sameAs` array
- **Google Search Console**: use URL Inspection → "Request Indexing" on `https://reichelyra.com/` now that the domain fix is live, to speed up re-crawl
- **Bing Webmaster Tools**: use "Submit URL" for `https://reichelyra.com/` for the same reason

## Incident log

**2026-07-11 (final) — User decision: Z App is the main site on reichelyra.com.**
Earlier this day, `reichelyra.com` was found serving "Z App" (the user's Arabic SvelteKit platform — MAAT·ZEUS, hosted on external origin `92.5.123.131`) instead of this repo's Next.js site, and the domain was temporarily switched to the Pages deployment on the assumption this was a hijack. **The user then clarified this was wrong: Z App is intentionally the main production site.** The switch was fully reverted the same day:

1. Custom domains `reichelyra.com` + `www.reichelyra.com` **removed from the Pages project** (so Pages can never grab the apex again)
2. Apex + `www` restored as A records (proxied) → `92.5.123.131` (Z App origin)
3. `app.reichelyra.com` + `api.reichelyra.com` also point to the same origin
4. Bing Webmaster verification added at DNS level: CNAME `9AD443EE49AB5ED312B22A7A9706273D.reichelyra.com` → `verify.bing.com`

**SEO for Z App (the live site) — DONE 2026-07-11 via edge injection.** Z App's origin code is NOT in this repo (likely the Replit workspace), so SEO is injected at the Cloudflare edge by a Worker:

- **Worker**: `reichelyra-seo` (source: **`infra/seo-worker/`** in this repo) on routes `reichelyra.com/*` + `www.reichelyra.com/*`
- Injects into every HTML GET response: GA4 (`G-66BKZ2ZEJN`), `google-site-verification` + `msvalidate.01` meta tags (same tokens as before, so GSC/Bing properties stay verified), and replaces Z App's broken JSON-LD (had placeholder `z-app.example` URLs) with a correct Reich Elyra Organization+WebSite `@graph`
- Strips Z App branding from the browser tab: removes Z App's stray first `<title>Z App</title>` (every page emits two title tags — Z App's own bug), rewrites any remaining "Z App" text inside the real page-specific title to "Reich Elyra", and points `<link rel="icon">` at `/images/logo.png` (was a hand-drawn "Z" SVG). **`/images/logo.png` already exists on the Z App origin and IS the real, official Reich Elyra logo (ornate gold scarab) — confirmed by the user 2026-07-11. Never redraw/substitute a different mark; reuse this exact asset.**
- Also patches the origin's CSP header to allow `googletagmanager.com` (script-src) and `google-analytics.com` (connect-src) — without this the GA script would be blocked
- Passes through untouched: non-HTML, non-GET, websockets, robots.txt, sitemap.xml (Z App serves its own — they're fine)
- `app.` / `api.` subdomains have NO worker (avoids double-counting GA)
- To modify: edit `infra/seo-worker/src/worker.js`, then from `infra/seo-worker/` run `CLOUDFLARE_API_TOKEN=<token> npx wrangler deploy`

**Zone facts**: Zone ID `ade72e73674533771de47df5f14f0a64`, Account ID `c461f82c99d855046c6417c0c23f6be0`, Pages project `reichelyra` (deployment still live at `reichelyra.pages.dev` only).

## Important note

After major changes, update this file. Keep it up-to-date with the project status.
Test all bugs in all project and fix them all.

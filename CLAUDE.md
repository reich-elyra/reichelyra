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
- **DNS**: DNSSEC enabled (Cloudflare default). `reichelyra.com` + `www` → CNAME (proxied, flattened) → `reichelyra.pages.dev`. `app.reichelyra.com` → unrelated "Z App" (SvelteKit) on external origin `92.5.123.131` — do not touch. `api.reichelyra.com` → same Z App origin, also unrelated.

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

**2026-07-11 — Domain was serving the wrong app, site invisible to search engines.**
`reichelyra.com` and `www.reichelyra.com` had their DNS A records pointing directly at an external IP (`92.5.123.131`) hosting an unrelated SvelteKit app ("Z App"). This silently overrode the Cloudflare Pages custom domain that had been active since 2026-05-17, flipping its status to `deactivated`. Search engines (and anyone visiting the apex domain) saw Z App instead of the Reich Elyra site — despite the `reichelyra.pages.dev` deployment always being correct. Root cause of the DNS change is unknown (not made by this project's tooling).

**Fix applied:**
1. Preserved Z App by pointing it to a new subdomain: `app.reichelyra.com` → A → `92.5.123.131` (proxied)
2. Deleted the conflicting A records on `reichelyra.com` / `www.reichelyra.com`
3. Recreated them as CNAME → `reichelyra.pages.dev` (proxied, Cloudflare-flattened at the apex)
4. Re-triggered Pages custom-domain validation via the Cloudflare API (`PATCH .../pages/projects/reichelyra/domains/{name}`) — both flipped to `active` within ~1 minute
5. Verified: homepage, `/maat`, `/about`, sitemap, robots.txt, GA4 tag, GSC + Bing verification meta tags, and SSL cert (Google CA, valid to 2026-08-15) all correct on the live domain
6. `api.reichelyra.com` was left untouched — still points to the Z App origin, presumably its backend

**If `reichelyra.com` ever shows the wrong content again**: check DNS records in Cloudflare first (Zone ID `ade72e73674533771de47df5f14f0a64`) — the apex and `www` must be CNAME → `reichelyra.pages.dev`, not a raw A record to any other IP.

## Important note

After major changes, update this file. Keep it up-to-date with the project status.
Test all bugs in all project and fix them all.

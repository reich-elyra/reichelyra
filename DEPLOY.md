# Reich Elyra — Deployment Guide

## 1. Setup & Run Locally

```bash
cd reichelyra.com
npm install
npm run dev
```
Open http://localhost:3000

## 2. Build for Production

```bash
npm run build
```
This creates a static export in the `out/` folder (configured via `output: "export"` in next.config.ts).

## 3. Deploy to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Reich Elyra website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/reichelyra.com.git
git push -u origin main
```

## 4. Deploy to Cloudflare Pages

### Option A: Via Cloudflare Dashboard
1. Go to https://dash.cloudflare.com → Pages → Create a project
2. Connect your GitHub repo
3. Build settings:
   - Framework preset: Next.js (Static HTML Export)
   - Build command: `npm run build`
   - Build output directory: `out`
4. Click "Save and Deploy"

### Option B: Via CLI (Wrangler)
```bash
npm install -g wrangler
wrangler login
npx wrangler pages deploy out --project-name=reichelyra
```

## 5. Connect reichelyra.com Domain

1. In Cloudflare Dashboard → Pages → your project → Custom domains
2. Click "Set up a custom domain"
3. Enter: `reichelyra.com`
4. Also add: `www.reichelyra.com`
5. If domain is already on Cloudflare DNS, it auto-configures
6. If not, add these DNS records:
   - `CNAME reichelyra.com reichelyra.pages.dev`
   - `CNAME www reichelyra.com`
7. Enable "Always Use HTTPS" in SSL/TLS settings

## Project Structure

```
reichelyra.com/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles + Tailwind theme
│   │   ├── layout.tsx        # Root layout with SEO meta
│   │   └── page.tsx          # Main page with all sections
│   ├── components/
│   │   ├── Navbar.tsx        # Fixed nav with glassmorphism
│   │   ├── Hero.tsx          # Full-screen hero with logo
│   │   ├── About.tsx         # Company info & stats
│   │   ├── Services.tsx      # 6 service cards
│   │   ├── Vision.tsx        # Vision & Mission
│   │   ├── MaatProject.tsx   # MAAT platform showcase
│   │   ├── Innovation.tsx    # Innovation pillars
│   │   ├── Contact.tsx       # Contact section
│   │   └── Footer.tsx        # Site footer
│   ├── i18n/
│   │   ├── index.ts          # Translation system
│   │   ├── LocaleProvider.tsx # React context for locale
│   │   └── locales/
│   │       ├── en.json       # English translations
│   │       └── ar.json       # Arabic translations
│   └── lib/
│       └── useReveal.ts      # Scroll animation hook
├── public/
│   └── logo.png              # Scarab logo
├── next.config.ts            # Next.js config (static export)
├── tsconfig.json             # TypeScript config
├── postcss.config.mjs        # PostCSS config
└── package.json              # Dependencies
```

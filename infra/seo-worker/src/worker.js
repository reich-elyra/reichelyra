// SEO injection worker for reichelyra.com (Z App origin)
// Injects: GA4, Google/Bing verification meta tags, corrected JSON-LD.
// Also rebrands "Z App" -> "MAAT" everywhere it appears in the rendered
// HTML (title, meta tags, image alt text, body copy) and points the
// favicon at the real Reich Elyra logo (/images/logo.png — the one and
// only official mark; do not substitute a redrawn version here).
// Everything else (assets, APIs, websockets, non-HTML) passes through untouched.

const GA_ID = "G-66BKZ2ZEJN";

const FAVICON_HREF = "/images/logo.png";

const REBRAND_FROM = "Z App";
const REBRAND_TO = "MAAT";

function rebrand(str) {
  return str.split(REBRAND_FROM).join(REBRAND_TO);
}

// Marketing nav (Home, MAAT, Zeus, Services, Process, Contact — the
// ".mnav-inner" / ".cta" component). Z App already ships a full
// English translation at the /en prefix (verified: /en, /en/maat,
// /en/auth/login all serve real translated content with
// lang="en" dir="ltr" — this is not something we're building, only
// exposing) but the marketing nav has no visible switcher for it.
//
// IMPORTANT: this SvelteKit app hydrates client-side and wipes any
// extra nodes injected *inside* its component tree (verified: nodes
// added inside .mnav-inner vanish once JS takes over). New elements
// here are injected as a sibling of SvelteKit's mount point (at the
// very end of the document, via onDocument's `end` handler) and
// positioned with `position:fixed`, so DOM location doesn't matter
// for where they render. Verify any future change with
// `chrome --headless --dump-dom`, not curl — curl only shows
// pre-hydration SSR output.
//
// Modifying an EXISTING element's text/attributes (the .cta button
// below) is a different, safer case: this survived hydration in
// testing, unlike adding new nodes — likely because its href/text
// are static in Z App's compiled template, so hydration has no
// reactive value to re-assert over ours.
//
// Layout (2026-07-11, iterated multiple times on user feedback):
// - Login: FIRST tried repointing the existing "ابدأ مشروعك" /
//   "Start a project" nav CTA (`a.cta`) in place, since editing an
//   existing element seemed safer than adding one. **This did NOT
//   survive hydration** — verified with --dump-dom, the CTA's
//   text/href revert to the original once JS runs, because (unlike
//   the static <title>/meta/img-alt edits elsewhere in this file)
//   the CTA's label and link are driven by Z App's own i18n store —
//   Svelte re-asserts reactive bindings on hydration even for
//   elements that already existed server-side. Fixed by instead
//   hiding the original CTA (style="display:none" on `.cta` DOES
//   survive, same as the decorative-cluster hide below — it's a
//   non-reactive attribute) and adding a new floating login badge,
//   mirroring the language-switch badge on the opposite side.
// - Language switch: floating badge, top:70px, right:14px — proven
//   not to overlap the "REICH ELYRA" wordmark (first attempt at
//   top:14px did overlap it; moving below the nav row fixed it).
// - Login badge: same row, left:14px (mirrors the language switch).
// - Back: full-width bar flush to the bottom edge, button pinned to
//   the physical right with `position:absolute;right:20px` (not
//   flex+direction, which was ambiguous) so "right" means right on
//   both the Arabic and English pages, per explicit user request.
//   Matching body padding-bottom keeps it from overlapping content.
//
// Lesson for future edits: an element surviving in raw HTML (curl)
// is not enough — an EXISTING element's reactive text/attributes can
// still be silently reverted by hydration even without being
// "removed". Always confirm with --dump-dom, not just curl.
const BAR_HEIGHT = 60;

const I18N = {
  ar: { login: "تسجيل الدخول", back: "رجوع", backArrow: "→", switchTo: "English", switchLabel: "EN" },
  en: { login: "Login", back: "Back", backArrow: "←", switchTo: "العربية", switchLabel: "AR" }
};

function toggleLocalePath(pathname, lang) {
  if (lang === "en") {
    // /en -> /, /en/maat -> /maat, /en/ -> /
    const stripped = pathname.replace(/^\/en(\/|$)/, "/");
    return stripped === "//" ? "/" : stripped;
  }
  // / -> /en, /maat -> /en/maat
  return pathname === "/" ? "/en" : "/en" + pathname;
}

function langSwitchHtml(pathname, lang) {
  const t = I18N[lang];
  const href = toggleLocalePath(pathname, lang);
  return (
    `<a href="${href}" style="position:fixed;top:70px;right:14px;z-index:99999;` +
    "display:inline-flex;align-items:center;justify-content:center;" +
    "padding:8px 18px;border-radius:999px;border:1px solid rgba(201,168,76,0.4);" +
    'background:rgba(3,7,18,0.9);color:#c9a84c;font-size:13px;font-weight:700;' +
    `text-decoration:none;white-space:nowrap;box-shadow:0 2px 10px rgba(0,0,0,0.35);">${t.switchTo}</a>`
  );
}

function loginBadgeHtml(lang) {
  const t = I18N[lang];
  const href = lang === "en" ? "/en/auth/login" : "/auth/login";
  return (
    `<a href="${href}" style="position:fixed;top:70px;left:14px;z-index:99999;` +
    "display:inline-flex;align-items:center;justify-content:center;" +
    "padding:8px 20px;border-radius:999px;border:none;" +
    "background:#c9a84c;color:#030712;font-size:13px;font-weight:700;" +
    `text-decoration:none;white-space:nowrap;box-shadow:0 2px 10px rgba(0,0,0,0.35);">${t.login}</a>`
  );
}

function backBarHtml(lang) {
  const t = I18N[lang];
  return (
    '<div style="position:fixed;bottom:0;left:0;right:0;height:' +
    BAR_HEIGHT +
    "px;z-index:99999;background:#030712;border-top:1px solid rgba(201,168,76,0.25);" +
    'box-shadow:0 -8px 24px rgba(0,0,0,0.45);">' +
    '<button type="button" ' +
    "onclick=\"history.length>1?history.back():location.href='/'\" " +
    'style="position:absolute;top:50%;right:20px;transform:translateY(-50%);' +
    "display:inline-flex;align-items:center;gap:8px;" +
    "padding:10px 18px;border-radius:999px;border:1px solid rgba(201,168,76,0.4);" +
    'background:transparent;color:#c9a84c;font-size:14px;font-weight:600;cursor:pointer;">' +
    `<span>${t.backArrow}</span><span>${t.back}</span></button>` +
    "</div>"
  );
}

// Z App's own homepage hero includes a decorative, purely cosmetic
// "live status" widget (aria-hidden="true", class "cluster") showing
// fake rotating tags ("تم الإرسال" / "قيد المراجعة" / ...) next to
// the logo. The user flagged it as visual clutter — hide it. Matched
// by class name + aria-hidden rather than the volatile Svelte hash
// suffix so it survives Z App recompiling with a different hash.
function isDecorativeCluster(el) {
  const cls = (el.getAttribute("class") || "").split(/\s+/);
  return cls.includes("cluster") && el.getAttribute("aria-hidden") === "true";
}

const VERIFICATION_META =
  '<meta name="google-site-verification" content="5ltQ1XNm6eu6fvFZOMZKbR-Ntnh-qc_m1TnSxsjJbSY">' +
  '<meta name="msvalidate.01" content="9AD443EE49AB5ED312B22A7A9706273D">';

const GA_SNIPPET =
  `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>` +
  `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
  `gtag('js',new Date());gtag('config','${GA_ID}');</script>`;

// Locale-aware — the /en pages have their own correct lang="en"
// dir="ltr" markup, so structured data injected there must match
// (previously this was hardcoded Arabic and would have overridden
// English pages' own metadata with Arabic JSON-LD once the language
// switcher went live).
function structuredData(lang) {
  const isEn = lang === "en";
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://reichelyra.com/#organization",
        name: "Reich Elyra",
        alternateName: isEn ? ["Reich Elyra", "MAAT"] : ["ريخ إليرا", "MAAT"],
        url: "https://reichelyra.com",
        logo: "https://reichelyra.com/images/logo.png",
        slogan: isEn ? "We build digital civilizations." : "نبني حضارات رقمية.",
        description: isEn
          ? "Reich Elyra is an Egyptian AI, LegalTech and investment platform — the trusted marketplace for professional services."
          : "منصّة الخدمات المهنيّة في مصر — الذكاء الاصطناعي، التقنية القانونية، والاستثمار. Reich Elyra is an Egyptian AI, LegalTech and investment platform.",
        areaServed: { "@type": "Country", name: "Egypt" }
      },
      {
        "@type": "WebSite",
        "@id": "https://reichelyra.com/#website",
        url: "https://reichelyra.com",
        name: "Reich Elyra",
        publisher: { "@id": "https://reichelyra.com/#organization" },
        inLanguage: isEn ? "en" : "ar-EG",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://reichelyra.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  });
}

function withGaCsp(headers) {
  const csp = headers.get("Content-Security-Policy");
  if (!csp) return;
  let fixed = csp;
  if (!fixed.includes("googletagmanager.com")) {
    fixed = fixed.replace(
      "script-src 'self'",
      "script-src 'self' https://www.googletagmanager.com"
    );
  }
  if (!fixed.includes("google-analytics.com")) {
    fixed = fixed.replace(
      "connect-src 'self'",
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com"
    );
  }
  headers.set("Content-Security-Policy", fixed);
}

export default {
  async fetch(request) {
    const upgrade = request.headers.get("Upgrade");
    if (upgrade && upgrade.toLowerCase() === "websocket") {
      return fetch(request);
    }

    const originResponse = await fetch(request);

    const contentType = originResponse.headers.get("content-type") || "";
    if (request.method !== "GET" || !contentType.includes("text/html")) {
      return originResponse;
    }

    const response = new Response(originResponse.body, originResponse);
    withGaCsp(response.headers);

    const pathname = new URL(request.url).pathname;
    let pageLang = "ar"; // overwritten by the <html lang="..."> handler below, which
    // fires before everything else since <html> opens the document.

    let jsonLdReplaced = false;
    let titleIndex = 0;
    let hasMarketingNav = false;
    // Shared "don't touch this text" counter — covers <script>, <style>,
    // and the stray first <title>Z App</title> that gets removed below.
    let skipDocText = 0;

    function pushSkip(el) {
      skipDocText++;
      el.onEndTag(() => {
        skipDocText = Math.max(0, skipDocText - 1);
      });
    }

    return new HTMLRewriter()
      .on("html", {
        element(el) {
          pageLang = el.getAttribute("lang") === "en" ? "en" : "ar";
        }
      })
      .on("head", {
        element(el) {
          el.append(VERIFICATION_META + GA_SNIPPET, { html: true });
        }
      })
      .on("title", {
        element(el) {
          titleIndex++;
          // Z App always emits a stray first <title>Z App</title> before
          // the real, page-specific title — drop it entirely.
          if (titleIndex === 1) {
            el.remove();
            pushSkip(el);
          }
        }
      })
      .on("link", {
        element(el) {
          const rel = (el.getAttribute("rel") || "").split(/\s+/);
          if (rel.includes("icon")) {
            el.setAttribute("href", FAVICON_HREF);
            el.setAttribute("type", "image/png");
          }
        }
      })
      .on("meta", {
        element(el) {
          const content = el.getAttribute("content");
          if (content && content.includes(REBRAND_FROM)) {
            el.setAttribute("content", rebrand(content));
          }
        }
      })
      .on("img", {
        element(el) {
          const alt = el.getAttribute("alt");
          if (alt && alt.includes(REBRAND_FROM)) {
            el.setAttribute("alt", rebrand(alt));
          }
        }
      })
      .on(".mnav-inner", {
        element() {
          hasMarketingNav = true;
        }
      })
      .on("a.cta", {
        element(el) {
          // Editing this element's text/href in place does not survive
          // hydration (see the long comment above loginBadgeHtml) — hide
          // it instead; the replacement login badge is injected at
          // end-of-document below.
          el.setAttribute("style", "display:none");
        }
      })
      .on("div", {
        element(el) {
          if (isDecorativeCluster(el)) {
            el.setAttribute("style", "display:none");
          }
        }
      })
      .on("script", { element: pushSkip })
      .on("style", { element: pushSkip })
      .onDocument({
        text(chunk) {
          if (skipDocText === 0 && chunk.text.includes(REBRAND_FROM)) {
            chunk.replace(rebrand(chunk.text));
          }
        },
        end(end) {
          if (hasMarketingNav) {
            // Inline <style> here (not a body.style attribute) because
            // hasMarketingNav is only known once we've already streamed
            // past the opening <body> tag — a style block works
            // regardless of where in the document it appears.
            end.append(
              `<style>body{padding-bottom:${BAR_HEIGHT}px !important}</style>` +
                loginBadgeHtml(pageLang) +
                langSwitchHtml(pathname, pageLang) +
                backBarHtml(pageLang),
              { html: true }
            );
          }
        }
      })
      .on('script[type="application/ld+json"]', {
        element(el) {
          if (!jsonLdReplaced) {
            el.setInnerContent(structuredData(pageLang), { html: true });
            jsonLdReplaced = true;
          }
        }
      })
      .transform(response);
  }
};

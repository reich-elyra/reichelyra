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
// ".mnav-inner" / ".cta" component) is missing a login link and a
// back button. The dashboard shell (Terms, Privacy, logged-in app
// views) already has its own login button and different markup, so
// this is scoped to pages that actually have ".mnav-inner" (see
// hasMarketingNav below).
//
// IMPORTANT: this SvelteKit app hydrates client-side and wipes any
// extra nodes injected *inside* its component tree (verified: nodes
// added inside .mnav-inner vanish once JS takes over). To survive
// hydration, this floating cluster is injected as a sibling of
// SvelteKit's mount point (at the very end of the document, via
// onDocument's `end` handler) and positioned with `position:fixed`
// so its DOM location doesn't matter — bottom-center keeps it clear
// of the nav's own layout on every viewport size without needing to
// know the nav's exact height/breakpoints.
const UTILITY_CLUSTER_HTML =
  '<div style="position:fixed;bottom:18px;left:50%;transform:translateX(-50%);' +
  "z-index:99999;display:flex;align-items:center;gap:8px;padding:6px;" +
  "background:rgba(3,7,18,0.92);backdrop-filter:blur(6px);" +
  'border:1px solid rgba(201,168,76,0.3);border-radius:999px;direction:rtl;">' +
  '<button type="button" ' +
  "onclick=\"history.length>1?history.back():location.href='/'\" " +
  'aria-label="رجوع" style="display:inline-flex;align-items:center;justify-content:center;' +
  "width:36px;height:36px;border-radius:999px;border:none;" +
  'background:transparent;color:#c9a84c;font-size:18px;line-height:1;cursor:pointer;">→</button>' +
  '<a href="/auth/login" style="display:inline-flex;align-items:center;justify-content:center;' +
  "padding:8px 18px;border-radius:999px;border:none;" +
  "background:#c9a84c;color:#030712;font-size:14px;font-weight:700;" +
  'text-decoration:none;white-space:nowrap;">تسجيل الدخول</a>' +
  "</div>";

const VERIFICATION_META =
  '<meta name="google-site-verification" content="5ltQ1XNm6eu6fvFZOMZKbR-Ntnh-qc_m1TnSxsjJbSY">' +
  '<meta name="msvalidate.01" content="9AD443EE49AB5ED312B22A7A9706273D">';

const GA_SNIPPET =
  `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>` +
  `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
  `gtag('js',new Date());gtag('config','${GA_ID}');</script>`;

const STRUCTURED_DATA = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://reichelyra.com/#organization",
      "name": "Reich Elyra",
      "alternateName": ["ريخ إليرا", "MAAT"],
      "url": "https://reichelyra.com",
      "logo": "https://reichelyra.com/images/logo.png",
      "slogan": "نبني حضارات رقمية.",
      "description":
        "منصّة الخدمات المهنيّة في مصر — الذكاء الاصطناعي، التقنية القانونية، والاستثمار. Reich Elyra is an Egyptian AI, LegalTech and investment platform.",
      "areaServed": { "@type": "Country", "name": "Egypt" }
    },
    {
      "@type": "WebSite",
      "@id": "https://reichelyra.com/#website",
      "url": "https://reichelyra.com",
      "name": "Reich Elyra",
      "publisher": { "@id": "https://reichelyra.com/#organization" },
      "inLanguage": "ar-EG",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://reichelyra.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
});

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
            end.append(UTILITY_CLUSTER_HTML, { html: true });
          }
        }
      })
      .on('script[type="application/ld+json"]', {
        element(el) {
          if (!jsonLdReplaced) {
            el.setInnerContent(STRUCTURED_DATA, { html: true });
            jsonLdReplaced = true;
          }
        }
      })
      .transform(response);
  }
};

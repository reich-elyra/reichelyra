// SEO injection worker for reichelyra.com (Z App origin)
// Injects: GA4, Google/Bing verification meta tags, corrected JSON-LD.
// Also strips the stray "Z App" title tag / branding and swaps the favicon
// for the Reich Elyra scarab mark.
// Everything else (assets, APIs, websockets, non-HTML) passes through untouched.

const GA_ID = "G-66BKZ2ZEJN";

const FAVICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">' +
  '<rect width="32" height="32" rx="4" fill="#030712"/>' +
  '<ellipse cx="16" cy="17" rx="5" ry="6" fill="#c9a84c"/>' +
  '<circle cx="16" cy="10" r="3" fill="#c9a84c"/>' +
  '<line x1="16" y1="12" x2="16" y2="23" stroke="#030712" stroke-width="0.8"/>' +
  '<path d="M11 17 Q13 14 16 12" fill="none" stroke="#030712" stroke-width="0.6"/>' +
  '<path d="M21 17 Q19 14 16 12" fill="none" stroke="#030712" stroke-width="0.6"/>' +
  '<path d="M14 8 Q12 5 10 4" fill="none" stroke="#c9a84c" stroke-width="1.2" stroke-linecap="round"/>' +
  '<path d="M18 8 Q20 5 22 4" fill="none" stroke="#c9a84c" stroke-width="1.2" stroke-linecap="round"/>' +
  '<path d="M11.5 15 L9 13" stroke="#c9a84c" stroke-width="0.8" stroke-linecap="round"/>' +
  '<path d="M11 17 L8.5 17" stroke="#c9a84c" stroke-width="0.8" stroke-linecap="round"/>' +
  '<path d="M11.5 19 L9 21" stroke="#c9a84c" stroke-width="0.8" stroke-linecap="round"/>' +
  '<path d="M20.5 15 L23 13" stroke="#c9a84c" stroke-width="0.8" stroke-linecap="round"/>' +
  '<path d="M21 17 L23.5 17" stroke="#c9a84c" stroke-width="0.8" stroke-linecap="round"/>' +
  '<path d="M20.5 19 L23 21" stroke="#c9a84c" stroke-width="0.8" stroke-linecap="round"/>' +
  "</svg>";

const FAVICON_DATA_URI = "data:image/svg+xml," + encodeURIComponent(FAVICON_SVG);

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
      "alternateName": ["ريخ إليرا", "Z App", "زد"],
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
          // the real, page-specific title — drop it.
          if (titleIndex === 1) {
            el.remove();
          }
        },
        text(text) {
          if (titleIndex > 1 && text.text.includes("Z App")) {
            text.replace(text.text.split("Z App").join("Reich Elyra"));
          }
        }
      })
      .on("link", {
        element(el) {
          const rel = (el.getAttribute("rel") || "").split(/\s+/);
          if (rel.includes("icon")) {
            el.setAttribute("href", FAVICON_DATA_URI);
            el.setAttribute("type", "image/svg+xml");
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

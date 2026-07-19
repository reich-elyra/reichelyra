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

// Contact info (2026-07-12, explicit user request): email displayed on
// the live /contact page was the placeholder "contact@reichelyra.com" —
// swap for the real, now-live mailbox. WhatsApp number is new — no
// prior contact channel existed for it, so it's added as a floating
// button (see backBarHtml) rather than edited in place.
const CONTACT_EMAIL = "info@reichelyra.com";
const WHATSAPP_NUMBER = "201556700075"; // no leading +, wa.me format

const I18N = {
  ar: { login: "تسجيل الدخول", back: "رجوع", backArrow: "→", switchTo: "English", switchLabel: "EN", whatsapp: "واتساب" },
  en: { login: "Login", back: "Back", backArrow: "←", switchTo: "العربية", switchLabel: "AR", whatsapp: "WhatsApp" }
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

// 2026-07-19 (explicit user request): WhatsApp + email were originally
// site-wide in this bar (see the long comment they replaced, kept in
// git history) — user asked for them to appear on /contact ONLY, not
// every page. `isContactPage` gates that half of the bar; "back" stays
// site-wide since that request only named the button + email address.
function backBarHtml(lang, isContactPage) {
  const t = I18N[lang];
  // Both elements are always rendered (never omitted) — display is
  // baked in from isContactPage for the first paint, then kept in
  // sync client-side by SPA_NAV_FIX_SCRIPT as the visitor navigates
  // between pages without a fresh HTML request (see that script's
  // comment for why: omitting them entirely on non-contact pages, as
  // an earlier version of this function did, left nothing in the DOM
  // for that client-side script to reveal when navigating INTO
  // /contact via an in-app link — the single most common way a real
  // visitor would ever reach this bar's WhatsApp/email content).
  const waDisplay = isContactPage ? "inline-flex" : "none";
  const emDisplay = isContactPage ? "inline-flex" : "none";
  const whatsappHtml =
    // Pinned to the physical left (mirrors "back" on the right). Uses
    // WhatsApp's own brand green rather than the site's gold accent:
    // this exact icon+color combination is what makes it instantly
    // recognizable, which matters more here than palette consistency
    // for one universally-recognized button.
    `<a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" class="rz-bar-whatsapp" ` +
    'style="position:absolute;top:50%;left:20px;transform:translateY(-50%);' +
    `display:${waDisplay};align-items:center;gap:8px;` +
    "padding:10px 18px;border-radius:999px;border:none;" +
    'background:#25D366;color:#03150c;font-size:14px;font-weight:700;text-decoration:none;">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.29.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.61-.07.16-.19.68-.79.87-1.06.18-.27.37-.22.62-.13.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z"/>' +
    "</svg>" +
    `<span>${t.whatsapp}</span></a>`;
  const emailHtml =
    // Exists here rather than as an edit of the /contact page's own
    // "side-mail" link because that link is driven by Z App's
    // reactive state: editing its href/data-cfemail survives in curl
    // output but reverts to the old "contact@reichelyra.com" once
    // hydration runs (confirmed with --dump-dom — same class of bug
    // as the CTA button, see the top-of-file comment). The old link
    // is hidden separately (a.side-mail { display:none }, which —
    // like the CTA hide — is a non-reactive attribute and does
    // survive) and this bar is the one reliable place the correct
    // email is shown.
    `<a href="mailto:${CONTACT_EMAIL}" class="rz-bar-email" style="position:absolute;` +
    `top:50%;left:50%;transform:translate(-50%,-50%);display:${emDisplay};align-items:center;` +
    'gap:6px;color:#e5e0d5;font-size:13px;text-decoration:none;white-space:nowrap;">' +
    `${CONTACT_EMAIL}</a>`;
  return (
    '<div style="position:fixed;bottom:0;left:0;right:0;height:' +
    BAR_HEIGHT +
    "px;z-index:99999;background:#030712;border-top:1px solid rgba(201,168,76,0.25);" +
    'box-shadow:0 -8px 24px rgba(0,0,0,0.45);">' +
    whatsappHtml +
    emailHtml +
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

// Discovered 2026-07-12 (via --dump-dom, checking meta tags specifically
// for the first time — earlier "MAAT rebrand verified" checks only used
// curl, which never surfaces this class of bug): the root layout's
// og:title/og:description/twitter:*/name=description meta tags are
// <svelte:head>-managed same as the CTA button, so editing their
// `content` attribute server-side (the .on("meta",...) handler above)
// gets silently reverted back to "Z App" once hydration runs — Z App's
// *page-specific* <svelte:head> block additionally injects a SECOND,
// separate, already-correctly-worded meta description/og:title
// (class="svelte-skv6c4") alongside the reverted one, so the page ends
// up with duplicate tags: the wrong one first in DOM order, the right
// one second. Rather than chase each reactive element individually
// (already did this twice for a.cta and a.side-mail), this is a
// general client-side sweep: correct any meta content containing
// "Z App" after hydration settles. Runs at 0ms (catches pre-hydration),
// 300ms and 1500ms (catches Svelte's reactive head updates, which
// don't happen synchronously with the main hydration pass).
// A fixed-duration poll (tried first: run every 250ms for 5s then stop)
// was NOT enough — verified in a real browser (not just --dump-dom,
// which turned out to have its own timing quirks around virtual-time +
// setTimeout/setInterval) that Z App's <svelte:head> reversion isn't a
// one-time post-hydration event; it recurred *after* the 5s polling
// window had already given up. Root trigger unknown (no access to
// Z App's source), so rather than guess a longer fixed duration, this
// watches permanently via MutationObserver — negligible cost, and
// self-terminating per-mutation: once `f()` corrects a tag's content,
// that same edit fires the observer again, finds nothing left to fix,
// and no-ops, so it never loops on its own writes.
const META_FIX_SCRIPT = `<script>(function(){function f(){document.querySelectorAll('meta[content]').forEach(function(m){if(m.content.indexOf('Z App')!==-1){m.content=m.content.split('Z App').join('MAAT');}});}f();new MutationObserver(f).observe(document.head,{subtree:true,attributes:true,attributeFilter:['content'],childList:true});})();</script>`;

// Discovered 2026-07-19: this Worker only ever runs on the *first*
// HTML response a visitor's browser requests. SvelteKit's client-side
// router intercepts clicks on internal links and re-renders routes by
// fetching only route data, never a fresh HTML document — so every
// fix above (hidden a.side-mail / a.cta, the contact-only WhatsApp+
// email bar) applies only to whichever page a visitor happens to land
// on first. Verified directly: in a clean browser tab (no cache),
// loading "/" then clicking the in-app "تواصل"/Contact nav link
// reproduced the exact pre-fix state on /contact — a.side-mail back
// to visible with a plain, non-obfuscated `mailto:contact@reichelyra.com`
// href, because Svelte mounted that page's markup fresh, client-side,
// completely bypassing this Worker (and, incidentally, Cloudflare's own
// email-obfuscation feature — that's edge-injected too and has the same
// blind spot). Same fix strategy as META_FIX_SCRIPT above: rather than
// hooking SvelteKit's specific router internals (undocumented, no
// source access, and could change on any redeploy), watch for the DOM
// churn any client-side navigation produces and re-apply the fixups
// whenever it happens. childList mutations only (not attributes), so
// this doesn't retrigger on its own style writes below.
// Discovered 2026-07-19/20, while verifying the contact form actually
// delivers: it never talks to a server at all. Its "submit" button
// (id="c-name"'s <form>) builds a `mailto:` URL client-side and
// assigns it to `window.location.href` — the visitor's own email
// client then has to send it. Traced the exact handler in the
// route's compiled bundle (nodes/10.*.js, minified — Svelte 5
// output, so exact variable names will change on any Z App rebuild):
// `window.location.href = \`mailto:${contactPage.mail}?subject=...\``,
// and `contactPage.mail` is a literal `"contact@reichelyra.com"`
// baked into the SAME translations bundle (chunks/BS20s6kf.js) that
// also feeds the "Direct Mail" card hidden above — i.e. the OLD
// placeholder address, not `info@reichelyra.com`. This lives inside
// a compiled JS bundle, not an HTML response, so it's completely out
// of reach for this Worker's HTMLRewriter (only text/html passes
// through it — see the top of `fetch` below). Left alone, a visitor
// who completes the mailto send in their own email client sends to
// an address nothing was ever provisioned to receive.
// Fix: intercept the click before Svelte's own handler runs, and
// replicate the mailto build with the correct address. This needs a
// capture-phase listener on an ANCESTOR of the button (the <form>),
// not the button itself — capture vs. bubble only changes ordering
// on ancestors; at the target element itself listeners run in
// registration order regardless of phase, so a listener attached
// directly to the button after Svelte's own would still lose the
// race. `stopImmediatePropagation()` in the capture phase keeps
// Svelte's handler from ever running, so there's no second, competing
// `location.href` write. Not attempting to byte-match Z App's own
// subject/body format (traced but minified/unlabeled, and only
// reachable by re-deriving it from obfuscated output every time their
// bundle changes) — this builds a clearer, explicitly-labeled body
// instead, which is strictly more useful to whoever reads the result.
const CONTACT_FORM_TEXT = {
  ar: {
    name: "الاسم",
    email: "البريد الإلكتروني",
    org: "الشركة / الجهة",
    type: "نوع الخدمة",
    msg: "الرسالة",
    subjectPrefix: "طلب تواصل من",
    success: "✓ فتحنا لك بريدك الإلكتروني برسالة جاهزة — أرسلها وسنعود إليك خلال يوم عمل."
  },
  en: {
    name: "Name",
    email: "Email",
    org: "Company",
    type: "Service Type",
    msg: "Message",
    subjectPrefix: "Contact request from",
    success: "✓ We opened your email client with a ready message — send it and we reply within one business day."
  }
};
const SPA_NAV_FIX_SCRIPT = `<script>(function(){
function isContactPath(p){return p==="/contact"||p==="/en/contact";}
function t(){return location.pathname.indexOf("/en")===0?${JSON.stringify(CONTACT_FORM_TEXT.en)}:${JSON.stringify(CONTACT_FORM_TEXT.ar)};}
function patchContactForm(){
  var nameEl=document.getElementById('c-name');
  if(!nameEl)return;
  var form=nameEl.closest('form');
  if(!form||form.__rzPatched)return;
  form.__rzPatched=true;
  form.addEventListener('click',function(ev){
    var btn=ev.target.closest('button');
    if(!btn||!form.contains(btn))return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    var L=t();
    var val=function(id){var el=document.getElementById(id);return el?el.value.trim():'';};
    var name=val('c-name'),email=val('c-email'),org=val('c-org'),type=val('c-type'),msg=val('c-msg');
    var subject=encodeURIComponent(L.subjectPrefix+' '+name);
    var body=encodeURIComponent(
      L.name+': '+name+'\\n'+
      L.email+': '+email+'\\n'+
      L.org+': '+(org||'-')+'\\n'+
      L.type+': '+type+'\\n\\n'+
      L.msg+':\\n'+msg
    );
    window.location.href='mailto:${CONTACT_EMAIL}?subject='+subject+'&body='+body;
    var note=form.querySelector('.rz-form-success');
    if(!note){
      note=document.createElement('p');
      note.className='rz-form-success';
      note.style.cssText='margin-top:12px;color:#c9a84c;font-size:14px;';
      var foot=btn.closest('.form-foot')||btn.parentElement;
      foot.parentElement.insertBefore(note,foot.nextSibling);
    }
    note.textContent=L.success;
    note.style.display='block';
  },true);
}
function f(){
  document.querySelectorAll('a.side-mail,a.cta').forEach(function(el){
    if(el.getAttribute('style')!=='display:none')el.setAttribute('style','display:none');
  });
  var isContact=isContactPath(location.pathname);
  var wa=document.querySelector('.rz-bar-whatsapp');
  var em=document.querySelector('.rz-bar-email');
  if(wa)wa.style.display=isContact?'inline-flex':'none';
  if(em)em.style.display=isContact?'inline-flex':'none';
  patchContactForm();
}
f();
var pending=false;
new MutationObserver(function(){
  if(pending)return;
  pending=true;
  setTimeout(function(){pending=false;f();},100);
}).observe(document.documentElement,{childList:true,subtree:true});
})();</script>`;

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
        areaServed: { "@type": "Country", name: "Egypt" },
        email: CONTACT_EMAIL,
        contactPoint: {
          "@type": "ContactPoint",
          email: CONTACT_EMAIL,
          telephone: "+" + WHATSAPP_NUMBER,
          contactType: "customer service",
          areaServed: "EG",
          availableLanguage: ["Arabic", "English"]
        }
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
    const isContactPage = pathname === "/contact" || pathname === "/en/contact";
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
          el.append(
            VERIFICATION_META + GA_SNIPPET + META_FIX_SCRIPT + SPA_NAV_FIX_SCRIPT,
            { html: true }
          );
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
      .on("a.side-mail", {
        element(el) {
          // The /contact page's "Direct Mail" link shows the wrong,
          // placeholder "contact@reichelyra.com". Tried editing its
          // href/data-cfemail in place first (it's Cloudflare's own
          // email-obfuscation markup, not obviously Svelte-owned) —
          // but confirmed with --dump-dom that hydration re-renders
          // this link from Z App's own reactive contact-info state,
          // which still holds the old address, reverting both the
          // href AND the obfuscation entirely (comes back as a plain
          // mailto: link). Same failure class as the CTA button
          // above. Hide it — like the CTA hide, a plain style
          // attribute isn't part of what Svelte's compiled template
          // binds for this element, so it does survive — and the
          // correct email is shown instead in the bottom bar (see
          // backBarHtml), restricted to this page only per 2026-07-19
          // request.
          el.setAttribute("style", "display:none");
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
              // Centered email in the bottom bar collides with the
              // WhatsApp/Back buttons on narrow phones (WhatsApp ~110px
              // + Back ~90px leaves too little room for a centered
              // ~20-char address) — hide it below 480px rather than let
              // it overlap; WhatsApp and Back stay reachable either way.
              `<style>body{padding-bottom:${BAR_HEIGHT}px !important}` +
                `@media (max-width:480px){.rz-bar-email{display:none !important}}</style>` +
                loginBadgeHtml(pageLang) +
                langSwitchHtml(pathname, pageLang) +
                backBarHtml(pageLang, isContactPage),
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

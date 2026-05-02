import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { PORTFOLIO_SLUGS, type PortfolioTab } from '@/lib/portfolio-routes';

/**
 * Dynamically updates SEO tags (canonical, hreflang, og:url, title, meta
 * description) based on the current route + active language.
 *
 * The hook understands two URL families:
 *   1. Plain SPA routes (e.g. "/", "/portfolio", "/impressum") that use
 *      ?lang=en for the English variant.
 *   2. Locale-prefixed portfolio category routes
 *      (e.g. "/de/portfolio/presse" ↔ "/en/portfolio/press") that act as
 *      dedicated, indexable destinations for each category.
 */
function upsertLink(rel: string, href: string, attrs: Record<string, string> = {}) {
  const selectorParts = [`link[rel="${rel}"]`];
  if (attrs.hreflang) selectorParts.push(`[hreflang="${attrs.hreflang}"]`);
  const selector = selectorParts.join('');

  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function upsertMeta(property: string, content: string, isName = false) {
  const attr = isName ? 'name' : 'property';
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Remove every <link rel="alternate" hreflang="..."> currently in <head>.
 * We rebuild the alternate set from scratch on every navigation so stale
 * entries from the previous route don't leak into the current one.
 */
function clearHreflangs() {
  document.head
    .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());
}

// Per-route title + description (kept under 60 / 160 chars).
type RouteSEO = { title: string; description: string };

const ROUTE_SEO: Record<string, { de: RouteSEO; en: RouteSEO }> = {
  '/': {
    de: {
      title: 'JoyWanna – Pianistin, Sängerin & Pädagogin | Deutschland',
      description:
        'Jovana Kokor: Klassische Pianistin, Sängerin & Musikpädagogin in Deutschland. Buchungen für Konzerte, Events & Privatunterricht. Jetzt Termin anfragen!',
    },
    en: {
      title: 'Jovana Kokor – Pianist, Vocalist & Educator | Germany',
      description:
        'Germany-based classical pianist & vocal artist Jovana Kokor. Concerts, corporate events & private piano and vocal lessons across Germany & Europe.',
    },
  },
  '/portfolio': {
    de: {
      title: 'Portfolio – JoyWanna | Visuelle Arbeiten, Live-Auftritte & Presse',
      description:
        'Portfolio von Jovana Kokor (JoyWanna): visuelle Arbeiten, Live-Auftritte und Pressestimmen aus Deutschland und Europa. Jetzt Bühnenmomente entdecken.',
    },
    en: {
      title: 'Portfolio – JoyWanna | Visual Work, Live Shows & Press',
      description:
        'Portfolio of Jovana Kokor (JoyWanna): visual work, live shows and press features from Germany and Europe. Explore stage moments and recent highlights.',
    },
  },
  '/impressum': {
    de: {
      title: 'Impressum – Jovana Kokor (JoyWanna)',
      description: 'Impressum und Anbieterkennzeichnung gemäß § 5 TMG für die Webseite von Jovana Kokor (JoyWanna).',
    },
    en: {
      title: 'Imprint – Jovana Kokor (JoyWanna)',
      description: 'Legal notice and provider information for the website of Jovana Kokor (JoyWanna).',
    },
  },
  '/privacy': {
    de: {
      title: 'Datenschutz – Jovana Kokor (JoyWanna)',
      description: 'Datenschutzerklärung gemäß DSGVO für die Webseite von Jovana Kokor (JoyWanna).',
    },
    en: {
      title: 'Privacy Policy – Jovana Kokor (JoyWanna)',
      description: 'GDPR-compliant privacy policy for the website of Jovana Kokor (JoyWanna).',
    },
  },
};

/**
 * Per-category SEO copy for the portfolio sub-routes.
 * Used for both /portfolio/<slug> and /<lang>/portfolio/<slug>.
 */
const CATEGORY_SEO: Record<PortfolioTab, { de: RouteSEO; en: RouteSEO }> = {
  visual: {
    de: {
      title: 'Visuelle Arbeiten – Portfolio | JoyWanna · Jovana Kokor',
      description:
        'Visuelle Arbeiten von Jovana Kokor (JoyWanna): Bühnenmomente, Bandfotografie und Künstlerporträts aus Konzerten in Deutschland und Europa.',
    },
    en: {
      title: 'Visual Work – Portfolio | JoyWanna · Jovana Kokor',
      description:
        'Visual work by Jovana Kokor (JoyWanna): stage moments, band photography and artist portraits from concerts across Germany and Europe.',
    },
  },
  shows: {
    de: {
      title: 'Live-Auftritte – Portfolio | JoyWanna · Jovana Kokor',
      description:
        'Live-Auftritte von JoyWanna – Solo, mit „The Spicy Jam" und in der „Reimagined"-Reihe für Stimme und Klavier. Konzertvideos & Highlights.',
    },
    en: {
      title: 'Live Shows – Portfolio | JoyWanna · Jovana Kokor',
      description:
        'Live performances by JoyWanna – solo, with "The Spicy Jam" and in the "Reimagined" voice & piano series. Concert videos & highlights.',
    },
  },
  press: {
    de: {
      title: 'Presse – Portfolio | JoyWanna · Jovana Kokor',
      description:
        'Presseberichte aus Zeitungen und Magazinen über JoyWanna, ihre Konzerte und ihren musikalischen Werdegang in Deutschland und Europa.',
    },
    en: {
      title: 'Press – Portfolio | JoyWanna · Jovana Kokor',
      description:
        'Press features from newspapers and magazines about JoyWanna, her concerts and her musical journey across Germany and Europe.',
    },
  },
};

function setTitle(title: string) {
  if (document.title !== title) document.title = title;
}

/**
 * Recognise portfolio category routes in either flavour:
 *   /portfolio/<slug>            (legacy, no locale prefix)
 *   /<lang>/portfolio/<slug>     (locale-prefixed canonical form)
 *
 * Returns the canonical PortfolioTab if the path matches, else null.
 */
function matchCategory(pathname: string): {
  tab: PortfolioTab;
  hasLocalePrefix: boolean;
} | null {
  const localePrefixed = pathname.match(/^\/(de|en)\/portfolio\/([^/]+)\/?$/);
  if (localePrefixed) {
    const slug = localePrefixed[2];
    const tab = (Object.keys(PORTFOLIO_SLUGS) as PortfolioTab[]).find(
      (t) => PORTFOLIO_SLUGS[t].de === slug || PORTFOLIO_SLUGS[t].en === slug
    );
    return tab ? { tab, hasLocalePrefix: true } : null;
  }
  const bare = pathname.match(/^\/portfolio\/([^/]+)\/?$/);
  if (bare) {
    const slug = bare[1];
    const tab = (Object.keys(PORTFOLIO_SLUGS) as PortfolioTab[]).find(
      (t) => PORTFOLIO_SLUGS[t].de === slug || PORTFOLIO_SLUGS[t].en === slug
    );
    return tab ? { tab, hasLocalePrefix: false } : null;
  }
  return null;
}

export function useDynamicSEO() {
  const { pathname, search } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const origin = `${window.location.protocol}//${window.location.host}`;

    // Strip any prior ?lang= so we control language via the URL family below.
    const stripLangParam = (qs: string) => {
      const params = new URLSearchParams(qs);
      params.delete('lang');
      const out = params.toString();
      return out ? `?${out}` : '';
    };
    const baseQs = stripLangParam(search);

    // Always rebuild hreflang from scratch — prevents stale alternates from
    // leaking between routes.
    clearHreflangs();

    const categoryMatch = matchCategory(pathname);

    if (categoryMatch) {
      // ───── Portfolio category routes ─────────────────────────────────────
      const { tab } = categoryMatch;
      const dePath = `/de/portfolio/${PORTFOLIO_SLUGS[tab].de}`;
      const enPath = `/en/portfolio/${PORTFOLIO_SLUGS[tab].en}`;
      const deUrl = `${origin}${dePath}`;
      const enUrl = `${origin}${enPath}`;

      // Canonical = locale-prefixed URL of the *current* language. This makes
      // each language version its own indexable destination and resolves the
      // "Pages Without Internal Outlinks" + duplicate-content issues.
      const canonicalUrl = language === 'en' ? enUrl : deUrl;
      upsertLink('canonical', canonicalUrl);

      upsertLink('alternate', deUrl, { hreflang: 'de' });
      upsertLink('alternate', enUrl, { hreflang: 'en' });
      upsertLink('alternate', deUrl, { hreflang: 'x-default' });

      upsertMeta('og:url', canonicalUrl);
      upsertMeta('og:locale', language === 'en' ? 'en_US' : 'de_DE');

      const seo = CATEGORY_SEO[tab][language === 'en' ? 'en' : 'de'];
      setTitle(seo.title);
      upsertMeta('description', seo.description, true);
      upsertMeta('og:title', seo.title);
      upsertMeta('og:description', seo.description);
      upsertMeta('twitter:title', seo.title, true);
      upsertMeta('twitter:description', seo.description, true);
    } else {
      // ───── Plain (non-category) routes ───────────────────────────────────
      const path = pathname || '/';
      const dePath = `${path}${baseQs}`;
      const enQs = baseQs ? `${baseQs}&lang=en` : '?lang=en';
      const enPath = `${path}${enQs}`;

      const deUrl = `${origin}${dePath}`;
      const enUrl = `${origin}${enPath}`;

      // For these routes the same HTML shell serves both languages, so
      // canonical points at the default-language (DE) URL.
      const canonicalUrl = deUrl;
      upsertLink('canonical', canonicalUrl);

      upsertLink('alternate', deUrl, { hreflang: 'de' });
      upsertLink('alternate', enUrl, { hreflang: 'en' });
      upsertLink('alternate', deUrl, { hreflang: 'x-default' });

      upsertMeta('og:url', canonicalUrl);
      upsertMeta('og:locale', language === 'en' ? 'en_US' : 'de_DE');

      const routeKey = ROUTE_SEO[path] ? path : '/';
      const seo = ROUTE_SEO[routeKey][language === 'en' ? 'en' : 'de'];
      setTitle(seo.title);
      upsertMeta('description', seo.description, true);
      upsertMeta('og:title', seo.title);
      upsertMeta('og:description', seo.description);
      upsertMeta('twitter:title', seo.title, true);
      upsertMeta('twitter:description', seo.description, true);
    }

    // Keep <html lang> in sync with the active language
    document.documentElement.setAttribute('lang', language);
  }, [pathname, search, language]);
}

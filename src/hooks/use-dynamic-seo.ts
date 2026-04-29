import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Dynamically updates SEO tags (canonical, hreflang, og:url) based on the
 * current environment's protocol + host. This way the same logic works on
 * the lovable.app subdomain, on staging, and on any future custom domain
 * without needing a hardcoded base URL.
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

function setTitle(title: string) {
  if (document.title !== title) document.title = title;
}

export function useDynamicSEO() {
  const { pathname, search } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const origin = `${window.location.protocol}//${window.location.host}`;
    const path = pathname || '/';

    // Build language-specific URLs. We use ?lang=en for the English variant
    // and the bare path for German (default).
    const stripLangParam = (qs: string) => {
      const params = new URLSearchParams(qs);
      params.delete('lang');
      const out = params.toString();
      return out ? `?${out}` : '';
    };

    const baseQs = stripLangParam(search);
    const dePath = `${path}${baseQs}`;
    const enQs = baseQs ? `${baseQs}&lang=en` : '?lang=en';
    const enPath = `${path}${enQs}`;

    const deUrl = `${origin}${dePath}`;
    const enUrl = `${origin}${enPath}`;

    // Canonical always points to the default-language (DE) URL — the same
    // page is served for both languages (the only difference is the UI
    // language toggled via ?lang=en). Hreflang below declares the EN
    // alternate so search engines still surface the right variant.
    const canonicalUrl = deUrl;
    upsertLink('canonical', canonicalUrl);

    // Hreflang alternates — absolute URLs reflecting the current host
    upsertLink('alternate', deUrl, { hreflang: 'de' });
    upsertLink('alternate', enUrl, { hreflang: 'en' });
    upsertLink('alternate', deUrl, { hreflang: 'x-default' });

    // Open Graph URL + locale (OG URL = canonical so social shares dedupe)
    upsertMeta('og:url', canonicalUrl);
    upsertMeta('og:locale', language === 'en' ? 'en_US' : 'de_DE');

    // Per-route <title> + meta description + OG/Twitter sync
    const routeKey = ROUTE_SEO[path] ? path : '/';
    const seo = ROUTE_SEO[routeKey][language === 'en' ? 'en' : 'de'];
    setTitle(seo.title);
    upsertMeta('description', seo.description, true);
    upsertMeta('og:title', seo.title);
    upsertMeta('og:description', seo.description);
    upsertMeta('twitter:title', seo.title, true);
    upsertMeta('twitter:description', seo.description, true);

    // Keep <html lang> in sync with the active language
    document.documentElement.setAttribute('lang', language);
  }, [pathname, search, language]);
}

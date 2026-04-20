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

    // Self-referencing canonical for the currently active language
    const canonicalUrl = language === 'en' ? enUrl : deUrl;
    upsertLink('canonical', canonicalUrl);

    // Hreflang alternates — absolute URLs reflecting the current host
    upsertLink('alternate', deUrl, { hreflang: 'de' });
    upsertLink('alternate', enUrl, { hreflang: 'en' });
    upsertLink('alternate', deUrl, { hreflang: 'x-default' });

    // Open Graph URL + locale
    upsertMeta('og:url', canonicalUrl);
    upsertMeta('og:locale', language === 'en' ? 'en_US' : 'de_DE');

    // Keep <html lang> in sync with the active language
    document.documentElement.setAttribute('lang', language);
  }, [pathname, search, language]);
}

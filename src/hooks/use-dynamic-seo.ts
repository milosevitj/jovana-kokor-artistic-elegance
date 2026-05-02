import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { PORTFOLIO_SLUGS, type PortfolioTab } from '@/lib/portfolio-routes';
import {
  parseRoute,
  buildSectionPath,
  buildPortfolioPath,
  buildInquirePath,
  type SectionId,
} from '@/lib/site-routes';

/**
 * Dynamic SEO updater.
 *
 * For every route we set:
 *   - <title>, <meta name="description">
 *   - <link rel="canonical">  – self-referencing, points to the *current* URL
 *     in the *current* language (uses live origin so lovable.app, custom
 *     domain or localhost all canonicalise correctly).
 *   - <link rel="alternate" hreflang="de|en|x-default"> – cross-linked DE/EN
 *   - og:title / og:description / og:url / og:locale (+ twitter equivalents)
 *   - <html lang="...">
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

function clearHreflangs() {
  document.head
    .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());
}

type RouteSEO = { title: string; description: string };

const HOME_SEO: { de: RouteSEO; en: RouteSEO } = {
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
};

const SECTION_SEO: Record<SectionId, { de: RouteSEO; en: RouteSEO }> = {
  home: HOME_SEO,
  about: {
    de: {
      title: 'Über mich – Jovana Kokor (JoyWanna) | Pianistin & Sängerin',
      description:
        'Über Jovana Kokor (JoyWanna): Pianistin und Sängerin aus Oldenburg, Jazz, Latin & NeoSoul – Werdegang, Bands und musikalische Vision.',
    },
    en: {
      title: 'About – Jovana Kokor (JoyWanna) | Pianist & Vocalist',
      description:
        'About Jovana Kokor (JoyWanna): pianist and vocalist based in Oldenburg, Germany. Jazz, Latin & NeoSoul background, bands and musical vision.',
    },
  },
  lessons: {
    de: {
      title: 'Unterricht – Klavier & Vocal Coaching | Jovana Kokor',
      description:
        'Klavier- und Gesangsunterricht mit Jovana Kokor (JoyWanna): individuelles Vocal Coaching und Klavierunterricht für alle Altersgruppen, online & vor Ort.',
    },
    en: {
      title: 'Lessons – Piano & Vocal Coaching | Jovana Kokor',
      description:
        'Piano lessons and vocal coaching with Jovana Kokor (JoyWanna): tailored sessions for every age and level, available online and in person.',
    },
  },
  contact: {
    de: {
      title: 'Kontakt & Booking – Jovana Kokor (JoyWanna)',
      description:
        'Kontakt und Booking-Anfragen für Jovana Kokor (JoyWanna): Konzerte, Firmenevents, Hochzeiten und Privatunterricht. Jetzt unverbindlich anfragen.',
    },
    en: {
      title: 'Contact & Booking – Jovana Kokor (JoyWanna)',
      description:
        'Contact and booking enquiries for Jovana Kokor (JoyWanna): concerts, corporate events, weddings and private lessons. Get in touch today.',
    },
  },
};

const PORTFOLIO_SEO: { de: RouteSEO; en: RouteSEO } = {
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
};

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

const LEGAL_SEO: Record<'/impressum' | '/privacy', { de: RouteSEO; en: RouteSEO }> = {
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

function applySEO(
  origin: string,
  language: 'de' | 'en',
  dePath: string,
  enPath: string,
  seo: { de: RouteSEO; en: RouteSEO },
) {
  const deUrl = `${origin}${dePath}`;
  const enUrl = `${origin}${enPath}`;
  const canonicalUrl = language === 'en' ? enUrl : deUrl;

  upsertLink('canonical', canonicalUrl);
  clearHreflangs();
  upsertLink('alternate', deUrl, { hreflang: 'de' });
  upsertLink('alternate', enUrl, { hreflang: 'en' });
  upsertLink('alternate', deUrl, { hreflang: 'x-default' });

  upsertMeta('og:url', canonicalUrl);
  upsertMeta('og:locale', language === 'en' ? 'en_US' : 'de_DE');

  const copy = seo[language];
  setTitle(copy.title);
  upsertMeta('description', copy.description, true);
  upsertMeta('og:title', copy.title);
  upsertMeta('og:description', copy.description);
  upsertMeta('twitter:title', copy.title, true);
  upsertMeta('twitter:description', copy.description, true);
}

export function useDynamicSEO() {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const origin = `${window.location.protocol}//${window.location.host}`;
    const parsed = parseRoute(pathname);

    if (parsed.kind === 'portfolio-category') {
      const dePath = `/de/portfolio/${PORTFOLIO_SLUGS[parsed.tab].de}`;
      const enPath = `/en/portfolio/${PORTFOLIO_SLUGS[parsed.tab].en}`;
      applySEO(origin, language, dePath, enPath, CATEGORY_SEO[parsed.tab]);
    } else if (parsed.kind === 'portfolio') {
      applySEO(origin, language, buildPortfolioPath('de'), buildPortfolioPath('en'), PORTFOLIO_SEO);
    } else if (parsed.kind === 'section') {
      applySEO(
        origin,
        language,
        buildSectionPath(parsed.section, 'de'),
        buildSectionPath(parsed.section, 'en'),
        SECTION_SEO[parsed.section],
      );
    } else if (parsed.kind === 'home') {
      applySEO(
        origin,
        language,
        buildSectionPath('home', 'de'),
        buildSectionPath('home', 'en'),
        HOME_SEO,
      );
    } else if (pathname === '/impressum' || pathname === '/privacy') {
      // Legal pages are single-shell; canonical = self URL.
      const url = `${origin}${pathname}`;
      upsertLink('canonical', url);
      clearHreflangs();
      upsertLink('alternate', url, { hreflang: 'de' });
      upsertLink('alternate', url, { hreflang: 'en' });
      upsertLink('alternate', url, { hreflang: 'x-default' });
      upsertMeta('og:url', url);
      upsertMeta('og:locale', language === 'en' ? 'en_US' : 'de_DE');
      const copy = LEGAL_SEO[pathname as '/impressum' | '/privacy'][language];
      setTitle(copy.title);
      upsertMeta('description', copy.description, true);
      upsertMeta('og:title', copy.title);
      upsertMeta('og:description', copy.description);
      upsertMeta('twitter:title', copy.title, true);
      upsertMeta('twitter:description', copy.description, true);
    } else {
      // Unknown route — self-canonical fallback.
      const url = `${origin}${pathname}`;
      upsertLink('canonical', url);
      clearHreflangs();
      upsertMeta('og:url', url);
    }

    document.documentElement.setAttribute('lang', language);
  }, [pathname, language]);
}

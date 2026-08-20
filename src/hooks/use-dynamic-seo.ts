import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { PORTFOLIO_SLUGS, type PortfolioTab } from '@/lib/portfolio-routes';
import {
  parseRoute,
  buildPagePath,
  buildPortfolioPath,
  buildCategoryPath,
} from '@/lib/site-routes';

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

const DEFAULT_OG_IMAGE =
  'https://storage.googleapis.com/gpt-engineer-file-uploads/Uj8tLOBDxYhmqVtsQfEa4HeyhTf1/social-images/social-1776667433602-joywanna28.webp';

type RouteSEO = { title: string; description: string };

const HOME_SEO: { de: RouteSEO; en: RouteSEO } = {
  de: {
    title: 'JoyWanna – Sängerin & Pianistin | Live-Musik, Konzerte & Vocal Coaching',
    description:
      'Vielseitige Bühnenkunst, künstlerischer Ausdruck und langjährige internationale Bühnenerfahrung – von großen Bühnen bis zu persönlichen Konzertmomenten.',
  },
  en: {
    title: 'JoyWanna – Singer & Pianist | Live Music, Concerts & Vocal Coaching',
    description:
      'Versatile stage artistry, artistic expression and many years of international stage experience – from grand stages to intimate concert moments.',
  },
};

const LESSONS_SEO: { de: RouteSEO; en: RouteSEO } = {
  de: {
    title: 'Vocal Coaching – Klavier & Stimmunterricht | JoyWanna (Jovana Kokor)',
    description:
      'Klavier- und Gesangsunterricht mit JoyWanna (Jovana Kokor): individuelles Vocal Coaching und Klavierunterricht für alle Altersgruppen, online & vor Ort.',
  },
  en: {
    title: 'Vocal Coaching – Piano & Voice Lessons | JoyWanna (Jovana Kokor)',
    description:
      'Piano lessons and vocal coaching with JoyWanna (Jovana Kokor): tailored sessions for every age and level, available online and in person.',
  },
};

const CONTACT_SEO: { de: RouteSEO; en: RouteSEO } = {
  de: {
    title: 'Kontakt & Booking – JoyWanna (Jovana Kokor)',
    description:
      'Kontakt und Booking-Anfragen für JoyWanna (Jovana Kokor): Konzerte, Firmenevents, Hochzeiten und Privatunterricht. Jetzt unverbindlich anfragen.',
  },
  en: {
    title: 'Contact & Booking – JoyWanna (Jovana Kokor)',
    description:
      'Contact and booking enquiries for JoyWanna (Jovana Kokor): concerts, corporate events, weddings and private lessons. Get in touch today.',
  },
};

const ABOUT_SEO: { de: RouteSEO; en: RouteSEO } = {
  de: {
    title: 'Über mich – JoyWanna (Jovana Kokor) | Sängerin & Pianistin',
    description:
      'Über JoyWanna (Jovana Kokor): Sängerin und Pianistin zwischen Jazz, Latin, NeoSoul und Pop – mit über 15 Jahren internationaler Bühnenerfahrung.',
  },
  en: {
    title: 'About Me – JoyWanna (Jovana Kokor) | Singer & Pianist',
    description:
      'About JoyWanna (Jovana Kokor): singer and pianist between Jazz, Latin, NeoSoul and Pop – with over 15 years of international stage experience.',
  },
};

const PORTFOLIO_SEO: { de: RouteSEO; en: RouteSEO } = {
  de: {
    title: 'Projekte – JoyWanna | Visuelle Arbeiten, Live-Auftritte & Presse',
    description:
      'Projekte von JoyWanna (Jovana Kokor): visuelle Arbeiten, Live-Auftritte und Pressestimmen aus Deutschland und Europa. Jetzt Bühnenmomente entdecken.',
  },
  en: {
    title: 'Projects – JoyWanna | Visual Work, Live Shows & Press',
    description:
      'Projects of JoyWanna (Jovana Kokor): visual work, live shows and press features from Germany and Europe. Explore stage moments and recent highlights.',
  },
};

const CATEGORY_SEO: Record<PortfolioTab, { de: RouteSEO; en: RouteSEO }> = {
  visual: {
    de: {
      title: 'Fotoshooting – Projekte | JoyWanna · Jovana Kokor',
      description:
        'Visuelle Arbeiten von JoyWanna (Jovana Kokor): Bühnenmomente, Bandfotografie und Künstlerporträts aus Konzerten in Deutschland und Europa.',
    },
    en: {
      title: 'Photoshoot – Projects | JoyWanna · Jovana Kokor',
      description:
        'Visual work by JoyWanna (Jovana Kokor): stage moments, band photography and artist portraits from concerts across Germany and Europe.',
    },
  },
  shows: {
    de: {
      title: 'Bühnenmomente – Projekte | JoyWanna · Jovana Kokor',
      description:
        'Live-Auftritte von JoyWanna – Solo, mit „The Spicy Jam" und in der „Reimagined"-Reihe für Stimme und Klavier. Konzertvideos & Highlights.',
    },
    en: {
      title: 'Stage Moments – Projects | JoyWanna · Jovana Kokor',
      description:
        'Live performances by JoyWanna – solo, with "The Spicy Jam" and in the "Reimagined" voice & piano series. Concert videos & highlights.',
    },
  },
  press: {
    de: {
      title: 'Presse – Projekte | JoyWanna · Jovana Kokor',
      description:
        'Presseberichte aus Zeitungen und Magazinen über JoyWanna (Jovana Kokor), ihre Konzerte und ihren musikalischen Werdegang in Deutschland und Europa.',
    },
    en: {
      title: 'Press – Projects | JoyWanna · Jovana Kokor',
      description:
        'Press features from newspapers and magazines about JoyWanna (Jovana Kokor), her concerts and her musical journey across Germany and Europe.',
    },
  },
};

const LEGAL_SEO: Record<'/impressum' | '/privacy', { de: RouteSEO; en: RouteSEO }> = {
  '/impressum': {
    de: {
      title: 'Impressum – JoyWanna | Jovana Kokor',
      description: 'Impressum und Anbieterkennzeichnung gemäß § 5 TMG für die Webseite von JoyWanna (Jovana Kokor).',
    },
    en: {
      title: 'Imprint – JoyWanna | Jovana Kokor',
      description: 'Legal notice and provider information for the website of JoyWanna (Jovana Kokor).',
    },
  },
  '/privacy': {
    de: {
      title: 'Datenschutz – JoyWanna | Jovana Kokor',
      description: 'Datenschutzerklärung gemäß DSGVO für die Webseite von JoyWanna (Jovana Kokor).',
    },
    en: {
      title: 'Privacy Policy – JoyWanna | Jovana Kokor',
      description: 'GDPR-compliant privacy policy for the website of JoyWanna (Jovana Kokor).',
    },
  },
};

const REIMAGINED_SEO: { de: RouteSEO; en: RouteSEO } = {
  de: {
    title: 'JoyWanna – Reimagined',
    description:
      'Dieses Album ist eine sehr persönliche Sammlung von Songs, die mich über viele Jahre begleitet haben und die ich für Stimme und Klavier neu interpretiert habe.',
  },
  en: {
    title: 'JoyWanna – Reimagined',
    description:
      'This album is a very personal collection of songs that have accompanied me over many years, which I have reinterpreted for voice and piano.',
  },
};

const THESPICYJAM_SEO: { de: RouteSEO; en: RouteSEO } = {
  de: {
    title: 'JoyWanna & The Spicy Jam',
    description:
      'JoyWanna & The Spicy Jam stehen für einen mitreißenden, genreübergreifenden Sound zwischen Jazz, Latin, Soul und Pop.',
  },
  en: {
    title: 'JoyWanna & The Spicy Jam',
    description:
      'JoyWanna & The Spicy Jam stand for a captivating, genre-crossing sound between jazz, Latin, soul and pop.',
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
  imageUrl?: string,
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

  const finalImage = imageUrl || DEFAULT_OG_IMAGE;
  upsertMeta('og:image', finalImage);
  upsertMeta('og:image:alt', copy.title);
  upsertMeta('twitter:image', finalImage, true);
  upsertMeta('twitter:image:alt', copy.title, true);
}

export function useDynamicSEO() {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const origin = `${window.location.protocol}//${window.location.host}`;
    const parsed = parseRoute(pathname);

    if (parsed.kind === 'portfolio-category') {
      applySEO(
        origin,
        language,
        buildCategoryPath(parsed.tab, 'de'),
        buildCategoryPath(parsed.tab, 'en'),
        CATEGORY_SEO[parsed.tab],
      );
    } else if (parsed.kind === 'portfolio') {
      applySEO(origin, language, buildPortfolioPath('de'), buildPortfolioPath('en'), PORTFOLIO_SEO);
    } else if (parsed.kind === 'contact') {
      applySEO(origin, language, buildPagePath('contact', 'de'), buildPagePath('contact', 'en'), CONTACT_SEO);
    } else if (parsed.kind === 'lessons') {
      applySEO(origin, language, buildPagePath('lessons', 'de'), buildPagePath('lessons', 'en'), LESSONS_SEO);
    } else if (parsed.kind === 'about') {
      applySEO(origin, language, buildPagePath('about', 'de'), buildPagePath('about', 'en'), ABOUT_SEO);
    } else if (parsed.kind === 'home') {
      applySEO(origin, language, buildPagePath('home', 'de'), buildPagePath('home', 'en'), HOME_SEO);
    } else if (pathname === '/impressum' || pathname === '/privacy') {
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
    } else if (pathname === '/reimagined') {
      applySEO(
        origin,
        language,
        '/reimagined',
        '/reimagined',
        REIMAGINED_SEO,
        `${origin}/reimagined-cover.png`,
      );
    } else if (pathname === '/thespicyjam' || pathname === '/en/thespicyjam') {
      applySEO(
        origin,
        language,
        '/thespicyjam',
        '/en/thespicyjam',
        THESPICYJAM_SEO,
      );
    } else {
      const url = `${origin}${pathname}`;
      upsertLink('canonical', url);
      clearHreflangs();
      upsertMeta('og:url', url);
    }

    // Suppress unused-import warning
    void PORTFOLIO_SLUGS;

    document.documentElement.setAttribute('lang', language);
  }, [pathname, language]);
}

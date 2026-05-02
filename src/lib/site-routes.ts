/**
 * Site-wide localized routing map.
 *
 * The site is technically a one-page React app (sections live on `/`), but
 * we expose dedicated, crawlable localized URLs for every section so search
 * engines see them as separate, indexable pages with proper hreflang
 * counterparts. Visiting one of these URLs loads the homepage and scrolls
 * to the matching section.
 */

import {
  PORTFOLIO_SLUGS,
  PORTFOLIO_TABS,
  buildCategoryPath,
  type Lang,
  type PortfolioTab,
} from './portfolio-routes';

export type { Lang } from './portfolio-routes';

/** Section ids used in the DOM (HeroSection has id="home", etc.) */
export type SectionId = 'home' | 'about' | 'lessons' | 'contact';

/**
 * Localized URL segment per section per language.
 * Home = "" (i.e. /de/ or /en/).
 */
export const SECTION_SLUGS: Record<SectionId, Record<Lang, string>> = {
  home: { de: '', en: '' },
  about: { de: 'ueber-mich', en: 'about-me' },
  lessons: { de: 'vocal-coaching', en: 'vocal-coaching' },
  contact: { de: 'kontakt', en: 'contact' },
};

/** Reverse lookup: localized slug -> SectionId (any language). */
export const SLUG_TO_SECTION: Record<string, SectionId> = (() => {
  const out: Record<string, SectionId> = {};
  (Object.keys(SECTION_SLUGS) as SectionId[]).forEach((id) => {
    const de = SECTION_SLUGS[id].de;
    const en = SECTION_SLUGS[id].en;
    if (de) out[de] = id;
    if (en) out[en] = id;
  });
  return out;
})();

/** Build the localized URL for a section: /<lang>/<slug> (or /<lang>/ for home). */
export function buildSectionPath(section: SectionId, lang: Lang): string {
  const slug = SECTION_SLUGS[section][lang];
  return slug ? `/${lang}/${slug}` : `/${lang}/`;
}

/** "portfolio" landing (no category) per language. */
export function buildPortfolioPath(lang: Lang): string {
  return `/${lang}/portfolio`;
}

/**
 * Parse a pathname and return what it represents.
 * Handles: /, /portfolio, /portfolio/<slug>, and the locale-prefixed variants.
 */
export type ParsedRoute =
  | { kind: 'home'; lang: Lang | null }
  | { kind: 'section'; section: SectionId; lang: Lang }
  | { kind: 'portfolio'; lang: Lang | null }
  | { kind: 'portfolio-category'; tab: PortfolioTab; lang: Lang | null }
  | { kind: 'other'; lang: Lang | null };

export function parseRoute(pathname: string): ParsedRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';

  // /<lang>/portfolio/<slug>
  const localizedCategory = clean.match(/^\/(de|en)\/portfolio\/([^/]+)$/);
  if (localizedCategory) {
    const lang = localizedCategory[1] as Lang;
    const slug = localizedCategory[2];
    const tab = (Object.keys(PORTFOLIO_SLUGS) as PortfolioTab[]).find(
      (t) => PORTFOLIO_SLUGS[t].de === slug || PORTFOLIO_SLUGS[t].en === slug,
    );
    if (tab) return { kind: 'portfolio-category', tab, lang };
  }

  // /portfolio/<slug>
  const bareCategory = clean.match(/^\/portfolio\/([^/]+)$/);
  if (bareCategory) {
    const slug = bareCategory[1];
    const tab = (Object.keys(PORTFOLIO_SLUGS) as PortfolioTab[]).find(
      (t) => PORTFOLIO_SLUGS[t].de === slug || PORTFOLIO_SLUGS[t].en === slug,
    );
    if (tab) return { kind: 'portfolio-category', tab, lang: null };
  }

  // /<lang>/portfolio
  const localizedPortfolio = clean.match(/^\/(de|en)\/portfolio$/);
  if (localizedPortfolio) {
    return { kind: 'portfolio', lang: localizedPortfolio[1] as Lang };
  }
  if (clean === '/portfolio') return { kind: 'portfolio', lang: null };

  // /<lang>/<slug> or /<lang> or /<lang>/
  const localizedSection = clean.match(/^\/(de|en)(?:\/([^/]+))?$/);
  if (localizedSection) {
    const lang = localizedSection[1] as Lang;
    const slug = localizedSection[2];
    if (!slug) return { kind: 'home', lang };
    const section = SLUG_TO_SECTION[slug];
    if (section) return { kind: 'section', section, lang };
    return { kind: 'other', lang };
  }

  if (clean === '/') return { kind: 'home', lang: null };
  return { kind: 'other', lang: null };
}

/**
 * Given the current pathname and a target language, return the equivalent
 * pathname in that language. Falls back to `/${target}/` if no mapping.
 */
export function localizedCounterpart(pathname: string, target: Lang): string {
  const parsed = parseRoute(pathname);
  switch (parsed.kind) {
    case 'home':
      return buildSectionPath('home', target);
    case 'section':
      return buildSectionPath(parsed.section, target);
    case 'portfolio':
      return buildPortfolioPath(target);
    case 'portfolio-category':
      return buildCategoryPath(parsed.tab, target);
    default:
      return buildSectionPath('home', target);
  }
}

/** Locale-prefixed paths for every section + portfolio + portfolio category, both languages. */
export function allLocalizedPaths(): { de: string; en: string }[] {
  const out: { de: string; en: string }[] = [];
  (Object.keys(SECTION_SLUGS) as SectionId[]).forEach((s) => {
    out.push({ de: buildSectionPath(s, 'de'), en: buildSectionPath(s, 'en') });
  });
  out.push({ de: buildPortfolioPath('de'), en: buildPortfolioPath('en') });
  PORTFOLIO_TABS.forEach((entry) => {
    out.push({
      de: buildCategoryPath(entry.tab, 'de'),
      en: buildCategoryPath(entry.tab, 'en'),
    });
  });
  return out;
}

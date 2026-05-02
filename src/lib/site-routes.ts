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
  PORTFOLIO_BASE,
  PORTFOLIO_BASE_SEGMENTS,
  PORTFOLIO_SLUGS,
  PORTFOLIO_TABS,
  buildCategoryPath,
  type Lang,
  type PortfolioTab,
} from './portfolio-routes';

export type { Lang } from './portfolio-routes';

/** Section ids used in the DOM (HeroSection has id="home", etc.) */
export type SectionId = 'home' | 'about' | 'contact';

/**
 * Localized URL segment per section per language.
 * Home = "" (i.e. /de/ or /en/).
 */
export const SECTION_SLUGS: Record<SectionId, Record<Lang, string>> = {
  home: { de: '', en: '' },
  about: { de: 'ueber-mich', en: 'about-me' },
  contact: { de: 'kontakt', en: 'contact' },
};

/**
 * Localized slug for the dedicated "Jetzt anfragen" / "Inquire Now" page.
 * This is NOT a one-page section — it has its own React route and page.
 */
export const INQUIRE_SLUGS: Record<Lang, string> = {
  de: 'jetzt-anfragen',
  en: 'inquire-now',
};

export function buildInquirePath(lang: Lang): string {
  return `/${lang}/${INQUIRE_SLUGS[lang]}`;
}

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
  return `/${lang}/${PORTFOLIO_BASE[lang]}`;
}

/**
 * Parse a pathname and return what it represents.
 * Handles localized portfolio base ("projekte"/"projects") plus the legacy
 * "/portfolio" segment so old links keep resolving.
 */
export type ParsedRoute =
  | { kind: 'home'; lang: Lang | null }
  | { kind: 'section'; section: SectionId; lang: Lang }
  | { kind: 'portfolio'; lang: Lang | null }
  | { kind: 'portfolio-category'; tab: PortfolioTab; lang: Lang | null }
  | { kind: 'inquire'; lang: Lang }
  | { kind: 'other'; lang: Lang | null };

const baseAlt = PORTFOLIO_BASE_SEGMENTS.join('|');

export function parseRoute(pathname: string): ParsedRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';

  // /<lang>/<base>/<slug>
  const localizedCategory = clean.match(
    new RegExp(`^/(de|en)/(?:${baseAlt})/([^/]+)$`),
  );
  if (localizedCategory) {
    const lang = localizedCategory[1] as Lang;
    const slug = localizedCategory[2];
    const tab = (Object.keys(PORTFOLIO_SLUGS) as PortfolioTab[]).find(
      (t) => PORTFOLIO_SLUGS[t].de === slug || PORTFOLIO_SLUGS[t].en === slug,
    );
    if (tab) return { kind: 'portfolio-category', tab, lang };
  }

  // /<base>/<slug> (no language prefix, legacy)
  const bareCategory = clean.match(new RegExp(`^/(?:${baseAlt})/([^/]+)$`));
  if (bareCategory) {
    const slug = bareCategory[1];
    const tab = (Object.keys(PORTFOLIO_SLUGS) as PortfolioTab[]).find(
      (t) => PORTFOLIO_SLUGS[t].de === slug || PORTFOLIO_SLUGS[t].en === slug,
    );
    if (tab) return { kind: 'portfolio-category', tab, lang: null };
  }

  // /<lang>/<base>
  const localizedPortfolio = clean.match(new RegExp(`^/(de|en)/(?:${baseAlt})$`));
  if (localizedPortfolio) {
    return { kind: 'portfolio', lang: localizedPortfolio[1] as Lang };
  }
  if (PORTFOLIO_BASE_SEGMENTS.some((b) => clean === `/${b}`)) {
    return { kind: 'portfolio', lang: null };
  }

  // /<lang>/<slug> or /<lang> or /<lang>/
  const localizedSection = clean.match(/^\/(de|en)(?:\/([^/]+))?$/);
  if (localizedSection) {
    const lang = localizedSection[1] as Lang;
    const slug = localizedSection[2];
    if (!slug) return { kind: 'home', lang };
    const section = SLUG_TO_SECTION[slug];
    if (section) return { kind: 'section', section, lang };
    // Legacy lessons slugs
    if (slug === 'unterricht' || slug === 'lessons') {
      return { kind: 'section', section: 'lessons', lang };
    }
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

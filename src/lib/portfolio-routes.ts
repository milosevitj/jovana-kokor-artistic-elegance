/**
 * Shared mapping for portfolio (a.k.a. "Projekte" / "Projects") category sub-routes.
 *
 * New simplified structure:
 *   DE (default): /projects/...
 *   EN:          /en/projects/...
 *
 * Category slugs are unified across both languages for simplicity and
 * consistency with the rest of the site's clean URL structure.
 */

export type PortfolioTab = 'visual' | 'shows' | 'press';
export type Lang = 'de' | 'en';

/** Localized base segment for the portfolio landing per language. */
export const PORTFOLIO_BASE: Record<Lang, string> = {
  de: 'projects',
  en: 'projects',
};

/** All recognised base segments (current + legacy). */
export const PORTFOLIO_BASE_SEGMENTS: string[] = ['projects', 'projekte', 'portfolio'];

/** Canonical (English) category slugs used in URLs for both languages. */
export const PORTFOLIO_SLUGS: Record<PortfolioTab, Record<Lang, string>> = {
  visual: { de: 'photoshoot', en: 'photoshoot' },
  shows: { de: 'stage-moments', en: 'stage-moments' },
  press: { de: 'press', en: 'press' },
};

/**
 * Legacy slugs (previous category URL segments) → canonical tab.
 * Kept so old links and previously indexed URLs keep resolving.
 */
const LEGACY_SLUGS: Record<string, PortfolioTab> = {
  fotoshooting: 'visual',
  'visuelle-arbeiten': 'visual',
  'visual-work': 'visual',
  buehnenmomente: 'shows',
  'live-auftritte': 'shows',
  'live-shows': 'shows',
  presse: 'press',
};

/** All recognised slugs (current + legacy) → canonical tab. */
export const SLUG_TO_TAB: Record<string, PortfolioTab> = (() => {
  const out: Record<string, PortfolioTab> = { ...LEGACY_SLUGS };
  (Object.keys(PORTFOLIO_SLUGS) as PortfolioTab[]).forEach((tab) => {
    out[PORTFOLIO_SLUGS[tab].de] = tab;
    out[PORTFOLIO_SLUGS[tab].en] = tab;
  });
  return out;
})();

/**
 * Build the canonical, locale-aware path for a given tab + language.
 *   buildCategoryPath('press', 'de') -> '/projects/press'
 *   buildCategoryPath('press', 'en') -> '/en/projects/press'
 */
export function buildCategoryPath(tab: PortfolioTab, lang: Lang): string {
  const prefix = lang === 'en' ? '/en' : '';
  return `${prefix}/${PORTFOLIO_BASE[lang]}/${PORTFOLIO_SLUGS[tab][lang]}`;
}

/**
 * Tabs in display order with their localized labels.
 */
export const PORTFOLIO_TABS: { tab: PortfolioTab; label: Record<Lang, string> }[] = [
  { tab: 'shows', label: { de: 'Bühnenmomente', en: 'Stage Moments' } },
  { tab: 'visual', label: { de: 'Fotoshooting', en: 'Photoshoot' } },
  { tab: 'press', label: { de: 'Presse', en: 'Press' } },
];

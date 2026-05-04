/**
 * Shared mapping for portfolio (a.k.a. "Projekte" / "Projects") category sub-routes.
 *
 * The landing segment is localized per language:
 *   DE: /de/projekte/...
 *   EN: /en/projects/...
 *
 * Each category tab also has a localized slug (DE + EN). Crawlers see real,
 * distinct URLs (e.g. /en/projects/press, /de/projekte/presse) so each
 * category becomes its own internal outlink and indexable destination.
 */

export type PortfolioTab = 'visual' | 'shows' | 'press';
export type Lang = 'de' | 'en';

/** Localized base segment for the portfolio landing per language. */
export const PORTFOLIO_BASE: Record<Lang, string> = {
  de: 'projekte',
  en: 'projects',
};

/** All recognised base segments (both languages + legacy "portfolio"). */
export const PORTFOLIO_BASE_SEGMENTS: string[] = ['projekte', 'projects', 'portfolio'];

export const PORTFOLIO_SLUGS: Record<PortfolioTab, Record<Lang, string>> = {
  visual: { de: 'visuelle-arbeiten', en: 'visual-work' },
  shows: { de: 'live-auftritte', en: 'live-shows' },
  press: { de: 'presse', en: 'press' },
};

/**
 * All recognised slugs (in either language) → canonical tab.
 * Used by the Portfolio page to read the current category from the URL.
 */
export const SLUG_TO_TAB: Record<string, PortfolioTab> = (() => {
  const out: Record<string, PortfolioTab> = {};
  (Object.keys(PORTFOLIO_SLUGS) as PortfolioTab[]).forEach((tab) => {
    out[PORTFOLIO_SLUGS[tab].de] = tab;
    out[PORTFOLIO_SLUGS[tab].en] = tab;
  });
  return out;
})();

/**
 * Build the canonical, locale-prefixed path for a given tab + language.
 *   buildCategoryPath('press', 'de') -> '/de/projekte/presse'
 *   buildCategoryPath('press', 'en') -> '/en/projects/press'
 */
export function buildCategoryPath(tab: PortfolioTab, lang: Lang): string {
  return `/${lang}/${PORTFOLIO_BASE[lang]}/${PORTFOLIO_SLUGS[tab][lang]}`;
}

/**
 * Tabs in display order with their localized labels. Single source of truth
 * for the rendered nav and the prerender plugin.
 */
export const PORTFOLIO_TABS: { tab: PortfolioTab; label: Record<Lang, string> }[] = [
  { tab: 'visual', label: { de: 'Fotoshooting', en: 'Photoshoot' } },
  { tab: 'press', label: { de: 'Presse', en: 'Press' } },
  { tab: 'shows', label: { de: 'Bühnenmomente', en: 'Stage Moments' } },
];

/**
 * Shared mapping for portfolio category sub-routes.
 *
 * Each tab has a localized slug (DE + EN). Crawlers see real, distinct URLs
 * (e.g. /en/portfolio/press, /de/portfolio/presse) so each category becomes
 * its own internal outlink and indexable destination.
 */

export type PortfolioTab = 'visual' | 'shows' | 'press';
export type Lang = 'de' | 'en';

export const PORTFOLIO_SLUGS: Record<PortfolioTab, Record<Lang, string>> = {
  visual: { de: 'visuelle-arbeit', en: 'visual-work' },
  shows: { de: 'live-shows', en: 'live-shows' },
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
 *   buildCategoryPath('press', 'de') -> '/de/portfolio/presse'
 *   buildCategoryPath('press', 'en') -> '/en/portfolio/press'
 */
export function buildCategoryPath(tab: PortfolioTab, lang: Lang): string {
  return `/${lang}/portfolio/${PORTFOLIO_SLUGS[tab][lang]}`;
}

/**
 * Tabs in display order with their localized labels. Single source of truth
 * for the rendered nav and the prerender plugin.
 */
export const PORTFOLIO_TABS: { tab: PortfolioTab; label: Record<Lang, string> }[] = [
  { tab: 'visual', label: { de: 'Visuelle Arbeiten', en: 'Visual Work' } },
  { tab: 'shows', label: { de: 'Live-Auftritte', en: 'Live Shows' } },
  { tab: 'press', label: { de: 'Presse', en: 'Press' } },
];

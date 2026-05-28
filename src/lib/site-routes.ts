/**
 * Site-wide routing map.
 *
 * Clean, SEO-friendly structure:
 *   /                  → German home (default)
 *   /en                → English home
 *   /contact           → German contact
 *   /en/contact        → English contact
 *   /vocal-coaching    → German vocal coaching
 *   /en/vocal-coaching → English vocal coaching
 *   /projects          → German projects
 *   /en/projects       → English projects
 *
 * The homepage is a one-page scroll experience; in-page sections (home,
 * about) are reached via smooth-scroll, NOT via URL hash. They have no
 * dedicated URLs.
 */

import {
  PORTFOLIO_BASE,
  PORTFOLIO_SLUGS,
  PORTFOLIO_TABS,
  buildCategoryPath,
  type Lang,
  type PortfolioTab,
} from './portfolio-routes';

export type { Lang } from './portfolio-routes';

/** Section ids used in the DOM for in-page smooth-scroll. */
export type SectionId = 'home' | 'about';

/** Top-level page kinds (each has its own URL). */
export type PageId = 'home' | 'contact' | 'lessons' | 'projects';

/** Localized URL segment per page per language. Home = "". */
export const PAGE_SLUGS: Record<Exclude<PageId, 'home'>, string> = {
  contact: 'contact',
  lessons: 'vocal-coaching',
  projects: 'projects',
};

/** Build the localized URL for a page. */
export function buildPagePath(page: PageId, lang: Lang): string {
  const prefix = lang === 'en' ? '/en' : '';
  if (page === 'home') return prefix || '/';
  return `${prefix}/${PAGE_SLUGS[page]}`;
}

/** Convenience: build path for the projects landing. */
export function buildPortfolioPath(lang: Lang): string {
  return buildPagePath('projects', lang);
}

/**
 * Parse a pathname and return what it represents.
 */
export type ParsedRoute =
  | { kind: 'home'; lang: Lang }
  | { kind: 'contact'; lang: Lang }
  | { kind: 'lessons'; lang: Lang }
  | { kind: 'portfolio'; lang: Lang }
  | { kind: 'portfolio-category'; tab: PortfolioTab; lang: Lang }
  | { kind: 'other'; lang: Lang };

export function parseRoute(pathname: string): ParsedRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const isEn = clean === '/en' || clean.startsWith('/en/');
  const lang: Lang = isEn ? 'en' : 'de';
  // Strip /en prefix to normalise.
  const stripped = isEn ? (clean === '/en' ? '/' : clean.slice(3)) : clean;

  if (stripped === '/' || stripped === '') {
    return { kind: 'home', lang };
  }

  // /projects, /projects/:slug (or legacy bases)
  const baseAlt = ['projects', 'projekte', 'portfolio'].join('|');
  const portfolioLanding = stripped.match(new RegExp(`^/(?:${baseAlt})$`));
  if (portfolioLanding) return { kind: 'portfolio', lang };

  const portfolioCategory = stripped.match(new RegExp(`^/(?:${baseAlt})/([^/]+)$`));
  if (portfolioCategory) {
    const slug = portfolioCategory[1];
    const tab = (Object.keys(PORTFOLIO_SLUGS) as PortfolioTab[]).find(
      (t) => PORTFOLIO_SLUGS[t].de === slug || PORTFOLIO_SLUGS[t].en === slug,
    );
    if (tab) return { kind: 'portfolio-category', tab, lang };
  }

  if (stripped === '/contact' || stripped === '/kontakt') {
    return { kind: 'contact', lang };
  }

  if (stripped === '/vocal-coaching' || stripped === '/unterricht' || stripped === '/lessons') {
    return { kind: 'lessons', lang };
  }

  return { kind: 'other', lang };
}

/**
 * Given the current pathname and a target language, return the equivalent
 * pathname in that language.
 */
export function localizedCounterpart(pathname: string, target: Lang): string {
  const parsed = parseRoute(pathname);
  switch (parsed.kind) {
    case 'home':
      return buildPagePath('home', target);
    case 'contact':
      return buildPagePath('contact', target);
    case 'lessons':
      return buildPagePath('lessons', target);
    case 'portfolio':
      return buildPortfolioPath(target);
    case 'portfolio-category':
      return buildCategoryPath(parsed.tab, target);
    default:
      // For impressum/privacy etc. — keep path as-is.
      return pathname;
  }
}

/** All localized canonical paths (DE + EN counterparts). */
export function allLocalizedPaths(): { de: string; en: string }[] {
  const pages: PageId[] = ['home', 'contact', 'lessons', 'projects'];
  const out: { de: string; en: string }[] = pages.map((p) => ({
    de: buildPagePath(p, 'de'),
    en: buildPagePath(p, 'en'),
  }));
  PORTFOLIO_TABS.forEach((entry) => {
    out.push({
      de: buildCategoryPath(entry.tab, 'de'),
      en: buildCategoryPath(entry.tab, 'en'),
    });
  });
  return out;
}

// Re-exports for backwards compatibility.
export { buildCategoryPath, PORTFOLIO_BASE };

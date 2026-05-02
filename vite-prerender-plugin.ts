import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";

/**
 * Lightweight build-time prerender for our SPA.
 *
 * Vite outputs a single index.html. Crawlers (Screaming Frog, etc.) that don't
 * execute JS therefore see identical HTML for every route -> "Exact Duplicates",
 * "Duplicate Page Titles", "H1 Missing", etc.
 *
 * This plugin emits an additional index.html per known route with:
 *   - unique <title>
 *   - unique <meta name="description">
 *   - unique <link rel="canonical">
 *   - unique og:title / og:description / og:url
 *   - hreflang alternates (de + en + x-default)
 *   - a visible <h1> + intro paragraph inside #root (replaced by React on hydrate)
 *
 * The user-visible UI is unchanged because React replaces #root on mount.
 */

type Lang = "de" | "en";

interface RouteMeta {
  /** Pretty path used inside <link rel="canonical">. */
  path: string;
  /** Output directory under dist (e.g. "portfolio" → dist/portfolio/index.html). */
  outDir: string;
  title: { de: string; en: string };
  description: { de: string; en: string };
  h1: { de: string; en: string };
  intro: { de: string; en: string };
  /**
   * For non-category routes, the same HTML shell serves both languages so
   * canonical points at the DE URL. For category routes, each language has
   * its own dedicated URL — overrides supplied below.
   */
  alternates?: { de: string; en: string };
  /** When set, canonical = this URL (instead of the default DE path). */
  canonicalOverride?: { de: string; en: string };
}

const SITE_ORIGIN = "https://jovana-kokor-stage-art.lovable.app";

const ROUTES: RouteMeta[] = [
  {
    path: "/",
    outDir: "",
    title: {
      de: "JoyWanna – Pianistin, Sängerin & Pädagogin | Deutschland",
      en: "Jovana Kokor – Pianist, Vocalist & Educator | Germany",
    },
    description: {
      de: "Jovana Kokor: Klassische Pianistin, Sängerin & Musikpädagogin in Deutschland. Buchungen für Konzerte, Events & Privatunterricht. Jetzt Termin anfragen!",
      en: "Germany-based classical pianist & vocal artist Jovana Kokor. Concerts, corporate events & private piano and vocal lessons across Germany & Europe.",
    },
    h1: {
      de: "Jovana Kokor – Pianistin, Sängerin & Musikpädagogin",
      en: "Jovana Kokor – Pianist, Vocalist & Music Educator",
    },
    intro: {
      de: "Offizielle Webseite von Jovana Kokor (JoyWanna). Klassisch ausgebildete Pianistin und Vokalkünstlerin mit Sitz in Deutschland. Buchungen für Konzerte, Firmenevents, Hochzeiten sowie privater Klavier- und Gesangsunterricht.",
      en: "Official website of Jovana Kokor (JoyWanna). Germany-based classical pianist and vocal artist. Available for concerts, corporate events, weddings and private piano and vocal lessons.",
    },
  },
  {
    path: "/portfolio",
    outDir: "portfolio",
    title: {
      de: "Portfolio – JoyWanna | Visuelle Arbeiten, Live-Auftritte & Presse",
      en: "Portfolio – JoyWanna | Visual Work, Live Shows & Press",
    },
    description: {
      de: "Portfolio von Jovana Kokor (JoyWanna): visuelle Arbeiten, Live-Auftritte und Pressestimmen aus Deutschland und Europa. Jetzt Bühnenmomente entdecken.",
      en: "Portfolio of Jovana Kokor (JoyWanna): visual work, live shows and press features from Germany and Europe. Explore stage moments and recent highlights.",
    },
    h1: {
      de: "Portfolio von Jovana Kokor",
      en: "Portfolio of Jovana Kokor",
    },
    intro: {
      de: "Eine Auswahl visueller Arbeiten, Live-Auftritte und Pressestimmen rund um die Bühnenarbeit von Jovana Kokor – Pianistin, Sängerin und Performerin aus Deutschland.",
      en: "A curated selection of visual work, live performances and press features documenting the stage work of Jovana Kokor – pianist, vocalist and performer based in Germany.",
    },
  },
  {
    path: "/impressum",
    outDir: "impressum",
    title: {
      de: "Impressum – Jovana Kokor (JoyWanna)",
      en: "Imprint – Jovana Kokor (JoyWanna)",
    },
    description: {
      de: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG für die Webseite von Jovana Kokor (JoyWanna).",
      en: "Legal notice and provider information for the website of Jovana Kokor (JoyWanna).",
    },
    h1: {
      de: "Impressum",
      en: "Imprint",
    },
    intro: {
      de: "Anbieterkennzeichnung gemäß § 5 TMG und § 55 RStV für die Webseite von Jovana Kokor (JoyWanna), Oldenburg, Deutschland.",
      en: "Provider information and legal notice for the website of Jovana Kokor (JoyWanna), Oldenburg, Germany.",
    },
  },
  {
    path: "/privacy",
    outDir: "privacy",
    title: {
      de: "Datenschutz – Jovana Kokor (JoyWanna)",
      en: "Privacy Policy – Jovana Kokor (JoyWanna)",
    },
    description: {
      de: "Datenschutzerklärung gemäß DSGVO für die Webseite von Jovana Kokor (JoyWanna).",
      en: "GDPR-compliant privacy policy for the website of Jovana Kokor (JoyWanna).",
    },
    h1: {
      de: "Datenschutzerklärung",
      en: "Privacy Policy",
    },
    intro: {
      de: "Informationen zur Verarbeitung personenbezogener Daten auf der Webseite von Jovana Kokor (JoyWanna) gemäß Datenschutz-Grundverordnung (DSGVO).",
      en: "Information about how personal data is processed on the website of Jovana Kokor (JoyWanna), in line with the EU General Data Protection Regulation (GDPR).",
    },
  },
];

/**
 * Localized one-page section routes (DE + EN). Each is a dedicated
 * crawlable URL with unique title/description/canonical/hreflang. The
 * client-side Index page reads the URL on mount and scrolls to the
 * matching section, so users still see the one-page experience.
 */
interface SectionLocalizedRoute {
  section: "home" | "about" | "lessons" | "contact";
  slug: { de: string; en: string }; // "" for home
  title: { de: string; en: string };
  description: { de: string; en: string };
  h1: { de: string; en: string };
  intro: { de: string; en: string };
}

const SECTION_ROUTES: SectionLocalizedRoute[] = [
  {
    section: "home",
    slug: { de: "", en: "" },
    title: {
      de: "JoyWanna – Pianistin, Sängerin & Pädagogin | Deutschland",
      en: "Jovana Kokor – Pianist, Vocalist & Educator | Germany",
    },
    description: {
      de: "Jovana Kokor: Klassische Pianistin, Sängerin & Musikpädagogin in Deutschland. Buchungen für Konzerte, Events & Privatunterricht. Jetzt Termin anfragen!",
      en: "Germany-based classical pianist & vocal artist Jovana Kokor. Concerts, corporate events & private piano and vocal lessons across Germany & Europe.",
    },
    h1: {
      de: "Jovana Kokor – Pianistin, Sängerin & Musikpädagogin",
      en: "Jovana Kokor – Pianist, Vocalist & Music Educator",
    },
    intro: {
      de: "Offizielle Webseite von Jovana Kokor (JoyWanna). Klassisch ausgebildete Pianistin und Vokalkünstlerin mit Sitz in Deutschland.",
      en: "Official website of Jovana Kokor (JoyWanna). Germany-based classical pianist and vocal artist.",
    },
  },
  {
    section: "about",
    slug: { de: "ueber-mich", en: "about-me" },
    title: {
      de: "Über mich – Jovana Kokor (JoyWanna) | Pianistin & Sängerin",
      en: "About – Jovana Kokor (JoyWanna) | Pianist & Vocalist",
    },
    description: {
      de: "Über Jovana Kokor (JoyWanna): Pianistin und Sängerin aus Oldenburg, Jazz, Latin & NeoSoul – Werdegang, Bands und musikalische Vision.",
      en: "About Jovana Kokor (JoyWanna): pianist and vocalist based in Oldenburg, Germany. Jazz, Latin & NeoSoul background, bands and musical vision.",
    },
    h1: {
      de: "Über mich – Jovana Kokor",
      en: "About – Jovana Kokor",
    },
    intro: {
      de: "Pianistin und Sängerin Jovana Kokor (JoyWanna) – Werdegang, Bands und musikalische Vision aus Oldenburg.",
      en: "Pianist and vocalist Jovana Kokor (JoyWanna) – background, bands and musical vision based in Oldenburg, Germany.",
    },
  },
  {
    section: "lessons",
    slug: { de: "unterricht", en: "lessons" },
    title: {
      de: "Unterricht – Klavier & Vocal Coaching | Jovana Kokor",
      en: "Lessons – Piano & Vocal Coaching | Jovana Kokor",
    },
    description: {
      de: "Klavier- und Gesangsunterricht mit Jovana Kokor (JoyWanna): individuelles Vocal Coaching und Klavierunterricht für alle Altersgruppen, online & vor Ort.",
      en: "Piano lessons and vocal coaching with Jovana Kokor (JoyWanna): tailored sessions for every age and level, available online and in person.",
    },
    h1: {
      de: "Klavierunterricht & Vocal Coaching",
      en: "Piano Lessons & Vocal Coaching",
    },
    intro: {
      de: "Individueller Klavier- und Gesangsunterricht mit Jovana Kokor – online und vor Ort, für alle Altersgruppen und Niveaus.",
      en: "Individual piano lessons and vocal coaching with Jovana Kokor – online and in person, for every age and level.",
    },
  },
  {
    section: "contact",
    slug: { de: "kontakt", en: "contact" },
    title: {
      de: "Kontakt & Booking – Jovana Kokor (JoyWanna)",
      en: "Contact & Booking – Jovana Kokor (JoyWanna)",
    },
    description: {
      de: "Kontakt und Booking-Anfragen für Jovana Kokor (JoyWanna): Konzerte, Firmenevents, Hochzeiten und Privatunterricht. Jetzt unverbindlich anfragen.",
      en: "Contact and booking enquiries for Jovana Kokor (JoyWanna): concerts, corporate events, weddings and private lessons. Get in touch today.",
    },
    h1: {
      de: "Kontakt & Booking",
      en: "Contact & Booking",
    },
    intro: {
      de: "Anfragen für Konzerte, Firmenevents, Hochzeiten und Privatunterricht – Jovana Kokor (JoyWanna), Oldenburg, Deutschland.",
      en: "Enquiries for concerts, corporate events, weddings and private lessons – Jovana Kokor (JoyWanna), Oldenburg, Germany.",
    },
  },
];

// Expand each section into one prerendered page per language (locale-prefixed).
for (const s of SECTION_ROUTES) {
  const dePath = s.slug.de ? `/de/${s.slug.de}` : `/de/`;
  const enPath = s.slug.en ? `/en/${s.slug.en}` : `/en/`;
  const alternates = { de: dePath, en: enPath };
  const deOutDir = s.slug.de ? `de/${s.slug.de}` : `de`;
  const enOutDir = s.slug.en ? `en/${s.slug.en}` : `en`;

  ROUTES.push({
    path: dePath,
    outDir: deOutDir,
    title: s.title,
    description: s.description,
    h1: s.h1,
    intro: s.intro,
    alternates,
    canonicalOverride: alternates,
  });
  ROUTES.push({
    path: enPath,
    outDir: enOutDir,
    title: s.title,
    description: s.description,
    h1: s.h1,
    intro: s.intro,
    alternates,
    canonicalOverride: alternates,
  });
}

// Localized portfolio landings (/de/portfolio, /en/portfolio).
{
  const dePath = "/de/portfolio";
  const enPath = "/en/portfolio";
  const alternates = { de: dePath, en: enPath };
  const portfolioMeta = {
    title: {
      de: "Portfolio – JoyWanna | Visuelle Arbeiten, Live-Auftritte & Presse",
      en: "Portfolio – JoyWanna | Visual Work, Live Shows & Press",
    },
    description: {
      de: "Portfolio von Jovana Kokor (JoyWanna): visuelle Arbeiten, Live-Auftritte und Pressestimmen aus Deutschland und Europa. Jetzt Bühnenmomente entdecken.",
      en: "Portfolio of Jovana Kokor (JoyWanna): visual work, live shows and press features from Germany and Europe. Explore stage moments and recent highlights.",
    },
    h1: {
      de: "Portfolio von Jovana Kokor",
      en: "Portfolio of Jovana Kokor",
    },
    intro: {
      de: "Eine Auswahl visueller Arbeiten, Live-Auftritte und Pressestimmen rund um die Bühnenarbeit von Jovana Kokor.",
      en: "A curated selection of visual work, live performances and press features documenting the stage work of Jovana Kokor.",
    },
  };
  ROUTES.push({
    path: dePath,
    outDir: "de/portfolio",
    ...portfolioMeta,
    alternates,
    canonicalOverride: alternates,
  });
  ROUTES.push({
    path: enPath,
    outDir: "en/portfolio",
    ...portfolioMeta,
    alternates,
    canonicalOverride: alternates,
  });
}
interface CategoryRoute {
  tab: "visual" | "shows" | "press";
  slug: { de: string; en: string };
  title: { de: string; en: string };
  description: { de: string; en: string };
  h1: { de: string; en: string };
  intro: { de: string; en: string };
}

const CATEGORY_ROUTES: CategoryRoute[] = [
  {
    tab: "visual",
    slug: { de: "visuelle-arbeiten", en: "visual-work" },
    title: {
      de: "Visuelle Arbeiten – Portfolio | JoyWanna · Jovana Kokor",
      en: "Visual Work – Portfolio | JoyWanna · Jovana Kokor",
    },
    description: {
      de: "Visuelle Arbeiten von Jovana Kokor (JoyWanna): Bühnenmomente, Bandfotografie und Künstlerporträts aus Konzerten in Deutschland und Europa.",
      en: "Visual work by Jovana Kokor (JoyWanna): stage moments, band photography and artist portraits from concerts across Germany and Europe.",
    },
    h1: {
      de: "Visuelle Arbeiten – Bühnenmomente & Künstlerporträts",
      en: "Visual Work – Stage Moments & Artist Portraits",
    },
    intro: {
      de: "Eine Auswahl visueller Arbeiten von Jovana Kokor – Live-Bühnenmomente, Bandfotografie und Künstlerporträts aus Konzerten in Deutschland und Europa.",
      en: "A selection of visual work by Jovana Kokor – live stage moments, band photography and artist portraits from concerts across Germany and Europe.",
    },
  },
  {
    tab: "shows",
    slug: { de: "live-auftritte", en: "live-shows" },
    title: {
      de: "Live-Auftritte – Portfolio | JoyWanna · Jovana Kokor",
      en: "Live Shows – Portfolio | JoyWanna · Jovana Kokor",
    },
    description: {
      de: 'Live-Auftritte von JoyWanna – Solo, mit „The Spicy Jam" und in der „Reimagined"-Reihe für Stimme und Klavier. Konzertvideos & Highlights.',
      en: 'Live performances by JoyWanna – solo, with "The Spicy Jam" and in the "Reimagined" voice & piano series. Concert videos & highlights.',
    },
    h1: {
      de: "Live-Auftritte – Konzerte, Bands & Sessions",
      en: "Live Shows – Concerts, Bands & Sessions",
    },
    intro: {
      de: 'Ausgewählte Live-Auftritte von JoyWanna – Solo, mit „The Spicy Jam" und in der „Reimagined"-Reihe für Stimme und Klavier.',
      en: 'Selected live performances by JoyWanna – solo, with "The Spicy Jam" and in the "Reimagined" voice & piano series.',
    },
  },
  {
    tab: "press",
    slug: { de: "presse", en: "press" },
    title: {
      de: "Presse – Portfolio | JoyWanna · Jovana Kokor",
      en: "Press – Portfolio | JoyWanna · Jovana Kokor",
    },
    description: {
      de: "Presseberichte aus Zeitungen und Magazinen über JoyWanna, ihre Konzerte und ihren musikalischen Werdegang in Deutschland und Europa.",
      en: "Press features from newspapers and magazines about JoyWanna, her concerts and her musical journey across Germany and Europe.",
    },
    h1: {
      de: "Presse – Zeitungs- & Magazinberichte",
      en: "Press – Newspaper & Magazine Features",
    },
    intro: {
      de: "Ausgewählte Presseberichte aus Zeitungen und Magazinen über JoyWanna, ihre Konzerte und ihren musikalischen Werdegang.",
      en: "Selected press features from newspapers and magazines covering JoyWanna, her concerts and her musical journey.",
    },
  },
];

// Expand each category into one RouteMeta per language with cross-linked
// hreflang counterparts.
for (const c of CATEGORY_ROUTES) {
  const dePath = `/de/portfolio/${c.slug.de}`;
  const enPath = `/en/portfolio/${c.slug.en}`;
  const alternates = { de: dePath, en: enPath };

  ROUTES.push({
    path: dePath,
    outDir: `de/portfolio/${c.slug.de}`,
    title: c.title,
    description: c.description,
    h1: c.h1,
    intro: c.intro,
    alternates,
    canonicalOverride: alternates,
  });
  ROUTES.push({
    path: enPath,
    outDir: `en/portfolio/${c.slug.en}`,
    title: c.title,
    description: c.description,
    h1: c.h1,
    intro: c.intro,
    alternates,
    canonicalOverride: alternates,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildLangQuery(routePath: string, lang: Lang): string {
  if (lang === "de") return routePath === "/" ? "/" : routePath;
  const sep = routePath.includes("?") ? "&" : "?";
  return `${routePath}${sep}lang=en`;
}

function rewriteHtml(template: string, route: RouteMeta, lang: Lang): string {
  const title = route.title[lang];
  const description = route.description[lang];
  const h1 = route.h1[lang];
  const intro = route.intro[lang];

  // Determine the DE/EN paths for canonical + hreflang. Category routes
  // supply explicit `alternates` (locale-prefixed paths); other routes use
  // the legacy ?lang=en pattern on a single shared path.
  const dePath = route.alternates ? route.alternates.de : buildLangQuery(route.path, "de");
  const enPath = route.alternates ? route.alternates.en : buildLangQuery(route.path, "en");

  // Canonical: per-language for category routes (each lang is its own page);
  // DE-only for plain routes (same shell serves both languages).
  const canonicalPath = route.canonicalOverride
    ? route.canonicalOverride[lang]
    : dePath;

  const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;
  const deUrl = `${SITE_ORIGIN}${dePath}`;
  const enUrl = `${SITE_ORIGIN}${enPath}`;

  let html = template;

  // <html lang="...">
  html = html.replace(/<html lang="[^"]*"/i, `<html lang="${lang}"`);

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  // meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}">`
  );

  // og:title / og:description / twitter:title / twitter:description
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(title)}">`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}">`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`
  );

  // og:locale
  html = html.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:locale" content="${lang === "en" ? "en_US" : "de_DE"}">`
  );

  // Inject canonical, hreflang, og:url right before </head>.
  // Remove any existing canonical/hreflang/og:url first to avoid duplicates.
  html = html
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:url"[^>]*>\s*/gi, "");

  const headInjection = [
    `<link rel="canonical" href="${canonicalUrl}">`,
    `<link rel="alternate" hreflang="de" href="${deUrl}">`,
    `<link rel="alternate" hreflang="en" href="${enUrl}">`,
    `<link rel="alternate" hreflang="x-default" href="${deUrl}">`,
    `<meta property="og:url" content="${canonicalUrl}">`,
  ].join("\n    ");

  html = html.replace(/<\/head>/i, `    ${headInjection}\n  </head>`);

  // Replace <div id="root"></div> with crawler-visible content.
  // React will overwrite this on mount, so users see no change.
  const crawlerBody = `<div id="root"><main><h1>${escapeHtml(h1)}</h1><p>${escapeHtml(intro)}</p></main></div>`;
  html = html.replace(/<div id="root"><\/div>/i, crawlerBody);

  return html;
}

export function prerenderPlugin(): Plugin {
  return {
    name: "joywanna-prerender",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve(process.cwd(), "dist");
      const indexPath = path.join(distDir, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const template = fs.readFileSync(indexPath, "utf8");

      for (const route of ROUTES) {
        // Locale-prefixed routes (e.g. /en/portfolio/press) must render in
        // their own language; everything else uses DE as the static shell
        // (React swaps copy at runtime when ?lang=en is set).
        const lang: Lang = route.path.startsWith("/en/") ? "en" : "de";
        const html = rewriteHtml(template, route, lang);
        const targetDir = route.outDir ? path.join(distDir, route.outDir) : distDir;
        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf8");
      }
    },
  };
}

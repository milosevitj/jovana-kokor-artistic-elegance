import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";

/**
 * Lightweight build-time prerender for our SPA.
 *
 * Emits one HTML shell per known route with unique title/description/canonical/
 * hreflang + a visible <h1> + intro inside #root (replaced by React on hydrate).
 *
 * New simplified URL structure:
 *   /                  → DE home (canonical)
 *   /en                → EN home
 *   /vocal-coaching    → DE vocal coaching
 *   /en/vocal-coaching → EN vocal coaching
 *   /contact, /en/contact
 *   /projects, /en/projects, plus /projects/:category × DE+EN
 *   /reimagined, /en/reimagined
 *   /impressum, /privacy
 */

type Lang = "de" | "en";

interface RouteMeta {
  /** Canonical path (no trailing slash). */
  path: string;
  /** Output directory under dist (e.g. "vocal-coaching" → dist/vocal-coaching/index.html). */
  outDir: string;
  /** Language this prerendered shell is for. */
  lang: Lang;
  /** Alternates for hreflang (DE + EN counterparts). */
  alternates: { de: string; en: string };
  title: string;
  description: string;
  h1: string;
  intro: string;
}

const SITE_ORIGIN = "https://jovana-kokor-stage-art.lovable.app";

interface LocalizedPage {
  /** Path segment after the optional language prefix. "" for home. */
  slug: string;
  outBase: string; // dir name under dist for DE
  enOutBase: string; // dir name under dist for EN (under "en/")
  title: { de: string; en: string };
  description: { de: string; en: string };
  h1: { de: string; en: string };
  intro: { de: string; en: string };
}

const PAGES: LocalizedPage[] = [
  {
    slug: "",
    outBase: "",
    enOutBase: "",
    title: {
      de: "JoyWanna – Pianistin, Sängerin & Pädagogin | Deutschland",
      en: "Jovana Kokor – Pianist, Vocalist & Educator | Germany",
    },
    description: {
      de: "Jovana Kokor: Klassische Pianistin, Sängerin & Musikpädagogin in Deutschland. Buchungen für Konzerte, Events & Privatunterricht.",
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
    slug: "vocal-coaching",
    outBase: "vocal-coaching",
    enOutBase: "vocal-coaching",
    title: {
      de: "Vocal Coaching – Klavier & Stimmunterricht | Jovana Kokor",
      en: "Vocal Coaching – Voice & Piano Lessons | Jovana Kokor",
    },
    description: {
      de: "Vocal Coaching mit Jovana Kokor (JoyWanna): individueller Gesangs- und Klavierunterricht für alle Altersgruppen, online & vor Ort.",
      en: "Vocal coaching with Jovana Kokor (JoyWanna): tailored voice and piano sessions for every age and level, online and in person.",
    },
    h1: {
      de: "Vocal Coaching & Klavierunterricht",
      en: "Vocal Coaching & Piano Lessons",
    },
    intro: {
      de: "Individuelles Vocal Coaching und Klavierunterricht mit Jovana Kokor – online und vor Ort, für alle Altersgruppen und Niveaus.",
      en: "Individual vocal coaching and piano lessons with Jovana Kokor – online and in person, for every age and level.",
    },
  },
  {
    slug: "contact",
    outBase: "contact",
    enOutBase: "contact",
    title: {
      de: "Kontakt & Booking – Jovana Kokor (JoyWanna)",
      en: "Contact & Booking – Jovana Kokor (JoyWanna)",
    },
    description: {
      de: "Kontakt und Booking-Anfragen für Jovana Kokor (JoyWanna): Konzerte, Firmenevents, Hochzeiten und Privatunterricht.",
      en: "Contact and booking enquiries for Jovana Kokor (JoyWanna): concerts, corporate events, weddings and private lessons.",
    },
    h1: { de: "Kontakt & Booking", en: "Contact & Booking" },
    intro: {
      de: "Anfragen für Konzerte, Firmenevents, Hochzeiten und Privatunterricht – Jovana Kokor (JoyWanna), Oldenburg.",
      en: "Enquiries for concerts, corporate events, weddings and private lessons – Jovana Kokor (JoyWanna), Oldenburg, Germany.",
    },
  },
  {
    slug: "projects",
    outBase: "projects",
    enOutBase: "projects",
    title: {
      de: "Projekte – JoyWanna | Visuelle Arbeiten, Live-Auftritte & Presse",
      en: "Projects – JoyWanna | Visual Work, Live Shows & Press",
    },
    description: {
      de: "Projekte von Jovana Kokor (JoyWanna): visuelle Arbeiten, Live-Auftritte und Pressestimmen aus Deutschland und Europa.",
      en: "Projects of Jovana Kokor (JoyWanna): visual work, live shows and press features from Germany and Europe.",
    },
    h1: { de: "Projekte von Jovana Kokor", en: "Projects of Jovana Kokor" },
    intro: {
      de: "Eine Auswahl visueller Arbeiten, Live-Auftritte und Pressestimmen rund um die Bühnenarbeit von Jovana Kokor.",
      en: "A curated selection of visual work, live performances and press features documenting the stage work of Jovana Kokor.",
    },
  },
  {
    slug: "reimagined",
    outBase: "reimagined",
    enOutBase: "reimagined",
    title: {
      de: "Reimagined – Jovana Kokor (JoyWanna) | Album streamen",
      en: "Reimagined – Jovana Kokor (JoyWanna) | Stream the Album",
    },
    description: {
      de: 'Höre „Reimagined" von Jovana Kokor (JoyWanna) auf Spotify, Apple Music, Deezer, YouTube Music, Tidal und Amazon Music.',
      en: 'Listen to "Reimagined" by Jovana Kokor (JoyWanna) on Spotify, Apple Music, Deezer, YouTube Music, Tidal and Amazon Music.',
    },
    h1: { de: "Reimagined – Jovana Kokor", en: "Reimagined – Jovana Kokor" },
    intro: {
      de: 'Wähle deinen bevorzugten Streaming-Dienst, um „Reimagined" anzuhören.',
      en: 'Choose your preferred streaming service to listen to "Reimagined".',
    },
  },
];

interface CategoryPage {
  slug: string; // unified across both languages
  title: { de: string; en: string };
  description: { de: string; en: string };
  h1: { de: string; en: string };
  intro: { de: string; en: string };
}

const CATEGORY_PAGES: CategoryPage[] = [
  {
    slug: "photoshoot",
    title: {
      de: "Fotoshooting – Projekte | JoyWanna · Jovana Kokor",
      en: "Photoshoot – Projects | JoyWanna · Jovana Kokor",
    },
    description: {
      de: "Fotoshooting-Aufnahmen von Jovana Kokor (JoyWanna): Künstlerporträts und Bandfotografie aus Studio und Bühne.",
      en: "Photoshoot images of Jovana Kokor (JoyWanna): artist portraits and band photography from studio and stage.",
    },
    h1: {
      de: "Fotoshooting – Künstlerporträts & Bandfotografie",
      en: "Photoshoot – Artist Portraits & Band Photography",
    },
    intro: {
      de: "Eine Auswahl an Fotoshooting-Aufnahmen von JoyWanna – Künstlerporträts und Bandfotografie.",
      en: "A selection of photoshoot images of JoyWanna – artist portraits and band photography.",
    },
  },
  {
    slug: "stage-moments",
    title: {
      de: "Bühnenmomente – Projekte | JoyWanna · Jovana Kokor",
      en: "Stage Moments – Projects | JoyWanna · Jovana Kokor",
    },
    description: {
      de: 'Bühnenmomente von JoyWanna – Solo, mit „The Spicy Jam" und in der „Reimagined"-Reihe für Stimme und Klavier.',
      en: 'Stage moments by JoyWanna – solo, with "The Spicy Jam" and in the "Reimagined" voice & piano series.',
    },
    h1: {
      de: "Bühnenmomente – Konzerte, Bands & Sessions",
      en: "Stage Moments – Concerts, Bands & Sessions",
    },
    intro: {
      de: "Ausgewählte Bühnenmomente von JoyWanna – Solo, mit Band und in der Reimagined-Reihe.",
      en: "Selected stage moments by JoyWanna – solo, with band and in the Reimagined series.",
    },
  },
  {
    slug: "press",
    title: {
      de: "Presse – Projekte | JoyWanna · Jovana Kokor",
      en: "Press – Projects | JoyWanna · Jovana Kokor",
    },
    description: {
      de: "Presseberichte aus Zeitungen und Magazinen über JoyWanna, ihre Konzerte und ihren musikalischen Werdegang.",
      en: "Press features from newspapers and magazines about JoyWanna, her concerts and her musical journey.",
    },
    h1: {
      de: "Presse – Zeitungs- & Magazinberichte",
      en: "Press – Newspaper & Magazine Features",
    },
    intro: {
      de: "Ausgewählte Presseberichte aus Zeitungen und Magazinen über JoyWanna.",
      en: "Selected press features from newspapers and magazines covering JoyWanna.",
    },
  },
];

const ROUTES: RouteMeta[] = [];

for (const p of PAGES) {
  const dePath = p.slug ? `/${p.slug}` : "/";
  const enPath = p.slug ? `/en/${p.slug}` : "/en";
  const alternates = { de: dePath, en: enPath };

  ROUTES.push({
    path: dePath,
    outDir: p.outBase,
    lang: "de",
    alternates,
    title: p.title.de,
    description: p.description.de,
    h1: p.h1.de,
    intro: p.intro.de,
  });
  ROUTES.push({
    path: enPath,
    outDir: p.enOutBase ? `en/${p.enOutBase}` : "en",
    lang: "en",
    alternates,
    title: p.title.en,
    description: p.description.en,
    h1: p.h1.en,
    intro: p.intro.en,
  });
}

for (const c of CATEGORY_PAGES) {
  const dePath = `/projects/${c.slug}`;
  const enPath = `/en/projects/${c.slug}`;
  const alternates = { de: dePath, en: enPath };

  ROUTES.push({
    path: dePath,
    outDir: `projects/${c.slug}`,
    lang: "de",
    alternates,
    title: c.title.de,
    description: c.description.de,
    h1: c.h1.de,
    intro: c.intro.de,
  });
  ROUTES.push({
    path: enPath,
    outDir: `en/projects/${c.slug}`,
    lang: "en",
    alternates,
    title: c.title.en,
    description: c.description.en,
    h1: c.h1.en,
    intro: c.intro.en,
  });
}

// Legal pages — DE-only canonical, same shell for both languages.
ROUTES.push(
  {
    path: "/impressum",
    outDir: "impressum",
    lang: "de",
    alternates: { de: "/impressum", en: "/impressum" },
    title: "Impressum – Jovana Kokor (JoyWanna)",
    description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG für die Webseite von Jovana Kokor (JoyWanna).",
    h1: "Impressum",
    intro: "Anbieterkennzeichnung gemäß § 5 TMG für die Webseite von Jovana Kokor (JoyWanna), Oldenburg, Deutschland.",
  },
  {
    path: "/privacy",
    outDir: "privacy",
    lang: "de",
    alternates: { de: "/privacy", en: "/privacy" },
    title: "Datenschutz – Jovana Kokor (JoyWanna)",
    description: "Datenschutzerklärung gemäß DSGVO für die Webseite von Jovana Kokor (JoyWanna).",
    h1: "Datenschutzerklärung",
    intro: "Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  },
);

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rewriteHtml(template: string, route: RouteMeta): string {
  const { title, description, h1, intro, lang, alternates } = route;
  const canonicalUrl = `${SITE_ORIGIN}${alternates[lang]}`;
  const deUrl = `${SITE_ORIGIN}${alternates.de}`;
  const enUrl = `${SITE_ORIGIN}${alternates.en}`;

  let html = template;

  html = html.replace(/<html lang="[^"]*"/i, `<html lang="${lang}"`);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}">`,
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
  );
  html = html.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:locale" content="${lang === "en" ? "en_US" : "de_DE"}">`,
  );

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
        const html = rewriteHtml(template, route);
        const targetDir = route.outDir ? path.join(distDir, route.outDir) : distDir;
        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf8");
      }
    },
  };
}

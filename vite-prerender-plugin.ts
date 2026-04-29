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
  path: string;            // e.g. "/portfolio"
  outDir: string;          // e.g. "portfolio" (relative to dist root)
  title: { de: string; en: string };
  description: { de: string; en: string };
  h1: { de: string; en: string };
  intro: { de: string; en: string };
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

  const dePath = buildLangQuery(route.path, "de");
  const enPath = buildLangQuery(route.path, "en");
  const canonicalPath = lang === "en" ? enPath : dePath;

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
        const html = rewriteHtml(template, route, "de");
        const targetDir = route.outDir ? path.join(distDir, route.outDir) : distDir;
        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf8");
      }
    },
  };
}

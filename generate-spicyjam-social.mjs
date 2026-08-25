import fs from 'fs';
import path from 'path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const indexPath = path.join(distDir, 'index.html');

/*
 * Existing Spicy Jam image from the project.
 *
 * If your real location is:
 * src/portfolio-new/joywanna-spicy-jam-in-our-element.webp
 *
 * instead of:
 * src/assets/portfolio-new/...
 *
 * then only change this path.
 */
const sourceImagePath = path.join(
  root,
  'src',
  'assets',
  'portfolio-new',
  'joywanna-spicy-jam-in-our-element.webp'
);

/*
 * We copy the image into dist with a stable public filename.
 * Social media crawlers need a real public URL.
 */
const socialImageFilename = 'joywanna-spicy-jam-social.webp';
const socialImageOutputPath = path.join(
  distDir,
  socialImageFilename
);

const socialImageUrl =
  `https://joywanna.com/${socialImageFilename}`;


/* -------------------------------------------------------
   CHECK BUILD
------------------------------------------------------- */

if (!fs.existsSync(indexPath)) {
  console.error(
    'ERROR: dist/index.html was not found. Run vite build first.'
  );

  process.exit(1);
}


/* -------------------------------------------------------
   COPY SOCIAL IMAGE
------------------------------------------------------- */

if (!fs.existsSync(sourceImagePath)) {
  console.error(
    `ERROR: Spicy Jam image was not found:\n${sourceImagePath}`
  );

  process.exit(1);
}

fs.copyFileSync(
  sourceImagePath,
  socialImageOutputPath
);

console.log(
  `Copied social image → /${socialImageFilename}`
);


/* -------------------------------------------------------
   READ ORIGINAL VITE HTML
------------------------------------------------------- */

const originalHtml = fs.readFileSync(
  indexPath,
  'utf8'
);


/* -------------------------------------------------------
   SEO DATA
------------------------------------------------------- */

const pages = [
  {
    outputPath: 'thespicyjam',

    lang: 'de',

    title:
      'JoyWanna & The Spicy Jam | Jazz, Latin, Soul & Pop',

    description:
      'JoyWanna & The Spicy Jam – Jazz, Latin, Soul und Pop mit Energie, Spielfreude und eigenem Charakter. Entdeckt die Band, Live-Momente und kommende Auftritte.',

    canonical:
      'https://joywanna.com/thespicyjam',

    alternate:
      'https://joywanna.com/en/thespicyjam',

    locale: 'de_DE',

    alternateLocale: 'en_US',
  },

  {
    outputPath: 'en/thespicyjam',

    lang: 'en',

    title:
      'JoyWanna & The Spicy Jam | Jazz, Latin, Soul & Pop',

    description:
      'JoyWanna & The Spicy Jam – jazz, Latin, soul and pop with energy, joy and a distinctive sound. Discover the band, live moments and upcoming shows.',

    canonical:
      'https://joywanna.com/en/thespicyjam',

    alternate:
      'https://joywanna.com/thespicyjam',

    locale: 'en_US',

    alternateLocale: 'de_DE',
  },
];


/* -------------------------------------------------------
   HELPERS
------------------------------------------------------- */

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}


function removeExistingMeta(html) {
  /*
   * Remove title.
   */
  html = html.replace(
    /<title>[\s\S]*?<\/title>/gi,
    ''
  );


  /*
   * Remove descriptions that may already exist
   * in the global index.html.
   */
  html = html.replace(
    /<meta[^>]+name=["']description["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+property=["']og:title["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+property=["']og:description["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+property=["']og:url["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+property=["']og:image["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+property=["']og:image:alt["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+property=["']og:locale["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+property=["']og:locale:alternate["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+name=["']twitter:title["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+name=["']twitter:description["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+name=["']twitter:image["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+name=["']twitter:image:alt["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+name=["']twitter:card["'][^>]*>/gi,
    ''
  );


  /*
   * Remove existing canonical and language links.
   */
  html = html.replace(
    /<link[^>]+rel=["']canonical["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<link[^>]+rel=["']alternate["'][^>]*>/gi,
    ''
  );

  return html;
}


/* -------------------------------------------------------
   GENERATE EACH ROUTE
------------------------------------------------------- */

for (const page of pages) {
  let html = removeExistingMeta(
    originalHtml
  );


  /*
   * Correct <html lang="">
   */
  html = html.replace(
    /<html([^>]*)lang=["'][^"']*["']([^>]*)>/i,
    `<html$1lang="${page.lang}"$2>`
  );


  const germanUrl =
    'https://joywanna.com/thespicyjam';

  const englishUrl =
    'https://joywanna.com/en/thespicyjam';


  const seoTags = `

    <!-- ============================================
         THE SPICY JAM — ROUTE SPECIFIC SEO
    ============================================= -->

    <title>${escapeHtml(page.title)}</title>

    <meta
      name="description"
      content="${escapeHtml(page.description)}"
    />

    <link
      rel="canonical"
      href="${page.canonical}"
    />

    <link
      rel="alternate"
      hreflang="de"
      href="${germanUrl}"
    />

    <link
      rel="alternate"
      hreflang="en"
      href="${englishUrl}"
    />

    <link
      rel="alternate"
      hreflang="x-default"
      href="${germanUrl}"
    />


    <!-- OPEN GRAPH -->

    <meta
      property="og:type"
      content="website"
    />

    <meta
      property="og:site_name"
      content="JoyWanna"
    />

    <meta
      property="og:title"
      content="${escapeHtml(page.title)}"
    />

    <meta
      property="og:description"
      content="${escapeHtml(page.description)}"
    />

    <meta
      property="og:url"
      content="${page.canonical}"
    />

    <meta
      property="og:locale"
      content="${page.locale}"
    />

    <meta
      property="og:locale:alternate"
      content="${page.alternateLocale}"
    />

    <meta
      property="og:image"
      content="${socialImageUrl}"
    />

    <meta
      property="og:image:alt"
      content="JoyWanna & The Spicy Jam"
    />


    <!-- TWITTER / X -->

    <meta
      name="twitter:card"
      content="summary_large_image"
    />

    <meta
      name="twitter:title"
      content="${escapeHtml(page.title)}"
    />

    <meta
      name="twitter:description"
      content="${escapeHtml(page.description)}"
    />

    <meta
      name="twitter:image"
      content="${socialImageUrl}"
    />

    <meta
      name="twitter:image:alt"
      content="JoyWanna & The Spicy Jam"
    />

    <!-- END THE SPICY JAM SEO -->

  `;


  html = html.replace(
    '</head>',
    `${seoTags}\n</head>`
  );


  /*
   * Create:
   *
   * dist/thespicyjam/index.html
   *
   * and
   *
   * dist/en/thespicyjam/index.html
   */

  const outputDirectory = path.join(
    distDir,
    page.outputPath
  );

  fs.mkdirSync(
    outputDirectory,
    {
      recursive: true,
    }
  );


  const outputFile = path.join(
    outputDirectory,
    'index.html'
  );


  fs.writeFileSync(
    outputFile,
    html,
    'utf8'
  );


  console.log(
    `Generated → /${page.outputPath}/index.html`
  );
}


console.log('');
console.log(
  'The Spicy Jam social metadata generated successfully.'
);
console.log('');
console.log(
  `Social image: ${socialImageUrl}`
);
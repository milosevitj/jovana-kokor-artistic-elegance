import fs from 'fs';
import path from 'path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const indexPath = path.join(distDir, 'index.html');

const socialImageUrl =
   'https://joywanna.com/joywanna-spicy-jam-social-v2.jpg';

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
   CHECK SOCIAL IMAGE
------------------------------------------------------- */

const socialImagePath = path.join(
  distDir,
  'joywanna-spicy-jam-social-v2.jpg'
);

if (!fs.existsSync(socialImagePath)) {
  console.error(
    'ERROR: joywanna-spicy-jam-social.jpg was not found in dist.'
  );
  console.error(
    'Make sure the image exists in public/joywanna-spicy-jam-social-v2.jpg'
  );
  process.exit(1);
}

console.log(
  'Social image found → /joywanna-spicy-jam-social-v2.jpg'
);

/* -------------------------------------------------------
   READ ORIGINAL VITE HTML
------------------------------------------------------- */

const originalHtml = fs.readFileSync(
  indexPath,
  'utf8'
);

/* -------------------------------------------------------
   THE SPICY JAM SEO DATA
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
  html = html.replace(
    /<title>[\s\S]*?<\/title>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+name=["']description["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+property=["']og:type["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+property=["']og:site_name["'][^>]*>/gi,
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
    /<meta[^>]+property=["']og:image:width["'][^>]*>/gi,
    ''
  );

  html = html.replace(
    /<meta[^>]+property=["']og:image:height["'][^>]*>/gi,
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
    /<meta[^>]+name=["']twitter:card["'][^>]*>/gi,
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
   URLs
------------------------------------------------------- */

const germanUrl =
  'https://joywanna.com/thespicyjam';

const englishUrl =
  'https://joywanna.com/en/thespicyjam';

/* -------------------------------------------------------
   GENERATE ROUTE-SPECIFIC HTML
------------------------------------------------------- */

for (const page of pages) {
  let html = removeExistingMeta(originalHtml);

  /* Correct document language */

  html = html.replace(
    /<html([^>]*)lang=["'][^"']*["']([^>]*)>/i,
    `<html$1lang="${page.lang}"$2>`
  );

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
      property="og:image:width"
      content="1200"
    />

    <meta
      property="og:image:height"
      content="630"
    />

    <meta
      property="og:image:alt"
      content="JoyWanna & The Spicy Jam live on stage"
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
      content="JoyWanna & The Spicy Jam live on stage"
    />

    <!-- END THE SPICY JAM SEO -->

  `;

  html = html.replace(
    '</head>',
    `${seoTags}\n</head>`
  );

  /* Create route directory */

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

  /* Write index.html */

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
)
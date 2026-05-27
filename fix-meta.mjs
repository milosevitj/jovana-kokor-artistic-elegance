import { readFileSync, writeFileSync } from 'fs';

const filePath = './dist/index.html';
let html = readFileSync(filePath, 'utf-8');

// Ukloni Lovable linkove
html = html.replace(/<link rel="canonical" href="https:\/\/jovana-kokor-stage-art\.lovable\.app[^"]*"[^>]*>\s*/g, '');
html = html.replace(/<link rel="alternate" hreflang="[^"]*" href="https:\/\/jovana-kokor-stage-art\.lovable\.app[^"]*"[^>]*>\s*/g, '');
html = html.replace(/<meta property="og:url" content="https:\/\/jovana-kokor-stage-art\.lovable\.app[^"]*"[^>]*>\s*/g, '');

// Ispravi og:title
html = html.replace(
  /<meta property="og:title" content="[^"]*">/g,
  '<meta property="og:title" content="JoyWanna – Sängerin &amp; Pianistin | Live-Musik, Konzerte &amp; Vocal Coaching">'
);

// Ispravi og:description
html = html.replace(
  /<meta property="og:description" content="[^"]*">/g,
  '<meta property="og:description" content="Vielseitige Bühnenkunst, künstlerischer Ausdruck und langjährige internationale Bühnenerfahrung – von großen Bühnen bis zu persönlichen Konzertmomenten.">'
);

// Ispravi twitter:title
html = html.replace(
  /<meta name="twitter:title" content="[^"]*">/g,
  '<meta name="twitter:title" content="JoyWanna – Sängerin &amp; Pianistin | Live-Musik, Konzerte &amp; Vocal Coaching">'
);

// Ispravi twitter:description
html = html.replace(
  /<meta name="twitter:description" content="[^"]*">/g,
  '<meta name="twitter:description" content="Vielseitige Bühnenkunst, künstlerischer Ausdruck und langjährige internationale Bühnenerfahrung – von großen Bühnen bis zu persönlichen Konzertmomenten.">'
);

writeFileSync(filePath, html, 'utf-8');
console.log('✅ fix-meta.mjs: Gotovo!');
import { useEffect, useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { SEOManager } from '@/components/SEOManager';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/components/ContactSection';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Play } from 'lucide-react';
import {
  PORTFOLIO_TABS,
  SLUG_TO_TAB,
  buildCategoryPath,
  type PortfolioTab,
} from '@/lib/portfolio-routes';
import heroImage from '@/assets/jovana-hero.jpeg';
import portraitImage from '@/assets/jovana-portrait.jpeg';
// Portfolio photo gallery (WebP optimized) – sourced from images-joywanna
import jw1 from '@/assets/portfolio-new/joywanna-night-to-remember-garnisonkirche-2025.webp';
import jw2 from '@/assets/portfolio-new/joywanna-spicy-jam-photoshoot-wilhelm13.webp';
import jw3 from '@/assets/portfolio-new/joywanna-sound-healing-nature.webp';
import jw4 from '@/assets/portfolio-new/joywanna-night-to-remember-benefit-2024.webp';
import jw7 from '@/assets/portfolio-new/joywanna-aida-nightfly-bar.webp';
import jw9 from '@/assets/portfolio-new/joywanna-leona-clemens-duo.webp';
import jw10 from '@/assets/portfolio-new/joywanna-reimagined-album.webp';
import jw12 from '@/assets/portfolio-new/joywanna-stage-playfulness.webp';
import jw13 from '@/assets/portfolio-new/joywanna-portrait-color-joy.webp';
import jw15 from '@/assets/portfolio-new/joywanna-queen-mode-glamour.webp';
import jw20 from '@/assets/portfolio-new/joywanna-sparkling-stage-moment.webp';
import jw36 from '@/assets/portfolio-new/joywanna-spicy-jam-in-our-element.webp';
import jw37 from '@/assets/portfolio-new/joywanna-spicy-jam-playful-side.webp';
import jw38 from '@/assets/portfolio-new/joywanna-aida-onboard-shows.webp';
import jw39 from '@/assets/portfolio-new/joywanna-some-sing-special-wilhelm13.webp';
import jw40 from '@/assets/portfolio-new/joywanna-jazzakademie-jade-concert.webp';
import jw41 from '@/assets/portfolio-new/joywanna-just-breathe-original-music.webp';
import jw42 from '@/assets/portfolio-new/joywanna-french-guy-serbian-girl-belgrade.webp';
import jw43 from '@/assets/portfolio-new/joywanna-angel-eyes-voice-piano.webp';
import jw44 from '@/assets/portfolio-new/joywanna-aida-onboard-dennie-blessing.webp';
import jw45 from '@/assets/portfolio-new/joywanna-just-voice-piano-esther-filly.webp';
import jw46 from '@/assets/portfolio-new/joywanna-jazz-vocal-studies-belgrade.webp';
// Press clippings (newspaper & magazine features) – sourced from joywanna-press
import press1 from '@/assets/press/joywanna-press-1.webp';
import press2 from '@/assets/press/joywanna-press-2.webp';
import press3 from '@/assets/press/joywanna-press-3.webp';
import press4 from '@/assets/press/joywanna-press-4.webp';
import press5 from '@/assets/press/joywanna-press-5.webp';
import press6 from '@/assets/press/joywanna-press-6.webp';

type PhotoEntry = {
  num: number;
  src: string;
  title: { de: string; en: string };
  description: { de: string; en: string };
  alt: { de: string; en: string };
};

// Intrinsic image dimensions — used as width/height attributes so the
// browser reserves the correct aspect-ratio space and the masonry grid
// does NOT shift when lazy-loaded images come in.
const photoDimensions: Record<number, { w: number; h: number }> = {
  1: { w: 1086, h: 724 },
  2: { w: 1600, h: 1066 },
  3: { w: 1600, h: 1068 },
  4: { w: 1600, h: 1066 },
  7: { w: 1206, h: 1020 },
  9: { w: 1280, h: 852 },
  10: { w: 1414, h: 1885 },
  12: { w: 946, h: 832 },
  13: { w: 697, h: 1126 },
  15: { w: 1600, h: 1652 },
  20: { w: 1600, h: 1066 },
  36: { w: 1600, h: 1066 },
  37: { w: 1600, h: 1066 },
  38: { w: 1440, h: 1800 },
  39: { w: 1037, h: 1512 },
  40: { w: 1440, h: 810 },
  41: { w: 1440, h: 1440 },
  42: { w: 1448, h: 2048 },
  43: { w: 1125, h: 782 },
  44: { w: 1600, h: 900 },
  45: { w: 1600, h: 952 },
  46: { w: 960, h: 642 },
};

const galleryPhotos: PhotoEntry[] = [
  {
    num: 1,
    src: jw1,
    title: { de: 'A Night to Remember', en: 'A Night to Remember' },
    description: {
      de: 'A Night to Remember – „Etwas andere Weihnachtskonzert" · Garnisonkirche Oldenburg, 2025. Für mich ein ganz besonderer Abend – getragen von Klang, Nähe und einem etwas anderen Weihnachtsgefühl.',
      en: 'A Night to Remember – "A different kind of Christmas concert" · Garnisonkirche Oldenburg, 2025. A truly special evening for me – carried by sound, closeness and a different kind of Christmas feeling.',
    },
    alt: {
      de: 'JoyWanna live beim Weihnachtskonzert „A Night to Remember" in der Garnisonkirche Oldenburg, 2025',
      en: 'JoyWanna performing live at the "A Night to Remember" Christmas concert at Garnisonkirche Oldenburg, 2025',
    },
  },
  {
    num: 2,
    src: jw2,
    title: { de: 'Spicy Jam Fotoshooting', en: 'Spicy Jam Photoshoot' },
    description: {
      de: 'Mit meinen liebenswerten Spicy Jam-ers beim Fotoshooting im Wilhelm 13, Oldenburg · Foto: Patrick Nagel.',
      en: 'With my lovely Spicy Jam-ers at the photoshoot at Wilhelm 13, Oldenburg · Photo: Patrick Nagel.',
    },
    alt: {
      de: 'Jovana Kokor mit JoyWanna & The Spicy Jam beim Bandfotoshooting im Wilhelm 13, Oldenburg',
      en: 'Jovana Kokor with JoyWanna & The Spicy Jam at a band photoshoot at Wilhelm 13, Oldenburg',
    },
  },
  {
    num: 3,
    src: jw3,
    title: { de: 'Klang & Natur', en: 'Sound & Nature' },
    description: {
      de: 'Musik, Klang, Natur und Sound Healing gehören für mich ganz selbstverständlich zusammen · Foto: Patrick Nagel.',
      en: 'Music, sound, nature and sound healing naturally belong together for me · Photo: Patrick Nagel.',
    },
    alt: {
      de: 'Jovana Kokor in der Natur – Sound Healing und Klangarbeit Porträt',
      en: 'Jovana Kokor in nature – sound healing and sound work portrait',
    },
  },
  {
    num: 4,
    src: jw4,
    title: { de: 'Benefizkonzert Garnisonkirche', en: 'Benefit Concert Garnisonkirche' },
    description: {
      de: 'A Night to Remember – das etwas andere Weihnachtskonzert und Benefizkonzert, organisiert von der bekannten Oldenburger Dragqueen Gina Solera · Garnisonkirche Oldenburg, 2024 · Foto: Patrick Nagel.',
      en: 'A Night to Remember – a different kind of Christmas and benefit concert, organised by the well-known Oldenburg drag queen Gina Solera · Garnisonkirche Oldenburg, 2024 · Photo: Patrick Nagel.',
    },
    alt: {
      de: 'JoyWanna beim Benefizkonzert „A Night to Remember" in der Garnisonkirche Oldenburg, 2024',
      en: 'JoyWanna at the "A Night to Remember" benefit concert at Garnisonkirche Oldenburg, 2024',
    },
  },
  {
    num: 7,
    src: jw7,
    title: { de: 'Sechs Jahre AIDA', en: 'Six Years on AIDA' },
    description: {
      de: 'Sechs wundervolle Jahre an Bord der AIDA – singend, spielend, die Welt bereisend und getragen von unzähligen besonderen Momenten in der Nightfly Bar.',
      en: 'Six wonderful years on board AIDA – singing, playing, travelling the world and carried by countless special moments in the Nightfly Bar.',
    },
    alt: {
      de: 'Jovana Kokor singt live in der Nightfly Bar an Bord der AIDA',
      en: 'Jovana Kokor singing live in the Nightfly Bar on board AIDA',
    },
  },
  {
    num: 9,
    src: jw9,
    title: { de: 'Leona & Clemens', en: 'Leona & Clemens' },
    description: {
      de: 'Mit dem wunderbaren Duo Leona & Clemens unterwegs – und immer wieder etwas ganz Besonderes, wenn mein Gesangsschüler Clemens mit mir gemeinsam auf der Bühne steht.',
      en: 'On stage with the wonderful duo Leona & Clemens – always something very special when my vocal student Clemens shares the stage with me.',
    },
    alt: {
      de: 'JoyWanna gemeinsam mit dem Duo Leona & Clemens auf der Bühne',
      en: 'JoyWanna on stage together with the duo Leona & Clemens',
    },
  },
  {
    num: 10,
    src: jw10,
    title: { de: 'Reimagined', en: 'Reimagined' },
    description: {
      de: 'Reimagined – Konzertankündigung und Herzensprojekt zugleich: mein Album, in dem bekannte Songs in meinem ganz eigenen Stil neu erzählt werden.',
      en: 'Reimagined – both a concert announcement and a heart project: my album, in which familiar songs are retold in my very own style.',
    },
    alt: {
      de: 'Konzertankündigung für JoyWannas Album „Reimagined"',
      en: 'Concert announcement for JoyWanna\'s album "Reimagined"',
    },
  },
  {
    num: 12,
    src: jw12,
    title: { de: 'Pure Spielfreude', en: 'Pure Joy of Playing' },
    description: {
      de: 'Manchmal gehört zu meiner Bühne auch einfach pure Spielfreude – A Night to Remember Fotoshooting · Foto: Patrick Nagel.',
      en: 'Sometimes my stage simply calls for pure joy of playing – A Night to Remember photoshoot · Photo: Patrick Nagel.',
    },
    alt: {
      de: 'Jovana Kokor mit verspieltem Bühnenausdruck beim A Night to Remember Fotoshooting',
      en: 'Jovana Kokor with a playful stage expression at the A Night to Remember photoshoot',
    },
  },
  {
    num: 13,
    src: jw13,
    title: { de: 'Ganz ich', en: 'Completely Me' },
    description: {
      de: 'Ganz ich – voller Freude, Farbe und manchmal auch mit einem unsichtbaren Mikrofon. :) Foto: Patrick Nagel.',
      en: 'Completely me – full of joy, colour and sometimes with an invisible microphone. :) Photo: Patrick Nagel.',
    },
    alt: {
      de: 'Farbenfrohes, freudvolles Künstlerporträt von Jovana Kokor',
      en: 'Colourful, joyful artist portrait of Jovana Kokor',
    },
  },
  {
    num: 15,
    src: jw15,
    title: { de: 'Queen Mode', en: 'Queen Mode' },
    description: {
      de: 'Manchmal darf\'s auch ein bisschen Glamour sein – Queen Mode an. · A Night to Remember Fotoshooting · Foto: Patrick Nagel.',
      en: 'Sometimes a touch of glamour is just right – Queen Mode on. · A Night to Remember photoshoot · Photo: Patrick Nagel.',
    },
    alt: {
      de: 'Glamouröses Künstlerporträt von Jovana Kokor – „Queen Mode" beim A Night to Remember Fotoshooting',
      en: 'Glamorous artist portrait of Jovana Kokor – "Queen Mode" at the A Night to Remember photoshoot',
    },
  },
  {
    num: 20,
    src: jw20,
    title: { de: 'Funkelnder Bühnenmoment', en: 'Sparkling Stage Moment' },
    description: {
      de: 'Ein funkelnder Bühnenmoment bei A Night to Remember – mit großer Dankbarkeit an Irene S. Exclusive Fashion für dieses besondere Kleid.',
      en: 'A sparkling stage moment at A Night to Remember – with great gratitude to Irene S. Exclusive Fashion for this special dress.',
    },
    alt: {
      de: 'JoyWanna im funkelnden Bühnenkleid bei A Night to Remember in Oldenburg',
      en: 'JoyWanna in a sparkling stage dress at A Night to Remember in Oldenburg',
    },
  },
  {
    num: 36,
    src: jw36,
    title: { de: 'In unserem Element', en: 'In Our Element' },
    description: {
      de: 'Meine wunderbaren Spicy Jam-ers und ich – gemeinsam in unserem Element.',
      en: 'My wonderful Spicy Jam-ers and I – together in our element.',
    },
    alt: {
      de: 'JoyWanna & The Spicy Jam live auf der Bühne – gemeinsam in ihrem Element',
      en: 'JoyWanna & The Spicy Jam live on stage – together in their element',
    },
  },
  {
    num: 37,
    src: jw37,
    title: { de: 'Verspielte Seite', en: 'Playful Side' },
    description: {
      de: 'Mit meinen Spicy Jam-ers wird\'s selten langweilig – meine verspielte Seite inklusive. :)',
      en: 'It\'s rarely boring with my Spicy Jam-ers – my playful side included. :)',
    },
    alt: {
      de: 'Verspielter Bandmoment von JoyWanna & The Spicy Jam',
      en: 'Playful band moment of JoyWanna & The Spicy Jam',
    },
  },
  {
    num: 38,
    src: jw38,
    title: { de: 'Shows an Bord', en: 'Shows on Board' },
    description: {
      de: 'An Bord habe ich viele besondere Projekte erleben dürfen – besonders geliebt habe ich es, gemeinsam mit anderen talentierten Sänger:innen Shows zu gestalten.',
      en: 'On board I had the chance to experience many special projects – I especially loved creating shows together with other talented singers.',
    },
    alt: {
      de: 'Jovana Kokor in einer gemeinsamen Show mit anderen Sängerinnen an Bord der AIDA',
      en: 'Jovana Kokor in a joint show with other singers on board AIDA',
    },
  },
  {
    num: 39,
    src: jw39,
    title: { de: 'Some Sing Special', en: 'Some Sing Special' },
    description: {
      de: 'Some Sing Special – Teil der gleichnamigen Konzertreihe im Wilhelm 13, gemeinsam mit meinen wunderbaren Spicy Jam-ers. Ein Abend, der einfach ganz wir war.',
      en: 'Some Sing Special – part of the concert series of the same name at Wilhelm 13, together with my wonderful Spicy Jam-ers. An evening that was simply all us.',
    },
    alt: {
      de: 'JoyWanna & The Spicy Jam beim Konzert „Some Sing Special" im Wilhelm 13, Oldenburg',
      en: 'JoyWanna & The Spicy Jam at the "Some Sing Special" concert at Wilhelm 13, Oldenburg',
    },
  },
  {
    num: 40,
    src: jw40,
    title: { de: 'Jazzakademie Jade', en: 'Jazz Academy Jade' },
    description: {
      de: 'Mit meinen großartigen Spicy Jam-ers bei einem besonderen Konzert der Jazzakademie an der Nordsee in Jade – ein Abend voller Musik, Wachstum und gemeinsamer Energie.',
      en: 'With my amazing Spicy Jam-ers at a special concert of the Jazz Academy on the North Sea in Jade – an evening full of music, growth and shared energy.',
    },
    alt: {
      de: 'JoyWanna & The Spicy Jam live beim Konzert der Jazzakademie an der Nordsee in Jade',
      en: 'JoyWanna & The Spicy Jam live at the Jazz Academy concert on the North Sea in Jade',
    },
  },
  {
    num: 41,
    src: jw41,
    title: { de: 'Just Breathe', en: 'Just Breathe' },
    description: {
      de: 'Just Breathe – meine erste veröffentlichte eigene Musik und ein ganz besonderes Herzensstück meines Weges.',
      en: 'Just Breathe – my first released original music and a very special piece of heart on my journey.',
    },
    alt: {
      de: 'Cover-Artwork zu „Just Breathe", JoyWannas erster veröffentlichter Eigenkomposition',
      en: 'Cover artwork for "Just Breathe", JoyWanna\'s first released original song',
    },
  },
  {
    num: 42,
    src: jw42,
    title: { de: 'When a French Guy Met a Serbian Girl', en: 'When a French Guy Met a Serbian Girl' },
    description: {
      de: 'Auch als Sängerin und Schauspielerin durfte ich viele besondere Bühnenmomente erleben – unter anderem in Arnaud Humberts „When a French Guy Met a Serbian Girl" in Belgrad.',
      en: 'As a singer and actress I also experienced many special stage moments – among them in Arnaud Humbert\'s "When a French Guy Met a Serbian Girl" in Belgrade.',
    },
    alt: {
      de: 'Jovana Kokor als Sängerin und Schauspielerin in Arnaud Humberts „When a French Guy Met a Serbian Girl" in Belgrad',
      en: 'Jovana Kokor as singer and actress in Arnaud Humbert\'s "When a French Guy Met a Serbian Girl" in Belgrade',
    },
  },
  {
    num: 43,
    src: jw43,
    title: { de: 'Angel Eyes – Voice & Piano', en: 'Angel Eyes – Voice & Piano' },
    description: {
      de: 'Gemeinsam mit der großartigen Esther Filly durfte ich ihrer bereits veröffentlichten Single „Angel Eyes" in einer ganz besonderen Just Voice & Piano Version neues Leben verleihen.',
      en: 'Together with the wonderful Esther Filly I had the chance to give her already released single "Angel Eyes" new life in a very special Just Voice & Piano version.',
    },
    alt: {
      de: 'Jovana Kokor und Esther Filly in der Just Voice & Piano Version von „Angel Eyes"',
      en: 'Jovana Kokor and Esther Filly performing the Just Voice & Piano version of "Angel Eyes"',
    },
  },
  {
    num: 44,
    src: jw44,
    title: { de: 'Bühnenmomente an Bord', en: 'Stage Moments on Board' },
    description: {
      de: 'Besondere Bühnenmomente an Bord – gemeinsam mit großartigen Künstlerpersönlichkeiten wie Dennie Blessing.',
      en: 'Special stage moments on board – together with great artistic personalities such as Dennie Blessing.',
    },
    alt: {
      de: 'Jovana Kokor gemeinsam mit Dennie Blessing auf der Bühne an Bord der AIDA',
      en: 'Jovana Kokor on stage together with Dennie Blessing on board AIDA',
    },
  },
  {
    num: 45,
    src: jw45,
    title: { de: 'Just Voice & Piano', en: 'Just Voice & Piano' },
    description: {
      de: 'Dankbar, Teil von Esther Fillys wunderbarem „Just Voice & Piano"-Projekt zu sein – und diese großartige Künstlerin musikalisch am Piano begleiten zu dürfen.',
      en: 'Grateful to be part of Esther Filly\'s wonderful "Just Voice & Piano" project – and to accompany this great artist musically on the piano.',
    },
    alt: {
      de: 'Jovana Kokor begleitet Esther Filly am Klavier im „Just Voice & Piano"-Projekt',
      en: 'Jovana Kokor accompanying Esther Filly on piano in the "Just Voice & Piano" project',
    },
  },
  {
    num: 46,
    src: jw46,
    title: { de: 'Jazzgesangsstudium Belgrad', en: 'Jazz Vocal Studies in Belgrade' },
    description: {
      de: 'Meine Zeit des Jazzgesangsstudiums in Belgrad – geprägt von unendlich viel Musik, wertvollen Erfahrungen, inspirierenden Begegnungen und unzähligen besonderen Bühnenmomenten.',
      en: 'My time studying jazz vocals in Belgrade – shaped by endless music, valuable experiences, inspiring encounters and countless special stage moments.',
    },
    alt: {
      de: 'Jovana Kokor während ihres Jazzgesangsstudiums in Belgrad auf der Bühne',
      en: 'Jovana Kokor on stage during her jazz vocal studies in Belgrade',
    },
  },
];

// ============================================================================
// Press clippings (Presse) — newspaper & magazine features
// SEO: each entry has descriptive bilingual alt text and a title attribute.
// Layout & interaction reuse the exact Visual Work pattern (static images,
// hover overlay fade only, click → fullscreen lightbox).
// ============================================================================
type PressEntry = {
  num: number;
  src: string;
  width: number;
  height: number;
  title: { de: string; en: string };
  description: { de: string; en: string };
  alt: { de: string; en: string };
};

const pressClippings: PressEntry[] = [
  {
    num: 1,
    src: press1,
    width: 954,
    height: 563,
    title: {
      de: 'NWZ – Jazz-Akademie an der Nordsee',
      en: 'NWZ – Jazz Academy on the North Sea',
    },
    description: {
      de: 'Pressebericht der Nordwest-Zeitung über das ausverkaufte Konzert der Jazz-Akademie an der Nordsee in Jever – mit JoyWanna & The Spicy Jam als Vorband von „Jean-Paul".',
      en: 'Nordwest-Zeitung press feature on the sold-out Jazz Academy concert on the North Sea in Jever – with JoyWanna & The Spicy Jam opening for "Jean-Paul".',
    },
    alt: {
      de: 'Zeitungsartikel der Nordwest-Zeitung über JoyWanna & The Spicy Jam als Vorband bei „Jean-Paul" der Jazz-Akademie an der Nordsee in Jever',
      en: 'Nordwest-Zeitung newspaper article about JoyWanna & The Spicy Jam opening for "Jean-Paul" at the Jazz Academy on the North Sea in Jever',
    },
  },
  {
    num: 2,
    src: press2,
    width: 698,
    height: 983,
    title: {
      de: 'Passt Oldenburg perfekt? – Porträt',
      en: 'Does Oldenburg fit perfectly? – Feature',
    },
    description: {
      de: 'Großes Zeitungsporträt über Jazzsängerin Jovana Kokor und ihre neue Heimat Oldenburg – über Musik, Bandleben, Vocal Coaching und ihren Weg von Belgrad über die AIDA bis nach Niedersachsen.',
      en: 'Extensive newspaper feature on jazz singer Jovana Kokor and her new home Oldenburg – about music, band life, vocal coaching and her journey from Belgrade via AIDA to Lower Saxony.',
    },
    alt: {
      de: 'Zeitungsporträt über Jazzsängerin Jovana Kokor (JoyWanna) und ihre neue Heimatstadt Oldenburg',
      en: 'Newspaper feature about jazz singer Jovana Kokor (JoyWanna) and her new home town of Oldenburg',
    },
  },
  {
    num: 3,
    src: press3,
    width: 2261,
    height: 3264,
    title: {
      de: 'Magazin – „A Night 2 Remember"',
      en: 'Magazine – "A Night 2 Remember"',
    },
    description: {
      de: 'Magazinveröffentlichung zum Benefizkonzert „A Night 2 Remember – das etwas andere Weihnachtskonzert" am 6. Dezember 2024 in der Garnisonkirche Oldenburg, mit JoyWanna, Gina Solera, Esther Filly und Minu Safari.',
      en: 'Magazine feature on the benefit concert "A Night 2 Remember – a different kind of Christmas concert" on 6 December 2024 at Garnisonkirche Oldenburg, with JoyWanna, Gina Solera, Esther Filly and Minu Safari.',
    },
    alt: {
      de: 'Magazinartikel über das Benefiz-Weihnachtskonzert „A Night 2 Remember" 2024 in der Garnisonkirche Oldenburg mit JoyWanna',
      en: 'Magazine article about the "A Night 2 Remember" benefit Christmas concert 2024 at Garnisonkirche Oldenburg featuring JoyWanna',
    },
  },
  {
    num: 4,
    src: press4,
    width: 819,
    height: 976,
    title: {
      de: 'Spielepark und Livemusik – Familienfest Sandkrug',
      en: 'Playground and Live Music – Sandkrug Family Festival',
    },
    description: {
      de: 'Pressebericht zum Sandkruger Familienfest – die Oldenburger Sängerin JoyWanna präsentiert live ihren Debüt-Song „Just Breathe".',
      en: 'Press feature on the Sandkrug family festival – Oldenburg-based singer JoyWanna presenting her debut song "Just Breathe" live on stage.',
    },
    alt: {
      de: 'Zeitungsartikel über das Familienfest in Sandkrug mit JoyWanna live und ihrem Debüt-Song „Just Breathe"',
      en: 'Newspaper article about the Sandkrug family festival featuring JoyWanna live with her debut song "Just Breathe"',
    },
  },
  {
    num: 5,
    src: press5,
    width: 922,
    height: 1866,
    title: {
      de: 'BILD der FRAU – „Es funkte auf dem Kreuzfahrtschiff"',
      en: 'BILD der FRAU – "Sparks Flew on the Cruise Ship"',
    },
    description: {
      de: 'Liebesgeschichte in BILD der FRAU (Ausgabe 7/2023): Wie sich Pianistin und Sängerin Jovana an Bord der AIDAperla in ihren Mann Lukas verliebte – inklusive Heiratsantrag und Hochzeit 2021.',
      en: 'Love story in BILD der FRAU (issue 7/2023): how pianist and singer Jovana fell in love with her husband Lukas on board the AIDAperla – including the proposal and wedding in 2021.',
    },
    alt: {
      de: 'Artikel in BILD der FRAU über Jovana Kokor und ihren Mann Lukas – Liebesgeschichte an Bord der AIDAperla',
      en: 'BILD der FRAU magazine article about Jovana Kokor and her husband Lukas – love story on board the AIDAperla',
    },
  },
  {
    num: 6,
    src: press6,
    width: 1124,
    height: 1638,
    title: {
      de: 'Mensch & Lebensart – Boho Chic bis Minimalismus',
      en: 'People & Lifestyle – Boho Chic to Minimalism',
    },
    description: {
      de: 'Zeitungsausgabe „Mensch & Lebensart" vom 15. Februar 2025 mit JoyWanna in der Rubrik „Nachgefragt" – über Stärken, Lieblingslebensweisheit und ihren Song „Just Breathe".',
      en: '"People & Lifestyle" newspaper edition from 15 February 2025 with JoyWanna in the "Nachgefragt" Q&A section – about strengths, favourite life motto and her song "Just Breathe".',
    },
    alt: {
      de: 'Zeitungsausgabe „Mensch & Lebensart" mit JoyWanna in der Q&A-Rubrik „Nachgefragt"',
      en: '"People & Lifestyle" newspaper edition featuring JoyWanna in the "Nachgefragt" Q&A section',
    },
  },
];

type Category = 'all' | 'live' | 'band' | 'reimagined' | 'press';
// Tab type imported from @/lib/portfolio-routes (PortfolioTab)

interface PortfolioItem {
  id: string;
  type: 'video' | 'image';
  // For videos: YouTube ID. For images: image src.
  source: string;
  url?: string;
  category: Exclude<Category, 'all'>;
  title: { de: string; en: string };
  description: { de: string; en: string };
  alt?: { de: string; en: string };
  width?: number;
  height?: number;
  // Real YouTube title shown on hover for video items.
  youtubeTitle?: string;
}

const items: PortfolioItem[] = [
  {
    id: 'v-KlXXMuKU3wE',
    type: 'video',
    source: 'KlXXMuKU3wE',
    url: 'https://www.youtube.com/watch?v=KlXXMuKU3wE&list=RDKlXXMuKU3wE&start_radio=1',
    category: 'live',
    title: { de: 'Live – Stimme & Klavier', en: 'Live – Voice & Piano' },
    description: {
      de: 'Live Performance – Jazz & Soul, ein intimer Bühnenmoment.',
      en: 'Live Performance – Jazz & Soul, an intimate stage moment.',
    },
    youtubeTitle: 'JoyWanna - Just Breathe (Live, Voice & Piano)',
  },
  {
    id: 'v-HG521HIhxZ4',
    type: 'video',
    source: 'HG521HIhxZ4',
    url: 'https://www.youtube.com/watch?v=HG521HIhxZ4',
    category: 'live',
    title: { de: 'Live Highlight I', en: 'Live Highlight I' },
    description: {
      de: 'Live Performance – Jazz, Latin & Groove.',
      en: 'Live Performance – Jazz, Latin & Groove.',
    },
    youtubeTitle: 'JoyWanna - Live Highlight I',
  },
  {
    id: 'v-snQoawnhl3Y',
    type: 'video',
    source: 'snQoawnhl3Y',
    url: 'https://www.youtube.com/watch?v=snQoawnhl3Y',
    category: 'band',
    title: { de: 'The Spicy Jam – Live', en: 'The Spicy Jam – Live' },
    description: {
      de: 'JoyWanna & The Spicy Jam – mitreißender Crossover-Sound.',
      en: 'JoyWanna & The Spicy Jam – captivating crossover sound.',
    },
    youtubeTitle: 'JoyWanna & The Spicy Jam - Live',
  },
  {
    id: 'v-iDhF5EpRBhw',
    type: 'video',
    source: 'iDhF5EpRBhw',
    url: 'https://www.youtube.com/watch?v=iDhF5EpRBhw',
    category: 'reimagined',
    title: { de: '"Reimagined" Session', en: '"Reimagined" Session' },
    description: {
      de: '„Reimagined" – bekannte Songs, neu interpretiert auf Stimme und Klavier reduziert.',
      en: '"Reimagined" – familiar songs reinterpreted, stripped to voice and piano.',
    },
    youtubeTitle: 'JoyWanna - Reimagined Session',
  },
  ...galleryPhotos.map((p) => {
    // Photoshoot vs stage-moment classification (for the gallery filter tabs)
    const photoshootNums = new Set([2, 3, 10, 12, 13, 15, 41]);
    const isPhotoshoot = photoshootNums.has(p.num);
    return {
      id: `gallery-${p.num}`,
      type: 'image' as const,
      source: p.src,
      category: (isPhotoshoot ? 'band' : 'live') as 'band' | 'live',
      title: p.title,
      description: p.description,
      alt: p.alt,
      width: photoDimensions[p.num]?.w,
      height: photoDimensions[p.num]?.h,
    };
  }),
  // Press clippings (Presse) – newspaper & magazine features.
  ...pressClippings.map((p) => ({
    id: `press-${p.num}`,
    type: 'image' as const,
    source: p.src,
    category: 'press' as const,
    title: p.title,
    description: p.description,
    alt: p.alt,
    width: p.width,
    height: p.height,
  })),
];

function PortfolioContent() {
  const { language, setLanguage, t } = useLanguage();
  const { category } = useParams<{ category?: string }>();
  const { pathname } = useLocation();
  const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);

  // Derive the active tab from the URL slug (falls back to 'visual').
  const tab: PortfolioTab = (category && SLUG_TO_TAB[category]) || 'visual';

  // If the URL is locale-prefixed (/en/... or /de/...), force that language.
  // This makes the locale-prefixed URLs the canonical, language-correct
  // entry points that crawlers and direct visitors land on.
  useEffect(() => {
    if (pathname.startsWith('/en/') && language !== 'en') {
      setLanguage('en');
    } else if (pathname.startsWith('/de/') && language !== 'de') {
      setLanguage('de');
    }
  }, [pathname, language, setLanguage]);

  const filtered = useMemo(() => {
    // 'visual' tab → Fotoshooting (studio/portrait shots, mapped to category 'band')
    // 'shows'  tab → Bühnenmomente (live stage photos, mapped to category 'live')
    // 'press'  tab → Presse (newspaper & magazine clippings)
    if (tab === 'shows') return items.filter((i) => i.type === 'image' && i.category === 'live');
    if (tab === 'press') return items.filter((i) => i.category === 'press');
    return items.filter((i) => i.type === 'image' && i.category === 'band');
  }, [tab]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pt-24 md:pt-32">
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 pt-6 md:pt-8 pb-12 text-center">
          <div className="container mx-auto max-w-3xl">
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
              {t('portfolio.page.eyebrow')}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6">
              {t('portfolio.page.title')}
            </h1>
            <p className="text-muted-foreground leading-relaxed text-[0.95rem] font-normal max-w-2xl mx-auto">
              {t('portfolio.page.subtitle')}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
              <div>
                <div className="font-serif text-3xl md:text-4xl text-primary">15+</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {t('about.stat.years')}
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-primary">1000+</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {t('about.stat.shows')}
                </div>
              </div>
            </div>
            <div className="w-20 h-px bg-primary mx-auto mt-12" />
          </div>
        </section>

        {/* Category navigation – real anchor links so crawlers see them as
            internal outlinks to dedicated, indexable URLs. */}
        <section className="px-6 md:px-12 lg:px-20 mb-12">
          <div className="container mx-auto">
            <nav
              aria-label={language === 'de' ? 'Portfolio-Kategorien' : 'Portfolio categories'}
              className="flex flex-wrap justify-center gap-2 md:gap-3"
            >
              {PORTFOLIO_TABS.map((entry) => {
                const active = tab === entry.tab;
                const href = buildCategoryPath(entry.tab, language);
                return (
                  <Link
                    key={entry.tab}
                    to={href}
                    aria-current={active ? 'page' : undefined}
                    className={`px-5 py-2 rounded-sm text-sm font-medium border transition-all duration-300 ${
                      active
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/50'
                    }`}
                  >
                    {entry.label[language]}
                  </Link>
                );
              })}
            </nav>
          </div>
        </section>
        <section className="section-padding pt-8 md:pt-12">
          <div className="container mx-auto max-w-6xl">
            {/* Section heading + intro per active tab (SEO: real text content + H2 per section) */}
            <header className="text-center mb-10 md:mb-14">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                {tab === 'visual' &&
                  (language === 'de'
                    ? 'Fotoshooting – Künstlerporträts & Bandfotografie'
                    : 'Photoshoot – Artist Portraits & Band Photography')}
                {tab === 'shows' &&
                  (language === 'de'
                    ? 'Bühnenmomente – Konzerte, Bands & Sessions'
                    : 'Stage Moments – Concerts, Bands & Sessions')}
                {tab === 'press' &&
                  (language === 'de'
                    ? 'Presse – Zeitungs- & Magazinberichte'
                    : 'Press – Newspaper & Magazine Features')}
              </h2>
              <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                {tab === 'visual' &&
                  (language === 'de'
                    ? 'Eine Auswahl an Fotoshooting-Aufnahmen von JoyWanna – Künstlerporträts und Bandfotografie aus Studio und Bühne.'
                    : "A selection of photoshoot images of JoyWanna – artist portraits and band photography from studio and stage.")}
                {tab === 'shows' &&
                  (language === 'de'
                    ? 'Ausgewählte Bühnenmomente von JoyWanna – Solo, mit „The Spicy Jam" und in der „Reimagined"-Reihe für Stimme und Klavier.'
                    : 'Selected stage moments by JoyWanna – solo, with "The Spicy Jam" and in the "Reimagined" voice & piano series.')}
                {tab === 'press' &&
                  (language === 'de'
                    ? 'Ausgewählte Presseberichte aus Zeitungen und Magazinen über JoyWanna, ihre Konzerte und ihren musikalischen Werdegang.'
                    : 'Selected press features from newspapers and magazines covering JoyWanna, her concerts and her musical journey.')}
              </p>
            </header>
            <div key={tab} className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {filtered.map((item) => {
                if (item.type === 'video') {
                  const hoverTitle =
                    item.youtubeTitle ?? (language === 'de' ? item.title.de : item.title.en);
                  return (
                    <a
                      key={item.id}
                      href={item.url ?? `https://www.youtube.com/watch?v=${item.source}`}
                      target="_blank"
                      rel="noopener noreferrer external"
                      title={hoverTitle}
                      aria-label={hoverTitle}
                      className="relative z-10 w-full mb-4 break-inside-avoid bg-card block rounded-sm overflow-hidden"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="group relative">
                        <img
                          src={`https://img.youtube.com/vi/${item.source}/hqdefault.jpg`}
                          alt={
                            language === 'de'
                              ? `Vorschau – ${item.title.de}`
                              : `Preview – ${item.title.en}`
                          }
                          loading="lazy"
                          decoding="async"
                          width="480"
                          height="360"
                          className="block w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <Play size={22} className="text-primary-foreground ml-1" fill="currentColor" />
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <p className="font-serif text-base md:text-lg text-foreground">
                            {hoverTitle}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                }
                return (
                  <button
                    key={item.id}
                    onClick={() => setOpenItem(item)}
                    className="w-full mb-4 break-inside-avoid bg-card block text-left rounded-sm overflow-hidden"
                    aria-label={language === 'de' ? item.title.de : item.title.en}
                  >
                    {/*
                      Visual Work image tile.
                      STRICT: Images must not move, animate, or shift position under any condition.
                    */}
                    <div className="group relative">
                      <img
                        src={item.source}
                        alt={
                          item.alt
                            ? language === 'de'
                              ? item.alt.de
                              : item.alt.en
                            : ''
                        }
                        title={language === 'de' ? item.title.de : item.title.en}
                        loading="lazy"
                        decoding="async"
                        width={item.width}
                        height={item.height}
                        className="block w-full h-auto object-cover"
                      />
                      {/* Desktop hover overlay – fade only, no movement */}
                      <div
                        aria-hidden="true"
                        className="hidden md:flex absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex-col items-center justify-center text-center p-4"
                      >
                        <p className="font-serif text-lg md:text-xl text-foreground">
                          {language === 'de' ? item.title.de : item.title.en}
                        </p>
                        <p className="mt-2 text-xs md:text-sm text-muted-foreground line-clamp-3 max-w-[90%]">
                          {language === 'de' ? item.description.de : item.description.en}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                {t('portfolio.empty')}
              </p>
            )}
          </div>
        </section>

        {/* Contact form (same as landing page) */}
        <ContactSection />
      </main>

      <Footer />

      {/* Lightbox / Modal */}
      <Dialog open={!!openItem} onOpenChange={(o) => !o && setOpenItem(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border">
          {openItem && (
            <>
              <DialogTitle className="sr-only">
                {language === 'de' ? openItem.title.de : openItem.title.en}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {language === 'de' ? openItem.description.de : openItem.description.en}
              </DialogDescription>

              <img
                src={openItem.source}
                alt={
                  openItem.alt
                    ? language === 'de'
                      ? openItem.alt.de
                      : openItem.alt.en
                    : ''
                }
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[70vh] object-contain bg-background"
              />

              <div className="p-6 md:p-8">
                <h3 className="font-serif text-2xl md:text-3xl mb-2">
                  {language === 'de' ? openItem.title.de : openItem.title.en}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'de' ? openItem.description.de : openItem.description.en}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Portfolio() {
  return (
    <LanguageProvider>
      <SEOManager />
      <PortfolioContent />
    </LanguageProvider>
  );
}

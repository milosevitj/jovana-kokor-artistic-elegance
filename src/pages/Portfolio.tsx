import { useState, useMemo } from 'react';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { SEOManager } from '@/components/SEOManager';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/components/ContactSection';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Play } from 'lucide-react';
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

type PhotoEntry = {
  num: number;
  src: string;
  title: { de: string; en: string };
  description: { de: string; en: string };
  alt: { de: string; en: string };
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
  },
  {
    num: 2,
    src: jw2,
    title: { de: 'Spicy Jam Fotoshooting', en: 'Spicy Jam Photoshoot' },
    description: {
      de: 'Mit meinen liebenswerten Spicy Jam-ers beim Fotoshooting im Wilhelm 13, Oldenburg · Foto: Patrick Nagel.',
      en: 'With my lovely Spicy Jam-ers at the photoshoot at Wilhelm 13, Oldenburg · Photo: Patrick Nagel.',
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
  },
  {
    num: 4,
    src: jw4,
    title: { de: 'Benefizkonzert Garnisonkirche', en: 'Benefit Concert Garnisonkirche' },
    description: {
      de: 'A Night to Remember – das etwas andere Weihnachtskonzert und Benefizkonzert, organisiert von der bekannten Oldenburger Dragqueen Gina Solera · Garnisonkirche Oldenburg, 2024 · Foto: Patrick Nagel.',
      en: 'A Night to Remember – a different kind of Christmas and benefit concert, organised by the well-known Oldenburg drag queen Gina Solera · Garnisonkirche Oldenburg, 2024 · Photo: Patrick Nagel.',
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
  },
  {
    num: 9,
    src: jw9,
    title: { de: 'Leona & Clemens', en: 'Leona & Clemens' },
    description: {
      de: 'Mit dem wunderbaren Duo Leona & Clemens unterwegs – und immer wieder etwas ganz Besonderes, wenn mein Gesangsschüler Clemens mit mir gemeinsam auf der Bühne steht.',
      en: 'On stage with the wonderful duo Leona & Clemens – always something very special when my vocal student Clemens shares the stage with me.',
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
  },
  {
    num: 12,
    src: jw12,
    title: { de: 'Pure Spielfreude', en: 'Pure Joy of Playing' },
    description: {
      de: 'Manchmal gehört zu meiner Bühne auch einfach pure Spielfreude – A Night to Remember Fotoshooting · Foto: Patrick Nagel.',
      en: 'Sometimes my stage simply calls for pure joy of playing – A Night to Remember photoshoot · Photo: Patrick Nagel.',
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
  },
  {
    num: 15,
    src: jw15,
    title: { de: 'Queen Mode', en: 'Queen Mode' },
    description: {
      de: 'Manchmal darf\'s auch ein bisschen Glamour sein – Queen Mode an. · A Night to Remember Fotoshooting · Foto: Patrick Nagel.',
      en: 'Sometimes a touch of glamour is just right – Queen Mode on. · A Night to Remember photoshoot · Photo: Patrick Nagel.',
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
  },
  {
    num: 36,
    src: jw36,
    title: { de: 'In unserem Element', en: 'In Our Element' },
    description: {
      de: 'Meine wunderbaren Spicy Jam-ers und ich – gemeinsam in unserem Element.',
      en: 'My wonderful Spicy Jam-ers and I – together in our element.',
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
  },
  {
    num: 38,
    src: jw38,
    title: { de: 'Shows an Bord', en: 'Shows on Board' },
    description: {
      de: 'An Bord habe ich viele besondere Projekte erleben dürfen – besonders geliebt habe ich es, gemeinsam mit anderen talentierten Sänger:innen Shows zu gestalten.',
      en: 'On board I had the chance to experience many special projects – I especially loved creating shows together with other talented singers.',
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
  },
  {
    num: 40,
    src: jw40,
    title: { de: 'Jazzakademie Jade', en: 'Jazz Academy Jade' },
    description: {
      de: 'Mit meinen großartigen Spicy Jam-ers bei einem besonderen Konzert der Jazzakademie an der Nordsee in Jade – ein Abend voller Musik, Wachstum und gemeinsamer Energie.',
      en: 'With my amazing Spicy Jam-ers at a special concert of the Jazz Academy on the North Sea in Jade – an evening full of music, growth and shared energy.',
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
  },
  {
    num: 42,
    src: jw42,
    title: { de: 'When a French Guy Met a Serbian Girl', en: 'When a French Guy Met a Serbian Girl' },
    description: {
      de: 'Auch als Sängerin und Schauspielerin durfte ich viele besondere Bühnenmomente erleben – unter anderem in Arnaud Humberts „When a French Guy Met a Serbian Girl" in Belgrad.',
      en: 'As a singer and actress I also experienced many special stage moments – among them in Arnaud Humbert\'s "When a French Guy Met a Serbian Girl" in Belgrade.',
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
  },
  {
    num: 44,
    src: jw44,
    title: { de: 'Bühnenmomente an Bord', en: 'Stage Moments on Board' },
    description: {
      de: 'Besondere Bühnenmomente an Bord – gemeinsam mit großartigen Künstlerpersönlichkeiten wie Dennie Blessing.',
      en: 'Special stage moments on board – together with great artistic personalities such as Dennie Blessing.',
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
  },
  {
    num: 46,
    src: jw46,
    title: { de: 'Jazzgesangsstudium Belgrad', en: 'Jazz Vocal Studies in Belgrade' },
    description: {
      de: 'Meine Zeit des Jazzgesangsstudiums in Belgrad – geprägt von unendlich viel Musik, wertvollen Erfahrungen, inspirierenden Begegnungen und unzähligen besonderen Bühnenmomenten.',
      en: 'My time studying jazz vocals in Belgrade – shaped by endless music, valuable experiences, inspiring encounters and countless special stage moments.',
    },
  },
];

type Category = 'all' | 'live' | 'band' | 'reimagined';
type Tab = 'visual' | 'shows';

interface PortfolioItem {
  id: string;
  type: 'video' | 'image';
  // For videos: YouTube ID. For images: image src.
  source: string;
  category: Exclude<Category, 'all'>;
  title: { de: string; en: string };
  description: { de: string; en: string };
  alt?: { de: string; en: string };
}

const items: PortfolioItem[] = [
  {
    id: 'v-KlXXMuKU3wE',
    type: 'video',
    source: 'KlXXMuKU3wE',
    category: 'live',
    title: { de: 'Live – Stimme & Klavier', en: 'Live – Voice & Piano' },
    description: {
      de: 'Live Performance – Jazz & Soul, ein intimer Bühnenmoment.',
      en: 'Live Performance – Jazz & Soul, an intimate stage moment.',
    },
  },
  {
    id: 'v-HG521HIhxZ4',
    type: 'video',
    source: 'HG521HIhxZ4',
    category: 'live',
    title: { de: 'Live Highlight I', en: 'Live Highlight I' },
    description: {
      de: 'Live Performance – Jazz, Latin & Groove.',
      en: 'Live Performance – Jazz, Latin & Groove.',
    },
  },
  {
    id: 'v-sQ5XZkarZWQ',
    type: 'video',
    source: 'sQ5XZkarZWQ',
    category: 'band',
    title: { de: 'The Spicy Jam – Live', en: 'The Spicy Jam – Live' },
    description: {
      de: 'JoyWanna & The Spicy Jam – mitreißender Crossover-Sound.',
      en: 'JoyWanna & The Spicy Jam – captivating crossover sound.',
    },
  },
  {
    id: 'v-iDhF5EpRBhw',
    type: 'video',
    source: 'iDhF5EpRBhw',
    category: 'reimagined',
    title: { de: '"Reimagined" Session', en: '"Reimagined" Session' },
    description: {
      de: '„Reimagined" – bekannte Songs, neu interpretiert auf Stimme und Klavier reduziert.',
      en: '"Reimagined" – familiar songs reinterpreted, stripped to voice and piano.',
    },
  },
  ...galleryPhotos.map((p) => ({
    id: `gallery-${p.num}`,
    type: 'image' as const,
    source: p.src,
    category: 'live' as const,
    title: p.title,
    description: p.description,
    alt: p.title,
  })),
];

function PortfolioContent() {
  const { language, t } = useLanguage();
  const [tab, setTab] = useState<Tab>('visual');
  const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);

  const filtered = useMemo(
    () =>
      tab === 'shows'
        ? items.filter((i) => i.type === 'video')
        : items.filter((i) => i.type === 'image'),
    [tab],
  );

  const tabs: { key: Tab; label: string }[] = [
    { key: 'visual', label: language === 'de' ? 'Visuelle Arbeiten' : 'Visual Work' },
    { key: 'shows', label: language === 'de' ? 'Live-Auftritte' : 'Live Shows' },
  ];

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
            <h2 className="text-muted-foreground leading-relaxed text-[0.95rem] font-normal max-w-2xl mx-auto">
              {t('portfolio.page.subtitle')}
            </h2>

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

        {/* Tabs */}
        <section className="px-6 md:px-12 lg:px-20 mb-12">
          <div className="container mx-auto">
            <div role="tablist" aria-label="Portfolio" className="flex flex-wrap justify-center gap-2 md:gap-3">
              {tabs.map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.key)}
                    className={`px-5 py-2 rounded-sm text-sm font-medium border transition-all duration-300 ${
                      active
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/50'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section-padding pt-8 md:pt-12">
          <div className="container mx-auto max-w-6xl">
            <div key={tab} className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {filtered.map((item) => {
                const isImage = item.type === 'image';
                return (
                  <button
                    key={item.id}
                    onClick={() => setOpenItem(item)}
                    className="group relative w-full mb-4 break-inside-avoid overflow-hidden rounded-sm bg-card block"
                    aria-label={language === 'de' ? item.title.de : item.title.en}
                  >
                    {item.type === 'video' ? (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${item.source}/hqdefault.jpg`}
                          alt={
                            language === 'de'
                              ? `Vorschau – ${item.title.de}`
                              : `Preview – ${item.title.en}`
                          }
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <Play size={22} className="text-primary-foreground ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <img
                        src={item.source}
                        alt={
                          item.alt
                            ? language === 'de'
                              ? item.alt.de
                              : item.alt.en
                            : ''
                        }
                        loading="lazy"
                        decoding="async"
                        /* Static image: no transform, no scale, no movement on hover or load */
                        className="block w-full h-auto object-cover"
                      />
                    )}
                    {isImage ? (
                      <>
                        {/* Static subtle overlay – opacity only, no movement */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <p className="font-serif text-lg text-foreground">
                            {language === 'de' ? item.title.de : item.title.en}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-left translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <p className="font-serif text-lg text-foreground">
                            {language === 'de' ? item.title.de : item.title.en}
                          </p>
                        </div>
                      </>
                    )}
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

              {openItem.type === 'video' ? (
                <div className="relative aspect-video w-full bg-background">
                  <iframe
                    src={`https://www.youtube.com/embed/${openItem.source}?autoplay=1`}
                    title={language === 'de' ? openItem.title.de : openItem.title.en}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
              ) : (
                <img
                  src={openItem.source}
                  alt={
                    openItem.alt
                      ? language === 'de'
                        ? openItem.alt.de
                        : openItem.alt.en
                      : ''
                  }
                  className="w-full h-auto max-h-[70vh] object-contain bg-background"
                />
              )}

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

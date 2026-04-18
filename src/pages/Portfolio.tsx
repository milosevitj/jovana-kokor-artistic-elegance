import { useState, useMemo } from 'react';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/components/ContactSection';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Play } from 'lucide-react';
import heroImage from '@/assets/jovana-hero.jpeg';
import portraitImage from '@/assets/jovana-portrait.jpeg';
import bandImage from '@/assets/joywanna-spicy-jam.webp';

// Portfolio photo gallery (WebP optimized)
import jw01 from '@/assets/portfolio/joywanna-01.webp';
import jw02 from '@/assets/portfolio/joywanna-02.webp';
import jw03 from '@/assets/portfolio/joywanna-03.webp';
import jw04 from '@/assets/portfolio/joywanna-04.webp';
import jw05 from '@/assets/portfolio/joywanna-05.webp';
import jw06 from '@/assets/portfolio/joywanna-06.webp';
import jw07 from '@/assets/portfolio/joywanna-07.webp';
import jw08 from '@/assets/portfolio/joywanna-08.webp';
import jw09 from '@/assets/portfolio/joywanna-09.webp';
import jw10 from '@/assets/portfolio/joywanna-10.webp';
import jw11 from '@/assets/portfolio/joywanna-11.webp';
import jw12 from '@/assets/portfolio/joywanna-12.webp';
import jw13 from '@/assets/portfolio/joywanna-13.webp';
import jw14 from '@/assets/portfolio/joywanna-14.webp';
import jw15 from '@/assets/portfolio/joywanna-15.webp';
import jw16 from '@/assets/portfolio/joywanna-16.webp';
import jw17 from '@/assets/portfolio/joywanna-17.webp';
import jw18 from '@/assets/portfolio/joywanna-18.webp';
import jw19 from '@/assets/portfolio/joywanna-19.webp';
import jw20 from '@/assets/portfolio/joywanna-20.webp';
import jw21 from '@/assets/portfolio/joywanna-21.webp';
import jw22 from '@/assets/portfolio/joywanna-22.webp';

const galleryPhotos: { src: string; category: 'live' | 'band' | 'reimagined'; alt: { de: string; en: string }; title: { de: string; en: string } }[] = [
  { src: jw01, category: 'live', alt: { de: 'JoyWanna live auf der Bühne in Oldenburg', en: 'JoyWanna performing live on stage in Oldenburg' }, title: { de: 'Live auf der Bühne', en: 'Live on Stage' } },
  { src: jw02, category: 'band', alt: { de: 'Jovana Kokor mit JoyWanna & The Spicy Jam Band', en: 'Jovana Kokor with JoyWanna & The Spicy Jam band' }, title: { de: 'Mit der Band', en: 'With the Band' } },
  { src: jw03, category: 'reimagined', alt: { de: 'Jovana Kokor Studio Porträt – Reimagined Session', en: 'Jovana Kokor studio portrait – Reimagined session' }, title: { de: 'Studio Porträt', en: 'Studio Portrait' } },
  { src: jw04, category: 'live', alt: { de: 'JoyWanna singt live – Jazz und Soul Performance', en: 'JoyWanna singing live – Jazz and Soul performance' }, title: { de: 'Stimme & Emotion', en: 'Voice & Emotion' } },
  { src: jw05, category: 'live', alt: { de: 'JoyWanna mit Mikrofon im Bühnenlicht', en: 'JoyWanna with microphone in stage light' }, title: { de: 'Im Rampenlicht', en: 'In the Spotlight' } },
  { src: jw06, category: 'band', alt: { de: 'JoyWanna & The Spicy Jam – Live Konzert', en: 'JoyWanna & The Spicy Jam – live concert' }, title: { de: 'The Spicy Jam', en: 'The Spicy Jam' } },
  { src: jw07, category: 'reimagined', alt: { de: 'Jovana Kokor am Klavier – akustische Session', en: 'Jovana Kokor at the piano – acoustic session' }, title: { de: 'Stimme & Klavier', en: 'Voice & Piano' } },
  { src: jw08, category: 'live', alt: { de: 'JoyWanna Live Auftritt – elegantes Bühnenoutfit', en: 'JoyWanna live performance – elegant stage outfit' }, title: { de: 'Eleganz auf der Bühne', en: 'Elegance on Stage' } },
  { src: jw09, category: 'reimagined', alt: { de: 'Jovana Kokor Künstlerporträt in Schwarz-Weiß', en: 'Jovana Kokor artist portrait in black and white' }, title: { de: 'Künstlerporträt', en: 'Artist Portrait' } },
  { src: jw10, category: 'live', alt: { de: 'JoyWanna live – intimer Konzertmoment', en: 'JoyWanna live – intimate concert moment' }, title: { de: 'Intimer Moment', en: 'Intimate Moment' } },
  { src: jw11, category: 'band', alt: { de: 'Bandfoto JoyWanna & The Spicy Jam', en: 'Band photo of JoyWanna & The Spicy Jam' }, title: { de: 'Bandfoto', en: 'Band Photo' } },
  { src: jw12, category: 'live', alt: { de: 'JoyWanna Live Performance bei Event', en: 'JoyWanna live performance at event' }, title: { de: 'Event Performance', en: 'Event Performance' } },
  { src: jw13, category: 'reimagined', alt: { de: 'Jovana Kokor Studio Aufnahme', en: 'Jovana Kokor studio session' }, title: { de: 'Studio Session', en: 'Studio Session' } },
  { src: jw14, category: 'live', alt: { de: 'JoyWanna mit Band live in Aktion', en: 'JoyWanna with band live in action' }, title: { de: 'Live in Aktion', en: 'Live in Action' } },
  { src: jw15, category: 'band', alt: { de: 'JoyWanna & The Spicy Jam beim Soundcheck', en: 'JoyWanna & The Spicy Jam during soundcheck' }, title: { de: 'Soundcheck', en: 'Soundcheck' } },
  { src: jw16, category: 'live', alt: { de: 'JoyWanna singt mit Hingabe auf der Bühne', en: 'JoyWanna singing with passion on stage' }, title: { de: 'Hingabe', en: 'Passion' } },
  { src: jw17, category: 'reimagined', alt: { de: 'Jovana Kokor – Reimagined akustisches Set', en: 'Jovana Kokor – Reimagined acoustic set' }, title: { de: 'Reimagined Set', en: 'Reimagined Set' } },
  { src: jw18, category: 'band', alt: { de: 'JoyWanna & The Spicy Jam Crossover Sound', en: 'JoyWanna & The Spicy Jam crossover sound' }, title: { de: 'Crossover Sound', en: 'Crossover Sound' } },
  { src: jw19, category: 'live', alt: { de: 'JoyWanna Live Konzert – Jazz, Latin und Soul', en: 'JoyWanna live concert – Jazz, Latin and Soul' }, title: { de: 'Jazz & Soul', en: 'Jazz & Soul' } },
  { src: jw20, category: 'reimagined', alt: { de: 'Jovana Kokor Porträt – elegante Atmosphäre', en: 'Jovana Kokor portrait – elegant atmosphere' }, title: { de: 'Elegante Atmosphäre', en: 'Elegant Atmosphere' } },
  { src: jw21, category: 'live', alt: { de: 'JoyWanna Bühnenmoment – Energie und Ausdruck', en: 'JoyWanna stage moment – energy and expression' }, title: { de: 'Bühnenenergie', en: 'Stage Energy' } },
  { src: jw22, category: 'band', alt: { de: 'JoyWanna & The Spicy Jam – Live Highlight', en: 'JoyWanna & The Spicy Jam – live highlight' }, title: { de: 'Live Highlight', en: 'Live Highlight' } },
];

type Category = 'all' | 'live' | 'band' | 'reimagined';

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
  {
    id: 'i-band',
    type: 'image',
    source: bandImage,
    category: 'band',
    title: { de: 'JoyWanna & The Spicy Jam', en: 'JoyWanna & The Spicy Jam' },
    description: {
      de: 'Die Band – Jazz, Latin, Soul und Pop in einem Klang.',
      en: 'The band – Jazz, Latin, Soul and Pop in one sound.',
    },
    alt: {
      de: 'JoyWanna & The Spicy Jam – Jazz, Soul und Pop Band',
      en: 'JoyWanna & The Spicy Jam – Jazz, Soul and Pop band',
    },
  },
  ...galleryPhotos.map((p, idx) => ({
    id: `gallery-${idx + 1}`,
    type: 'image' as const,
    source: p.src,
    category: p.category,
    title: p.title,
    description: p.alt,
    alt: p.alt,
  })),
];

function PortfolioContent() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<Category>('all');
  const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((i) => i.category === filter)),
    [filter],
  );

  const filters: { key: Category; label: string }[] = [
    { key: 'all', label: t('portfolio.filter.all') },
    { key: 'live', label: t('portfolio.filter.live') },
    { key: 'band', label: t('portfolio.filter.band') },
    { key: 'reimagined', label: t('portfolio.filter.reimagined') },
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
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 max-w-3xl mx-auto leading-tight">
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

        {/* Filter Tabs */}
        <section className="px-6 md:px-12 lg:px-20 mb-12">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {filters.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-5 py-2 rounded-sm text-sm font-medium border transition-all duration-300 ${
                      active
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/50'
                    }`}
                    aria-pressed={active}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Masonry Grid */}
        <section className="section-padding pt-8 md:pt-12">
          <div className="container mx-auto max-w-6xl">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {filtered.map((item) => (
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
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-serif text-lg text-foreground">
                      {language === 'de' ? item.title.de : item.title.en}
                    </p>
                  </div>
                </button>
              ))}
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
      <PortfolioContent />
    </LanguageProvider>
  );
}

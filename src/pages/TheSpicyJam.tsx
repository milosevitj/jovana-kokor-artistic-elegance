import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOManager } from '@/components/SEOManager';
import { parseRoute } from '@/lib/site-routes';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

/* Main Spicy Jam image */
import spicyJamImage from '@/assets/joywanna-spicy-jam.webp';

/* Existing band images from Portfolio Gallery */
import spicyJam2 from '@/assets/portfolio-new/joywanna-spicy-jam-photoshoot-wilhelm13.webp';
import spicyJam36 from '@/assets/portfolio-new/joywanna-spicy-jam-in-our-element.webp';
import spicyJam37 from '@/assets/portfolio-new/joywanna-spicy-jam-playful-side.webp';
import spicyJam39 from '@/assets/portfolio-new/joywanna-some-sing-special-wilhelm13.webp';
import spicyJam40 from '@/assets/portfolio-new/joywanna-jazzakademie-jade-concert.webp';
import jw47 from '@/assets/portfolio-new/joywanna-jade-jazz-jam-pumpwerk.webp'


function LanguageSync() {
  const { pathname } = useLocation();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const parsed = parseRoute(pathname);

    if (parsed.lang !== language) {
      setLanguage(parsed.lang);
    }
  }, [pathname, language, setLanguage]);

  return null;
}


const content = {
  de: {
    title: 'JoyWanna & The Spicy Jam',

    description:
      'JoyWanna & The Spicy Jam stehen für einen mitreißenden, genreübergreifenden Sound zwischen Jazz, Latin, Soul und Pop.',

    heading: 'JoyWanna & The Spicy Jam',

    intro: [
      'JoyWanna & The Spicy Jam stehen für einen mitreißenden, genreübergreifenden Sound zwischen Jazz, Latin, Soul und Pop. Farbige, harmonisch vielschichtige Arrangements treffen auf treibende Grooves und pure Spielfreude. Die Band verbindet die Begeisterung, bekannte Klassiker neu zu interpretieren und eigene Kompositionen zu erschaffen.',

      'Live entsteht ein Klang „voller Lebensfreude und Energie“: brodelnde Rhythmik, leidenschaftliche Soli und die ausdrucksstarke Stimme von Jovana Kokor tragen durch einen Abend, der bewegt – mal sinnlich, mal funkig, mal tief berührend.',

      'Freuen Sie sich auf ein Konzerterlebnis voller Lebensfreude, musikalischer Vielfalt und Crossover-Momenten.',
    ],

    videoTitle:
      'Live Medley – JoyWanna & The Spicy Jam | Concert Highlights',

    galleryEyebrow: 'Impressionen',

    galleryTitle: 'The Spicy Jam – Momente',
  },

  en: {
    title: 'JoyWanna & The Spicy Jam',

    description:
      'JoyWanna & The Spicy Jam stand for a captivating, genre-crossing sound between jazz, Latin, soul and pop.',

    heading: 'JoyWanna & The Spicy Jam',

    intro: [
      'JoyWanna & The Spicy Jam stand for a captivating, genre-crossing sound between jazz, Latin, soul and pop. Colourful, harmonically multi-layered arrangements meet driving grooves and pure joy of playing. The band combines the enthusiasm for reinterpreting well-known classics and creating their own compositions.',

      'Live, a sound "full of joie de vivre and energy" emerges: bubbling rhythms, passionate solos and the expressive voice of Jovana Kokor carry through an evening that moves – sometimes sensual, sometimes funky, sometimes deeply touching.',

      'Look forward to a concert experience full of joie de vivre, musical diversity and crossover moments.',
    ],

    videoTitle:
      'Live Medley – JoyWanna & The Spicy Jam | Concert Highlights',

    galleryEyebrow: 'Impressions',

    galleryTitle: 'The Spicy Jam – Moments',
  },
};


type GalleryItem = {
  src: string;

  title: {
    de: string;
    en: string;
  };

  description: {
    de: string;
    en: string;
  };

  alt: {
    de: string;
    en: string;
  };
};


const spicyJamGallery: GalleryItem[] = [
  {
    src: spicyJam2,

    title: {
      de: 'Spicy Jam Fotoshooting',
      en: 'Spicy Jam Photoshoot',
    },

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
    src: spicyJam36,

    title: {
      de: 'In unserem Element',
      en: 'In Our Element',
    },

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
    src: spicyJam37,

    title: {
      de: 'Verspielte Seite',
      en: 'Playful Side',
    },

    description: {
      de: "Mit meinen Spicy Jam-ers wird's selten langweilig – meine verspielte Seite inklusive. :)",
      en: "It's rarely boring with my Spicy Jam-ers – my playful side included. :)",
    },

    alt: {
      de: 'Verspielter Bandmoment von JoyWanna & The Spicy Jam',
      en: 'Playful band moment of JoyWanna & The Spicy Jam',
    },
  },

  {
    src: spicyJam39,

    title: {
      de: 'Some Sing Special',
      en: 'Some Sing Special',
    },

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
    src: spicyJam40,

    title: {
      de: 'Jazzakademie Jade',
      en: 'Jazz Academy Jade',
    },

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
    src: jw47,
    title: { de: 'Jade Jazz Jam – Pumpwerk Wilhelmshaven', en: 'Jade Jazz Jam – Pumpwerk Wilhelmshaven' },
    description: {
      de: 'Jade Jazz Jam – live open air am Pumpwerk in Wilhelmshaven. Einfach ein schöner Moment, in dem ich ganz im Zuhören versinke, während mein Pianist Jakob sein Solo spielt. Foto: Bert Bergner',
      en: 'Jade Jazz Jam – live open air at Pumpwerk in Wilhelmshaven. Simply a beautiful moment in which I sink completely into listening while my pianist Jakob plays his solo. Photo: Bert Bergner',
    },
    alt: {
      de: 'JoyWanna live open air beim Jade Jazz Jam am Pumpwerk in Wilhelmshaven, lauschend während Pianist Jakob ein Solo spielt',
      en: 'JoyWanna live open air at the Jade Jazz Jam at Pumpwerk in Wilhelmshaven, listening as pianist Jakob plays a solo',
    },
  },
];


function TheSpicyJamContent() {
  const { language } = useLanguage();

  const copy = content[language];

  const [openItem, setOpenItem] =
    useState<GalleryItem | null>(null);


  return (
    <div className="min-h-screen bg-background text-foreground">

      <Header />

      <main className="pt-24 md:pt-32">

        {/* =====================================================
            HERO / INTRODUCTION
        ====================================================== */}

        <section className="section-padding">

          <div className="container mx-auto max-w-6xl">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              <div className="order-2 lg:order-1 space-y-6">

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
                  {copy.heading}
                </h1>

                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">

                  {copy.intro.map((paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  ))}

                </div>

              </div>


              <div className="order-1 lg:order-2">

                <div className="relative overflow-hidden rounded-sm shadow-2xl">

                  <img
                    src={spicyJamImage}
                    alt="JoyWanna & The Spicy Jam"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                    decoding="async"
                  />

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            LIVE VIDEO
        ====================================================== */}

        <section className="section-padding border-t border-border">

          <div className="container mx-auto max-w-5xl">

            <div className="text-center mb-10">

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                {copy.videoTitle}
              </h2>

            </div>


            <div className="relative w-full overflow-hidden rounded-sm shadow-2xl aspect-video bg-card">

              <iframe
                src="https://www.youtube-nocookie.com/embed/snQoawnhl3Y"
                title={copy.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            SPICY JAM GALLERY
        ====================================================== */}

        <section className="section-padding border-t border-border">

          <div className="container mx-auto max-w-6xl">

            {/* Gallery heading */}

            <header className="text-center mb-10 md:mb-14">

              <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
                {copy.galleryEyebrow}
              </p>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
                {copy.galleryTitle}
              </h2>

            </header>


            {/* Gallery grid */}

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">

              {spicyJamGallery.map((item, index) => (

                <button
                  key={index}
                  type="button"
                  onClick={() => setOpenItem(item)}
                  aria-label={
                    language === 'de'
                      ? item.title.de
                      : item.title.en
                  }
                  className="w-full mb-4 break-inside-avoid bg-card block text-left rounded-sm overflow-hidden"
                >

                  <div className="group relative">

                    <img
                      src={item.src}
                      alt={
                        language === 'de'
                          ? item.alt.de
                          : item.alt.en
                      }
                      title={
                        language === 'de'
                          ? item.title.de
                          : item.title.en
                      }
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-auto object-cover"
                    />


                    {/* Desktop hover overlay */}

                    <div
                      aria-hidden="true"
                      className="
                        hidden md:flex
                        absolute inset-0
                        bg-background/70
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity duration-300
                        pointer-events-none
                        flex-col
                        items-center
                        justify-center
                        text-center
                        p-5
                      "
                    >

                      <p className="font-serif text-lg md:text-xl text-foreground">

                        {language === 'de'
                          ? item.title.de
                          : item.title.en}

                      </p>


                      <p className="mt-2 text-xs md:text-sm text-muted-foreground line-clamp-3 max-w-[90%]">

                        {language === 'de'
                          ? item.description.de
                          : item.description.en}

                      </p>

                    </div>

                  </div>


                  {/* Mobile title */}

                  <div className="md:hidden p-4">

                    <p className="font-serif text-lg">

                      {language === 'de'
                        ? item.title.de
                        : item.title.en}

                    </p>

                  </div>

                </button>

              ))}

            </div>

          </div>

        </section>

      </main>


      <Footer />


      {/* =====================================================
          GALLERY LIGHTBOX
      ====================================================== */}

      <Dialog
        open={!!openItem}
        onOpenChange={(open) => {
          if (!open) {
            setOpenItem(null);
          }
        }}
      >

        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border">

          {openItem && (
            <>

              <DialogTitle className="sr-only">

                {language === 'de'
                  ? openItem.title.de
                  : openItem.title.en}

              </DialogTitle>


              <DialogDescription className="sr-only">

                {language === 'de'
                  ? openItem.description.de
                  : openItem.description.en}

              </DialogDescription>


              <img
                src={openItem.src}
                alt={
                  language === 'de'
                    ? openItem.alt.de
                    : openItem.alt.en
                }
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[70vh] object-contain bg-background"
              />


              <div className="p-6 md:p-8">

                <h3 className="font-serif text-2xl md:text-3xl mb-2">

                  {language === 'de'
                    ? openItem.title.de
                    : openItem.title.en}

                </h3>


                <p className="text-muted-foreground leading-relaxed">

                  {language === 'de'
                    ? openItem.description.de
                    : openItem.description.en}

                </p>

              </div>

            </>
          )}

        </DialogContent>

      </Dialog>

    </div>
  );
}


const TheSpicyJam = () => {

  return (
    <LanguageProvider>

      <SEOManager />

      <LanguageSync />

      <TheSpicyJamContent />

    </LanguageProvider>
  );
};


export default TheSpicyJam;
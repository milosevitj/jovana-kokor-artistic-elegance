import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOManager } from '@/components/SEOManager';
import { parseRoute } from '@/lib/site-routes';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import jw47 from '@/assets/portfolio-new/joywanna-jade-jazz-jam-pumpwerk.webp';


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

    galleryEyebrow: 'Impressionen',

    galleryTitle: 'The Spicy Jam – Momente',

    bandEyebrow: 'Die Band',
    bandTitle: 'The Spicy Jam',
    bandIntro: 'Lernen Sie die Musikerinnen und Musiker hinter The Spicy Jam kennen.',
    learnMore: 'Mehr erfahren',
    aboutMe: 'Über mich',

    showsEyebrow: 'Live',
    showsTitle: 'Kommende Auftritte',
    buyTickets: 'Tickets kaufen',
    ticketsSoon: 'Tickets demnächst verfügbar',
    bookingText: 'Ihr möchtet JoyWanna & The Spicy Jam live erleben? Ob Festival, Club, Kulturveranstaltung oder besonderes Event – wir bringen Jazz, Soul, Latin und jede Menge Spicy Vibes auf die Bühne.',
    bookingButton: 'BOOKING & KONTAKT',
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

    galleryEyebrow: 'Impressions',

    galleryTitle: 'The Spicy Jam – Moments',

    bandEyebrow: 'The Band',
    bandTitle: 'Meet The Spicy Jam',
    bandIntro: 'Meet the musicians behind The Spicy Jam.',
    learnMore: 'Learn more',
    aboutMe: 'About me',

    showsEyebrow: 'Live',
    showsTitle: 'Upcoming Shows',
    buyTickets: 'Buy Tickets',
    ticketsSoon: 'Tickets coming soon',
    bookingText: 'Would you like to experience JoyWanna & The Spicy Jam live? Whether festival, club, cultural event or a special occasion – we bring jazz, soul, Latin and plenty of Spicy Vibes to the stage.',
    bookingButton: 'BOOKING & CONTACT',
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


const spicyJamSlides = [
  {
    src: spicyJamImage,
    alt: {
      de: 'JoyWanna & The Spicy Jam',
      en: 'JoyWanna & The Spicy Jam',
    },
  },
  ...spicyJamGallery,
];


type BandMember = {
  name: string;
  instrument: {
    de: string;
    en: string;
  };
  bio: {
    de: string;
    en: string;
  };
  image?: string;
};

/*
  Replace the placeholder names, instruments, bios and image fields below
  when the final band photos/texts arrive.

  Example:
  import memberPhoto from '@/assets/band/member-name.webp';
  ...
  image: memberPhoto,
*/
const bandMembers: BandMember[] = [
  
  {
    name: 'Band Member 2',
    instrument: { de: 'Instrument', en: 'Instrument' },
    bio: {
      de: 'Kurzer Text über dieses Bandmitglied folgt.',
      en: 'A short text about this band member will follow.',
    },
  },
  {
    name: 'JoyWanna',
    instrument: { de: 'Gesang', en: 'Vocals' },
    bio: {
      de: 'Hier kann später ein kurzer persönlicher Text über JoyWanna stehen.',
      en: 'A short personal text about JoyWanna can go here later.',
    },
    image: spicyJam37,
  },
  {
    name: 'Band Member 3',
    instrument: { de: 'Instrument', en: 'Instrument' },
    bio: {
      de: 'Kurzer Text über dieses Bandmitglied folgt.',
      en: 'A short text about this band member will follow.',
    },
  },
  {
    name: 'Band Member 4',
    instrument: { de: 'Instrument', en: 'Instrument' },
    bio: {
      de: 'Kurzer Text über dieses Bandmitglied folgt.',
      en: 'A short text about this band member will follow.',
    },
  },
  {
    name: 'Band Member 5',
    instrument: { de: 'Instrument', en: 'Instrument' },
    bio: {
      de: 'Kurzer Text über dieses Bandmitglied folgt.',
      en: 'A short text about this band member will follow.',
    },
  },
  {
    name: 'Band Member 6',
    instrument: { de: 'Instrument', en: 'Instrument' },
    bio: {
      de: 'Kurzer Text über dieses Bandmitglied folgt.',
      en: 'A short text about this band member will follow.',
    },
  },
];


function TheSpicyJamContent() {
  const { language } = useLanguage();

  const copy = content[language];
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedMember, setSelectedMember] = useState<BandMember | null>(null);

  const showPreviousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? spicyJamSlides.length - 1 : current - 1
    );
  };

  const showNextSlide = () => {
    setActiveSlide((current) =>
      current === spicyJamSlides.length - 1 ? 0 : current + 1
    );
  };

  const currentSlide = spicyJamSlides[activeSlide];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-16 md:pt-20 lg:pt-24">
        {/* =====================================================
            HERO / IMAGE CAROUSEL + INTRODUCTION
        ====================================================== */}
        <section className="px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20">
          <div className="container mx-auto max-w-7xl">
            {/* Page title above gallery */}
            <div className="text-center mb-8 md:mb-10">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
                {copy.heading}
              </h1>
            </div>

            <div className="relative overflow-hidden rounded-sm shadow-2xl bg-card">
              <img
                src={currentSlide.src}
                alt={currentSlide.alt[language]}
                width={1600}
                height={1000}
                className="block w-full h-auto max-h-[82vh] object-contain bg-background"
                decoding="async"
              />

              <button
                type="button"
                onClick={showPreviousSlide}
                aria-label={language === 'de' ? 'Vorheriges Bild' : 'Previous image'}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-background/80 text-foreground text-3xl shadow-lg backdrop-blur-sm transition hover:bg-background"
              >
                <span aria-hidden="true">‹</span>
              </button>

              <button
                type="button"
                onClick={showNextSlide}
                aria-label={language === 'de' ? 'Nächstes Bild' : 'Next image'}
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-background/80 text-foreground text-3xl shadow-lg backdrop-blur-sm transition hover:bg-background"
              >
                <span aria-hidden="true">›</span>
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                {activeSlide + 1} / {spicyJamSlides.length}
              </div>
            </div>

            <div className="mt-7 md:mt-9 max-w-4xl mx-auto text-center">
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                {copy.intro.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            LIVE VIDEO
        ====================================================== */}
        <section className="section-padding border-t border-border">
          <div className="container mx-auto max-w-5xl">
            <div className="relative w-full overflow-hidden rounded-sm shadow-2xl aspect-video bg-card">
              <iframe
                src="https://www.youtube-nocookie.com/embed/snQoawnhl3Y"
                title="JoyWanna & The Spicy Jam live video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            BAND MEMBERS
        ====================================================== */}
        <section className="border-t border-border px-4 sm:px-6 lg:px-8 py-14 md:py-16 lg:py-20">
          <div className="container mx-auto max-w-6xl">
            <header className="mx-auto mb-10 md:mb-12 max-w-2xl text-center">
              <p className="mb-3 text-xs md:text-sm tracking-[0.28em] uppercase text-primary">
                {copy.bandEyebrow}
              </p>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
                {copy.bandTitle}
              </h2>

              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                {copy.bandIntro}
              </p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-9 md:gap-x-7 md:gap-y-11">
              {bandMembers.map((member) => {
                const card = (
                  <>
                    <div className="group relative aspect-square overflow-hidden rounded-sm bg-card shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={`${member.name} – ${member.instrument[language]}`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted/50 px-4 text-center">
                          <span className="font-serif text-xl md:text-2xl text-muted-foreground/70">
                            Photo
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 hidden md:flex items-end justify-center bg-background/0 p-5 opacity-0 transition-all duration-300 group-hover:bg-background/35 group-hover:opacity-100">
                        <span className="rounded-full bg-background/90 px-4 py-2 text-xs font-medium tracking-wide text-foreground shadow-sm backdrop-blur-sm">
                          {copy.learnMore}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 text-center">
                      <h3 className="font-serif text-lg md:text-xl leading-tight">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {member.instrument[language]}
                      </p>
                    </div>
                  </>
                );

                return (
                  <button
                    key={member.name}
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                    aria-label={`${member.name} – ${copy.learnMore}`}
                  >
                    {card}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            UPCOMING SHOWS + BOOKING — matches Home GigsSection
        ====================================================== */}
        <section className="section-padding bg-card">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
                {copy.showsTitle}
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                {language === 'de'
                  ? 'JoyWanna & The Spicy Jam live erleben.'
                  : 'Experience JoyWanna & The Spicy Jam live.'}
              </p>
              <div className="w-20 h-px bg-primary mx-auto mt-8" />
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <article className="group bg-background border border-border rounded-sm p-6 md:p-8 card-hover">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4 md:w-1/4">
                    <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">
                        {language === 'de' ? '24. September 2026' : 'September 24, 2026'}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                      “Some Sing Special” – JoyWanna & The Spicy Jam
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Wilhelm 13, Oldenburg</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2">
                    <a
                      href="https://wilhelm13.de/programm/some-sing-special-joywanna-the-spicy-jam/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      {copy.buyTickets}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>

              <article className="group bg-background border border-border rounded-sm p-6 md:p-8 card-hover">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4 md:w-1/4">
                    <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">
                        {language === 'de' ? '7. November 2026' : 'November 7, 2026'}
                      </p>
                      <p className="text-muted-foreground text-sm">20:00</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                      JoyWanna & The Spicy Jam
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Haus der Kultur, Rhauderfehn</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2">
                    <span className="text-sm italic text-muted-foreground">
                      {copy.ticketsSoon}
                    </span>
                  </div>
                </div>
              </article>
            </div>

          </div>
        </section>

        {/* =====================================================
            BOOKING CTA — matches HomeCTASection
        ====================================================== */}
        <section
          id="booking"
          className="py-24 md:py-32 bg-background"
          aria-labelledby="booking-title"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h2
                id="booking-title"
                className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-foreground"
              >
                {language === 'de' ? 'Booking & Kontakt' : 'Booking & Contact'}
              </h2>

              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                {copy.bookingText}
              </p>

              <div className="pt-2">
                <Button asChild size="lg" className="px-10">
                  <Link to={language === 'de' ? '/contact' : '/en/contact'}>
                    {copy.bookingButton}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>


      <Dialog
        open={!!selectedMember}
        onOpenChange={(open) => {
          if (!open) setSelectedMember(null);
        }}
      >
        <DialogContent className="max-w-lg overflow-hidden border-border bg-card p-0">
          {selectedMember && (
            <>
              {selectedMember.image && (
                <div className="aspect-square max-h-[48vh] w-full overflow-hidden bg-muted">
                  <img
                    src={selectedMember.image}
                    alt={`${selectedMember.name} – ${selectedMember.instrument[language]}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 md:p-8">
                <DialogTitle className="font-serif text-2xl md:text-3xl">
                  {selectedMember.name}
                </DialogTitle>

                <p className="mt-1 text-sm text-primary">
                  {selectedMember.instrument[language]}
                </p>

                <DialogDescription className="mt-5 text-sm md:text-base leading-relaxed text-muted-foreground">
                  {selectedMember.bio[language]}
                </DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
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
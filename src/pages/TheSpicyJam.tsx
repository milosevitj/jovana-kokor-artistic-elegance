import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOManager } from '@/components/SEOManager';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, MapPin, ExternalLink, Play } from 'lucide-react';
import { parseRoute, buildPagePath } from '@/lib/site-routes';

import bandImage from '@/assets/joywanna-spicy-jam.webp';
import portraitImage from '@/assets/jovana-portrait-hq.webp';
import bandPhotoshoot from '@/assets/portfolio-new/joywanna-spicy-jam-photoshoot-wilhelm13.webp';
import bandInOurElement from '@/assets/portfolio-new/joywanna-spicy-jam-in-our-element.webp';
import bandPlayfulSide from '@/assets/portfolio-new/joywanna-spicy-jam-playful-side.webp';
import bandSomeSingSpecial from '@/assets/portfolio-new/joywanna-some-sing-special-wilhelm13.webp';
import bandJazzakademieJade from '@/assets/portfolio-new/joywanna-jazzakademie-jade-concert.webp';

type Bi = { de: string; en: string };

/** Upcoming shows — mirrored from the site-wide gigs data. */
const BAND_GIGS = [
  {
    id: 'some-sing-special',
    date: '2026-09-24',
    title: '"Some Sing Special" – JoyWanna & The Spicy Jam',
    venue: 'Wilhelm 13',
    city: 'Oldenburg',
    eventUrl: 'https://wilhelm13.de/programm/some-sing-special-joywanna-the-spicy-jam/',
  },
  {
    id: 'haus-der-kultur',
    date: '2026-11-07',
    time: '20:00',
    title: 'JoyWanna & The Spicy Jam',
    venue: 'Haus der Kultur',
    city: 'Rhauderfehn',
  },
] as const;

/** Curated band photos — images and captions reused from the existing gallery. */
const BAND_GALLERY: { id: string; src: string; title: Bi; description: Bi; alt: Bi }[] = [
  {
    id: 'photoshoot-wilhelm13',
    src: bandPhotoshoot,
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
    id: 'in-our-element',
    src: bandInOurElement,
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
    id: 'playful-side',
    src: bandPlayfulSide,
    title: { de: 'Verspielte Seite', en: 'Playful Side' },
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
    id: 'some-sing-special',
    src: bandSomeSingSpecial,
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
    id: 'jazzakademie-jade',
    src: bandJazzakademieJade,
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
];

/**
 * Band members.
 *
 * PLACEHOLDERS: name, role, bio and image are intentionally generic and are
 * meant to be replaced with the final square portraits and short biographies.
 * Simply swap `image` (square photo import), `name`, `role` and `bio`.
 */
type BandMember = {
  id: string;
  name: string;
  role: Bi;
  bio: Bi;
  image: string;
  /** Optional secondary image shown inside the modal. */
  extraImage?: string;
  /** JoyWanna links to the About page instead of showing a full biography. */
  isJoyWanna?: boolean;
};

const BAND_MEMBERS: BandMember[] = [
  {
    id: 'joywanna',
    name: 'JoyWanna',
    role: { de: 'Gesang, Klavier', en: 'Vocals, Piano' },
    bio: {
      de: 'Sängerin, Pianistin und Bandleaderin von JoyWanna & The Spicy Jam.',
      en: 'Singer, pianist and bandleader of JoyWanna & The Spicy Jam.',
    },
    image: portraitImage,
    isJoyWanna: true,
  },
  {
    id: 'member-1',
    name: 'Bandmitglied 1',
    role: { de: 'Instrument folgt', en: 'Instrument TBA' },
    bio: { de: 'Biografie folgt.', en: 'Biography coming soon.' },
    image: bandImage,
  },
  {
    id: 'member-2',
    name: 'Bandmitglied 2',
    role: { de: 'Instrument folgt', en: 'Instrument TBA' },
    bio: { de: 'Biografie folgt.', en: 'Biography coming soon.' },
    image: bandImage,
  },
  {
    id: 'member-3',
    name: 'Bandmitglied 3',
    role: { de: 'Instrument folgt', en: 'Instrument TBA' },
    bio: { de: 'Biografie folgt.', en: 'Biography coming soon.' },
    image: bandImage,
  },
  {
    id: 'member-4',
    name: 'Bandmitglied 4',
    role: { de: 'Instrument folgt', en: 'Instrument TBA' },
    bio: { de: 'Biografie folgt.', en: 'Biography coming soon.' },
    image: bandImage,
  },
];

const VIDEO_URL = 'https://youtu.be/snQoawnhl3Y?si=eNfo3u78fBvNv0so';
const VIDEO_ID = 'snQoawnhl3Y';
const VIDEO_TITLE = 'Live Medley – JoyWanna & The Spicy Jam | Concert Highlights';

function formatDate(dateStr: string, language: string): string {
  return new Date(dateStr).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function SpicyJamContent() {
  const { language, setLanguage, t } = useLanguage();
  const { pathname } = useLocation();
  const [openPhoto, setOpenPhoto] = useState<(typeof BAND_GALLERY)[number] | null>(null);
  const [openMember, setOpenMember] = useState<BandMember | null>(null);

  useEffect(() => {
    const parsed = parseRoute(pathname);
    if (parsed.lang !== language) setLanguage(parsed.lang);
  }, [pathname, language, setLanguage]);

  const de = language === 'de';
  const aboutPath = buildPagePath('about', language);
  const contactPath = buildPagePath('contact', language);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pt-24 md:pt-32">
        {/* Hero / Intro — existing band image, title and intro text */}
        <section className="px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
          <div className="container mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-sm border border-border">
              <img
                src={bandImage}
                alt="JoyWanna & The Spicy Jam - Jazz, Soul and Pop Band"
                className="w-full h-[260px] md:h-[420px] object-cover"
                loading="eager"
                decoding="async"
              />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-10 mb-4">
              {t('band.modal.title')}
            </h1>
            <div className="w-16 h-px bg-primary mb-8" />

            <div className="space-y-5 text-muted-foreground leading-relaxed text-[0.95rem]">
              <p>{t('band.modal.p1')}</p>
              <p>{t('band.modal.p2')}</p>
              <p>{t('band.modal.p3')}</p>
            </div>
          </div>
        </section>

        {/* Kommende Auftritte */}
        <section className="px-6 md:px-12 lg:px-20 py-12 md:py-16 bg-card">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-3">
              {de ? 'Kommende Auftritte' : 'Upcoming Shows'}
            </h2>
            <div className="w-20 h-px bg-primary mx-auto mb-10" />

            <div className="space-y-4">
              {BAND_GIGS.map((gig) => (
                <article
                  key={gig.id}
                  className="group bg-background border border-border rounded-sm p-5 md:p-6 card-hover"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 md:w-1/3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{formatDate(gig.date, language)}</p>
                        {'time' in gig && gig.time && (
                          <p className="text-muted-foreground text-sm">{gig.time}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-serif text-lg md:text-xl mb-1 group-hover:text-primary transition-colors">
                        {gig.title}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {gig.venue}, {gig.city}
                        </span>
                      </div>
                    </div>

                    <div className="md:text-right">
                      {'eventUrl' in gig && gig.eventUrl ? (
                        <a
                          href={gig.eventUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          {de ? 'Tickets kaufen' : 'Buy Tickets'}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-sm italic text-muted-foreground">
                          {de ? 'Tickets folgen bald' : 'Tickets coming soon'}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Live Video */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-3">
              {de ? 'Live Video' : 'Live Video'}
            </h2>
            <div className="w-20 h-px bg-primary mx-auto mb-10" />

            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-sm overflow-hidden bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={VIDEO_TITLE}
            >
              <div className="relative aspect-video">
                <img
                  src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt={VIDEO_TITLE}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Play size={22} className="text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <p className="font-serif text-base md:text-lg text-foreground">{VIDEO_TITLE}</p>
                </div>
              </div>
            </a>
            <p className="mt-4 text-center text-sm text-muted-foreground">{VIDEO_TITLE}</p>
          </div>
        </section>

        {/* Band Gallery */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-card">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-3">
              {de ? 'Bandmomente' : 'Band Moments'}
            </h2>
            <div className="w-20 h-px bg-primary mx-auto mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BAND_GALLERY.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setOpenPhoto(photo)}
                  className="w-full text-left rounded-sm overflow-hidden bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={de ? photo.title.de : photo.title.en}
                >
                  <div className="group relative">
                    <img
                      src={photo.src}
                      alt={de ? photo.alt.de : photo.alt.en}
                      title={de ? photo.title.de : photo.title.en}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-56 md:h-64 object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="hidden md:flex absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex-col items-center justify-center text-center p-4"
                    >
                      <p className="font-serif text-lg text-foreground">
                        {de ? photo.title.de : photo.title.en}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-3 max-w-[90%]">
                        {de ? photo.description.de : photo.description.en}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Band */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-3">
              {de ? 'Die Band' : 'Meet the Band'}
            </h2>
            <div className="w-20 h-px bg-primary mx-auto mb-10" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {BAND_MEMBERS.map((member) => (
                <div key={member.id} className="text-center">
                  <button
                    type="button"
                    onClick={() => setOpenMember(member)}
                    className="group block w-full rounded-sm overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label={member.name}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-sm bg-card">
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </button>
                  <p className="font-serif text-base md:text-lg mt-4">{member.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {de ? member.role.de : member.role.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-card">
          <div className="container mx-auto max-w-2xl text-center space-y-8">
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Ihr möchtet JoyWanna &amp; The Spicy Jam live erleben? Ob Festival, Club,
              Kulturveranstaltung oder besonderes Event – wir bringen Jazz, Soul, Latin und jede
              Menge Spicy Vibes auf die Bühne.
            </p>
            <Button asChild size="lg" className="px-10">
              <Link to={contactPath}>BOOKING &amp; KONTAKT</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Gallery lightbox */}
      <Dialog open={!!openPhoto} onOpenChange={(o) => !o && setOpenPhoto(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border">
          {openPhoto && (
            <>
              <DialogTitle className="sr-only">
                {de ? openPhoto.title.de : openPhoto.title.en}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {de ? openPhoto.description.de : openPhoto.description.en}
              </DialogDescription>
              <img
                src={openPhoto.src}
                alt={de ? openPhoto.alt.de : openPhoto.alt.en}
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[70vh] object-contain bg-background"
              />
              <div className="p-6 md:p-8">
                <h3 className="font-serif text-2xl md:text-3xl mb-2">
                  {de ? openPhoto.title.de : openPhoto.title.en}
                </h3>
                <p className="text-muted-foreground">
                  {de ? openPhoto.description.de : openPhoto.description.en}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Band member modal */}
      <Dialog open={!!openMember} onOpenChange={(o) => !o && setOpenMember(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden bg-card border-border">
          {openMember && (
            <>
              <img
                src={openMember.image}
                alt={openMember.name}
                loading="lazy"
                decoding="async"
                className="w-full h-56 md:h-64 object-cover"
              />
              <div className="p-6 md:p-8">
                <DialogTitle className="font-serif text-2xl md:text-3xl text-left">
                  {openMember.name}
                </DialogTitle>
                <p className="text-sm text-primary mt-1">
                  {de ? openMember.role.de : openMember.role.en}
                </p>
                <div className="w-12 h-px bg-primary mt-3 mb-4" />
                <DialogDescription className="text-muted-foreground leading-relaxed text-[0.95rem]">
                  {de ? openMember.bio.de : openMember.bio.en}
                </DialogDescription>

                {openMember.extraImage && (
                  <img
                    src={openMember.extraImage}
                    alt={openMember.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto mt-6 rounded-sm"
                  />
                )}

                {openMember.isJoyWanna && (
                  <div className="mt-6">
                    <Link
                      to={aboutPath}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      {de ? 'Mehr über JoyWanna' : 'More about JoyWanna'}
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const TheSpicyJam = () => (
  <LanguageProvider>
    <SEOManager />
    <SpicyJamContent />
  </LanguageProvider>
);

export default TheSpicyJam;

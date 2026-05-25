import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, CalendarDays, Clock, Ticket, Music2, Piano, Mic2, Sparkles } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { SEOManager } from '@/components/SEOManager';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import poster from '@/assets/reimagined-poster.jpeg';

const COPY = {
  de: {
    back: 'Zurück zur Startseite',
    eyebrow: 'Konzert · Voice & Piano',
    tagline: 'Bekannte Songs – neu interpretiert. Reduziert auf Stimme, Klavier, Klang und Gefühl.',
    venue: 'Wilhelm 13',
    city: 'Oldenburg',
    date: '14. Juni',
    time: '20:00 Uhr',
    tickets: 'Tickets & Anfrage',
    aboutTitle: 'Über den Abend',
    about:
      '„Reimagined" ist ein persönliches Projekt von Jovana Kokor – ein intimer Konzertabend, an dem bekannte Songs und Publikumsfavoriten neu interpretiert werden. Die Stücke werden aus ihrem ursprünglichen Kontext gelöst und auf das Wesentliche reduziert: eine Stimme, ein Klavier, ein Raum für echte Emotion.',
    pillarsTitle: 'Was dich erwartet',
    pillars: [
      { title: 'Stimme', desc: 'Roh, ehrlich und unmittelbar – mit Raum für jede Nuance.' },
      { title: 'Klavier', desc: 'Reduziert und tragend – Begleiter und gleichberechtigter Partner der Stimme.' },
      { title: 'Klang', desc: 'Warm, dicht, lebendig – jeder Atemzug wird Teil des Stücks.' },
      { title: 'Gefühl', desc: 'Kleine Konzertmomente – persönlich, direkt, berührend.' },
    ],
    ctaTitle: 'Sei dabei',
    ctaSubtitle: 'Begrenzte Plätze – sichere dir deinen Sitz für diesen besonderen Abend in Oldenburg.',
    ctaPrimary: 'Karte anfragen',
    ctaSecondary: 'Mehr über JoyWanna',
  },
  en: {
    back: 'Back to Home',
    eyebrow: 'Concert · Voice & Piano',
    tagline: 'Familiar songs – reinterpreted. Stripped back to voice, piano, sound and feeling.',
    venue: 'Wilhelm 13',
    city: 'Oldenburg',
    date: 'June 14',
    time: '8:00 PM',
    tickets: 'Tickets & inquiry',
    aboutTitle: 'About the evening',
    about:
      '"Reimagined" is a personal project by Jovana Kokor – an intimate concert evening where familiar songs and audience favorites are reinterpreted. The pieces are lifted out of their original context and reduced to the essentials: one voice, one piano, a space for honest emotion.',
    pillarsTitle: 'What to expect',
    pillars: [
      { title: 'Voice', desc: 'Raw, honest and immediate – with room for every nuance.' },
      { title: 'Piano', desc: 'Reduced and supportive – companion and equal partner to the voice.' },
      { title: 'Sound', desc: 'Warm, close, alive – every breath becomes part of the piece.' },
      { title: 'Feeling', desc: 'Small concert moments – personal, direct, deeply moving.' },
    ],
    ctaTitle: 'Join us',
    ctaSubtitle: 'Limited seats – secure your spot for this special evening in Oldenburg.',
    ctaPrimary: 'Request a ticket',
    ctaSecondary: 'More about JoyWanna',
  },
} as const;

const ICONS = [Mic2, Piano, Music2, Sparkles];

function ReimaginedContent() {
  const { language } = useLanguage();
  const copy = COPY[language];
  const homeHref = `/${language}/`;
  const contactHref = language === 'de' ? '/de/kontakt' : '/en/contact';
  const aboutHref = language === 'de' ? '/de/ueber-mich' : '/en/about-me';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero – concert poster */}
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{ background: 'var(--gradient-hero)' }}
            aria-hidden="true"
          />
          <div className="container mx-auto px-6 md:px-12 relative">
            <Link
              to={homeHref}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {copy.back}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              {/* Poster */}
              <div className="relative animate-fade-in order-1 lg:order-1">
                <div
                  className="absolute -inset-4 rounded-2xl opacity-50 blur-2xl"
                  style={{ background: 'var(--gradient-ruby)' }}
                  aria-hidden="true"
                />
                <img
                  src={poster}
                  alt="JoyWanna Reimagined – Voice & Piano – Wilhelm 13, Oldenburg, 14. Juni 20:00"
                  width={900}
                  height={1200}
                  loading="eager"
                  fetchPriority="high"
                  className="relative w-full h-auto rounded-2xl border border-border/50 shadow-2xl object-cover"
                  style={{ boxShadow: 'var(--shadow-elegant)' }}
                />
              </div>

              {/* Event details */}
              <div className="order-2 lg:order-2 text-center lg:text-left">
                <p className="text-sm md:text-base uppercase tracking-[0.25em] text-primary mb-4">
                  {copy.eyebrow}
                </p>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-4 leading-[1.05]">
                  Reimagined
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
                  {copy.tagline}
                </p>

                <div className="w-20 h-px bg-primary mx-auto lg:mx-0 mb-8" />

                <ul className="space-y-4 mb-10 inline-block text-left">
                  <li className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-base md:text-lg">
                      <span className="font-medium">{copy.venue}</span>
                      <span className="text-muted-foreground"> · {copy.city}</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CalendarDays className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-base md:text-lg">{copy.date}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-base md:text-lg">{copy.time}</span>
                  </li>
                </ul>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to={contactHref} className="btn-hero inline-flex items-center justify-center">
                    <Ticket className="w-4 h-4 mr-2" />
                    {copy.tickets}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the evening */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                {copy.aboutTitle}
              </h2>
              <div className="w-16 h-px bg-primary mx-auto mt-6" />
            </div>
            <p className="text-foreground/90 leading-relaxed text-lg md:text-xl text-center">
              {copy.about}
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                {copy.pillarsTitle}
              </h2>
              <div className="w-16 h-px bg-primary mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {copy.pillars.map((p, i) => {
                const Icon = ICONS[i];
                return (
                  <div
                    key={p.title}
                    className="bg-card rounded-2xl border border-border/50 p-8 hover:border-primary/30 transition-colors duration-300 text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-2xl font-medium mb-3">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-6 md:px-12 max-w-2xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
              {copy.ctaTitle}
            </h2>
            <p className="text-muted-foreground text-lg mb-10">{copy.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={contactHref} className="btn-hero inline-flex items-center justify-center">
                <Ticket className="w-4 h-4 mr-2" />
                {copy.ctaPrimary}
              </Link>
              <Link
                to={aboutHref}
                className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-sm text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {copy.ctaSecondary}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const Reimagined = () => (
  <LanguageProvider>
    <SEOManager />
    <ReimaginedContent />
  </LanguageProvider>
);

export default Reimagined;

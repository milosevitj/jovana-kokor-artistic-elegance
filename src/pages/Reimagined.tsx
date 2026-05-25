import { Link } from 'react-router-dom';
import { ArrowLeft, Music2, Piano, Mic2, Sparkles } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { SEOManager } from '@/components/SEOManager';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const COPY = {
  de: {
    back: 'Zurück zur Startseite',
    eyebrow: 'Ein Projekt von JoyWanna',
    title: 'Reimagined',
    subtitle: 'Bekannte Songs – neu gehört. Reduziert auf Stimme, Klavier, Klang und Gefühl.',
    intro:
      '„Reimagined" ist ein persönliches Projekt von Jovana Kokor – ein Album mit neu interpretierten Lieblingssongs und Publikumsfavoriten. Die Stücke werden aus ihrem ursprünglichen Kontext gelöst und auf das Wesentliche reduziert: eine Stimme, ein Klavier, ein Raum für echte Emotion.',
    conceptTitle: 'Das Konzept',
    concept:
      'Jeder Song erzählt eine Geschichte. In „Reimagined" entstehen diese Geschichten neu – langsamer, intimer, oft mit mehr Stille zwischen den Tönen. Der Fokus liegt nicht auf der Originalproduktion, sondern auf dem, was bleibt, wenn man alles Überflüssige weglässt: die Melodie, der Text, der Moment.',
    pillarsTitle: 'Was „Reimagined" ausmacht',
    pillars: [
      {
        title: 'Stimme',
        desc: 'Roh, ehrlich und unmittelbar – mit Raum für jede Nuance.',
      },
      {
        title: 'Klavier',
        desc: 'Reduziert und tragend – als Begleiter und gleichberechtigter Partner der Stimme.',
      },
      {
        title: 'Klang',
        desc: 'Warm, dicht, lebendig – jeder Atemzug, jeder Anschlag wird Teil des Stücks.',
      },
      {
        title: 'Gefühl',
        desc: 'Die Songs werden zu kleinen Konzertmomenten – persönlich, direkt, berührend.',
      },
    ],
    sessionsTitle: 'Sessions & Live-Konzerte',
    sessions:
      '„Reimagined" lebt nicht nur auf dem Album, sondern auch auf der Bühne. In intimen Konzertformaten – solo oder im Duo – entstehen Abende, die ganz auf Stimme und Klavier reduziert sind. Ein Raum, in dem zwischen Künstlerin und Publikum eine besondere Verbundenheit entsteht.',
    ctaTitle: 'Live erleben oder buchen',
    ctaSubtitle:
      '„Reimagined" eignet sich für Konzertreihen, kuratierte Events, Kulturhäuser und private Anlässe, bei denen Musik nicht nur Beiwerk, sondern Mittelpunkt sein soll.',
    ctaPrimary: 'Anfrage senden',
    ctaSecondary: 'Mehr über JoyWanna',
  },
  en: {
    back: 'Back to Home',
    eyebrow: 'A project by JoyWanna',
    title: 'Reimagined',
    subtitle: 'Familiar songs – heard anew. Stripped back to voice, piano, sound and feeling.',
    intro:
      '"Reimagined" is a personal project by Jovana Kokor – an album of reinterpreted favorite songs and audience favorites. The pieces are lifted out of their original context and reduced to the essentials: one voice, one piano, a space for honest emotion.',
    conceptTitle: 'The concept',
    concept:
      'Every song tells a story. In "Reimagined" these stories are reborn – slower, more intimate, often with more silence between the notes. The focus is not on the original production, but on what remains when everything unnecessary is stripped away: the melody, the lyric, the moment.',
    pillarsTitle: 'What "Reimagined" stands for',
    pillars: [
      {
        title: 'Voice',
        desc: 'Raw, honest and immediate – with room for every nuance.',
      },
      {
        title: 'Piano',
        desc: 'Reduced and supportive – companion and equal partner to the voice.',
      },
      {
        title: 'Sound',
        desc: 'Warm, close, alive – every breath and every key becomes part of the piece.',
      },
      {
        title: 'Feeling',
        desc: 'Songs become small concert moments – personal, direct, deeply moving.',
      },
    ],
    sessionsTitle: 'Sessions & live concerts',
    sessions:
      '"Reimagined" lives not only on the album, but also on stage. In intimate concert formats – solo or as a duo – evenings emerge that are fully reduced to voice and piano. A space where a special connection is created between the artist and the audience.',
    ctaTitle: 'Experience it live or book the show',
    ctaSubtitle:
      '"Reimagined" is ideal for concert series, curated events, cultural venues and private occasions where music is meant to be the heart of the evening, not a backdrop.',
    ctaPrimary: 'Send an inquiry',
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
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-secondary/30 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
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

            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <p className="text-sm md:text-base uppercase tracking-[0.25em] text-primary mb-4">
                {copy.eyebrow}
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6">
                {copy.title}
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                {copy.subtitle}
              </p>
              <div className="w-20 h-px bg-primary mx-auto mt-8" />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl">
            <p className="text-foreground/90 leading-relaxed text-lg md:text-xl text-center">
              {copy.intro}
            </p>
          </div>
        </section>

        {/* Concept */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                {copy.conceptTitle}
              </h2>
              <div className="w-16 h-px bg-primary mx-auto mt-6" />
            </div>
            <p className="text-foreground/90 leading-relaxed text-lg text-center">
              {copy.concept}
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

        {/* Sessions */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                {copy.sessionsTitle}
              </h2>
              <div className="w-16 h-px bg-primary mx-auto mt-6" />
            </div>
            <p className="text-foreground/90 leading-relaxed text-lg text-center">
              {copy.sessions}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12 max-w-2xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
              {copy.ctaTitle}
            </h2>
            <p className="text-muted-foreground text-lg mb-10">{copy.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={contactHref} className="btn-hero">
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

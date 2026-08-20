import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOManager } from '@/components/SEOManager';
import { parseRoute } from '@/lib/site-routes';
import spicyJamImage from '@/assets/joywanna-spicy-jam.webp';

function LanguageSync() {
  const { pathname } = useLocation();
  const { language, setLanguage } = useLanguage();
  useEffect(() => {
    const parsed = parseRoute(pathname);
    if (parsed.lang !== language) setLanguage(parsed.lang);
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
    videoTitle: 'Live Medley – JoyWanna & The Spicy Jam | Concert Highlights',
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
    videoTitle: 'Live Medley – JoyWanna & The Spicy Jam | Concert Highlights',
  },
};

function TheSpicyJamContent() {
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 md:pt-32">
        {/* Hero / Introduction */}
        <section className="section-padding">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
                  {copy.heading}
                </h1>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  {copy.intro.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
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

        {/* Live Video */}
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
      </main>
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

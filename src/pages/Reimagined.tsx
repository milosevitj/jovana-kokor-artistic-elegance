import { useState } from 'react';
import { Instagram, Mail, Heart, ExternalLink } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { SEOManager } from '@/components/SEOManager';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import coverImage from '@/assets/reimagined-cover.png';

const WEB3FORMS_KEY = 'c9a75166-953d-48b7-8f96-9b200665d2ab';

const albumConfig = {
  artistName: 'JoyWanna',
  albumTitle: 'Reimagined',
  coverImage,
};

const STREAMING_LINKS = [
  {
    name: 'Bandcamp',
    url: 'https://joywanna.bandcamp.com/album/reimagined',
    color: '#1DA0C3',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M0 18.75l7.437-13.5h9.126l-7.437 13.5H0zM15.563 5.25L24 18.75h-7.437L9.126 5.25h6.437z" />
      </svg>
    ),
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/album/5aO2J7QX4985CnyrMpie4g',
    color: '#1DB954',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: 'Deezer',
    url: 'https://www.deezer.com/album/1006152911',
    color: '#FEAA2D',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M0 16.608h3.96v3.96H0zm5.172 0h3.96v3.96h-3.96zm5.172 0h3.96v3.96h-3.96zm5.172 0h3.96v3.96h-3.96zM0 11.928h3.96v3.96H0zm5.172 0h3.96v3.96h-3.96zm5.172 0h3.96v3.96h-3.96zm5.172 0h3.96v3.96h-3.96zM0 7.248h3.96v3.96H0zm5.172 0h3.96v3.96h-3.96zm5.172 0h3.96v3.96h-3.96zm5.172 0h3.96v3.96h-3.96zM0 2.568h3.96v3.96H0zm5.172 0h3.96v3.96h-3.96zm5.172 0h3.96v3.96h-3.96zm5.172 0h3.96v3.96h-3.96z" />
      </svg>
    ),
  },
  {
    name: 'Tidal',
    url: 'http://www.tidal.com/album/533631287',
    color: '#0C67F1',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996 4.004 12l4.004-4.004L12.012 12l-4.004 4.004 4.004 4.004 4.004-4.004L12.012 12l4.004-4.004-4.004-4.004zM16.042 7.996l3.976-3.976L24 7.996l-3.982 3.982zM12.012 19.982l-3.988-3.988-3.988 3.988L0 16.004l3.988-3.988 4.024 4.024 3.988-3.988 3.976 3.976z" />
      </svg>
    ),
  },
];

const content = {
  de: {
    subtitle: 'Voice & Piano',
    tagline: 'Bekannte Songs neu gehört.',
    introTitle: 'Vielen Dank, dass ihr Teil von „Reimagined" seid.',
    introBody:
      'Dieses Album ist eine sehr persönliche Sammlung von Songs, die mich über viele Jahre begleitet haben und die ich für Stimme und Klavier neu interpretiert habe.',
    introAvailable: 'Jetzt verfügbar',
    introCta: 'Wählt eure bevorzugte Streaming-Plattform und hört „Reimagined".',
    listenTitle: 'Reimagined anhören',
    additionalPlatforms:
      'Das Album ist außerdem auf weiteren Streaming-Plattformen wie Audiomack, Anghami und iHeartRadio verfügbar.\nIch hoffe, es bald auch auf Apple Music, Amazon Music und YouTube Music verfügbar machen zu können.',
    newsletterTitle: 'Keine Veröffentlichung verpassen',
    newsletterBody: 'Trage dich in meinen Newsletter ein und erfahre als Erste*r von:',
    newsletterList: ['neuen Konzerten', 'neuen Musikveröffentlichungen', 'besonderen Projekten'],
    emailPlaceholder: 'deine@email.de',
    subscribe: 'Anmelden',
    toastTitle: 'Vielen Dank!',
    toastBody: 'Du wirst informiert, sobald es Neuigkeiten gibt.',
    supportTitle: 'Musik unterstützen',
    supportBody:
      'Wenn dir meine Musik gefällt und du zukünftige Aufnahmen, Konzerte und neue Projekte unterstützen möchtest, freue ich mich über deine Unterstützung.',
    supportCta: 'Musik unterstützen',
  },
  en: {
    subtitle: 'Voice & Piano',
    tagline: 'Familiar songs, heard anew.',
    introTitle: 'Thank you for being part of "Reimagined".',
    introBody:
      'This album is a very personal collection of songs that have accompanied me over many years, which I have reinterpreted for voice and piano.',
    introAvailable: 'Now available',
    introCta: 'Choose your preferred streaming platform and listen to "Reimagined".',
    listenTitle: 'Listen to Reimagined',
    additionalPlatforms:
      'The album is also available on additional streaming platforms such as Audiomack, Anghami, and iHeartRadio.\nI hope to make it available on Apple Music, Amazon Music, and YouTube Music soon.',
    newsletterTitle: "Don't miss any release",
    newsletterBody: 'Sign up for my newsletter and be the first to know about:',
    newsletterList: ['new concerts', 'new music releases', 'special projects'],
    emailPlaceholder: 'your@email.com',
    subscribe: 'Sign up',
    toastTitle: 'Thank you!',
    toastBody: 'You will be notified as soon as there is news.',
    supportTitle: 'Support the music',
    supportBody:
      'If you enjoy my music and would like to support future recordings, concerts and projects, I would greatly appreciate it.',
    supportCta: 'Support music',
  },
} as const;

function ReimaginedContent() {
  const { language } = useLanguage();
  const t = content[language];
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);

    const payload = new FormData();
    payload.append('access_key', WEB3FORMS_KEY);
    payload.append('name', 'Newsletter Subscriber');
    payload.append('email', email);
    payload.append('subject', '[Newsletter Signup]');
    payload.append('message', `Newsletter signup from the JoyWanna website.\n\nEmail: ${email}`);
    payload.append('from_name', 'JoyWanna Website');
    payload.append('replyto', email);
    payload.append('botcheck', '');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || 'Submission failed');
      }
      toast({ title: t.toastTitle, description: t.toastBody });
      setEmail('');
    } catch (err) {
      console.error('Newsletter form error:', err);
      toast({
        title: language === 'de' ? 'Fehler' : 'Error',
        description: language === 'de' ? 'Etwas ist schiefgelaufen.' : 'Something went wrong.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 md:pt-36 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            <div className="flex justify-center md:justify-end">
              <img
                src={albumConfig.coverImage}
                alt={`${albumConfig.albumTitle} – ${albumConfig.artistName}`}
                className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl object-cover shadow-2xl"
                loading="eager"
              />
            </div>
            <div className="text-center md:text-left">
              <div className="w-16 h-px bg-primary mb-6 mx-auto md:mx-0" />
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-3">
                JoyWanna – Reimagined
              </h1>
              <p className="text-xl md:text-2xl text-primary font-serif italic mb-4">
                {t.subtitle}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.tagline}</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-16 md:mt-20 space-y-6 text-center">
            <p className="text-lg text-foreground/90 leading-relaxed">{t.introTitle}</p>
            <p className="text-base text-muted-foreground leading-relaxed">{t.introBody}</p>
            <p className="text-lg text-foreground/90 leading-relaxed">{t.introAvailable}</p>
            <p className="text-base text-muted-foreground leading-relaxed">{t.introCta}</p>
          </div>
        </section>

        {/* Streaming Links */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 mt-20 md:mt-28">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-px bg-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8">{t.listenTitle}</h2>
            <div className="space-y-3">
              {STREAMING_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card/30 hover:bg-card/60 hover:border-primary/40 transition-all duration-300 group"
                >
                  <span style={{ color: link.color }} className="flex-shrink-0">
                    <span className="block h-6 w-6">{link.icon}</span>
                  </span>
                  <span className="flex-1 text-left font-medium">{link.name}</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-6 whitespace-pre-line">
              {t.additionalPlatforms}
            </p>
          </div>
        </section>

        {/* Newsletter */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 mt-24 md:mt-32">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-px bg-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
              {t.newsletterTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{t.newsletterBody}</p>
            <ul className="text-muted-foreground space-y-1 mb-8 inline-block text-left">
              {t.newsletterList.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            <form
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                required
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <button type="submit" disabled={submitting} className="btn-hero">
                {submitting ? '...' : t.subscribe}
              </button>
            </form>
          </div>
        </section>

        {/* Support */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 mt-24 md:mt-32">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-px bg-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">{t.supportTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{t.supportBody}</p>
            <a
              href="https://ko-fi.com/joywanna"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero inline-flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              {t.supportCta}
            </a>
          </div>
        </section>

        {/* Contact / social info */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 mt-24 md:mt-32">
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-10 border-t border-border">
            <a
              href="https://instagram.com/joywannamusic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="h-4 w-4" />
              @joywannamusic
            </a>
            <a
              href="mailto:contact@joywanna.com"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              contact@joywanna.com
            </a>
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

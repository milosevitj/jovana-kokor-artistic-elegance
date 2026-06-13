import { useEffect, useState } from 'react';
import { Instagram, Mail, Heart, ExternalLink } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { SEOManager } from '@/components/SEOManager';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import coverImage from '@/assets/reimagined-cover.png';

const WEB3FORMS_KEY = 'c9a75166-953d-48b7-8f96-9b200665d2ab';

const BANDCAMP_URL = 'https://joywanna.bandcamp.com/album/reimagined';

const albumConfig = {
  artistName: 'JoyWanna',
  albumTitle: 'Reimagined',
  coverImage,
};

const content = {
  de: {
    subtitle: 'Voice & Piano',
    tagline: 'Bekannte Songs neu gehört.',
    introTitle: 'Vielen Dank, dass ihr Teil von „Reimagined" seid.',
    introBody:
      'Dieses Album ist eine sehr persönliche Sammlung von Songs, die mich über viele Jahre begleitet haben und die ich für Stimme und Klavier neu interpretiert habe.',
    releaseTitle: 'Jetzt auf Bandcamp',
    releaseBody:
      'Das Album ist jetzt exklusiv auf Bandcamp verfügbar. In Kürze wird „Reimagined" auch auf allen großen Streaming-Plattformen erscheinen.',
    releaseHint: 'Bis dahin könnt ihr das Album bereits hier anhören und als Download erwerben:',
    bandcampCta: 'Auf Bandcamp anhören',
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
    releaseTitle: 'Now on Bandcamp',
    releaseBody:
      'The album is now exclusively available on Bandcamp. Soon, "Reimagined" will also be released on all major streaming platforms.',
    releaseHint: 'Until then, you can already listen to and purchase the album here:',
    bandcampCta: 'Listen on Bandcamp',
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

  useEffect(() => {
    const prev = document.title;
    document.title = `${albumConfig.albumTitle} – ${albumConfig.artistName} | JoyWanna`;
    return () => {
      document.title = prev;
    };
  }, []);

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
          </div>
        </section>

        {/* Release / Bandcamp */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 mt-20 md:mt-28">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-px bg-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">{t.releaseTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t.releaseBody}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{t.releaseHint}</p>
            <a
              href={BANDCAMP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero inline-flex items-center gap-2"
            >
              {t.bandcampCta}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>
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
              href="mailto:kontakt@joywanna.com"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              kontakt@joywanna.com
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

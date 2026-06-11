import { useEffect, useState } from 'react';
import { Instagram, Mail, Heart } from 'lucide-react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SEOManager } from '@/components/SEOManager';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import coverImage from '@/assets/reimagined-cover.jpeg';

const albumConfig = {
  artistName: 'JoyWanna',
  albumTitle: 'Reimagined',
  coverImage,
  links: {
    spotify: '#',
    deezer: '#',
  },
};

type PlatformKey = keyof typeof albumConfig.links;

type Platform = {
  key: PlatformKey;
  name: string;
  logo: JSX.Element;
};

const platforms: Platform[] = [
  {
    key: 'spotify',
    name: 'Spotify',
    logo: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#1DB954" />
        <path
          fill="#fff"
          d="M17.6 16.4a.7.7 0 0 1-1 .2c-2.6-1.6-5.9-2-9.8-1.1a.7.7 0 1 1-.3-1.4c4.3-1 8 0 10.9 1.7a.7.7 0 0 1 .2 1zm1.4-2.9a.9.9 0 0 1-1.2.3c-3-1.8-7.5-2.4-11-1.3a.9.9 0 1 1-.5-1.7c4-1.2 9-.6 12.4 1.5a.9.9 0 0 1 .3 1.2zm.1-3c-3.5-2.1-9.4-2.3-12.8-1.3a1.1 1.1 0 1 1-.6-2.1c3.9-1.1 10.4-.9 14.5 1.5a1.1 1.1 0 1 1-1.1 1.9z"
        />
      </svg>
    ),
  },
  {
    key: 'deezer',
    name: 'Deezer',
    logo: (
      <svg viewBox="0 0 64 32" className="h-5 w-auto" aria-hidden="true">
        <g>
          <rect x="48" y="4" width="16" height="4" fill="#A238FF" />
          <rect x="32" y="11" width="16" height="4" fill="#FF0092" />
          <rect x="48" y="11" width="16" height="4" fill="#FFCC00" />
          <rect x="0" y="18" width="16" height="4" fill="#00C7F2" />
          <rect x="16" y="18" width="16" height="4" fill="#00CF56" />
          <rect x="32" y="18" width="16" height="4" fill="#FF6184" />
          <rect x="48" y="18" width="16" height="4" fill="#FF0000" />
          <rect x="0" y="25" width="16" height="4" fill="#B47AEF" />
          <rect x="16" y="25" width="16" height="4" fill="#FF8E00" />
          <rect x="32" y="25" width="16" height="4" fill="#F12E51" />
          <rect x="48" y="25" width="16" height="4" fill="#2D2D2D" />
        </g>
      </svg>
    ),
  },
];

function ReimaginedContent() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const prev = document.title;
    document.title = `${albumConfig.albumTitle} – ${albumConfig.artistName} | JoyWanna`;
    return () => {
      document.title = prev;
    };
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    // Newsletter provider integration to be added later
    setTimeout(() => {
      toast({
        title: 'Vielen Dank!',
        description: 'Du wirst informiert, sobald es Neuigkeiten gibt.',
      });
      setEmail('');
      setSubmitting(false);
    }, 600);
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
            <div>
              <div className="w-16 h-px bg-primary mb-6" />
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-3">
                JoyWanna – Reimagined
              </h1>
              <p className="text-xl md:text-2xl text-primary font-serif italic mb-4">
                Voice & Piano
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Bekannte Songs neu gehört.
              </p>
            </div>
          </div>

          {/* Intro text */}
          <div className="max-w-2xl mx-auto mt-16 md:mt-20 space-y-6 text-center">
            <p className="text-lg text-foreground/90 leading-relaxed">
              Vielen Dank, dass ihr Teil von „Reimagined" seid.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Dieses Album ist eine sehr persönliche Sammlung von Songs, die mich über viele Jahre
              begleitet haben und die ich für Stimme und Klavier neu interpretiert habe.
            </p>
          </div>
        </section>

        {/* Release notice + streaming */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 mt-20 md:mt-28">
          <div className="max-w-md mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
              Das Album erscheint in Kürze
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Die Veröffentlichung befindet sich aktuell in der finalen Bearbeitung. Sobald das
              Album online verfügbar ist, findet ihr hier alle Streaming-Links.
            </p>

            <div className="bg-secondary/30 rounded-2xl border border-border overflow-hidden">
              {platforms.map((p, i) => (
                <a
                  key={p.key}
                  href={albumConfig.links[p.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={albumConfig.links[p.key] === '#'}
                  className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-secondary/60 transition-colors ${
                    i !== platforms.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="flex-shrink-0 flex items-center justify-center w-10">
                      {p.logo}
                    </span>
                    <span className="font-medium text-foreground truncate">{p.name}</span>
                  </div>
                  <span className="flex-shrink-0 inline-flex items-center justify-center px-5 py-2 rounded-full border border-foreground/30 text-sm font-medium text-muted-foreground">
                    Bald verfügbar
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Personal video message */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 mt-24 md:mt-32">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-16 h-px bg-primary mx-auto mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl font-medium">
                Persönliche Videobotschaft
              </h2>
            </div>

            <div className="aspect-video w-full rounded-2xl border border-border bg-secondary/30 flex items-center justify-center overflow-hidden">
              <div className="text-center px-6">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full border border-primary/40 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-muted-foreground text-sm">
                  Eine persönliche Dankes-Botschaft folgt in Kürze.
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-5 text-foreground/90 leading-relaxed">
              <p>Hallo ihr Lieben,</p>
              <p>danke, dass ihr dieses Projekt begleitet und unterstützt.</p>
              <p>
                „Reimagined" ist für mich mehr als ein Album – es ist eine Sammlung von Songs, die
                mich über viele Jahre inspiriert haben und die ich auf meine eigene Weise neu
                erzählt habe.
              </p>
              <p>Ich freue mich sehr, diese Musik mit euch zu teilen.</p>
              <p className="font-serif italic text-primary">♡ Jovana</p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 mt-24 md:mt-32">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-px bg-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
              Keine Veröffentlichung verpassen
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Trage dich in meinen Newsletter ein und erfahre als Erste*r von:
            </p>
            <ul className="text-muted-foreground space-y-1 mb-8 inline-block text-left">
              <li>• neuen Konzerten</li>
              <li>• neuen Musikveröffentlichungen</li>
              <li>• besonderen Projekten</li>
            </ul>

            <form
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                required
                placeholder="deine@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <button type="submit" disabled={submitting} className="btn-hero">
                {submitting ? '...' : 'Anmelden'}
              </button>
            </form>
          </div>
        </section>

        {/* Support */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 mt-24 md:mt-32">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-px bg-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">Musik unterstützen</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Wenn dir meine Musik gefällt und du zukünftige Aufnahmen, Konzerte und neue Projekte
              unterstützen möchtest, freue ich mich über deine Unterstützung.
            </p>
            <a
              href="https://ko-fi.com/joywanna"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero inline-flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Musik unterstützen
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

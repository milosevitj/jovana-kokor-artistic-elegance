import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { SEOManager } from '@/components/SEOManager';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import coverImage from '@/assets/reimagined-cover.jpeg';

const albumConfig = {
  artistName: 'Jovana Kokor',
  albumTitle: 'Reimagined',
  coverImage,
  links: {
    deezer: '#',
    spotify: '#',
    appleMusic: '#',
    youtubeMusic: '#',
    youtube: '#',
    tidal: '#',
    amazonMusic: '#',
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
    key: 'deezer',
    name: 'Deezer',
    logo: (
      <svg viewBox="0 0 48 40" className="h-7 w-auto" aria-hidden="true">
        <g fill="#A238FF">
          <ellipse cx="6" cy="14" rx="6" ry="8" />
          <ellipse cx="18" cy="11" rx="7" ry="10" />
          <ellipse cx="30" cy="11" rx="7" ry="10" />
          <ellipse cx="42" cy="14" rx="6" ry="8" />
          <ellipse cx="12" cy="24" rx="8" ry="10" />
          <ellipse cx="24" cy="26" rx="9" ry="12" />
          <ellipse cx="36" cy="24" rx="8" ry="10" />
        </g>
      </svg>
    ),
  },
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
    key: 'appleMusic',
    name: 'Apple Music',
    logo: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
        <defs>
          <linearGradient id="amg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FA5C7F" />
            <stop offset="1" stopColor="#FA243C" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="5" fill="url(#amg)" />
        <path
          fill="#fff"
          d="M16.5 6.5c0-.4-.3-.6-.7-.5l-6 1.2c-.4.1-.6.4-.6.8v6.4c-.3-.1-.6-.2-1-.2-1.2 0-2.2.8-2.2 1.9s1 1.9 2.2 1.9c1.2 0 2.1-.8 2.1-1.8V9.7l5.3-1.1v4.8c-.3-.1-.6-.2-1-.2-1.2 0-2.2.8-2.2 1.9s1 1.9 2.2 1.9 2.1-.8 2.1-1.9V6.5z"
        />
      </svg>
    ),
  },
  {
    key: 'youtubeMusic',
    name: 'YouTube Music',
    logo: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#FF0000" />
        <circle cx="12" cy="12" r="7" fill="none" stroke="#fff" strokeWidth="1.5" />
        <path fill="#fff" d="M10 8.5v7l6-3.5z" />
      </svg>
    ),
  },
  {
    key: 'youtube',
    name: 'YouTube',
    logo: (
      <svg viewBox="0 0 32 24" className="h-6 w-auto" aria-hidden="true">
        <rect width="32" height="24" rx="6" fill="#FF0000" />
        <path d="M13 7.5v9l8-4.5z" fill="#fff" />
      </svg>
    ),
  },
  {
    key: 'tidal',
    name: 'Tidal',
    logo: (
      <svg viewBox="0 0 36 24" className="h-6 w-auto" aria-hidden="true">
        <g fill="#000">
          <path d="M6 0L0 6l6 6 6-6z" />
          <path d="M18 0l-6 6 6 6 6-6z" />
          <path d="M30 0l-6 6 6 6 6-6z" />
          <path d="M18 12l-6 6 6 6 6-6z" />
        </g>
      </svg>
    ),
  },
  {
    key: 'amazonMusic',
    name: 'Amazon Music',
    logo: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#25D1DA" />
        <path
          fill="#fff"
          d="M15 7.5v6.3a2.3 2.3 0 1 1-1.4-2.1V8.7l-4.2.8v5.3a2.3 2.3 0 1 1-1.4-2.1V8.2c0-.3.2-.6.6-.7l5.6-1c.4-.1.8.2.8.7z"
        />
      </svg>
    ),
  },
];

function ReimaginedContent() {
  const { language } = useLanguage();
  const listenLabel = language === 'de' ? 'Anhören' : 'Listen';
  const subtitle = language === 'de' ? 'Streaming-Dienst wählen' : 'Choose music service';

  useEffect(() => {
    const prev = document.title;
    document.title = `${albumConfig.albumTitle} – ${albumConfig.artistName} | JoyWanna`;
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative pt-32 md:pt-40 pb-20 px-4 bg-secondary/30">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          {/* Album cover */}
          <div className="relative">
            <img
              src={albumConfig.coverImage}
              alt={`${albumConfig.albumTitle} – ${albumConfig.artistName}`}
              className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl object-cover shadow-2xl"
              loading="eager"
            />
            {/* Streaming badge (Apple Music) */}
            <div className="absolute -top-2 -right-2 bg-background rounded-full shadow-md p-1.5 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <defs>
                  <linearGradient id="amg2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#FA5C7F" />
                    <stop offset="1" stopColor="#FA243C" />
                  </linearGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#amg2)" />
                <path
                  fill="#fff"
                  d="M16.5 6.5c0-.4-.3-.6-.7-.5l-6 1.2c-.4.1-.6.4-.6.8v6.4c-.3-.1-.6-.2-1-.2-1.2 0-2.2.8-2.2 1.9s1 1.9 2.2 1.9c1.2 0 2.1-.8 2.1-1.8V9.7l5.3-1.1v4.8c-.3-.1-.6-.2-1-.2-1.2 0-2.2.8-2.2 1.9s1 1.9 2.2 1.9 2.1-.8 2.1-1.9V6.5z"
                />
              </svg>
              <span className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-6 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-center text-foreground">
            {albumConfig.artistName} – {albumConfig.albumTitle}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-foreground/70">{subtitle}</p>

          {/* Platform list */}
          <div className="mt-8 w-full bg-background rounded-2xl shadow-xl overflow-hidden border border-border">
            {platforms.map((p, i) => (
              <a
                key={p.key}
                href={albumConfig.links[p.key]}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-secondary/50 transition-colors ${
                  i !== platforms.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="flex-shrink-0 flex items-center justify-center w-10">
                    {p.logo}
                  </span>
                  <span className="font-medium text-foreground truncate">{p.name}</span>
                </div>
                <span className="flex-shrink-0 inline-flex items-center justify-center px-5 py-2 rounded-full border border-foreground/30 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  {listenLabel}
                </span>
              </a>
            ))}
          </div>
        </div>
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

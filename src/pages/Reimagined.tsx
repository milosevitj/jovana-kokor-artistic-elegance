import { useEffect } from "react";

const albumConfig = {
  artistName: "Jovana Kokor",
  albumTitle: "Reimagined",
  coverImage: "/cover.jpg",
  links: {
    deezer: "#",
    spotify: "#",
    appleMusic: "#",
    youtubeMusic: "#",
    youtube: "#",
    tidal: "#",
    amazonMusic: "#",
  },
};

type Platform = {
  key: keyof typeof albumConfig.links;
  name: string;
  badgeColor: string;
  logo: JSX.Element;
};

const platforms: Platform[] = [
  {
    key: "deezer",
    name: "Deezer",
    badgeColor: "#A238FF",
    logo: (
      <svg viewBox="0 0 64 32" className="h-5 w-auto" aria-hidden="true">
        <g fill="#A238FF">
          <rect x="48" y="4" width="16" height="4" />
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
  {
    key: "spotify",
    name: "Spotify",
    badgeColor: "#1DB954",
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
    key: "appleMusic",
    name: "Apple Music",
    badgeColor: "#FA243C",
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
    key: "youtubeMusic",
    name: "YouTube Music",
    badgeColor: "#FF0000",
    logo: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#FF0000" />
        <circle cx="12" cy="12" r="7" fill="none" stroke="#fff" strokeWidth="1.5" />
        <path fill="#fff" d="M10 8.5v7l6-3.5z" />
      </svg>
    ),
  },
  {
    key: "youtube",
    name: "YouTube",
    badgeColor: "#FF0000",
    logo: (
      <svg viewBox="0 0 32 24" className="h-6 w-auto" aria-hidden="true">
        <rect width="32" height="24" rx="6" fill="#FF0000" />
        <path d="M13 7.5v9l8-4.5z" fill="#fff" />
      </svg>
    ),
  },
  {
    key: "tidal",
    name: "Tidal",
    badgeColor: "#000",
    logo: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          fill="#000"
          d="M12 6L8 10l-4-4-4 4 4 4 4-4 4 4 4-4-4-4zm8-4l-4 4 4 4 4-4-4-4zM12 14l-4 4 4 4 4-4-4-4z"
          transform="translate(0 -1)"
        />
      </svg>
    ),
  },
  {
    key: "amazonMusic",
    name: "Amazon Music",
    badgeColor: "#25D1DA",
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

export default function Reimagined() {
  useEffect(() => {
    const prev = document.title;
    document.title = `${albumConfig.artistName} – ${albumConfig.albumTitle}`;
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center px-4 py-10 sm:py-16"
      style={{
        background:
          "linear-gradient(160deg, #f5e9dc 0%, #e8c9b4 40%, #d99c8a 75%, #c47a6e 100%)",
      }}
    >
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Album cover */}
        <div className="relative">
          <img
            src={albumConfig.coverImage}
            alt={`${albumConfig.albumTitle} – ${albumConfig.artistName} album cover`}
            className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl object-cover shadow-2xl"
            loading="eager"
          />
          {/* Streaming badge */}
          <div className="absolute -top-2 -right-2 bg-white rounded-full shadow-md p-1.5 flex items-center justify-center">
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
            <span className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-2xl sm:text-3xl font-semibold text-neutral-900 text-center tracking-tight">
          {albumConfig.artistName} - {albumConfig.albumTitle}
        </h1>
        <p className="mt-1 text-neutral-700 text-sm sm:text-base">Choose music service</p>

        {/* Platform list */}
        <div className="mt-8 w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          {platforms.map((p, i) => (
            <a
              key={p.key}
              href={albumConfig.links[p.key]}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-neutral-50 transition-colors ${
                i !== platforms.length - 1 ? "border-b border-neutral-100" : ""
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="flex-shrink-0 flex items-center justify-center w-10">
                  {p.logo}
                </span>
                <span className="font-semibold text-neutral-900 truncate">{p.name}</span>
              </div>
              <span className="flex-shrink-0 inline-flex items-center justify-center px-5 py-2 rounded-full border border-neutral-300 text-sm font-medium text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors">
                Listen
              </span>
            </a>
          ))}
        </div>

        <p className="mt-8 text-xs text-neutral-600/80">
          © {new Date().getFullYear()} {albumConfig.artistName}
        </p>
      </div>
    </main>
  );
}

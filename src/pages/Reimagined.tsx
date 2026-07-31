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
    name: 'Apple Music',
    url: 'https://music.apple.com/rs/album/reimagined/6795242225',
    color: '#FF2D55',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z" />
      </svg>
    ),
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/album/4PDAdX2ez9VU3x6ikFQVu4?go=1&utm_source=Original_Original&utm_medium=Original&utm_content=1b26f200-981f-495b-babf-9c20c156b49d_none_JoyWanna_none_Reimagined_none_20260727_direct_prod_CA_artists.landr.com%2F991048567573&nd=1&dlsi=6839e109acfe4cec',
    color: '#1DB954',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: 'iTunes Store',
    url: 'https://music.apple.com/rs/album/reimagined/6795242225',
    color: '#FF2D55',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M11.977 23.999c-2.483 0-4.898-.777-6.954-2.262a11.928 11.928 0 01-4.814-7.806A11.954 11.954 0 012.3 4.994 11.85 11.85 0 0110.08.159a11.831 11.831 0 018.896 2.104 11.933 11.933 0 014.815 7.807 11.958 11.958 0 01-2.091 8.937 11.855 11.855 0 01-7.78 4.835 12.17 12.17 0 01-1.943.157zm-6.474-2.926a11.022 11.022 0 008.284 1.96 11.044 11.044 0 007.246-4.504c3.583-5.003 2.445-12.003-2.538-15.603a11.022 11.022 0 00-8.284-1.96A11.046 11.046 0 002.966 5.47C-.618 10.474.521 17.473 5.503 21.073zm10.606-3.552a2.08 2.08 0 001.458-1.468l.062-.216.008-5.786c.006-4.334 0-5.814-.024-5.895a.535.535 0 00-.118-.214.514.514 0 00-.276-.073c-.073 0-.325.035-.56.078-1.041.19-7.176 1.411-7.281 1.45a.786.786 0 00-.399.354l-.065.128s-.031 9.07-.078 9.172a.7.7 0 01-.376.35 9.425 9.425 0 01-.609.137c-1.231.245-1.688.421-2.075.801-.22.216-.382.51-.453.82-.067.294-.045.736.051 1.005.1.281.262.521.473.71.192.148.419.258.674.324.563.144 1.618-.016 2.158-.328a2.36 2.36 0 00.667-.629c.06-.089.15-.268.2-.399.176-.456.181-8.581.204-8.683a.44.44 0 01.32-.344c.147-.04 6.055-1.207 6.222-1.23.146-.02.284.027.36.12a.29.29 0 01.109.096c.048.07.051.213.058 2.785.008 2.96.012 2.892-.149 3.079-.117.136-.263.189-.864.31-.914.188-1.226.276-1.576.447-.437.213-.679.446-.867.835a1.58 1.58 0 00-.182.754c.001.49.169.871.55 1.245.035.034.069.066.104.097.192.148.387.238.633.294.37.082 1.124.025 1.641-.126z" />
      </svg>
    ),
  },
  {
    name: 'YouTube Music',
    url: 'https://music.youtube.com/playlist?list=OLAK5uy_lYx_cDgCrGHoEy9apy5fJd2DMKfV6DuHc',
    color: '#FF0000',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
      </svg>
    ),
  },
  {
    name: 'Deezer',
    url: 'https://www.deezer.com/en/album/1039305652?app_id=140685&utm_source=partner_linkfire&utm_campaign=15579f6d482e68b1b824edf5d0f35ca8&utm_medium=Original&utm_term=prod&utm_content=album-1039305652',
    color: '#FEAA2D',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M.693 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807C.312 4.41 0 5.666 0 7.217s.312 2.808.693 2.808ZM21.038 1.56c-.364 0-.684.805-.91 2.096C19.765 1.446 19.184 0 18.526 0c-.78 0-1.464 2.036-1.784 5-.312-2.158-.788-3.536-1.325-3.536-.745 0-1.386 2.704-1.62 6.472-.442-1.932-1.083-3.145-1.793-3.145s-1.35 1.213-1.793 3.145c-.242-3.76-.874-6.463-1.628-6.463-.537 0-1.013 1.378-1.325 3.535C6.938 2.036 6.262 0 5.474 0c-.658 0-1.247 1.447-1.602 3.665-.217-1.291-.546-2.105-.91-2.105-.675 0-1.221 2.807-1.221 6.272 0 3.466.546 6.273 1.221 6.273.277 0 .537-.476.736-1.273.32 2.928.996 4.938 1.776 4.938.606 0 1.143-1.204 1.507-3.11.251 3.622.875 6.195 1.602 6.195.46 0 .875-1.023 1.187-2.677C10.142 21.6 11 24 12.004 24c1.005 0 1.863-2.4 2.235-5.822.312 1.654.727 2.677 1.186 2.677.728 0 1.352-2.573 1.603-6.195.364 1.906.9 3.11 1.507 3.11.78 0 1.455-2.01 1.775-4.938.208.797.46 1.273.737 1.273.675 0 1.22-2.807 1.22-6.273-.008-3.457-.553-6.272-1.23-6.272ZM23.307 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807-.381 0-.693 1.256-.693 2.807s.312 2.808.693 2.808Z" />
      </svg>
    ),
  },
  {
    name: 'Amazon Music',
    url: 'https://music.amazon.com/albums/B0HBRNK2V8?tag=linkfiregen&ie=UTF8&linkCode=as2&ascsubtag=15579f6d482e68b1b824edf5d0f35ca8&ref=dmm_acq_soc_rs_u_lfire_lp_x_15579f6d482e68b1b824edf5d0f35ca8',
    color: '#00A8E1',
    icon: (
      <svg role="img" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z" />
        <path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623" />
      </svg>
    ),
  },
  {
    name: 'Tidal',
    url: 'https://tidal.com/album/546830416',
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
    listenTitle: 'Reimagined anhören',
    additionalPlatforms:
      'Das Album ist außerdem auf weiteren Streaming-Plattformen wie Audiomack, Anghami und iHeartRadio verfügbar. Weitere große Streaming-Plattformen werden hoffentlich bald folgen.',
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
    listenTitle: 'Listen to Reimagined',
    additionalPlatforms:
      'The album is also available on additional streaming platforms such as Audiomack, Anghami, and iHeartRadio. Hopefully, more major streaming platforms will follow soon.',
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

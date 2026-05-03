import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, ArrowRight } from 'lucide-react';

interface VideoItem {
  id: string;
  url: string;
  caption: { de: string; en: string };
  youtubeTitle: string;
}

export function PortfolioSection() {
  const { language, t } = useLanguage();

  const videos: VideoItem[] = [
    {
      id: 'KlXXMuKU3wE',
      url: 'https://www.youtube.com/watch?v=KlXXMuKU3wE&list=RDKlXXMuKU3wE&start_radio=1',
      caption: { de: 'Live – Stimme & Klavier', en: 'Live – Voice & Piano' },
      youtubeTitle: 'JoyWanna - Just Breathe (Live, Voice & Piano)',
    },
    {
      id: 'HG521HIhxZ4',
      url: 'https://www.youtube.com/watch?v=HG521HIhxZ4',
      caption: { de: 'Live Highlight I', en: 'Live Highlight I' },
      youtubeTitle: 'JoyWanna - Live Highlight I',
    },
    {
      id: 'snQoawnhl3Y',
      url: 'https://www.youtube.com/watch?v=snQoawnhl3Y',
      caption: { de: 'The Spicy Jam – Live', en: 'The Spicy Jam – Live' },
      youtubeTitle: 'JoyWanna & The Spicy Jam - Live',
    },
    {
      id: 'iDhF5EpRBhw',
      url: 'https://www.youtube.com/watch?v=iDhF5EpRBhw',
      caption: { de: '"Reimagined" Session', en: '"Reimagined" Session' },
      youtubeTitle: 'JoyWanna - Reimagined Session',
    },
  ];

  return (
    <section id="gallery" className="section-padding bg-card">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
            {t('portfolio.eyebrow')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            {t('portfolio.heading')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
          <div className="w-20 h-px bg-primary mx-auto mt-8" />
        </div>

        {/* Video Grid – 4 live performance videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer external"
              title={video.youtubeTitle}
              className="group relative z-10 aspect-video overflow-hidden rounded-sm bg-background block"
              aria-label={video.youtubeTitle}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={
                  language === 'de'
                    ? `Live Performance Vorschau – ${video.caption.de}`
                    : `Live performance preview – ${video.caption.en}`
                }
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Play size={22} className="text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                <p className="font-serif text-lg text-foreground">
                  {video.youtubeTitle}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/portfolio"
            className="btn-outline-hero inline-flex items-center gap-2 group"
          >
            {t('portfolio.cta')}
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

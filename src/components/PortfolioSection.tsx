import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/jovana-hero.jpeg';
import portraitImage from '@/assets/jovana-portrait.jpeg';
import bandImage from '@/assets/joywanna-spicy-jam.webp';

type TeaserItem =
  | {
      type: 'video';
      id: string;
      caption: { de: string; en: string };
      span: string;
    }
  | {
      type: 'image';
      src: string;
      alt: { de: string; en: string };
      caption: { de: string; en: string };
      span: string;
    };

export function PortfolioSection() {
  const { language, t } = useLanguage();

  // Curated asymmetric grid (8 cells on a 4-col layout)
  const items: TeaserItem[] = [
    {
      type: 'video',
      id: 'KlXXMuKU3wE',
      caption: {
        de: 'Live – Stimme & Klavier',
        en: 'Live – Voice & Piano',
      },
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      type: 'image',
      src: heroImage,
      alt: {
        de: 'Jovana Kokor live auf der Bühne',
        en: 'Jovana Kokor live on stage',
      },
      caption: { de: 'Bühnenmoment', en: 'Stage Moment' },
      span: 'md:col-span-2',
    },
    {
      type: 'image',
      src: bandImage,
      alt: {
        de: 'JoyWanna & The Spicy Jam Band',
        en: 'JoyWanna & The Spicy Jam Band',
      },
      caption: { de: 'The Spicy Jam', en: 'The Spicy Jam' },
      span: 'md:col-span-1',
    },
    {
      type: 'video',
      id: 'HG521HIhxZ4',
      caption: { de: 'Live Performance', en: 'Live Performance' },
      span: 'md:col-span-1',
    },
    {
      type: 'image',
      src: portraitImage,
      alt: {
        de: 'Jovana Kokor Porträt',
        en: 'Jovana Kokor portrait',
      },
      caption: { de: 'Porträt', en: 'Portrait' },
      span: 'md:col-span-2',
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

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-sm bg-background ${item.span}`}
            >
              {item.type === 'video' ? (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
                    alt={
                      language === 'de'
                        ? `Live Performance Vorschau – ${item.caption.de}`
                        : `Live performance preview – ${item.caption.en}`
                    }
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Play size={22} className="text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={item.src}
                  alt={language === 'de' ? item.alt.de : item.alt.en}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}

              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-serif text-lg text-foreground">
                  {language === 'de' ? item.caption.de : item.caption.en}
                </p>
              </div>
            </div>
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

import { useLanguage } from '@/contexts/LanguageContext';
import portraitImage from '@/assets/jovana-portrait.jpeg';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={portraitImage}
                alt={t('about.img.alt')}
                className="w-full h-auto object-cover aspect-[3/4]"
                loading="lazy"
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary rounded-sm -z-10" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="max-w-lg">
              {/* Section Label */}
              <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">
                {t('about.subtitle')}
              </p>

              {/* Title */}
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
                {t('about.title')}
              </h2>

              {/* Decorative line */}
              <div className="w-16 h-px bg-primary mb-8" />

              {/* Bio paragraphs */}
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
                <p>{t('about.p3')}</p>
              </div>

              {/* Stats or highlights */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                <div>
                  <p className="font-serif text-3xl md:text-4xl text-primary">10+</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('about.stat.years')}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl md:text-4xl text-primary">100+</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('about.stat.shows')}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl md:text-4xl text-primary">∞</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('about.stat.passion')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
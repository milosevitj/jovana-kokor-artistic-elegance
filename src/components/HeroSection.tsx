import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { buildSectionPath } from '@/lib/site-routes';
import heroImage from '@/assets/joywanna-hero-3x.webp';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-end md:justify-center items-stretch md:items-center overflow-hidden pb-12 md:pb-0"
      style={{
        background: 'var(--gradient-hero)',
      }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Jovana Kokor – Pianist and Vocal Artist performing live on stage"
          width={1640}
          height={924}
          className="hero-bg-image w-full h-full"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        {/* Mobile-only full-screen readability gradient */}
        <div className="absolute inset-0 md:hidden bg-[linear-gradient(to_top_right,rgba(0,0,0,0.7),rgba(0,0,0,0.35)_45%,transparent_75%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 w-full">
        <div className="max-w-3xl">
          <div className="inline-block max-w-2xl rounded-sm px-5 pt-24 pb-6 md:max-w-3xl md:px-0 md:pt-0 md:pb-0">
            {/* Decorative line */}
            <div className="w-16 h-px bg-primary mb-6 md:mb-8" />

            {/* Headline - Single H1 for the entire page (LCP element — render immediately, no animation) */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium mb-3 md:mb-4">
              {t('hero.headline')}
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl lg:text-3xl text-primary font-serif italic mb-4 md:mb-8">
              {t('hero.subheadline')}
            </p>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-6 md:mb-12 leading-relaxed">
              {t('hero.tagline')}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#about" className="btn-hero">
                {t('hero.cta.secondary')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-muted-foreground to-transparent" />
      </div>
    </section>
  );
}
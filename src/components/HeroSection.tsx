import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/jovana-hero.jpeg';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'var(--gradient-hero)',
      }}
    >
      {/* Mobile: full-screen cropped background image */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={heroImage}
          alt="Jovana Kokor - Professional Performer and Musician"
          className="w-full h-full object-cover"
          style={{ objectPosition: '75% center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      </div>

      {/* Desktop: split layout with image on right */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute inset-y-0 right-0 w-1/2">
          <img
            src={heroImage}
            alt="Jovana Kokor - Professional Performer and Musician"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent w-[60%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl md:max-w-xl lg:max-w-2xl mt-24 md:mt-0 text-center md:text-left">
          {/* Decorative line */}
          <div className="w-16 h-px bg-primary mb-8 animate-fade-in mx-auto md:mx-0" style={{ animationDelay: '0.2s' }} />

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {t('hero.headline')}
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-primary font-serif italic mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {t('hero.subheadline')}
          </p>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed animate-fade-in mx-auto md:mx-0" style={{ animationDelay: '0.5s' }}>
            {t('hero.tagline')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in justify-center md:justify-start" style={{ animationDelay: '0.6s' }}>
            <a href="#contact" className="btn-hero">
              {t('hero.cta')}
            </a>
            <a href="#about" className="btn-outline-hero">
              {t('hero.cta.secondary')}
            </a>
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

import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/joywanna-hero.webp';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[95svh] md:min-h-[100svh] flex items-start md:items-center justify-center overflow-hidden pt-[55vh] md:pt-0"
      style={{
        background: 'var(--gradient-hero)',
      }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="JoyWanna – Music & Performance, live on stage"
          className="hero-bg-image w-full h-full"
          loading="eager"
        />
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          <div className="inline-block max-w-2xl rounded-sm bg-gradient-to-t from-black/60 via-black/30 to-transparent px-5 py-6 md:max-w-3xl md:bg-none md:px-0 md:py-0">
            {/* Decorative line */}
            <div className="w-16 h-px bg-primary mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }} />

            {/* Headline - Single H1 for the entire page */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {t('hero.headline')}
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl lg:text-3xl text-primary font-serif italic mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {t('hero.subheadline')}
            </p>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {t('hero.tagline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <a href="#contact" className="btn-hero">
                {t('hero.cta')}
              </a>
              <a href="#about" className="btn-outline-hero">
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
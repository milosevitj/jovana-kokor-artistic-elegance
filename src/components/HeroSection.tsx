import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/jovana-hero.jpeg';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'var(--gradient-hero)',
      }}
    >
      {/* Background gradient base */}
      <div className="absolute inset-0 bg-background" />

      {/* Desktop: Split layout | Mobile: Image in top-right corner */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 min-h-screen flex items-center">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-20 w-full">

          {/* Mobile image - absolute top-right corner */}
          <div className="md:hidden absolute top-20 right-4 z-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-32 h-40 rounded-xl overflow-hidden shadow-2xl border-2 border-primary/20">
              <img
                src={heroImage}
                alt="Jovana Kokor - Professional Performer and Musician"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 pt-32 md:pt-0">
            {/* Decorative line */}
            <div className="w-16 h-px bg-primary mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }} />

            {/* Headline */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium mb-4 animate-fade-in max-w-[65%] md:max-w-none" style={{ animationDelay: '0.3s' }}>
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

          {/* Desktop image - right side */}
          <div className="hidden md:flex flex-1 justify-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/10">
                <img
                  src={heroImage}
                  alt="Jovana Kokor - Professional Performer and Musician"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Decorative accent behind image */}
              <div className="absolute -inset-4 -z-10 rounded-2xl bg-primary/5 blur-2xl" />
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

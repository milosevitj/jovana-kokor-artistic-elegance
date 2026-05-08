import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import portraitOriginal from '@/assets/jovana-portrait-hq.webp?url';
import bandImage from '@/assets/joywanna-spicy-jam.webp';


export function AboutSection() {
  const { t } = useLanguage();
  const [bandModalOpen, setBandModalOpen] = useState(false);

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={portraitOriginal}
                width={1440}
                height={1440}
                alt={t('about.img.alt')}
                className="w-full h-auto object-cover aspect-square"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary rounded-sm -z-10" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="max-w-lg">
              <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">
                {t('about.subtitle')}
              </p>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
                {t('about.title')}
              </h2>

              <div className="w-16 h-px bg-primary mb-8" />

              <h2 className="text-muted-foreground leading-relaxed text-[0.95rem] font-normal mb-5">
                {t('about.p1')}
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed text-[0.95rem]">
                <p>{t('about.p2')}</p>
                <p>
                  {t('about.p3.before')}
                  <button
                    type="button"
                    onClick={() => setBandModalOpen(true)}
                    className="text-foreground font-medium underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                  >
                    {t('about.p3.band')}
                  </button>
                  {t('about.p3.after')}
                </p>
                <p>{t('about.p4')}</p>
                <p>
                  {t('about.p5.before')}
                  <a
                    href="https://www.youtube.com/watch?v=KlXXMuKU3wE&list=RDKlXXMuKU3wE&start_radio=1"
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="text-foreground font-medium underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {t('about.p5.link')}
                  </a>
                  {t('about.p5.after')}
                </p>
                <p>{t('about.p6')}</p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                <div>
                  <p className="font-serif text-3xl md:text-4xl text-primary">15+</p>
                  <p className="text-sm text-muted-foreground mt-1">{t('about.stat.years')}</p>
                </div>
                <div>
                  <p className="font-serif text-3xl md:text-4xl text-primary">1000+</p>
                  <p className="text-sm text-muted-foreground mt-1">{t('about.stat.shows')}</p>
                </div>
                <div>
                  <p className="font-serif text-3xl md:text-4xl text-primary">∞</p>
                  <p className="text-sm text-muted-foreground mt-1">{t('about.stat.passion')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={bandModalOpen} onOpenChange={setBandModalOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 gap-0">
          <img
            src={bandImage}
            alt="JoyWanna & The Spicy Jam - Jazz, Soul and Pop Band"
            className="w-full h-[250px] md:h-[300px] object-cover rounded-t-lg"
            loading="lazy"
            decoding="async"
          />
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl md:text-3xl text-left">
                {t('band.modal.title')}
              </DialogTitle>
            </DialogHeader>
            <div className="w-12 h-px bg-primary mt-2 mb-4" />
            <div className="space-y-4 text-muted-foreground leading-relaxed text-[0.95rem]">
            <p>{t('band.modal.p1')}</p>
            <p>{t('band.modal.p2')}</p>
            <p>{t('band.modal.p3')}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

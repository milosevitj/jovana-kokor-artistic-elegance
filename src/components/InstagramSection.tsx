import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

const INSTAGRAM_HANDLE = 'joywannasworld';
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

// Curated post shortcodes from the profile - replace with actual post shortcodes
const INSTAGRAM_POSTS = [
  'DJBVIh_txLB',
  'DI1eTyitlcd',
  'DIoAScBNnJx',
  'DImQ2UoNcfZ',
  'DIjwVP6t9xS',
  'DIfxDvYN5Wf',
];

export function InstagramSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Instagram embed script
    if (!(window as any).instgrm) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  return (
    <section id="instagram" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            {t('instagram.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t('instagram.subtitle')}
          </p>
          <div className="w-20 h-px bg-primary mx-auto mt-8" />
        </div>

        {/* Instagram Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto mb-12"
        >
          {INSTAGRAM_POSTS.map((shortcode) => (
            <a
              key={shortcode}
              href={`https://www.instagram.com/p/${shortcode}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm bg-card"
            >
              <img
                src={`https://www.instagram.com/p/${shortcode}/media/?size=m`}
                alt={`Instagram post by @${INSTAGRAM_HANDLE}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  // Fallback: hide broken images gracefully
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('flex', 'items-center', 'justify-center');
                    const icon = document.createElement('div');
                    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-muted-foreground"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`;
                    parent.appendChild(icon);
                  }
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-3 border-primary/30 hover:border-primary hover:bg-primary/10 text-foreground font-sans tracking-wide"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5" />
              {t('instagram.follow')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

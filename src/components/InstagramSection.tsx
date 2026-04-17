import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const INSTAGRAM_URL = 'https://www.instagram.com/joywannasworld/';

// Placeholder images — swap these out with actual JoyWanna performance photos later.
const INSTAGRAM_POSTS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop' },
  { id: 2, src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=600&fit=crop' },
  { id: 3, src: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&h=600&fit=crop' },
  { id: 4, src: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=600&h=600&fit=crop' },
  { id: 5, src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop' },
  { id: 6, src: 'https://images.unsplash.com/photo-1499415479124-43c32433a620?w=600&h=600&fit=crop' },
];

export function InstagramSection() {
  const { t } = useLanguage();

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

        {/* Instagram Gallery Grid */}
        <div className="max-w-5xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-md bg-muted"
              aria-label="View JoyWanna's world on Instagram"
            >
              <img
                src={post.src}
                alt="JoyWanna's world on Instagram"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Instagram className="w-8 h-8 text-primary" />
                <span className="font-sans text-sm tracking-wide text-foreground">
                  View on Instagram
                </span>
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
              Follow @JoyWanna on Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

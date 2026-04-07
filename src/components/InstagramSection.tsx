import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BeholdWidget from '@behold/react';

const INSTAGRAM_URL = 'https://www.instagram.com/joywannasworld/';

// Replace this with your Behold feed ID from https://app.behold.so
const BEHOLD_FEED_ID = 'YOUR_FEED_ID';

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

        {/* Behold Instagram Feed */}
        <div className="max-w-5xl mx-auto mb-12">
          <BeholdWidget feedId={BEHOLD_FEED_ID} />
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

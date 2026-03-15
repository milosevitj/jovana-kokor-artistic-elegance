import { useLanguage } from '@/contexts/LanguageContext';
import { Play } from 'lucide-react';
import heroImage from '@/assets/jovana-hero.jpeg';
import portraitImage from '@/assets/jovana-portrait.jpeg';

// Gallery images - these would typically be different performance shots
const galleryImages = [
  {
    src: heroImage,
    alt: 'Jovana Kokor live performance',
    aspectRatio: 'aspect-video',
  },
  {
    src: portraitImage,
    alt: 'Jovana Kokor portrait',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: heroImage,
    alt: 'Jovana Kokor on stage',
    aspectRatio: 'aspect-square',
  },
  {
    src: portraitImage,
    alt: 'Jovana Kokor expressive performance',
    aspectRatio: 'aspect-[4/5]',
  },
];

export function GallerySection() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="section-padding bg-card">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t('gallery.subtitle')}
          </p>
          <div className="w-20 h-px bg-primary mx-auto mt-8" />
        </div>

        {/* Masonry Gallery */}
        <div className="masonry-grid max-w-6xl mx-auto mb-20">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="masonry-item group overflow-hidden rounded-sm"
            >
              <div className={`relative ${image.aspectRatio} overflow-hidden`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl md:text-3xl text-center mb-8">
            {t('gallery.video.title')}
          </h3>
          
          {/* Video Placeholder */}
          <div className="relative aspect-video rounded-sm overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/KlXXMuKU3wE"
              title="Jovana Kokor – Live Performance"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/jovana-hero.jpeg';
import portraitImage from '@/assets/jovana-portrait.jpeg';

export function GallerySection() {
  const { language, t } = useLanguage();

  const galleryImages = [
    {
      src: heroImage,
      alt: language === 'de'
        ? 'Jovana Kokor professioneller Klavierauftritt auf der Bühne'
        : 'Jovana Kokor professional piano performance on stage',
      aspectRatio: 'aspect-video',
    },
    {
      src: portraitImage,
      alt: language === 'de'
        ? 'Jovana Kokor Porträt – klassisch ausgebildete Pianistin und Vokalkünstlerin'
        : 'Jovana Kokor portrait – classically trained pianist and vocal artist',
      aspectRatio: 'aspect-[3/4]',
    },
    {
      src: heroImage,
      alt: language === 'de'
        ? 'Jovana Kokor Live-Konzert Gesangsperformance'
        : 'Jovana Kokor live concert vocal performance',
      aspectRatio: 'aspect-square',
    },
    {
      src: portraitImage,
      alt: language === 'de'
        ? 'Jovana Kokor Klavierunterricht und Musikpädagogik Belgrad'
        : 'Jovana Kokor piano instruction and music education Belgrade',
      aspectRatio: 'aspect-[4/5]',
    },
  ];

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
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="max-w-7xl mx-auto">
          <h3 className="font-serif text-2xl md:text-3xl text-center mb-8">
            {t('gallery.video.title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { id: 'KlXXMuKU3wE', title: 'Live Piano and Vocal Performance' },
              { id: 'HG521HIhxZ4', title: 'Performance Highlight 1' },
              { id: 'sQ5XZkarZWQ', title: 'Performance Highlight 2' },
              { id: 'HG521HIhxZ4', title: 'Performance Highlight 3' },
            ].map((video, index) => (
              <div key={index} className="relative aspect-video rounded-sm overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={`Jovana Kokor – ${video.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
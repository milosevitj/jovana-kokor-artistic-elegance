import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Heart, Sparkles } from 'lucide-react';

export function LessonsSection() {
  const { t } = useLanguage();

  const vocalCards = [
    { titleKey: 'lessons.vocal.individual', descKey: 'lessons.vocal.individual.desc', Icon: Heart },
    { titleKey: 'lessons.vocal.expression', descKey: 'lessons.vocal.expression.desc', Icon: Sparkles },
    { titleKey: 'lessons.vocal.allages', descKey: 'lessons.vocal.allages.desc', Icon: Users },
  ];

  return (
    <section id="lessons" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        {/* Vocal Coaching Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-3">
            {t('lessons.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t('lessons.subtitle')}
          </p>
          <div className="w-20 h-px bg-primary mx-auto mt-6" />
        </div>

        {/* Vocal Coaching Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vocalCards.map(({ titleKey, descKey, Icon }) => (
            <div
              key={titleKey}
              className="bg-card rounded-2xl border border-border/50 p-8 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-medium mb-4">{t(titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


import { useLanguage } from '@/contexts/LanguageContext';
import { Music, GraduationCap, Users, Heart, Sparkles, Clock, Monitor, BookOpen } from 'lucide-react';

export function LessonsSection() {
  const { t } = useLanguage();

  const vocalCards = [
    { titleKey: 'lessons.vocal.individual', descKey: 'lessons.vocal.individual.desc', Icon: Heart },
    { titleKey: 'lessons.vocal.expression', descKey: 'lessons.vocal.expression.desc', Icon: Sparkles },
    { titleKey: 'lessons.vocal.allages', descKey: 'lessons.vocal.allages.desc', Icon: Users },
  ];

  const pianoCards = [
    { titleKey: 'lessons.piano.beginners', descKey: 'lessons.piano.beginners.desc', Icon: Music },
    { titleKey: 'lessons.piano.advanced', descKey: 'lessons.piano.advanced.desc', Icon: GraduationCap },
    { titleKey: 'lessons.piano.allages', descKey: 'lessons.piano.allages.desc', Icon: Users },
  ];

  const features = [
    { labelKey: 'lessons.feature.schedule', Icon: Clock },
    { labelKey: 'lessons.feature.online', Icon: Monitor },
    { labelKey: 'lessons.feature.curriculum', Icon: BookOpen },
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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

        {/* Piano Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-[2px] bg-primary" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-primary">
              {t('lessons.piano.tagline')}
            </span>
            <span className="w-12 h-[2px] bg-primary" />
          </div>
          <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight">
            {t('lessons.piano.title')}
          </h3>
        </div>

        {/* Piano Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pianoCards.map(({ titleKey, descKey, Icon }) => (
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

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {features.map(({ labelKey, Icon }) => (
            <div
              key={labelKey}
              className="flex items-center gap-3 bg-card border border-border/50 rounded-full px-6 py-3"
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{t(labelKey)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

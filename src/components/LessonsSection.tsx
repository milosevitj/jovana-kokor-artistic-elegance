import { useLanguage } from '@/contexts/LanguageContext';
import { Music, GraduationCap, Users, Clock, Monitor, BookOpen } from 'lucide-react';

const levelIcons = [Music, GraduationCap, Users];

export function LessonsSection() {
  const { t } = useLanguage();

  const levels = [
    { titleKey: 'lessons.beginners', descKey: 'lessons.beginners.desc', Icon: Music },
    { titleKey: 'lessons.advanced', descKey: 'lessons.advanced.desc', Icon: GraduationCap },
    { titleKey: 'lessons.allages', descKey: 'lessons.allages.desc', Icon: Users },
  ];

  const features = [
    { labelKey: 'lessons.feature.schedule', Icon: Clock },
    { labelKey: 'lessons.feature.online', Icon: Monitor },
    { labelKey: 'lessons.feature.curriculum', Icon: BookOpen },
  ];

  return (
    <section id="lessons" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-[2px] bg-primary" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-primary">
              {t('lessons.tagline')}
            </span>
            <span className="w-12 h-[2px] bg-primary" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">
            {t('lessons.title')}
          </h2>
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {levels.map(({ titleKey, descKey, Icon }) => (
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

import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface Gig {
  id: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  title: string;
  ticketUrl?: string;
}

// Sample gigs data - easily updatable
const upcomingGigs: Gig[] = [
  {
    id: '1',
    date: '2026-03-15',
    time: '20:00',
    venue: 'Kulturzentrum am Gasteig',
    city: 'München',
    title: 'Passionskonzert',
    ticketUrl: '#',
  },
  {
    id: '2',
    date: '2026-04-22',
    time: '19:30',
    venue: 'Philharmonie',
    city: 'Berlin',
    title: 'Frühlingsmelodien',
    ticketUrl: '#',
  },
  {
    id: '3',
    date: '2026-05-10',
    time: '21:00',
    venue: 'Alte Oper',
    city: 'Frankfurt',
    title: 'Sommernachtsträume',
  },
];

function formatDate(dateStr: string, language: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', options);
}

export function GigsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="gigs" className="section-padding bg-card">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            {t('gigs.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t('gigs.subtitle')}
          </p>
          <div className="w-20 h-px bg-primary mx-auto mt-8" />
        </div>

        {/* Gigs List */}
        {upcomingGigs.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {upcomingGigs.map((gig, index) => (
              <article
                key={gig.id}
                className="group bg-background border border-border rounded-sm p-6 md:p-8 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Date & Time */}
                  <div className="flex items-start gap-4 md:w-1/4">
                    <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{formatDate(gig.date, language)}</p>
                      <p className="text-muted-foreground text-sm">{gig.time}</p>
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="flex-1">
                    <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                      {gig.title}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{gig.venue}, {gig.city}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  {gig.ticketUrl && (
                    <a
                      href={gig.ticketUrl}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      {t('gigs.tickets')}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground italic">
            {t('gigs.empty')}
          </p>
        )}
      </div>
    </section>
  );
}

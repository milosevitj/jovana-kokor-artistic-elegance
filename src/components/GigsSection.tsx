import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin, ExternalLink, X } from 'lucide-react';

interface Gig {
  id: string;
  date: string;
  time?: string;
  venue: string;
  city: string;
  titleDe: string;
  titleEn: string;
  ticketUrl?: string;
  modal?: 'reimagined';
}

const upcomingGigs: Gig[] = [
  {
    id: 'jade-jazz-jam',
    date: '2026-05-24',
    time: '14:00 – 17:00',
    venue: 'Pumpwerk',
    city: 'Wilhelmshaven',
    titleDe: 'JoyWanna & The Spicy Jam – Jade Jazz Jam',
    titleEn: 'JoyWanna & The Spicy Jam – Jade Jazz Jam',
  },
  {
    id: 'reimagined-release',
    date: '2026-06-14',
    time: '20:00',
    venue: 'Wilhelm 13',
    city: 'Oldenburg',
    titleDe: '„Reimagined" – Konzert & Albumrelease',
    titleEn: '"Reimagined" – Concert & Album Release',
    modal: 'reimagined',
  },
  {
    id: 'just-voice-piano',
    date: '2026-07-24',
    venue: 'Stadtgärtchen, Mainkai',
    city: '97828 Marktheidenfeld',
    titleDe: 'Just Voice & Piano mit Esther Filly',
    titleEn: 'Just Voice & Piano with Esther Filly',
    ticketUrl: 'https://www.eventim-light.com/de/a/5c73ef5bd2c0670001e0d190/e/6936b7866fe9085f50247cf7',
  },
  {
    id: 'some-sing-special',
    date: '2026-09-24',
    venue: 'Wilhelm 13',
    city: 'Oldenburg',
    titleDe: '"Some Sing Special" – JoyWanna & The Spicy Jam',
    titleEn: '"Some Sing Special" – JoyWanna & The Spicy Jam',
  },
];

function formatDate(dateStr: string, language: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function GigsSection() {
  const { language, t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="gigs" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            {t('gigs.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t('gigs.subtitle')}
          </p>
          <div className="w-20 h-px bg-primary mx-auto mt-8" />
        </div>

        {upcomingGigs.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {upcomingGigs.map((gig, index) => {
              const title = language === 'de' ? gig.titleDe : gig.titleEn;
              return (
                <article
                  key={gig.id}
                  className="group bg-background border border-border rounded-sm p-6 md:p-8 card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4 md:w-1/4">
                      <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{formatDate(gig.date, language)}</p>
                        {gig.time && (
                          <p className="text-muted-foreground text-sm">{gig.time}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{gig.venue}, {gig.city}</span>
                      </div>
                    </div>

                    {gig.modal === 'reimagined' ? (
                      <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        {language === 'de' ? 'Mehr erfahren' : 'Learn more'}
                      </button>
                    ) : gig.ticketUrl ? (
                      <a
                        href={gig.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        {language === 'de' ? 'Tickets kaufen' : 'Buy Tickets'}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground italic">
            {t('gigs.empty')}
          </p>
        )}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-card border border-border rounded-sm p-8 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
              aria-label={language === 'de' ? 'Schließen' : 'Close'}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="aspect-[3/2] bg-muted/40 border border-border mb-8 flex items-center justify-center text-muted-foreground text-sm italic">
              {language === 'de' ? 'Poster folgt in Kürze' : 'Poster coming soon'}
            </div>

            <h3 className="font-serif text-3xl md:text-4xl mb-2">
              JoyWanna – Reimagined
            </h3>
            <p className="text-primary italic mb-6">
              {language === 'de'
                ? 'Bekannte Songs – neu gehört.'
                : 'Familiar songs – heard anew.'}
            </p>

            <p className="text-foreground/80 leading-relaxed mb-6">
              {language === 'de'
                ? 'JoyWanna (Jovana Kokor), Sängerin und Pianistin aus Serbien, verleiht vertrauten Melodien eine neue Stimme. Zwischen Jazz, Latin und Pop entstehen reduzierte, persönliche Interpretationen – manchmal auf Spanisch, immer mit Gefühl. Was bleibt, ist der Kern. Was entsteht, klingt oft wie neu. Mit über 15 Jahren Bühnenerfahrung und geprägt durch ihr Jazzstudium in Belgrad entwickelt sie ihren ganz eigenen Zugang zu bekannten Songs. Ihr aktuelles Projekt „Reimagined" bringt genau das auf die Bühne – ergänzt durch erste Einblicke in eigene Kompositionen. Ein Konzert zwischen Vertrautem und Überraschung.'
                : 'JoyWanna (Jovana Kokor), singer and pianist from Serbia, gives familiar melodies a new voice. Between jazz, Latin and pop, stripped-down, personal interpretations emerge – sometimes in Spanish, always with feeling. What remains is the essence. What emerges often sounds like new. With over 15 years of stage experience and shaped by her jazz studies in Belgrade, she develops her very own approach to well-known songs. Her current project "Reimagined" brings exactly that to the stage – complemented by first glimpses of her own compositions. A concert between the familiar and the surprising.'}
            </p>

            <div className="border-t border-border pt-6">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                {language === 'de' ? 'Besetzung' : 'Line-up'}
              </p>
              <p className="font-medium">
                JoyWanna – {language === 'de' ? 'Gesang, Klavier' : 'Vocals, Piano'}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground">
              <p>14.06.2026 · 20:00 · Wilhelm 13, Oldenburg</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

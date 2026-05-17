import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin, ExternalLink, X } from 'lucide-react';
import reimaginedPoster from '@/assets/joywanna-reimagined-poster.webp';
import jadeJazzJamPoster from '@/assets/jade-jazz-jam-poster.webp';
import jadeJazzJamPoster2 from '@/assets/jade-jazz-jam-poster-2.webp';

type ModalKey = 'reimagined' | 'jade';

interface Gig {
  id: string;
  date: string;
  time?: string;
  venue: string;
  city: string;
  titleDe: string;
  titleEn: string;
  ticketUrl?: string;
  eventUrl?: string;
  modal?: ModalKey;
}

const upcomingGigs: Gig[] = [
  {
    id: 'jade-jazz-jam',
    date: '2026-05-24',
    time: '15:15',
    venue: 'Pumpwerk',
    city: 'Wilhelmshaven',
    titleDe: 'JoyWanna & The Spicy Jam – Jade Jazz Jam',
    titleEn: 'JoyWanna & The Spicy Jam – Jade Jazz Jam',
    modal: 'jade',
  },
  {
    id: 'reimagined-release',
    date: '2026-06-14',
    time: '20:00',
    venue: 'Wilhelm 13',
    city: 'Oldenburg',
    titleDe: '„Reimagined" – Konzert & Albumrelease',
    titleEn: '"Reimagined" – Concert & Album Release',
    eventUrl: 'https://wilhelm13.de/programm/joywanna-reimagined-bekannte-songs-neu-gehoert/',
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
    eventUrl: 'https://wilhelm13.de/programm/some-sing-special-joywanna-the-spicy-jam/',
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
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);
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

                    <div className="flex flex-col items-start md:items-end gap-2">
                      {(gig.ticketUrl || gig.eventUrl) ? (
                        <a
                          href={gig.ticketUrl ?? gig.eventUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          {language === 'de' ? 'Tickets kaufen' : 'Buy Tickets'}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-sm italic text-muted-foreground">
                          {language === 'de' ? 'Tickets folgen bald' : 'Tickets coming soon'}
                        </span>
                      )}
                      {gig.modal && (
                        <button
                          type="button"
                          onClick={() => setOpenModal(gig.modal!)}
                          className="text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          {language === 'de' ? 'Mehr erfahren' : 'Learn more'}
                        </button>
                      )}
                    </div>
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

      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={() => setOpenModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-card border border-border rounded-sm p-8 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenModal(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors z-10"
              aria-label={language === 'de' ? 'Schließen' : 'Close'}
            >
              <X className="w-6 h-6" />
            </button>

            {openModal === 'reimagined' && (
              <>
                <div className="bg-muted/40 border border-border mb-8 overflow-hidden">
                  <img
                    src={reimaginedPoster}
                    alt="JoyWanna Reimagined Konzert und Albumrelease Poster"
                    width={1414}
                    height={1885}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
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
              </>
            )}

            {openModal === 'jade' && (
              <>
                <h3 className="font-serif text-3xl md:text-4xl mb-2">
                  Jade Jazz Jam
                </h3>
                <p className="text-primary italic mb-6">
                  JoyWanna & The Spicy Jam
                </p>
                <div className="space-y-6">
                  <img
                    src={jadeJazzJamPoster}
                    alt="Jade Jazz Jam Poster 1"
                    className="w-full h-auto object-contain border border-border"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={jadeJazzJamPoster2}
                    alt="Jade Jazz Jam Poster 2"
                    className="w-full h-auto object-contain border border-border"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground">
                  <p>24.05.2026 · 15:15 · Pumpwerk, Wilhelmshaven</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

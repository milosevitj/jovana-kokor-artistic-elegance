import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  de: {
    // Navigation
    'nav.home': 'Start',
    'nav.gigs': 'Auftritte',
    'nav.about': 'Über mich',
    'nav.gallery': 'Galerie',
    'nav.contact': 'Kontakt',
    
    // Hero
    'hero.headline': 'Jovana Kokor',
    'hero.subheadline': 'Performance & Musik',
    'hero.tagline': 'Die Bühne ist mein Zuhause – mit Leidenschaft, Energie und einer Prise Wahnsinn bringe ich Emotionen zum Leben.',
    'hero.cta': 'Booking Anfragen',
    'hero.cta.secondary': 'Mehr erfahren',
    
    // Gigs
    'gigs.title': 'Kommende Auftritte',
    'gigs.subtitle': 'Erleben Sie Jovana live auf der Bühne',
    'gigs.empty': 'Neue Termine werden bald bekannt gegeben',
    'gigs.tickets': 'Tickets',
    'gigs.details': 'Details',
    
    // About
    'about.title': 'Die Performerin',
    'about.subtitle': 'Leidenschaft trifft Bühne',
    'about.p1': 'Als professionelle Performerin und Musikerin verbinde ich Gesang, Bewegung und Theater zu einem einzigartigen Erlebnis. Meine Auftritte sind geprägt von Energie, Emotionen und einer unverwechselbaren Präsenz.',
    'about.p2': 'Ob auf großen Festivalbühnen, in intimen Kulturzentren oder bei exklusiven Veranstaltungen – ich bringe Leidenschaft und Professionalität in jede Performance. Mein Ziel ist es, das Publikum zu berühren, zu bewegen und unvergessliche Momente zu schaffen.',
    'about.p3': 'Mit einem Hintergrund in klassischem Gesang und zeitgenössischem Theater bringe ich Vielseitigkeit und künstlerische Tiefe auf jede Bühne.',
    
    // Gallery
    'gallery.title': 'Galerie',
    'gallery.subtitle': 'Momente auf der Bühne',
    'gallery.video.title': 'Live Performance',
    
    // Contact
    'contact.title': 'Booking & Kontakt',
    'contact.subtitle': 'Für Anfragen zu Auftritten, Kooperationen oder allgemeine Fragen',
    'contact.name': 'Name',
    'contact.email': 'E-Mail',
    'contact.subject': 'Betreff',
    'contact.message': 'Nachricht',
    'contact.send': 'Nachricht senden',
    'contact.sending': 'Wird gesendet...',
    'contact.success': 'Vielen Dank! Ihre Nachricht wurde gesendet.',
    'contact.subject.booking': 'Booking Anfrage',
    'contact.subject.collaboration': 'Zusammenarbeit',
    'contact.subject.press': 'Presse & Medien',
    'contact.subject.other': 'Sonstiges',
    
    // Lessons
    'nav.lessons': 'Unterricht',
    'lessons.tagline': 'Maßgeschneiderter Unterricht für jedes Niveau',
    'lessons.title': 'Klavierunterricht',
    'lessons.beginners': 'Anfänger',
    'lessons.beginners.desc': 'Starten Sie Ihre musikalische Reise mit einem soliden Fundament. Lernen Sie die richtige Technik, Grundlagen der Musiktheorie und entdecken Sie die Freude am Spielen Ihrer ersten Stücke.',
    'lessons.advanced': 'Fortgeschrittene',
    'lessons.advanced.desc': 'Verfeinern Sie Ihre Kunstfertigkeit und meistern Sie anspruchsvolles Repertoire. Fokus auf Ausdruck, Interpretation und Vorbereitung auf Auftritte.',
    'lessons.allages': 'Alle Altersgruppen',
    'lessons.allages.desc': 'Musik kennt keine Altersgrenze. Ob 7 oder 70 – ich passe meine Lehrmethoden an Ihren Lernstil und Ihre Ziele an.',
    'lessons.feature.schedule': 'Flexible Termine',
    'lessons.feature.online': 'Online & Vor Ort',
    'lessons.feature.curriculum': 'Individueller Lehrplan',

    // Footer
    'footer.rights': 'Alle Rechte vorbehalten',
    'footer.impressum': 'Impressum',
    'footer.datenschutz': 'Datenschutz',
    'footer.follow': 'Folgen Sie mir',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.gigs': 'Shows',
    'nav.about': 'About',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.headline': 'Jovana Kokor',
    'hero.subheadline': 'Performance & Music',
    'hero.tagline': 'The stage is my home – with passion, energy, and a touch of madness, I bring emotions to life.',
    'hero.cta': 'Book for Event',
    'hero.cta.secondary': 'Learn More',
    
    // Gigs
    'gigs.title': 'Upcoming Shows',
    'gigs.subtitle': 'Experience Jovana live on stage',
    'gigs.empty': 'New dates will be announced soon',
    'gigs.tickets': 'Tickets',
    'gigs.details': 'Details',
    
    // About
    'about.title': 'The Performer',
    'about.subtitle': 'Passion Meets Stage',
    'about.p1': 'As a professional performer and musician, I combine singing, movement, and theater into a unique experience. My performances are characterized by energy, emotion, and an unmistakable presence.',
    'about.p2': 'Whether on large festival stages, in intimate cultural centers, or at exclusive events – I bring passion and professionalism to every performance. My goal is to touch the audience, move them, and create unforgettable moments.',
    'about.p3': 'With a background in classical voice and contemporary theater, I bring versatility and artistic depth to every stage.',
    
    // Gallery
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Moments on Stage',
    'gallery.video.title': 'Live Performance',
    
    // Contact
    'contact.title': 'Booking & Contact',
    'contact.subtitle': 'For inquiries about performances, collaborations, or general questions',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Thank you! Your message has been sent.',
    'contact.subject.booking': 'Booking Inquiry',
    'contact.subject.collaboration': 'Collaboration',
    'contact.subject.press': 'Press & Media',
    'contact.subject.other': 'Other',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.impressum': 'Imprint',
    'footer.datenschutz': 'Privacy Policy',
    'footer.follow': 'Follow me',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

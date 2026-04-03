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
    'hero.subheadline': 'Pianistin, Sängerin & Pädagogin',
    'hero.tagline': 'Klassisch ausgebildete Pianistin und Vokalkünstlerin aus Belgrad – mit Leidenschaft, Können und künstlerischer Tiefe bringe ich Emotionen zum Klingen.',
    'hero.cta': 'Booking Anfragen',
    'hero.cta.secondary': 'Mehr erfahren',
    
    // Gigs
    'gigs.title': 'Kommende Auftritte',
    'gigs.subtitle': 'Erleben Sie Jovana live auf der Bühne',
    'gigs.empty': 'Neue Termine werden bald bekannt gegeben',
    'gigs.tickets': 'Tickets',
    'gigs.details': 'Details',
    
    // About
    'about.title': 'Die Künstlerin',
    'about.subtitle': 'Leidenschaft trifft Können',
    'about.p1': 'Jovana Kokor ist eine klassisch ausgebildete Pianistin und Vokalkünstlerin, die ihren Abschluss an der Musikakademie in Klassischer Musik und Gesang erworben hat. Mit über einem Jahrzehnt professioneller Bühnenerfahrung verbindet sie technische Meisterschaft mit emotionaler Tiefe.',
    'about.p2': 'Ihr Repertoire umfasst klassisches Klavier, Kunstlied (Lieder), Opernarien und zeitgenössische Vokalwerke. Ob auf großen Konzertbühnen, bei exklusiven Firmenevents oder intimen Privatveranstaltungen – Jovana bringt Professionalität und künstlerische Leidenschaft in jeden Auftritt.',
    'about.p3': 'Als engagierte Musikpädagogin gibt sie ihr Wissen in privatem Klavier- und Gesangsunterricht weiter – für alle Altersgruppen und Niveaus, in Belgrad und online.',
    'about.img.alt': 'Jovana Kokor – klassisch ausgebildete Pianistin und Vokalkünstlerin, Porträtfoto',
    'about.stat.years': 'Jahre',
    'about.stat.shows': 'Auftritte',
    'about.stat.passion': 'Leidenschaft',
    
    // Gallery
    'gallery.title': 'Galerie',
    'gallery.subtitle': 'Momente auf der Bühne',
    'gallery.video.title': 'Live Performance',
    
    // Contact
    'contact.title': 'Booking & Kontakt',
    'contact.subtitle': 'Für Anfragen zu Konzerten, Firmenevents, Hochzeiten oder Privatunterricht',
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

    // FAQ
    'faq.title': 'Häufige Fragen',
    'faq.subtitle': 'Alles Wichtige auf einen Blick',
    'faq.q1': 'Welchen musikalischen Hintergrund hat Jovana Kokor?',
    'faq.a1': 'Jovana Kokor ist eine klassisch ausgebildete Pianistin und Vokalkünstlerin, die ihren Abschluss an der Musikakademie in Klassischer Musik und Gesang gemacht hat. Mit über 10 Jahren Berufserfahrung hat sie an bedeutenden Konzerthäusern und Festivals in Serbien und Deutschland aufgetreten.',
    'faq.q2': 'Welches Repertoire spielt Jovana Kokor?',
    'faq.a2': 'Jovana Kokor interpretiert ein vielfältiges Repertoire von klassischem Klavier über Kunstlied (Lieder) und Opernarien bis hin zu zeitgenössischen Vokalwerken. Ihre Programme reichen von intimen Recitals bis zu großen Konzertauftritten, individuell abgestimmt auf den Anlass.',
    'faq.q3': 'Bietet Jovana Kokor privaten Klavierunterricht an?',
    'faq.a3': 'Ja, Jovana bietet privaten Klavier- und Gesangsunterricht für alle Altersgruppen und Niveaus an – von Anfängern bis Fortgeschrittenen. Der Unterricht ist online und persönlich in Belgrad verfügbar, mit flexiblen Terminen und individuellem Lehrplan.',
    'faq.q4': 'Wie kann ich Jovana Kokor für ein Konzert oder Event buchen?',
    'faq.a4': 'Sie können Jovana Kokor für Konzerte, Firmenevents, Hochzeiten und private Veranstaltungen buchen, indem Sie das Kontaktformular auf dieser Website nutzen oder eine E-Mail an jovanakokor8@gmail.com senden.',
    'faq.q5': 'Wo ist Jovana Kokor verfügbar?',
    'faq.a5': 'Jovana ist in Belgrad, Serbien ansässig und tritt regelmäßig in ganz Deutschland auf – darunter in Städten wie Berlin, München und Frankfurt. Online-Unterricht ist weltweit verfügbar.',

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
    'hero.subheadline': 'Pianist, Vocalist & Educator',
    'hero.tagline': 'Classically trained pianist and vocal artist from Belgrade – bringing emotions to life through passion, skill, and artistic depth.',
    'hero.cta': 'Book for Event',
    'hero.cta.secondary': 'Learn More',
    
    // Gigs
    'gigs.title': 'Upcoming Shows',
    'gigs.subtitle': 'Experience Jovana live on stage',
    'gigs.empty': 'New dates will be announced soon',
    'gigs.tickets': 'Tickets',
    'gigs.details': 'Details',
    
    // About
    'about.title': 'The Artist',
    'about.subtitle': 'Passion Meets Mastery',
    'about.p1': 'Jovana Kokor is a classically trained pianist and vocal artist who graduated from the Academy of Music with a degree in Classical Music and Vocal Performance. With over a decade of professional stage experience, she combines technical mastery with emotional depth.',
    'about.p2': 'Her repertoire spans classical piano, art song (Lieder), opera arias, and contemporary vocal works. Whether performing at major concert venues, exclusive corporate events, or intimate private gatherings, Jovana brings professionalism and artistic passion to every performance.',
    'about.p3': 'As a dedicated music educator, she shares her expertise through private piano and vocal instruction – for all ages and skill levels, in Belgrade and online.',
    'about.img.alt': 'Jovana Kokor – classically trained pianist and vocal artist, portrait photo',
    'about.stat.years': 'Years',
    'about.stat.shows': 'Shows',
    'about.stat.passion': 'Passion',
    
    // Gallery
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Moments on Stage',
    'gallery.video.title': 'Live Performance',
    
    // Contact
    'contact.title': 'Booking & Contact',
    'contact.subtitle': 'For inquiries about concerts, corporate events, weddings, or private lessons',
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
    
    // Lessons
    'nav.lessons': 'Lessons',
    'lessons.tagline': 'Tailored Instruction for Every Level',
    'lessons.title': 'Piano Lessons',
    'lessons.beginners': 'Beginners',
    'lessons.beginners.desc': 'Start your musical journey with a solid foundation. Learn proper technique, music theory basics, and discover the joy of playing your first pieces.',
    'lessons.advanced': 'Advanced',
    'lessons.advanced.desc': 'Refine your artistry and tackle challenging repertoire. Focus on expression, interpretation, and performance preparation.',
    'lessons.allages': 'All Ages',
    'lessons.allages.desc': "Music has no age limit. Whether you're 7 or 70, I adapt my teaching methods to your learning style and goals.",
    'lessons.feature.schedule': 'Flexible Schedule',
    'lessons.feature.online': 'Online & In-Person',
    'lessons.feature.curriculum': 'Personalized Curriculum',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know',
    'faq.q1': 'What is Jovana Kokor\'s musical background?',
    'faq.a1': 'Jovana Kokor is a classically trained pianist and vocal artist who graduated from the Academy of Music with a degree in Classical Music and Vocal Performance. With over 10 years of professional experience, she has performed at major concert halls and festivals across Serbia and Germany.',
    'faq.q2': 'What repertoire does Jovana Kokor perform?',
    'faq.a2': 'Jovana Kokor performs a diverse repertoire spanning classical piano, art song (Lieder), opera arias, and contemporary vocal works. Her programs range from intimate recitals to full concert performances, tailored to the occasion.',
    'faq.q3': 'Does Jovana Kokor offer private piano lessons?',
    'faq.a3': 'Yes, Jovana offers private piano and vocal instruction for all ages and skill levels — from beginners to advanced students. Lessons are available both online and in-person in Belgrade, with flexible scheduling and a personalized curriculum.',
    'faq.q4': 'How can I book Jovana Kokor for a concert or event?',
    'faq.a4': 'You can book Jovana Kokor for concerts, corporate events, weddings, and private gatherings by using the contact form on this website or emailing jovanakokor8@gmail.com.',
    'faq.q5': 'Where is Jovana Kokor available?',
    'faq.a5': 'Jovana is based in Belgrade, Serbia and performs regularly across Germany — including cities like Berlin, Munich, and Frankfurt. Online lessons are available worldwide.',

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
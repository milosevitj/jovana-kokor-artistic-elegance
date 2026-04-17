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
    'hero.headline': 'JoyWanna',
    'hero.subheadline': 'Music & Performance',
    'hero.tagline': 'Musik ist mein Raum, um ganz ich selbst zu sein – voller Leidenschaft und Energie, eine Einladung, diesen Moment mit Hingabe und in Verbundenheit zu teilen.',
    'hero.cta': 'Booking Anfragen',
    'hero.cta.secondary': 'Mehr erfahren',
    
    // Gigs
    'gigs.title': 'Kommende Auftritte',
    'gigs.subtitle': 'Erleben Sie Jovana live auf der Bühne',
    'gigs.empty': 'Neue Termine werden bald bekannt gegeben',
    'gigs.tickets': 'Tickets',
    'gigs.details': 'Details',
    
    // About
    'about.title': 'Musik, die verbindet',
    'about.subtitle': 'Stimme. Klang. Gefühl.',
    'about.p1': 'Musik ist mein Raum, um ganz ich selbst zu sein – voller Leidenschaft und Energie, eine Einladung, diesen Moment mit Hingabe und in Verbundenheit zu teilen.',
    'about.p2': 'Ich bin Sängerin und Pianistin und bewege mich zwischen Jazz, Latin, NeoSoul, Groove und Pop. Durch mein Jazzgesangstudium in Belgrad, mein Studium der spanischen Sprache sowie über 15 Jahre Bühnenerfahrung – auf großen und kleinen Bühnen, in verschiedensten Formationen, darunter sechs Jahre auf internationalen Kreuzfahrtschiffen – habe ich meinen eigenen Zugang zur Musik entwickelt: gefühlvoll, lebendig, offen für neue Farben und nicht selten auch auf Spanisch und Serbisch interpretiert.',
    'about.p3.before': 'Ich trete in verschiedenen Formationen auf – solo, im Duo oder Trio sowie mit meiner Band ',
    'about.p3.band': 'JoyWanna & The Spicy Jam',
    'about.p3.after': '. Jede Besetzung hat ihren eigenen Charakter: mal intim und reduziert, mal energiegeladen, rhythmisch und voller Spielfreude.',
    'band.modal.title': 'JoyWanna & The Spicy Jam',
    'band.modal.p1': 'JoyWanna & The Spicy Jam stehen für einen mitreißenden, genreübergreifenden Sound zwischen Jazz, Latin, Soul und Pop. Farbige, harmonisch vielschichtige Arrangements treffen auf treibende Grooves und pure Spielfreude. Die Band verbindet die Begeisterung, bekannte Klassiker neu zu interpretieren und eigene Kompositionen zu erschaffen.',
    'band.modal.p2': 'Live entsteht ein Klang „voller Lebensfreude und Energie": brodelnde Rhythmik, leidenschaftliche Soli und die ausdrucksstarke Stimme von Jovana Kokor tragen durch einen Abend, der bewegt – mal sinnlich, mal funkig, mal tief berührend.',
    'band.modal.p3': 'Freuen Sie sich auf ein Konzerterlebnis voller Lebensfreude, musikalischer Vielfalt und Crossover-Momenten.',
    'band.modal.close': 'Schließen',
    'about.p4': 'Ein wichtiger Teil meiner künstlerischen Arbeit ist genau dieses Spannungsfeld: bekannte Songs neu zu hören und ihnen eine persönliche Note zu geben. Mein Projekt „Reimagined" ist daraus entstanden – ein Album mit neu interpretierten Lieblingssongs und Publikumsfavoriten. Dabei löse ich die Stücke aus ihrem ursprünglichen Kontext und reduziere sie oft auf das Wesentliche – Stimme, Klavier, Klang und Gefühl.',
    'about.p5': 'Gleichzeitig arbeite ich an meinem ersten Album mit eigenen Kompositionen – gemeinsam mit wunderbaren Musiker:innen aus meiner Band. Meine Single „Just Breathe" gibt bereits einen Einblick in diese persönliche musikalische Richtung, und weitere Songs sind auf dem Weg.',
    'about.p6': 'Ob auf der Bühne oder im kleinen Rahmen – mir geht es immer darum, echte Momente zu schaffen: ehrlich, lebendig – und spürbar.',
    'about.img.alt': 'Jovana Kokor – Sängerin und Pianistin, Porträtfoto',
    'about.stat.years': 'Jahre Erfahrung',
    'about.stat.shows': 'Shows',
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
    'contact.error.required': 'Bitte füllen Sie alle Pflichtfelder aus.',
    'contact.error.send': 'Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut.',
    'contact.subject.booking': 'Booking Anfrage',
    'contact.subject.collaboration': 'Zusammenarbeit',
    'contact.subject.press': 'Presse & Medien',
    'contact.subject.other': 'Sonstiges',
    
    // Lessons
    'nav.lessons': 'Unterricht',
    'lessons.title': 'Vocal Coaching',
    'lessons.subtitle': 'Individuelles Coaching für Stimme & Ausdruck',
    
    // Vocal Coaching cards
    'lessons.vocal.individual': 'Individuelle Begleitung',
    'lessons.vocal.individual.desc': 'Jede Stimme ist einzigartig. Deshalb gestalte ich jede Einheit individuell – abgestimmt auf dein Tempo, deine Bedürfnisse und deinen persönlichen Weg.',
    'lessons.vocal.expression': 'Stimme, Ausdruck & Gefühl',
    'lessons.vocal.expression.desc': 'Es geht nicht nur um Technik, sondern um Ausdruck. Gemeinsam entdecken wir deine Stimme als kraftvollen Raum für Emotion und Persönlichkeit.',
    'lessons.vocal.allages': 'Alle Altersgruppen',
    'lessons.vocal.allages.desc': 'Musik kennt keine Altersgrenze. Ob 7 oder 70 – ich passe meinen Unterricht an deinen Lernstil und deine Ziele an.',
    
    // Piano section
    'lessons.piano.tagline': 'Maßgeschneiderter Unterricht für jedes Niveau',
    'lessons.piano.title': 'Klavierunterricht',
    'lessons.piano.beginners': 'Anfänger',
    'lessons.piano.beginners.desc': 'Starten Sie Ihre musikalische Reise mit einem soliden Fundament. Lernen Sie die richtige Technik, Grundlagen der Musiktheorie und entdecken Sie die Freude am Spielen Ihrer ersten Stücke.',
    'lessons.piano.advanced': 'Fortgeschrittene',
    'lessons.piano.advanced.desc': 'Verfeinern Sie Ihre Kunstfertigkeit und meistern Sie anspruchsvolles Repertoire. Fokus auf Ausdruck, Interpretation und Vorbereitung auf Auftritte.',
    'lessons.piano.allages': 'Alle Altersgruppen',
    'lessons.piano.allages.desc': 'Musik kennt keine Altersgrenze. Ob 7 oder 70 – ich passe meine Lehrmethoden an Ihren Lernstil und Ihre Ziele an.',
    
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
    'hero.headline': 'JoyWanna',
    'hero.subheadline': 'Music & Performance',
    'hero.tagline': 'Music is my space to fully be myself – full of passion and energy, an invitation to share this moment with presence and connection.',
    'hero.cta': 'Book for Event',
    'hero.cta.secondary': 'Learn More',
    
    // Gigs
    'gigs.title': 'Upcoming Shows',
    'gigs.subtitle': 'Experience Jovana live on stage',
    'gigs.empty': 'New dates will be announced soon',
    'gigs.tickets': 'Tickets',
    'gigs.details': 'Details',
    
    // About
    'about.title': 'Music That Connects',
    'about.subtitle': 'Voice. Sound. Emotion.',
    'about.p1': 'Music is my space to be fully myself – full of passion and energy, an invitation to share the moment with devotion and connection.',
    'about.p2': 'I am a singer and pianist, moving between Jazz, Latin, NeoSoul, Groove, and Pop. Through my jazz vocal studies in Belgrade, my studies of the Spanish language, and over 15 years of stage experience – on big and small stages, in a wide variety of ensembles, including six years on international cruise ships – I have developed my own approach to music: soulful, vibrant, open to new colors, and often interpreted in Spanish and Serbian.',
    'about.p3.before': 'I perform in various formations – solo, as a duo or trio, and with my band ',
    'about.p3.band': 'JoyWanna & The Spicy Jam',
    'about.p3.after': '. Each lineup has its own character: sometimes intimate and stripped-back, sometimes energetic, rhythmic, and full of playful joy.',
    'band.modal.title': 'JoyWanna & The Spicy Jam',
    'band.modal.p1': 'JoyWanna & The Spicy Jam stand for a captivating, genre-crossing sound between Jazz, Latin, Soul, and Pop. Colorful, harmonically layered arrangements meet driving grooves and pure playfulness. The band combines the joy of reinterpreting beloved classics with creating original compositions.',
    'band.modal.p2': 'Live, a sound emerges that is "full of joie de vivre and energy": simmering rhythms, passionate solos, and the expressive voice of Jovana Kokor carry you through an evening that moves you – sometimes sensual, sometimes funky, sometimes deeply touching.',
    'band.modal.p3': 'Look forward to a concert experience full of vitality, musical diversity, and crossover moments.',
    'band.modal.close': 'Close',
    'about.p4': 'An important part of my artistic work is exactly this creative tension: hearing well-known songs in a new way and giving them a personal touch. My project "Reimagined" was born from this – an album of reinterpreted favorite songs and audience favorites. I take the pieces out of their original context and often reduce them to the essentials – voice, piano, sound, and emotion.',
    'about.p5': 'At the same time, I am working on my first album of original compositions – together with wonderful musicians from my band. My single "Just Breathe" already offers a glimpse into this personal musical direction, and more songs are on the way.',
    'about.p6': 'Whether on stage or in an intimate setting – it is always about creating real moments: honest, alive – and felt.',
    'about.img.alt': 'Jovana Kokor – singer and pianist, portrait photo',
    'about.stat.years': 'Years of Experience',
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
    'contact.error.required': 'Please fill in all required fields.',
    'contact.error.send': 'Your message could not be sent. Please try again.',
    'contact.subject.booking': 'Booking Inquiry',
    'contact.subject.collaboration': 'Collaboration',
    'contact.subject.press': 'Press & Media',
    'contact.subject.other': 'Other',
    
    // Lessons
    'nav.lessons': 'Lessons',
    'lessons.title': 'Vocal Coaching',
    'lessons.subtitle': 'Individual Coaching for Voice & Expression',
    
    'lessons.vocal.individual': 'Individual Guidance',
    'lessons.vocal.individual.desc': 'Every voice is unique. That\'s why I design each session individually – tailored to your pace, your needs, and your personal journey.',
    'lessons.vocal.expression': 'Voice, Expression & Emotion',
    'lessons.vocal.expression.desc': 'It\'s not just about technique – it\'s about expression. Together we discover your voice as a powerful space for emotion and personality.',
    'lessons.vocal.allages': 'All Age Groups',
    'lessons.vocal.allages.desc': 'Music knows no age limit. Whether 7 or 70 – I adapt my teaching to your learning style and goals.',
    
    'lessons.piano.tagline': 'Tailored Instruction for Every Level',
    'lessons.piano.title': 'Piano Lessons',
    'lessons.piano.beginners': 'Beginners',
    'lessons.piano.beginners.desc': 'Start your musical journey with a solid foundation. Learn proper technique, music theory basics, and discover the joy of playing your first pieces.',
    'lessons.piano.advanced': 'Advanced',
    'lessons.piano.advanced.desc': 'Refine your artistry and tackle challenging repertoire. Focus on expression, interpretation, and performance preparation.',
    'lessons.piano.allages': 'All Ages',
    'lessons.piano.allages.desc': 'Music has no age limit. Whether you\'re 7 or 70, I adapt my teaching methods to your learning style and goals.',
    
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
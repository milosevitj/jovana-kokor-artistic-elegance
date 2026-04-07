import { useEffect, useRef } from 'react';

const SECTION_IDS = ['home', 'gigs', 'about', 'lessons', 'gallery', 'instagram', 'contact'];

export function useHashNavigation() {
  const isClickScrolling = useRef(false);

  useEffect(() => {
    // 1. Scroll to hash on initial load
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    }

    // 2. Intercept nav link clicks to update hash
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href')?.replace('#', '');
      if (hash) {
        isClickScrolling.current = true;
        window.history.replaceState(null, '', `#${hash}`);
        // Reset after scroll settles
        setTimeout(() => { isClickScrolling.current = false; }, 1000);
      }
    };
    document.addEventListener('click', handleClick);

    // 3. Update hash on scroll using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id && window.location.hash !== `#${id}`) {
              window.history.replaceState(null, '', `#${id}`);
            }
            break;
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      document.removeEventListener('click', handleClick);
      observer.disconnect();
    };
  }, []);
}

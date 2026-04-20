import { useDynamicSEO } from '@/hooks/use-dynamic-seo';

/**
 * Headless component that runs the dynamic SEO updater.
 * Must be rendered inside a <LanguageProvider> and a Router.
 */
export function SEOManager() {
  useDynamicSEO();
  return null;
}

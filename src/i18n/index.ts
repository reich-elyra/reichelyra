import en from './locales/en.json';
import ar from './locales/ar.json';

export type Locale = 'en' | 'ar';

export const defaultLocale: Locale = 'en';

export const translations: Record<Locale, typeof en> = {
  en,
  ar,
};

/**
 * Get a translated string by dot-notation key.
 * Example: t('en', 'hero.title')
 */
export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let result: unknown = translations[locale];

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof result === 'string' ? result : key;
}

/**
 * Get the text direction for a locale.
 */
export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

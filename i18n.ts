import { getRequestConfig } from 'next-intl/server';

export const locales = ['fr', 'ar', 'en'] as const;
export const defaultLocale = 'fr' as const;
export type Locale = (typeof locales)[number];

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  fr: 'ltr',
  ar: 'rtl',
  en: 'ltr',
};

export const localeLabels: Record<Locale, string> = {
  fr: 'FR',
  ar: 'AR',
  en: 'EN',
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'Africa/Algiers',
    now: new Date(),
  };
});

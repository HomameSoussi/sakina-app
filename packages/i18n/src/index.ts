import { i18n } from '@lingui/core';
import { detect, fromUrl, fromStorage, fromNavigator } from '@lingui/detect-locale';

// Import message catalogs
import { messages as enMessages } from './locales/en/messages';
import { messages as arMessages } from './locales/ar/messages';
import { messages as arMAMessages } from './locales/ar-MA/messages';
import { messages as frMessages } from './locales/fr/messages';

export const locales = {
  en: 'English',
  ar: 'العربية',
  'ar-MA': 'العربية المغربية',
  fr: 'Français',
};

export const defaultLocale = 'en';

// RTL languages
export const rtlLocales = ['ar', 'ar-MA'];

// Load messages for each locale
i18n.load({
  en: enMessages,
  ar: arMessages,
  'ar-MA': arMAMessages,
  fr: frMessages,
});

// Detect user's locale
export const detectLocale = () => {
  return detect(
    fromUrl('lang'),
    fromStorage('lang'),
    fromNavigator(),
    defaultLocale
  );
};

// Activate locale
export const activateLocale = (locale: string) => {
  i18n.activate(locale);
};

// Initialize with detected locale
const detectedLocale = detectLocale();
activateLocale(detectedLocale);

// Utility functions
export const isRTL = (locale: string) => rtlLocales.includes(locale);

export const getDirection = (locale: string) => isRTL(locale) ? 'rtl' : 'ltr';

export const formatNumber = (number: number, locale: string) => {
  return new Intl.NumberFormat(locale).format(number);
};

export const formatDate = (date: Date, locale: string, options?: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const formatTime = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Prayer time formatting for Islamic context
export const formatPrayerTime = (date: Date, locale: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 24-hour format for prayer times
  };
  
  return new Intl.DateTimeFormat(locale, options).format(date);
};

// Export the configured i18n instance
export { i18n };

// Export types
export type SupportedLocale = keyof typeof locales;

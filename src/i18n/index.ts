import en from './en.json';
import vi from './vi.json';

export type Locale = 'vi' | 'en';

export const defaultLocale: Locale = 'vi';
export const locales: Locale[] = ['vi', 'en'];

const messages = { vi, en } as const;

export function t(locale: Locale = 'vi') {
  return messages[locale] ?? messages.vi;
}

export type Messages = typeof vi;

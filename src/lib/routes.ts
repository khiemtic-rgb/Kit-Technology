import type { Locale } from '../i18n';

export type SitePage = 'home' | 'about' | 'products' | 'contact';

export const localePaths: Record<Locale, Record<SitePage, string>> = {
  vi: {
    home: '/vi',
    about: '/vi/ve-chung-toi',
    products: '/vi/san-pham',
    contact: '/vi/lien-he',
  },
  en: {
    home: '/en',
    about: '/en/about',
    products: '/en/products',
    contact: '/en/contact',
  },
};

const pathToPage = new Map<string, SitePage>();
for (const locale of ['vi', 'en'] as const) {
  for (const [page, path] of Object.entries(localePaths[locale]) as [SitePage, string][]) {
    pathToPage.set(path, page);
  }
}

export function getLocaleFromPath(pathname: string): Locale {
  const normalized = pathname.replace(/\/$/, '') || '/';
  if (normalized === '/en' || normalized.startsWith('/en/')) return 'en';
  return 'vi';
}

export function getAlternateLocalePath(pathname: string): string {
  const normalized = pathname.replace(/\/$/, '') || '/';
  const page = pathToPage.get(normalized);
  if (!page) return localePaths.en.home;
  const currentLocale = getLocaleFromPath(normalized);
  const alternateLocale: Locale = currentLocale === 'vi' ? 'en' : 'vi';
  return localePaths[alternateLocale][page];
}

export function getPageFromPath(pathname: string): SitePage | undefined {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return pathToPage.get(normalized);
}

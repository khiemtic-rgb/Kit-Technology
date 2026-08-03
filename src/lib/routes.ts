import type { Locale } from '../i18n';
import { getAlternatePath, getPage, getStaticSlugs, pageUrl } from './site-map';

export function getLocaleFromPath(pathname: string): Locale {
  const normalized = pathname.replace(/\/$/, '') || '/';
  if (normalized === '/en' || normalized.startsWith('/en/')) return 'en';
  return 'vi';
}

export function getSlugFromPath(pathname: string): string | undefined {
  const locale = getLocaleFromPath(pathname);
  const prefix = `/${locale}/`;
  const normalized = pathname.replace(/\/$/, '') || '/';
  if (normalized === `/${locale}`) return undefined;
  if (!normalized.startsWith(prefix)) return undefined;
  return normalized.slice(prefix.length);
}

export function homePath(locale: Locale): string {
  return locale === 'vi' ? '/vi/' : '/en/';
}

export function getAlternateLocalePath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  const slug = getSlugFromPath(pathname);
  if (!slug) return homePath(locale === 'vi' ? 'en' : 'vi');
  // Standalone contact pages ↔ company contact hub aliases
  if (slug === 'lien-he' || slug === 'contact') {
    return locale === 'vi' ? pageUrl('en', 'company/contact') : pageUrl('vi', 'gioi-thieu/lien-he');
  }
  const page = getPage(locale, slug);
  if (!page) return homePath(locale === 'vi' ? 'en' : 'vi');
  return getAlternatePath(locale, slug);
}

export function contactPath(locale: Locale): string {
  return locale === 'vi' ? '/vi/lien-he/' : '/en/contact/';
}

export { getStaticSlugs, getPage };

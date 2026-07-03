import type { Locale } from '../i18n';
import { getAlternatePath, getPage, getStaticSlugs } from './site-map';

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

export function getAlternateLocalePath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  const slug = getSlugFromPath(pathname);
  if (!slug) return locale === 'vi' ? '/en' : '/vi';
  if (slug === 'lien-he') return locale === 'vi' ? '/en/contact' : '/vi/lien-he';
  if (slug === 'contact') return locale === 'vi' ? '/en/contact' : '/vi/lien-he';
  const page = getPage(locale, slug);
  if (!page) return locale === 'vi' ? '/en' : '/vi';
  return getAlternatePath(locale, slug);
}

export function contactPath(locale: Locale): string {
  return locale === 'vi' ? '/vi/lien-he' : '/en/contact';
}

export { getStaticSlugs, getPage };

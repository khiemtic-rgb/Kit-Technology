export const SITE_URL = 'https://kittech.vn';
export const SITE_NAME = 'Kit Technology';
export const DEFAULT_OG_IMAGE = '/images/og-banner.svg';

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

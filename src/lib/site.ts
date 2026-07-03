export const SITE_URL = 'https://kittech.vn';
export const SITE_NAME = 'KIT Technology';
export const LOGO_PATH = '/images/logo-kit.png';
export const DEFAULT_OG_IMAGE = '/images/banner-1.png';

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

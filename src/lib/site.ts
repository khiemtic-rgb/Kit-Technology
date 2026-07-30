export const SITE_URL = 'https://kittech.vn';
export const SITE_NAME = 'KIT Technology';
export const LOGO_PATH = '/images/logo-kit.png';
export const DEFAULT_OG_IMAGE = '/images/banner-1.png';

/** Absolute URL; HTML pages use trailing slash to match live Cloudflare hosting. */
export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  let normalized = path.startsWith('/') ? path : `/${path}`;
  const isFile = /\.[a-zA-Z0-9]+$/.test(normalized);
  if (!isFile && normalized.length > 1 && !normalized.endsWith('/')) {
    normalized = `${normalized}/`;
  }
  return `${SITE_URL}${normalized}`;
}

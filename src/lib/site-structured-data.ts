import type { Locale } from '../i18n';
import { absoluteUrl, LOGO_PATH, SITE_NAME, SITE_URL } from './site';

export function buildOrganizationStructuredData() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(LOGO_PATH),
    },
    sameAs: ['https://novixa.vn'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+84-984-660-399',
        contactType: 'customer service',
        areaServed: 'VN',
        availableLanguage: ['Vietnamese', 'English'],
        email: 'khiemtic@gmail.com',
      },
    ],
  };
}

export function buildWebSiteStructuredData(locale: Locale = 'vi') {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: locale === 'vi' ? 'vi-VN' : 'en-US',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function buildSiteGraphStructuredData(locale: Locale = 'vi'): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [buildOrganizationStructuredData(), buildWebSiteStructuredData(locale)],
  };
}

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/** Priority / changefreq hints for Google (VI indexable URLs only). */
function sitemapItem(page) {
  const url = page.replace(/\/$/, '') || 'https://kittech.vn';
  const path = url.replace('https://kittech.vn', '') || '/';

  let priority = 0.5;
  let changefreq = 'monthly';

  if (path === '/' || path === '/vi') {
    priority = 1;
    changefreq = 'daily';
  } else if (path === '/vi/blog' || path === '/vi/lien-he') {
    priority = 0.9;
    changefreq = 'daily';
  } else if (path.startsWith('/vi/blog/')) {
    const depth = path.split('/').filter(Boolean).length;
    priority = depth >= 4 ? 0.8 : 0.85;
    changefreq = 'weekly';
  } else if (path.startsWith('/vi/san-pham') || path.startsWith('/vi/giai-phap')) {
    priority = 0.8;
    changefreq = 'weekly';
  } else if (path.startsWith('/vi/gioi-thieu') || path.startsWith('/vi/cong-nghe')) {
    priority = 0.7;
    changefreq = 'monthly';
  }

  return {
    url,
    changefreq,
    priority,
    lastmod: new Date().toISOString(),
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://kittech.vn',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // EN pages are noindex — keep them out of the sitemap.
      filter: (page) => !page.includes('/en'),
      serialize: (item) => sitemapItem(item.url),
    }),
  ],
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});

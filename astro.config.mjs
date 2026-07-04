import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kittech.vn',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/en'),
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

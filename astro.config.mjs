import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kittechnology.vn',
  trailingSlash: 'never',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});

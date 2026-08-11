import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://netorapg.github.io',
  base: '/AtomPortfolio/',
  integrations: [sitemap()],
});

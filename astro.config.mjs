// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://deep-diver.github.io/auto-dev.github.io/',
  base: '/auto-dev.github.io',
  integrations: [mdx(), sitemap()],
});

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  build: { inlineStylesheets: 'always' },
  integrations: [react(), sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/dev/') && !/^\/404(?:\.|\/|$)/.test(new URL(page).pathname) })],
  vite: {
    // Builds must not replace the development server's optimized React modules.
    cacheDir: process.env.NODE_ENV === 'production'
      ? 'node_modules/.vite-production'
      : 'node_modules/.vite-development',
    plugins: [tailwindcss()]
  }
});

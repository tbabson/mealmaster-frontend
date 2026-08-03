import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Our own service worker — Workbox only injects the precache manifest into it.
      strategies: 'injectManifest',
      srcDir: 'src',
      // Keep the historical filename so browsers that already registered
      // /service-worker.js upgrade in place instead of running two workers.
      filename: 'service-worker.js',
      registerType: 'autoUpdate',
      injectRegister: null, // registered by hand in main.jsx
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        // Classic worker, not an ES module: Firefox does not support
        // registering a service worker with { type: 'module' }.
        rollupFormat: 'iife',
      },
      manifest: {
        name: 'MealMaster — Meal Planning & Reminders',
        short_name: 'MealMaster',
        description:
          'Plan meals, shop the ingredients, and get reminded when it is time to cook.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#ffffff',
        theme_color: '#143315',
        lang: 'en',
        categories: ['food', 'lifestyle', 'health'],
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      // Serve the worker under `npm run dev` so push can be tested without a build
      // In dev the worker is served from /dev-sw.js?dev-sw as an ES module;
      // the production build is a classic worker (see rollupFormat above).
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  server: {
    port: 3200,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});

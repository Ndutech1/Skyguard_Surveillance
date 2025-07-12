import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000  // ✅ FIXED
      },
      manifest: {
        name: 'SkyGuard Surveillance',
        short_name: 'SkyGuard',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1c1c1c',
        icons: [
          {
            src: '/logo192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logo512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});

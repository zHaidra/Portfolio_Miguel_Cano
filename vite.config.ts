import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

/**
 * GitHub Pages base path.
 *
 * - Project site (https://<user>.github.io/<repo>/) -> '/<repo>/'
 * - User site     (https://<user>.github.io/)        -> '/'
 *
 * Override without editing this file:  BASE_PATH=/my-repo/ npm run build
 * The GitHub Actions workflow sets it automatically from the repository name.
 */
const BASE_PATH = process.env.BASE_PATH ?? '/miguel-cano-portfolio/';

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // Keep the animation library out of the entry chunk so first paint
        // isn't blocked by it.
        manualChunks: {
          motion: ['framer-motion'],
        },
      },
    },
  },
});

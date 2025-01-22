import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    ViteImageOptimizer({
      png: {
        quality: [0.6, 0.8], // Compresión para PNG
      },
      jpeg: {
        quality: 80, // Calidad del JPEG (0-100)
      },
      webp: {
        lossless: true, // Habilita compresión sin pérdida para WebP
      },
      svg: {
        multipass: true, // Optimización múltiple para SVG
      },
      gif: {
        optimizationLevel: 3, // Nivel de optimización para GIF
      },
      jpg: {
        quality: 80, // Calidad del JPG (0-100)
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/',
});

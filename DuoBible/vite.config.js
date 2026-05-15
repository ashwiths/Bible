import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Ensure base path is correct for Vercel (root deployment)
  base: '/',

  build: {
    // Increase chunk warning threshold to avoid false warnings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor';
            }
          }
        },
      },
    },
    // Ensure assets are fingerprinted for correct cache-busting
    assetsDir: 'assets',
  },

  css: {
    // Ensure CSS is processed correctly in production
    devSourcemap: false,
  },
})

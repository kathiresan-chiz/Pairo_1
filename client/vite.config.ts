import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The home page chunk carries three.js and GSAP for the hero (~200 kB gzipped);
    // other pages load without it. Raised so that expected size doesn't warn on every build.
    chunkSizeWarningLimit: 800,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})

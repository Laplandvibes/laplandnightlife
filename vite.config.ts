import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import compression from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [react(), tailwindcss(), compression({ algorithms: ['brotliCompress'], threshold: 1024 })],
  // CRITICAL: required because we import from ../../shared/. Without this,
  // two React instances ship in the bundle and useContext returns null —
  // production renders a blank deep-night page. See lv_critical_react_dedupe.md.
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react-vendor'
            if (/[\\/]node_modules[\\/]lucide-react/.test(id)) return 'ui-vendor'
          }
          // Split the monolithic per-locale COPY blob into its own chunk so
          // the main entry bundle stays small. Loaded in parallel with main.
          if (id.includes('/src/locales/copy') || id.includes('\\src\\locales\\copy')) return 'locales'
          return undefined
        },
      },
    },
  },
})

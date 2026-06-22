import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Allow raw import of .html files (used for sandbox.html?raw)
  assetsInclude: [],
  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      '/stream-jsx': 'http://127.0.0.1:8000',
      '/save-files': 'http://127.0.0.1:8000',
      '/fix-jsx': 'http://127.0.0.1:8000',
      '/generate-ui': 'http://127.0.0.1:8000',
      '/health': 'http://127.0.0.1:8000',
      '/preview': 'http://127.0.0.1:8000',
      '/dist': 'http://127.0.0.1:8000',
    },
  },
})


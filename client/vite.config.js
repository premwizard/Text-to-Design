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
      '/stream-jsx': { target: 'https://text-to-design.onrender.com', changeOrigin: true },
      '/save-files': { target: 'https://text-to-design.onrender.com', changeOrigin: true },
      '/fix-jsx': { target: 'https://text-to-design.onrender.com', changeOrigin: true },
      '/generate-ui': { target: 'https://text-to-design.onrender.com', changeOrigin: true },
      '/health': { target: 'https://text-to-design.onrender.com', changeOrigin: true },
      '/preview': { target: 'https://text-to-design.onrender.com', changeOrigin: true },
      '/dist': { target: 'https://text-to-design.onrender.com', changeOrigin: true },
    },
  },
})


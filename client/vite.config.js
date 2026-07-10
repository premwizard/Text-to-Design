import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const baseUrl = (env.VITE_API_BASE_URL || '').replace(/\/$/, '')
  const backendTarget = baseUrl && baseUrl !== 'https://text-to-design.onrender.com'
    ? env.VITE_API_BASE_URL
    : 'http://127.0.0.1:8000'

  return {
    plugins: [react()],
    // Allow raw import of .html files (used for sandbox.html?raw)
    assetsInclude: [],
    server: {
      port: 5173,
      strictPort: false,
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin'
      },
      proxy: {
        '/stream-jsx': { target: backendTarget, changeOrigin: true },
        '/user-memory': { target: backendTarget, changeOrigin: true },
        '/save-files': { target: backendTarget, changeOrigin: true },
        '/fix-jsx': { target: backendTarget, changeOrigin: true },
        '/generate-ui': { target: backendTarget, changeOrigin: true },
        '/health': { target: backendTarget, changeOrigin: true },
        '/preview': { target: backendTarget, changeOrigin: true },
        '/dist': { target: backendTarget, changeOrigin: true },
        '/screenshots': { target: backendTarget, changeOrigin: true },
        '/edit-ui': { target: backendTarget, changeOrigin: true },
        '/edit-history': { target: backendTarget, changeOrigin: true },
        '/log-debug-event': { target: backendTarget, changeOrigin: true },
        '/adk-metrics': { target: backendTarget, changeOrigin: true },
      },
    },
  }
})



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/preview/',
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  }
})

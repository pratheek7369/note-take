import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy login requests to avoid CORS issues during development
      '/login': {
        target: 'https://apis.ccbp.in',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    // Same-origin in dev so HttpOnly session cookies just work. Local api: ~/booksbee/api.
    proxy: { '/v1': 'http://localhost:3000' },
  },
  test: { name: 'portal', environment: 'jsdom' },
})

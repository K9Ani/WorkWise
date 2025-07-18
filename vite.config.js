// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,              // ← allows external access (very important)
    port: 5173,              // ← make sure this matches your local server port
    strictPort: true,        // ← don't allow fallback to a different port
    allowedHosts: 'all',     // ← allow all external hosts like ngrok
    cors: true,              // ← allow cross-origin requests (optional)
  }
})

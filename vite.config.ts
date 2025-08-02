import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This makes the server accessible via network IP, which can help `vercel dev`
    // detect it successfully in some network configurations, avoiding timeout errors.
    host: true,
  }
})

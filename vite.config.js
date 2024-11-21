import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/", // Set base path
  server: {
    historyApiFallback: true, // Handle client-side routing
  },
  build: {
    outDir: "dist", // Ensure Vercel output directory
    sourcemap: true, // Debugging support
  },
})

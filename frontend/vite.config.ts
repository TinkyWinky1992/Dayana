import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Enable HMR with overlay
    hmr: {
      overlay: true,
      protocol: 'ws',
      host: 'localhost',
      port: 24678,
    },
    // Watch for changes in these directories
    watch: {
      usePolling: true, // Better for Windows systems
      interval: 100, // Check for changes every 100ms
    },
    // Open browser automatically
    open: true,
    // Enable gzip compression for better performance
    cors: true,
    // Host settings for network access
    host: true,
  },
  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    force: true, // Force dependency pre-bundling
  },
  // Better error handling
  build: {
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Improve build performance
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})

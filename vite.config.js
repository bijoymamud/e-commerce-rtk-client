import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', '@reduxjs/toolkit'],
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});

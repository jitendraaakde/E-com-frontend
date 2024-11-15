import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://e-comm-backend-ugos.onrender.com',  // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

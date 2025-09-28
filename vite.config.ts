import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'video-components': ['./src/components/VideoPlayer', './src/components/VideoThumbnail'],
            'gallery-components': ['./src/components/VirtualGrid', './src/components/GalleryItem'],
            'vendor': ['react', 'react-dom', 'framer-motion'],
          },
        },
      },
    },
    server: {
      fs: {
        allow: ['..'],
      },
    },
  };
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Fix: In ES modules, __dirname is not defined globally. We define it using import.meta.url.
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        background: resolve(__dirname, 'background.ts'),
        content: resolve(__dirname, 'content_script.tsx'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'background' || chunkInfo.name === 'content' 
            ? '[name].js' 
            : 'assets/[name]-[hash].js';
        }
      }
    }
  }
});
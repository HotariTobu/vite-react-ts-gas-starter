import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { globSync } from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'src'),
  publicDir: path.resolve(__dirname, 'public'),

  build: {
    rollupOptions: {
      input: globSync(path.resolve(__dirname, 'src/*/index.html')),
    },

    copyPublicDir: false,

    emptyOutDir: false,
    outDir: path.resolve(__dirname, 'dest'),
  },
})

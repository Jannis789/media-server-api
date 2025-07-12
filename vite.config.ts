import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: 'src',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {},
    },
  },
})

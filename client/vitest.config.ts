/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom', // ← fixes "document is not defined"
    globals: true,
    deps: {
      inline: ['vuetify'],
    },
  },
  ssr: {
    noExternal: [
      /^vuetify/,   // prevent vuetify from being externalized
      /\.css$/,     // allow importing .css files
    ],
  },
})

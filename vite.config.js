import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssests: ['favicon.ico', 'logo192.png', 'logo512.png'],
  manifest: {
    name: 'القرآن الکریم - عربی مع اردو ترجمہ',
    short_name: 'القرآن',
    description: 'القرآن الکریم - 30 پارے، مکمل عربی مع اردو ترجمہ متن',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon'
      },
      {
        src: '/logo192.png',
        type: 'image/png',
        sizes: '192x192'
      },
      {
        src: '/logo512.png',
        type: 'image/png',
        sizes: '512x512'
      }
    ],
    start_url: '/',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff'
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
})
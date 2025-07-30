import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxt/devtools',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      }
    ],
  ],
  imports: {
    dirs: ['stores']
  },
  googleFonts: {
    families: {
      Montserrat: true
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'vi', iso: 'vi-VN', name: 'Tiếng Việt', file: 'vi.json' },
    ],
    defaultLocale: 'en',
  },
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error']
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['./app/assets/css/main.css'],
})

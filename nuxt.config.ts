// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: "vercel",
  },
  experimental: {
    payloadExtraction: false,
  },
  modules: [
    "@nuxt/content",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@tailwindcss/vite",
    "@nuxtjs/i18n",
    "@nuxt/image",
  ],
  css: ["~/assets/styles/main.css"],
  plugins: [],
  i18n: {
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "fr", name: "Français", file: "fr.json" },
    ],
    langDir: "locales",
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
    strategy: "no_prefix",
  },

  image: {
    dir: "public",
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    format: ["webp", "avif", "png"],
  },

  app: {
    head: {
      title: "Portfolio v2",
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  build: {
    transpile: [],
  },
  vite: {},
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: "vercel", // "vercel" or "node-server"
    // static: true
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
    restructureDir: "i18n",
    langDir: "locales",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "fr", name: "Français", file: "fr.json" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    detectBrowserLanguage: false,
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
    provider: "ipx",
  },
  app: {
    head: {
      title: "Portfolio - Aureldev",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  runtimeConfig: {
    resendApiKey: "",
    upstashRedisUrl: "",
    upstashRedisToken: "",
  },
  routeRules: {
    "/**": {
      headers: {
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      appLayout: "index-header",
      prerender: true
    },
  },
  build: {
    transpile: [],
  },
  vite: {
    logLevel: "warn",
    optimizeDeps: {
      include: ["zod"],
    },
  },
  devtools: { enabled: false },
  compatibilityDate: "latest",
});

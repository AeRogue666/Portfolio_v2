const securityHeaders = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

export default defineNuxtConfig({
  ssr: true,
  modules: [
    "@nuxt/content",
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@tailwindcss/vite",
  ],
  nitro: {
    preset: "vercel",
  },
  css: ["~/assets/styles/main.css"],
  plugins: ["~/dayjs_client.ts"],
  i18n: {
    restructureDir: "i18n",
    langDir: "locales",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "fr", name: "Français", file: "fr.json" },
    ],
    defaultLocale: "fr",
    strategy: "no_prefix",
    detectBrowserLanguage: false,
  },
  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      avatar: 160,
      avatar2x: 320,
      hero: 1920,
    },
    domains: ["github.com", "avatars.githubusercontent.com"],
  },
  app: {
    head: {
      title: "CodeKorico",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  runtimeConfig: {
    resendApiKey: ""
  },
  routeRules: {
    "/": {
      headers: securityHeaders,
      appLayout: "index-header",
    },
    "/feed": {
      headers: securityHeaders,
      appLayout: "feed-header",
    },
    "/**": {
      headers: securityHeaders,
      appLayout: "default",
    },
  },
  site: {
    url: "https://codekorico.com",
    name: "CodeKorico",
  },
  build: {
    transpile: [],
  },
  vite: {
    logLevel: "warn",
    optimizeDeps: {
      include: [
        "@vueuse/core",
        "@vueuse/integrations/useFocusTrap",
        "dayjs",
        "dayjs/locale/fr",
        "dayjs/locale/en",
        "zod",
      ],
    },
  },
  devtools: { enabled: false },
  compatibilityDate: "latest",
});

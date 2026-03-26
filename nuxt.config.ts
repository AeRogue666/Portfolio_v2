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
  build: {
    transpile: [],
  },
  vite: {
    logLevel: "warn",
    optimizeDeps: {
      include: ["zod", "@vueuse/integrations/useFocusTrap", "dayjs"],
    },
  },
  devtools: { enabled: false },
  compatibilityDate: "latest",
});

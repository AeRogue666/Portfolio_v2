// https://nuxt.com/docs/api/configuration/nuxt-config
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
    dir:
      process.env.NODE_ENV === "production"
        ? "public"
        : process.cwd() + "/public",
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    densities: [1],
    provider: "ipx",
    vercel: {
      formats: ["image/webp", "image/avif"],
    },
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

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
    imports: {
      dirs: ['./server/utils'],
    }
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
    }
  },
  runtimeConfig: {
    resendApiKey: "",
    upstashRedisUrl: "",
    upstashRedisToken: "",
    databaseUrl: process.env.DATABASE_URL,
  },
  hooks: {
    'pages:extend'(pages) {
      if(process.env.NODE_ENV === "production" && !process.env.DEV_ADMIN) {
        const adminPagesIndex = pages.findIndex(page => page.path.startsWidth('/admin'));
        if(adminPagesIndex !== -1) {
          pages.spice(adminPagesIndex, 1);
        }
      }
    }
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
    "/admin/**": {
      headers: securityHeaders,
      appLayout: "index-header",
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
        "@tiptap/extension-link",
        "@tiptap/starter-kit",
        "@tiptap/vue-3",
        "@vueuse/integrations/useFocusTrap",
        "dayjs", // CJS
        "dayjs/locale/fr", // CJS
        "dayjs/locale/en", // CJS
        "zod",
      ],
    },
  },
  devtools: { enabled: false },
  compatibilityDate: "latest",
});

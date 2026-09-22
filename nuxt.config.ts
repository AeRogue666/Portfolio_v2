export default defineNuxtConfig({
  ssr: true,
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxt/content",
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@tailwindcss/vite",
    "nuxt-security",
    "nuxt-schema-org",
  ],
  content: {
    experimental: {
      nativeSqlite: true
    },
  },
  nitro: {
    preset: "vercel",
    /* prerender: {
      routes: ['/']
    } */
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
    resendApiKey: "",
  },
  routeRules: {
    "/": {
      appLayout: "index-header",
    },
    "/feed": {
      appLayout: "feed-header",
    },
    "/**": {
      appLayout: "default",
    },
  },
  site: {
    url: "https://codekorico.com",
    name: "CodeKorico",
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      crossOriginOpenerPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'same-origin',
      strictTransportSecurity: {
        maxAge: 31536000, // 1 an (Standard)
        includeSubdomains: true,
        preload: true,
      },
      contentSecurityPolicy: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'strict-dynamic'", "'nonce-{{nonce}}'", "'wasm-unsafe-eval'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'","data:", "https://github.com", "https://avatars.githubusercontent.com"],
        "connect-src": ["'self'"],
        "upgrade-insecure-requests": true,
      },
    },
  },
  robots: {
    disallow: [],
  },
  sitemap: {
    autoLastmod: true,
    exclude: [
      '/**/fr',
      '/**/en'
    ],
    urls: [
      '/about',
      '/accessibility',
      '/clients',
      '/experiments',
      '/legal_notices',
      '/projects',
      '/projects/front-ecommerce-headless',
      '/projects/front-pomodor-timer',
      '/projects/front-weather-aggregator',
      '/projects/plateforme-gestion-recettes',
      '/projects/portfolio-v2',
      '/services/creation-site',
      '/services/refonte-site',
      '/services/optimisation-site',
      '/services/maintenance-site',
      '/services/formations',
      '/terms',
      '/landing/accessibilite-web-ardeche',
    ],
    routingExtensions: {
      '/landing/accessibilite-web-ardeche': {
        changefreq: 'monthly',
        priority: 0.9
      }
    }
  },
  build: {
    transpile: [],
  },
  vite: {
    logLevel: "warn",
    optimizeDeps: {
      include: ["dayjs", "dayjs/locale/fr", "dayjs/locale/en", "zod"],
      exclude: ["better-sqlite3"],
    },
  },
  devtools: { enabled: false },
  compatibilityDate: "latest",
});

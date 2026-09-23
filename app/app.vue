<script setup lang="ts">
const { t, locale, locales } = useI18n();

useSeoMeta({
  ogSiteName: "CodeKorico",
  ogType: 'website',
  twitterCard: 'summary_large_image',
  articleAuthor: ['CodeKorico'],
  ogLocale: 'fr_FR',
  ogLocaleAlternate: 'en_US'
}),
  useHead({
    htmlAttrs: {
      lang: 'fr'
    },
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "CodeKorico",
          "image": "https://codekorico.com",
          "@id": "https://codekorico.com",
          "url": "https://codekorico.com",
          "telephone": "+33743347803",
          "priceRange": "$$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "555 Chemin des Traverses, Pépinière l'Espélidou",
            "addressLocality": "Lachapelle-sous-Aubenas",
            "postalCode": "07200",
            "addressRegion": "Ardèche",
            "addressCountry": "FR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "44.5654",
            "longitude": "4.2852"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
          },
          "sameAs": [
            "https://linkedin.com/in/codekorico",
            "https://github.com/AeRogue666"
          ],
          "knowsAbout": [
            "développement web accessible",
            "accessibilité numérique",
            "eco-conception web",
            "nuxt.js",
            "vue.js",
            "wordpress",
            "shopify",
            "optimisation seo",
            "performance web"
          ],
          "areaServed": [
            {
              "@type": "AdministrativeArea",
              "name": "Ardèche"
            },
            {
              "@type": "AdministrativeArea",
              "name": "Drôme"
            },
            {
              "@type": "AdministrativeArea",
              "name": "Haute-Loire"
            },
            {
              "@type": "Place",
              "name": "Aubenas"
            },
            {
              "@type": "Place",
              "name": "Lachapelle-sous-Aubenas"
            },
            {
              "@type": "Place",
              "name": "Privas"
            },
            {
              "@type": "Place",
              "name": "Annonay"
            },
            {
              "@type": "Place",
              "name": "Vallon-Pont-d'Arc"
            },
            {
              "@type": "Place",
              "name": "Le Teil"
            },
            {
              "@type": "Place",
              "name": "Guilherand-Granges"
            },
            {
              "@type": "Place",
              "name": "Valence"
            },
            {
              "@type": "Place",
              "name": "Montélimar"
            },
            {
              "@type": "Place",
              "name": "Romans-sur-Isère"
            },
            {
              "@type": "Place",
              "name": "Pierrelatte"
            },
            {
              "@type": "Place",
              "name": "Livron-sur-Drôme"
            },
            {
              "@type": "Place",
              "name": "Tournon-sur-Rhône"
            },
            {
              "@type": "Place",
              "name": "Le Puy-en-Velay"
            },
            {
              "@type": "Place",
              "name": "Yssingeaux"
            },
            {
              "@type": "Place",
              "name": "Monistrol-sur-Loire"
            }
          ]
        }
        )
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: `https://codekorico.com/`
      },
      ...locales.value.map((l: { code: string; }) => ({
        rel: 'alternate',
        hreflang: l.code,
        href: `https://codekorico.com/`
      } as const)),
      {
        rel: 'icon',
        type: 'image/png',
        href: `/favicon.png`
      }
    ]
  });

/* useHeadSafe(() => ({
  title: t('seo.home.title'),
  meta: [
    // Meta names
    { name: 'description', content: t('seo.home.description') },
    { name: 'application-name', content: 'CodeKorico' },
    { name: 'twitter:card', content: 'summary_large_image' },
    // Meta properties
    { property: 'og:title', content: t('seo.home.title') },
    { property: 'og:description', content: t('seo.home.description') },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: locale.value },
    { property: 'og:url', content: 'https://codekorico.com' },
    { property: 'og:site:name', content: 'CodeKorico' },
    { property: 'article:author', content: 'Aureldev' },
    { property: 'og:image', content: `/images/logo/logo_${colorMode.value}_1920x1080.png` },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1920' },
    { property: 'og:image:height', content: '1080' },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://codekorico.com/`
    },
    ...locales.value.map((l: { code: string; }) => ({
      rel: 'alternate',
      hreflang: l.code,
      href: `https://codekorico.com/`
    })),
    { 
      rel: 'icon', 
      type: 'image/png', 
      href: `/favicon.png`
     }
  ]
})); */
</script>

<template>
  <UApp>
    <a href="#main-content"
      class="absolute -top-full left-0 sr-only focus:not-sr-only focus:top-0 focus:bg-(--bg) focus:text-(--text) focus:py-2 focus:px-4 focus:z-50">
      {{ t('header.skip_content') }}
    </a>
    <NuxtAnnouncer />
    <NuxtRouteAnnouncer />
    <NuxtLayout />
  </UApp>
</template>
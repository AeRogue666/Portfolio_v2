<script setup lang="ts">
const { t, locale, locales } = useI18n();
const colorMode = useColorMode();

useHeadSafe(() => ({
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
    ...locales.value.map((l: { code: any; }) => ({
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
}));
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
<script setup lang="ts">
const { t, locale, locales } = useI18n();

useHeadSafe(() => ({
  title: t('seo.home.title'),
  meta: [
    // Meta names
    { name: 'description', content: t('seo.home.description') },
    { name: 'application-name', content: 'Aureldev' },
    { name: 'twitter:card', content: 'summary_large_image' },
    // Meta properties
    { property: 'og:title', content: t('seo.home.title') },
    { property: 'og:description', content: t('seo.home.description') },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: locale.value },
    { property: 'og:url', content: 'https://aureldev.com' },
    { property: 'og:site:name', content: 'Aureldev' },
    { property: 'article:author', content: 'Aureldev' },
    { property: 'og:image', content: '/images/logo/AurelDev_logo_fond_violet_texte_blanc.png' },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1920' },
    { property: 'og:image:height', content: '1080' },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://aureldev.com/`
    },
    ...locales.value.map(l => ({
      rel: 'alternate',
      hreflang: l.code,
      href: `https://aureldev.com/`
    }))
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
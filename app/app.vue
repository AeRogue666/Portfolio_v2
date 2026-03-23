<script setup lang="ts">
const { t } = useI18n();
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
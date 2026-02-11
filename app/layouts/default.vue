<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue';

const { locale } = useI18n();

useHead(() => ({
  htmlAttrs: {
    lang: locale.value
  }
}));
</script>

<template>
  <AppHeader />

  <main id="main-content"> <!-- class="min-h-[calc(100vh-calc(.25rem*16))]" -->
    <NuxtPage />
  </main>
</template>
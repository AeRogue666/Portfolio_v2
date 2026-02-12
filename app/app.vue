<script setup lang="ts">
const accessibilityStore = useAccessibilityStore(),
  { t } = useI18n();

onMounted(() => {
  accessibilityStore.apply();
});
</script>

<template>
  <UApp>
    <a href="#main-content"
      class="absolute -top-full left-0 sr-only focus:top-0 focus:bg-(--bg-primary) focus:text-(--text-primary) focus:py-2 focus:px-4 focus:z-50">
      {{ t('header.skip_content') }}
    </a>

    <NuxtLayout />
  </UApp>
</template>
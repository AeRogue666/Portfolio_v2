<script setup lang="ts">
import IconButton from '../ui/IconButton.vue';
import SidebarLeftMobile from './SidebarLeftMobile.vue';
import SidebarRight from './SidebarRight.vue';

const { t } = useI18n(),
  accessibilityStore = useAccessibilityStore(),
  colorMode = useColorMode();

const grayscale = computed(() => accessibilityStore.grayscale);
const isCollapsed = useState('sidebar-collapsed');
// const src = computed(() => `/images/logo/logo_${colorMode.value == 'system' ? 'light' : colorMode.value}_no_bg_1500x500.png`);
</script>

<template>
  <UHeader toggle-side="left"
    class="flex items-center w-full h-24 bg-(--bg) gap-2 p-4 border-b border-(--border-medium) relative z-50" :ui="{
      container: 'max-w-none mx-6'
    }">
    <template #toggle>
      <!-- BOUTON MOBILE -->
      <SidebarLeftMobile />
    </template>

    <template #left>
      <!-- BOUTON DESKTOP -->
      <IconButton id="button-sidebarleft-desktop" :variant="'ghost'" :color="'neutral'" :icon="'fa7-solid:bars'"
        :size="'size-10'" :label="t('sidebar-left.open')" class="hidden lg:flex size-10" tabindex="0"
        @click="isCollapsed = !isCollapsed" />

      <UContainer>
        <NuxtLink to="/" tabindex="0" :aria-label="t('header.span_title')"
          class="relative w-max flex gap-1.5 focus:outline-none focus-visible:outline-none hover:text-highlighted rounded-lg px-2 py-1">
          <UColorModeImage light="/images/logo/logo_light_300x100.png" dark="/images/logo/logo_dark_300x100.png" width="150" height="50" sizes="150px" densities="x1 x2" fetchpriority="high" alt="" aria-hidden="true" :class="grayscale ? 'grayscale-100' : ''" />
        </NuxtLink>
      </UContainer>
    </template>

    <template #right>
      <SidebarRight />
    </template>
  </UHeader>
</template>
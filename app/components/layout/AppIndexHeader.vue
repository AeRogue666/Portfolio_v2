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

            <UContainer class="hidden md:flex">
                <NuxtLink to="/" aria-describedby="header-title" tabindex="0">
                    <span id="header-title" class="fs-hero font-bold lg:text-center text-(--text) mb-3 sr-only">
                        {{ t('header.span_title') }}
                    </span>
                    <NuxtImg id="header-title-img-light" :src="'/images/logo/logo_light_1920x1080.png'"
                        alt="CodeKorico Logo" width="150" height="50" sizes="xs:100vw sm:100vw md:80vw lg:16rem"
                        :class="grayscale ? 'grayscale-100' : ''" class="dark:hidden" loading="lazy" />
                    <NuxtImg id="header-title-img-dark"
                        :src="grayscale ? '/images/logo/logo_light_1920x1080.png' : '/images/logo/logo_dark_1920x1080.png'"
                        alt="CodeKorico Logo" width="150" height="50" sizes="xs:100vw sm:100vw md:80vw lg:16rem"
                        :class="grayscale ? 'grayscale-100' : ''" class="hidden dark:block" loading="lazy" />
                </NuxtLink>
            </UContainer>
        </template>

        <template #right>
            <SidebarRight />
        </template>
    </UHeader>
</template>
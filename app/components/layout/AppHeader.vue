<script setup lang="ts">
import IconButton from '../ui/IconButton.vue';
import SearchBarDrawer from './organisms/SearchBarDrawer.vue';
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
            <SidebarLeftMobile />
        </template>

        <template #left>
            <IconButton id="button-sidebarleft-desktop" :variant="'ghost'" :color="'neutral'" :icon="'fa7-solid:bars'"
                :size="'size-10'" :label="t('sidebar-left.open')" class="hidden lg:flex size-10" tabindex="0"
                @click="isCollapsed = !isCollapsed" />

            <UContainer>
                <NuxtLink to="/" tabindex="0" :aria-label="t('header.span_title')" clas="relative w-max flex gap-1.5 focus:outline-none focus-visible:outline-none hover:text-highlighted rounded-lg px-2 py-1">
                    <NuxtImg id="header-title-img-light" :src="'/images/logo/logo_light_1920x1080.png'"
                        alt="" aria-hidden="true" width="150" height="50" sizes="xs:100vw sm:100vw md:80vw lg:16rem"
                        :class="grayscale ? 'grayscale-100' : ''" class="dark:hidden" fetchpriority="high" />
                    <NuxtImg id="header-title-img-dark"
                        :src="grayscale ? '/images/logo/logo_light_1920x1080.png' : '/images/logo/logo_dark_1920x1080.png'"
                        alt="" aria-hidden="true" width="150" height="50" sizes="xs:100vw sm:100vw md:80vw lg:16rem"
                        :class="grayscale ? 'grayscale-100' : ''" class="hidden dark:block" fetchpriority="high" />
                </NuxtLink>
            </UContainer>
        </template>

        <template #right>
            <SearchBarDrawer />

            <SidebarRight />
        </template>
    </UHeader>
</template>
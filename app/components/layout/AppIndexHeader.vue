<script setup lang="ts">
import SidebarLeft from './SidebarLeft.vue';
import SidebarRight from './SidebarRight.vue';

const { t } = useI18n();
const colorMode = useColorMode();
const src = computed(() => colorMode.value == 'system'
    ? `/images/logo/logo_favicon_dark.png`
    : `/images/logo/logo_favicon_${colorMode.value}.png`
);
</script>

<template>
    <UHeader toggle-side="left"
        class="flex items-center w-full h-full bg-(--bg) gap-2 p-4 border-b border-(--border-medium) relative z-50" :ui="{
            container: 'max-w-none mx-6'
        }">
        <template #toggle>
            <SidebarLeft />
        </template>

        <template #left>
            <UContainer class="hidden md:flex">
                <NuxtLink to="/" aria-describedby="header-title">
                    <span id="header-title" class="fs-hero font-bold lg:text-center text-(--text) mb-3 sr-only">
                        {{ t('header.span_title') }}
                    </span>
                    <NuxtImg id="header-title" :src="src" alt="" width="165" height="24"
                        sizes="xs:100vw sm:100vw md:80vw lg:16rem" loading="lazy" />
                </NuxtLink>
            </UContainer>
        </template>

        <template #right>
            <SidebarRight />
        </template>
    </UHeader>
</template>
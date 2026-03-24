<script setup lang="ts">
import SearchBarDrawer from './organisms/SearchBarDrawer.vue';
import SidebarLeft from './SidebarLeft.vue';
import SidebarRight from './SidebarRight.vue';

const { t } = useI18n();
// useSidebarFocusState();
</script>

<template>
    <header class="flex items-center w-full h-full gap-2 p-4 border-b relative z-50">
        <UContainer
            class="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">

            <SidebarLeft />

            <UContainer class="hidden lg:flex">
                <NuxtLink to="/" aria-describedby="header-title">
                    <span id="header-title" class="fs-title font-bold lg:text-center text-(--text) mb-3">
                        {{ t('header.span_title') }}
                    </span>
                </NuxtLink>
            </UContainer>

            <SearchBarDrawer />

            <SidebarRight />
        </UContainer>
    </header>
</template>
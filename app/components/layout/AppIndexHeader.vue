<script setup lang="ts">
import SidebarLeft from './SidebarLeft.vue';
import SidebarRight from './SidebarRight.vue';

const { t } = useI18n();
useSidebarFocusState();
</script>

<template>
    <UHeader toggle-side="left"
        class="flex items-center w-full h-full bg-(--bg) gap-2 p-4 border-b border-(--border-medium) relative z-50">
        <template #toggle>
            <SidebarLeft />
        </template>

        <template #left>
            <UContainer class="hidden lg:flex">
                <NuxtLink to="/" aria-describedby="header-title">
                    <span id="header-title" class="fs-hero font-bold lg:text-center text-(--text) mb-3">
                        {{ t('header.span_title') }}
                    </span>
                </NuxtLink>
            </UContainer>
        </template>

        <template #right>
            <SidebarRight />
        </template>
    </UHeader>
</template>
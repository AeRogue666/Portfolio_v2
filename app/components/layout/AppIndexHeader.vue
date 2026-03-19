<script setup lang="ts">
import SidebarLeftMobile from './SidebarLeftMobile.vue';
import SidebarRight from './SidebarRight.vue';

const { t } = useI18n();
</script>

<template>
    <header class="flex items-center w-full h-full gap-2 p-4 border-b relative z-50">
        <UContainer
            class="w-full h-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">

            <!-- DESKTOP ONLY -->
            <div class="hidden lg:block">

            </div>

            <!-- MOBILE ONLY -->
            <div class="lg:hidden">
                <SidebarLeftMobile />
            </div>

            <UContainer data-slot="center" class="hidden lg:flex">
                <NuxtLink to="/" aria-describedby="header-title">
                    <span id="header-title" class="text-2xl font-bold lg:text-center text-(--text) mb-3"
                        style="font-size: clamp(1.5rem, var(--step-5), 4rem);">
                        {{ t('header.span_title') }}
                    </span>
                </NuxtLink>
            </UContainer>

            <!-- DESKTOP AND MOBILE -->
            <SidebarRight />
        </UContainer>
    </header>
</template>
<script setup lang="ts">
import SidebarLeftMobile from './SidebarLeftMobile.vue';
import SidebarRightDesktop from './SidebarRightDesktop.vue';
import SidebarRightMobile from './SidebarRightMobile.vue';

const { t } = useI18n();
</script>

<template>
    <header class="flex items-center w-full h-full gap-2 p-4 border-b relative z-50">
        <UContainer
            class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full">

            <!-- DESKTOP ONLY -->
            <div class="hidden lg:block">
                
            </div>

            <!-- MOBILE ONLY -->
            <div class="lg:hidden">
                <SidebarLeftMobile />
            </div>

            <UContainer data-slot="center" class="hidden lg:flex">
                <NuxtLink to="/" aria-describedby="header-title">
                    <span id="header-title" class="text-xl font-bold">{{ t('header.span_title') }}</span>
                </NuxtLink>
            </UContainer>

            <!-- DESKTOP ONLY -->
            <div class="hidden lg:block">
                <SidebarRightDesktop />
            </div>

            <!-- MOBILE ONLY -->
            <div class="lg:hidden">
                <SidebarRightMobile />
            </div>
        </UContainer>
    </header>
</template>
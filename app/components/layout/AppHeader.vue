<script setup lang="ts">
import { capitalize } from 'vue';
import SidebarLeftMobile from './SidebarLeftMobile.vue';
import SidebarRightMobile from './SidebarRightMobile.vue';

const { t } = useI18n();
</script>

<template>
    <header class="flex items-center w-full h-full gap-2 p-4 border-b relative z-50">
        <UContainer
            class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full">

            <!-- MOBILE ONLY -->
            <div class="lg:hidden">
                <SidebarLeftMobile data-slot="left" />
            </div>

            <UContainer data-slot="center" class="hidden lg:flex">
                <NuxtLink to="/" aria-describedby="#header_title">
                    <span id="header_title" class="text-xl font-bold">{{ capitalize(t('header.span_title')) }}</span>
                </NuxtLink>
            </UContainer>

            <!-- MOBILE ONLY -->
            <div class="lg:hidden">
                <SidebarRightMobile data-slot="right" />
            </div>
        </UContainer>
    </header>
</template>
<script setup lang="ts">
import SidebarLeftDesktop from "~/components/layout/SidebarLeftDesktop.vue";
import SidebarRightDesktop from "~/components/layout/SidebarRightDesktop.vue";
import AppHeader from "../components/layout/AppHeader.vue";
import IconButton from "~/components/ui/IconButton.vue";

const { locale } = useI18n();

const leftOpen = ref(true),
    rightOpen = ref(false);

useHead(() => ({
    htmlAttrs: {
        lang: locale.value
    }
}));
</script>

<template>
    <AppHeader />

    <div class="min-h-screen">

        <!-- Desktop -->
        <div class="hidden lg:grid w-full gap-6 px-6 transition-[grid-template-columns] duration-300" :class="{
            'grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)_18rem]': leftOpen && rightOpen,
            'grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]': leftOpen && !rightOpen,
            'grid-cols-[minmax(0,1fr)_18rem]': !leftOpen && rightOpen,
            'grid-cols-1': !leftOpen && !rightOpen
        }">

            <SidebarLeftDesktop v-if="leftOpen" @close="leftOpen = false" />

            <!-- Main feed -->
            <div class="relative min-w-0">
                <!-- Reopen Left Sidebar -->
                <IconButton v-if="!leftOpen" :variant="'ghost'" :color="'neutral'" :icon="'fa7-solid:chevron-right'"
                    :size="'3xl'" :label="$t('sidebar-left.open')" id="button-sidebarleft-open"
                    class="absolute left-0 top-6 -translate-x-full opacity-50 hover:opacity-100" @click="leftOpen = true" />

                <!-- Reopen Right Sidebar -->
                <IconButton v-if="!rightOpen" :variant="'ghost'" :color="'neutral'" :icon="'fa7-solid:chevron-left'"
                    :size="'3xl'" :label="$t('sidebar-right.open')" id="button-sidebarright-open"
                    class="absolute right-0 top-6 translate-x-full opacity-50 hover:opacity-100" @click="rightOpen = true" />

                <!-- FEED CONTAINER -->
                <main class="w-full max-w-5xl mx-auto px-4" id="main-content" style="font-size: var(--step--1);">
                    <NuxtPage />
                </main>
            </div>
            
            <SidebarRightDesktop v-if="rightOpen" @close="rightOpen = false" />
        </div>

        <!-- Mobile / Tablet -->
        <main class="lg:hidden px-4" id="main-content">
            <NuxtPage />
        </main>
    </div>
</template>
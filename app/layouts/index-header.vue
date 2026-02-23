<script setup lang="ts">
import SidebarLeftDesktop from "@/components/layout/SidebarLeftDesktop.vue";
import SidebarRightDesktop from "@/components/layout/SidebarRightDesktop.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import IconButton from "@/components/ui/IconButton.vue";

const { locale } = useI18n();

const leftOpen = ref(true);
const rightOpen = ref(false);

const leftOpenCount = ref(0);

function openLeft() {
    leftOpen.value = true
    leftOpenCount.value++

    console.log(leftOpen.value, leftOpenCount.value)
}

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
        <div ref="gridRef" class="hidden lg:grid w-full gap-6 px-6 transition-[grid-template-columns] duration-300" :class="{
            'grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)_18rem]': leftOpen && rightOpen,
            'grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]': leftOpen && !rightOpen,
            'grid-cols-[minmax(0,1fr)_18rem]': !leftOpen && rightOpen,
            'grid-cols-1': !leftOpen && !rightOpen
        }">

            <!-- Left Sidebar -->
            <SidebarLeftDesktop v-if="leftOpen" :is-first-mount="leftOpenCount === 0" @close="leftOpen = false" />

            <!-- Main content -->
            <div class="relative min-w-0">
                <!-- Reopen Left Sidebar -->
                <IconButton v-if="!leftOpen" id="button-sidebarleft-open" :variant="'ghost'" :color="'neutral'"
                    :icon="'fa7-solid:chevron-right'" :size="'3xl'" :label="$t('sidebar-left.open')"
                    class="absolute left-6 top-6 -translate-x-full opacity-50 hover:opacity-100"
                    @click="openLeft" />

                <!-- Reopen Right Sidebar -->
                <IconButton v-if="!rightOpen" id="button-sidebarright-open" :variant="'ghost'" :color="'neutral'"
                    :icon="'fa7-solid:chevron-left'" :size="'3xl'" :label="$t('sidebar-right.open')"
                    class="absolute right-6 top-6 translate-x-full opacity-50 hover:opacity-100"
                    @click="rightOpen = true" />

                <!-- FEED CONTAINER -->
                <main ref="mainRef" id="main-content" class="w-full max-w-5xl mx-auto px-4"
                    style="font-size: var(--step--1);">
                    <NuxtPage />
                </main>
            </div>

            <!-- Right Sidebar -->
            <SidebarRightDesktop v-if="rightOpen" @close="rightOpen = false" />
        </div>

        <!-- Mobile / Tablet -->
        <main class="lg:hidden px-4" id="main-content">
            <NuxtPage />
        </main>
    </div>
</template>
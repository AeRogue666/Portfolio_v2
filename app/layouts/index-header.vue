<script setup lang="ts">
import SidebarLeftDesktop from "@/components/layout/SidebarLeftDesktop.vue";
import AppIndexHeader from "../components/layout/AppIndexHeader.vue";
import IconButton from "@/components/ui/IconButton.vue";

const { t, locale } = useI18n();

const leftOpen = ref<boolean>(false);

const leftOpenCount = ref(0);

function openLeft() {
    requestAnimationFrame(() => {
        leftOpen.value = true;
        leftOpenCount.value++;
    });
}

watch(() => leftOpen, async (newVal) => {
    if (!newVal) {
        await nextTick();
    }
});

useHead(() => ({
    htmlAttrs: {
        lang: locale.value
    }
}));
</script>

<template>
    <AppIndexHeader />

    <div class="min-h-screen">
        <!-- Desktop -->
        <div ref="gridRef"
            class="hidden lg:grid w-full gap-6 px-6 transition-[grid-template-columns] duration-300 will-change-auto"
            :class="{
                'grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]': leftOpen,
                'grid-cols-1': !leftOpen
                // 'grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)_18rem]': leftOpen && rightOpen,
                // 'grid-cols-[minmax(0,1fr)_18rem]': !leftOpen && rightOpen,
                
            }">

            <!-- Left Sidebar -->
            <SidebarLeftDesktop v-if="leftOpen" :is-first-mount="leftOpenCount === 0" @close="leftOpen = false" />

            <!-- Main content -->
            <div class="relative min-w-0">
                <!-- Reopen Left Sidebar -->
                <IconButton v-if="!leftOpen" id="button-sidebarleft-open" :variant="'ghost'" :color="'neutral'"
                    :icon="'fa7-solid:chevron-right'" :size="'3xl'" :label="$t('sidebar-left.open')"
                    class="text-3xl text-(length:--step-2) absolute left-6 top-6 -translate-x-full opacity-50 hover:opacity-100 focus:opacity-100 z-50"
                    @click="openLeft" />

                <!-- FEED CONTAINER -->
                <main ref="mainRef" id="main-content" tabindex="-1" aria-labelledby="feed-title"
                    class="w-full max-w-auto mx-auto" style="font-size: var(--step--1);">
                    <h1 id="feed-title" class="text-2xl font-semibold tracking-tight leading-snug sr-only"
                        style="font-size: var(--step-3);">{{ t('feed.title') }}</h1>
                    <NuxtPage />
                </main>
            </div>
        </div>

        <!-- Mobile / Tablet -->
        <main class="lg:hidden" id="main-content" tabindex="-1" aria-labelledby="feed-title"> <!-- class="min-h-[calc(100vh-calc(.25rem*16))]" -->
            <NuxtPage />
        </main>
    </div>
</template>
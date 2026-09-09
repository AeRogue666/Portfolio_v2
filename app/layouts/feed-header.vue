<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import SidebarLeftDesktop from "../components/layout/SidebarLeftDesktop.vue";

const { t, locale } = useI18n();

useHead(() => ({
    htmlAttrs: {
        lang: locale.value
    }
}));
</script>

<template>
    <div class="min-h-screen flex flex-col bg-(--bg)">
        <AppHeader />

        <div class="flex flex-1 lg:overflow-hidden">
            <SidebarLeftDesktop class="shrink-0" />
            <div class="flex flex-col w-full overflow-y-auto min-h-0">
                <!-- FEED CONTAINER -->
                <main id="main-content" tabindex="-1" aria-labelledby="feed-title"
                    class="flex-1 w-full h-full max-w-auto mx-auto fs-body">
                    <h1 id="feed-title" class="fs-heading font-semibold tracking-tight leading-snug sr-only">
                        {{ t('feed.title') }}
                    </h1>
                    <NuxtPage />
                </main>
            </div>
        </div>
    </div>
</template>
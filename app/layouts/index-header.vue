<script setup lang="ts">
import AppIndexHeader from "../components/layout/AppIndexHeader.vue";

const { locale } = useI18n();

useHead(() => ({
    htmlAttrs: {
        lang: locale.value
    }
}));
</script>

<template>
    <AppIndexHeader />

    <div class="min-h-screen">
        <div class="relative min-w-0">
            <!-- FEED CONTAINER -->
            <main id="main-content" tabindex="-1" aria-labelledby="feed-title"
                class="w-full max-w-auto mx-auto fs-body">
                <NuxtPage />
            </main>
        </div>
    </div>
</template>
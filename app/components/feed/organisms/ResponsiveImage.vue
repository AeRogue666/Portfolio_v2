<script setup lang="ts">
const props = defineProps<{
    image: {
        alt: string;
        sources: {
            feed?: {
                mobile?: string;
                tablet?: string;
                desktop?: string;
            };
            detail?: {
                mobile?: string;
                tablet?: string;
                desktop?: string;
            };
        };
    };
}>();

const src = props.image.sources.feed?.mobile || props.image.sources.detail?.mobile || '',
    tabletSrc = props.image.sources.feed?.tablet || props.image.sources.detail?.tablet || src,
    desktopSrc = props.image.sources.feed?.desktop || props.image.sources.detail?.desktop || tabletSrc;
</script>

<template>
    <div class="relative overflow-hidden rounded-xl shadow-md">
        <NuxtImg :src="src" :alt="image.alt" width="640" height="360"
            class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" densities="x1"
            loading="lazy" />
        <!-- sizes="xs:100vw sm:100vw md:80vw lg:64rem" -->
        <!-- sizes="(min-width: 80rem) 64rem, (min-width: 64rem) 80vw, 100vw" :srcset="` ${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`" -->
    </div>
</template>

<style lang="css" scoped>
div:hover img {
    transform: scale(1.02);
}
</style>
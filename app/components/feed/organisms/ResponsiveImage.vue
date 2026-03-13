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
        <!-- Simple NuxtImg -->
        <NuxtImg :src="src" :alt="image.alt"
            class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
        <!-- Sizes NuxtImg -->
        <NuxtImg :src="src" :alt="image.alt" sizes="(min-width: 80rem) 64rem, (min-width: 64rem) 80vw, 100vw"
            class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
        <!-- Srcset NuxtImg -->
        <NuxtImg :src="src" :alt="image.alt" :srcset="` ${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`"
            class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
        <!-- Native img -->
        <img :src="src" :alt="image.alt" sizes="(min-width: 80rem) 64rem, (min-width: 64rem) 80vw, 100vw"
            :srcset="` ${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`"
            class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
        <!-- <NuxtImg :src="src" :alt="image.alt" sizes="(min-width: 80rem) 64rem, (min-width: 64rem) 80vw, 100vw"
            :srcset="` ${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`"
            class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" loading="lazy" /> -->
        <span>{{ image }}</span>
    </div>
</template>

<style lang="css" scoped>
div:hover img {
    transform: scale(1.02);
}
</style>
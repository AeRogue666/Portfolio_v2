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
    <NuxtImg :src="src" :alt="image.alt" sizes="(min-width: 80rem) 64rem, (min-width: 64rem) 80vw, 100vw"
        :srcset="` ${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`" class="w-full my-4 rounded-xl"
        loading="lazy" />
</template>
<script setup lang="ts">
const props = defineProps<{
    image: {
        alt: string,
        sources: {
            feed: {
                mobile: string,
                tablet?: string,
                desktop: string,
            },
        }
    }
    preload?: boolean,
}>();

const tabletSrc = props.image.sources.feed.tablet ?? props.image.sources.feed.mobile;
</script>

<template>
    <NuxtImg :src="image.sources.feed.mobile" :alt="image.alt"
        sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 80vw, 37.5rem"
        :srcset="`${image.sources.feed.mobile} 640w, ${tabletSrc} 768w, ${image.sources.feed.desktop} 1024w`"
        class="my-2 rounded-lg" itemprop="image" :loading="preload ?? 'eager'" />
</template>
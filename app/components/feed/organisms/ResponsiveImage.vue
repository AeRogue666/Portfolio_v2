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
    <img :src="image.sources.feed.mobile" :alt="image.alt"
        sizes="(min-width: 80rem) 64rem, (min-width: 64rem) 80vw, 100vw"
        :srcset="`${image.sources.feed.mobile} 640w, ${tabletSrc} 768w, ${image.sources.feed.desktop} 1024w`"
        class="w-full my-4 rounded-xl" />
</template>
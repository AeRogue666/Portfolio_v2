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
/* <NuxtPicture :src="src" :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`" :img-attrs="{
                alt: image?.alt,
                srcset: `${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`,
                sizes: 'sm:100vw md:80vw lg:64rem',
                class: 'my-2 rounded-lg border-2 border-solid border-(--border-subtle)'
            }" :widths="[320, 640, 960, 1280, 1536, 1920]" format="png" placeholder="blur" /> */
/* <picture>
        <source :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`" type="image/png"
            :widths="[320, 640, 960, 1280, 1536, 1920]" />
        <img :src="src" :alt="image?.alt" sizes="sm:100vw md:80vw lg:64rem"
            class="relative overflow-hidden rounded-xl shadow-md border-2 border-solid border-(--border-subtle)" />
    </picture> */
</script>

<template>
    <NuxtImg :src="src" :alt="image.alt" width="1080" height="1350" sizes="xs:100vw sm:100vw md:80vw lg:64rem"
        :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`"
        class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 relative overflow-hidden rounded-xl shadow-md border-2 border-solid border-(--border-subtle)"
        loading="lazy" />
</template>

<style lang="css" scoped>
div:hover img {
    transform: scale(1.02);
}
</style>
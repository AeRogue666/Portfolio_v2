<script setup lang="ts">
const props = defineProps<{
    // Structure des articles du feed
    image?: {
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
    // Structure simple pour Nuxt Content (Markdown / Carrousel)
    title?: string;
    desktop?: string;
    tablet?: string;
    mobile?: string;
    isCarouselItem?: boolean;
    isFirstItem?: boolean;
}>();

const src = computed(() => {
    if (props.image) return props.image.sources.feed?.mobile || props.image.sources.detail?.mobile || ''
    return props.mobile || props.desktop || '';
}),
    tabletSrc = computed(() => {
        if (props.image) return props.image.sources.feed?.tablet || props.image.sources.detail?.tablet || ''
        return props.tablet || props.desktop || src.value;
    }),
    desktopSrc = computed(() => {
        if (props.image) return props.image.sources.feed?.desktop || props.image.sources.detail?.desktop || ''
        return props.desktop || tabletSrc.value;
    }),
    altText = computed(() => {
        if (props.title) return '';
        return props.image?.alt || '';
    });

const imageId = useId();
const isStaticServiceImage = computed(() => !props.image && !props.isCarouselItem);

/* const src = props.image.sources.feed?.mobile || props.image.sources.detail?.mobile || '',
    tabletSrc = props.image.sources.feed?.tablet || props.image.sources.detail?.tablet || src,
    desktopSrc = props.image.sources.feed?.desktop || props.image.sources.detail?.desktop || tabletSrc; */
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
    <!-- MODE STATIC -->
    <figure v-if="isStaticServiceImage"
        class="flex flex-col justify-between items-center text-center w-full h-auto">
        <div class="flex flex-1 justify-center items-center w-full overflow-hidden">
            <NuxtImg :src="src" :alt="altText" :aria-describedby="title ? imageId : undefined" width="1080"
                height="1350" sizes="xs:100vw sm:100vw md:80vw lg:64rem"
                :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`"
                class="w-auto h-full max-w-full my-2 rounded-lg border-2 border-solid border-(--border-subtle) object-contain"
                loading="eager" fetchpriority="high" placeholder="blur" />
        </div>

        <figcaption v-if="title" :id="imageId" class="mt-2 fs-small text-(--text-2) italic shrink-0">
            {{ title }}
        </figcaption>
    </figure>

    <!-- MODE CAROUSEL -->
    <div v-else-if="isCarouselItem" class="flex flex-1 justify-center items-center w-full overflow-hidden">
        <NuxtImg :src="src" :alt="altText" :aria-describedby="title ? imageId : undefined"
            sizes="xs:100vw sm:100vw md:80vw lg:64rem" :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`"
            class="w-full h-auto max-w-full my-2 object-contain transition-transform duration-300 hover:scale-105 relative overflow-hidden rounded-xl shadow-md border-2 border-solid border-(--border-subtle)"
            :loading="isFirstItem ? 'eager' : 'lazy'" :fetchpriority="isFirstItem ? 'high' : 'low'"
            placeholder="blur" />
    </div>

    <!-- MODE ARTICLE -->
    <div v-else
        class="w-full aspect-video overflow-hidden rounded-xl border-2 border-solid border-(--border-subtle) shadow-md">
        <NuxtImg :src="src" :alt="altText" sizes="xs:100vw sm:100vw md:80vw lg:64rem"
            :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`"
            class="w-full h-full object-cover transition-transform duration-300 group-hover/img-container:scale-105"
            loading="lazy" fetchpriority="low" placeholder="blur" />
    </div>
</template>

<style lang="css" scoped>
</style>
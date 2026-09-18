<script setup lang="ts">
import ResponsiveImage from './ResponsiveImage.vue';

interface ServiceImage {
    title: string;
    alt?: string;
    desktop: string;
    tablet: string;
    mobile: string;
}

const props = defineProps<{
    service: ServiceImage[];
}>();

const serviceItems = computed(() =>
    props.service.map((item: { desktop: string; title: string; alt: string; tablet: string; mobile: string; }, index: number) => {
        const desktopPath = item.desktop ?? "";
        return {
            id: `carousel-item-${index}`,
            title: item.title ?? "",
            alt: item.alt ?? "",
            isFirst: index === 0,
            desktop: desktopPath,
            tablet: item.tablet || desktopPath,
            mobile: item.mobile || desktopPath,
        }
    })
);

/* <NuxtImg :src="item.mobile" alt="" :aria-describedby="item.title ? item.id : undefined"
                    sizes="xs:100vw sm:100vw md:80vw lg:64rem"
                    :srcset="`${item.mobile} 640w, ${item.tablet} 768w, ${item.desktop} 1024w`"
                    class="w-full h-auto max-w-full my-2 rounded-lg border-2 border-solid border-(--border-subtle) object-contain"
                    :loading="item.index === 0 ? 'eager' : 'lazy'" :fetchpriority="item.index === 0 ? 'high' : 'low'"
                    placeholder="blur" /> */
</script>

<template>
    <div class="w-full max-w-xl mx-auto my-12 relative group/carousel">
        <UCarousel v-slot="{ item }" class-names arrows dots :autoplay="{ delay: 6000 }" :items="serviceItems"
            class="w-full max-w-xl mx-auto my-10" :ui="{
                item: 'basis-full',
                arrows: 'relative top-[1.5rem] md:static md:top-0',
                prev: 'bg-(--text) text-(--bg) hover:bg-(--text-2) focus-visible:bg-(--text-2) disabled:opacity-30 disabled:bg-(--text) disabled:text-(--bg) transition-all shadow-md',
                next: 'bg-(--text) text-(--bg) hover:bg-(--text-2) focus-visible:bg-(--text-2) disabled:opacity-30 disabled:bg-(--text) disabled:text-(--bg) transition-all shadow-md'
            }">

            <figure class="flex flex-col justify-between items-center w-full h-87.5 md:h-102.5 text-center">
                <ResponsiveImage :desktop="item.desktop" :tablet="item.tablet" :mobile="item.mobile"
                    :is-carousel-item="true" :is-first-item="item.isFirst" />

                <figcaption v-if="item.title" :id="item.id" class="mt-2 fs-small text-(--text-2) italic">
                    {{ item.title }}
                </figcaption>
            </figure>
        </UCarousel>
    </div>
</template>
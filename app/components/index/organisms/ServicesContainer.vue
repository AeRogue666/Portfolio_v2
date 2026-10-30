<script setup lang="ts">
import ResponsiveImage from '~/components/ResponsiveImage.vue';
import type { ServiceResolved } from '~/types/service';

const props = defineProps<{
    services: ServiceResolved[];
}>();

const { t } = useI18n(),
    accessibilityStore = useAccessibilityStore();

const grayscale = computed(() => accessibilityStore.grayscale);
</script>

<template>
    <ul class="flex flex-col w-full max-w-6xl mx-auto px-4 py-12 space-y-0" aria-label="Liste de mes prestations">
        <li v-for="(service, i) in services" :key="i"
            class="flex flex-col lg:flex-row lg:items-center justify-between py-8 border-b border-(--text)/10 group relative transition-all duration-300">
            <div class="w-full md:max-w-[50%] lg:max-w-xl space-y-3 group-has-[a:focus]:text-(--accent)">
                <h3
                    class="!fs-subtitle text-(--text) font-bold tracking-tight transition-colors duration-300 group-hover:text-(--accent)">
                    {{ service.feed_title ?? service.title }}
                </h3>
                <p class="!fs-small text-(--text-2) leading-relaxed">
                    {{ service.feed_summary ?? service.description }}
                </p>
            </div>

            <div class="flex flex-row items-center justify-between md:justify-end flex-1 mt-6 md:mt-0 w-full md:w-auto gap-6 md:gap-8">
                <NuxtLink :to="`/services/${service.slug}`" class="inline-flex items-center px-5 py-2.5 text-(--text-2) font-medium bg-transparent !fs-body border border-(--text)/30 transition-all duration-300 lg:opacity-0 lg:translate-x-4 rounded-lg gap-2 group-hover:opacity-100 group-hover:translate-x-0 focus-visible:opacity-100 focus-visible:translate-x-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) hover:bg-(--text) hover:text-(--bg) hover:border-transparent motion-reduce:lg:translate-x-0" :aria-label="t('index.services_section.learn_more_about', { service: service.accessible_name || (service.title.toLowerCase() ?? service.feed_title?.toLowerCase()) })">
                    {{ t('index.services_section.learn_more') }}
                    <UIcon name="fa7-solid:arrow-right"
                        class="text-sm transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none" />
                </NuxtLink>
            </div>

            <div aria-hidden="true" class="hidden md:block w-48 h-28 md:w-52 md:h-32 lg:w-64 lg:h-36 absolute md:right-[calc(--spacing(52)+4rem)] top-1/2 -translate-y-1/2 pointer-events-none opacity-0 shrink-0 scale-95 transition-all duration-300 ease-out z-0 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-4 group-has-[a:focus]:opacity-100 group-has-[a:focus]:scale-100 group-has-[a:focus]:translate-x-4 motion-reduce:transition-opacity motion-reduce:transform-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-has-[a:focus]:translate-x-0">
                <ResponsiveImage v-if="service.image" :image="service.image" :class="grayscale ? 'grayscale-100' : ''" />
                <div v-else class="w-full h-full bg-(--bg-3) border border-(--text)/5 rounded-xl"></div>
            </div>
        </li>
    </ul>
</template>
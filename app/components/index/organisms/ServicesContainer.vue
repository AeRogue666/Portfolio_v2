<script setup lang="ts">
import type { ServiceResolved } from '~/types/service';

const props = defineProps<{
    services: ServiceResolved[];
    servicePage: boolean;
}>();

const { t } = useI18n(),
    accessibilityStore = useAccessibilityStore();

const grayscale = computed(() => accessibilityStore.grayscale);
const activeIndex = ref<number | null>(0);

function toggleService(index: number) {
    activeIndex.value = activeIndex.value === index ? null : index;
}
</script>

<template>
    <ul class="flex flex-col w-full max-w-6xl mx-auto px-4 py-12 space-y-0" aria-label="Liste de mes prestations">
        <li v-for="(service, i) in services" :key="i" :class="[
            'flex flex-col py-6 border-b border-(--text)/10 relative transition-all duration-500 ease-in-out',
            activeIndex === i ? 'bg-(--text)/5 px-4 rounded-xl border-transparent' : ''
        ]">
            <UButton type="button" variant="ghost" color="neutral" :aria-expanded="activeIndex === i ? 'true' : 'false'"
                :aria-controls="`service-panel-${service.slug}`" @click="toggleService(i)"
                class="group justify-between items-center w-full px-4 py-3 rounded-lg text-(--text) bg-transparent border border-transparent transition-all duration-200 hover:bg-(--text) hover:text-(--bg) active:bg-(--text) active:text-(--bg) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) fs-body shadow-none whitespace-normal text-left gap-4 cursor-pointer">
                <h3 v-if="!servicePage" :id="`${service.slug}-title`"
                    class="fs-subtitle text-inherit font-bold tracking-tight transition-colors duration-300">
                    {{ service.title ?? "" }}
                </h3>
                <h2 v-else :id="`${service.slug}-title`"
                    class="fs-title font-semibold text-inherit leading-snug text-scalable tracking-tight">
                    {{ service.title ?? "" }}
                </h2>

                <UIcon :name="activeIndex === i ? 'fa7-solid:minus' : 'fa7-solid:plus'"
                    class="text-xl text-(--text-muted) group-hover:text-inherit shrink-0 transition-transform duration-300" />
            </UButton>

            <div :id="`service-panel-${service.slug}`" :aria-labelledby="`${service.slug}-title`" :class="[
                'grid transition-all duration-500 ease-in-out',
                activeIndex === i ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
            ]">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 overflow-hidden px-4">
                    <div class="w-full md:max-w-[50%] lg:max-w-xl space-y-3 mt-6">
                        <section v-for="(description, d) in service.description" :key="d" class="flex flex-col gap-6">
                            <h4 v-if="!servicePage" :id="`${service.slug}-title`"
                                class="fs-lead text-inherit font-bold tracking-tight transition-colors duration-300">
                                {{ description.title }}
                            </h4>
                            <h3 v-else :id="`${service.slug}-title`"
                                class="fs-subtitle text-inherit font-bold tracking-tight transition-colors duration-300">
                                {{ description.title }}
                            </h3>

                            <p v-if="description.content" class="fs-body text-(--text-2) leading-relaxed">
                                {{ description.content }}
                            </p>

                            <ul v-for="(child, c) in description.children" :key="c" class="list-dics pl-6">
                                <li class="fs-body text-(--text-2) leading-relaxed list-disc pl-5">
                                    <strong>
                                        {{ child.title }}:
                                    </strong>
                                    <span class="fs-small">{{ child.content }}</span>
                                </li>
                            </ul>
                        </section>

                        <div v-if="service.tags?.length" class="flex flex-wrap pt-2 gap-2">
                            <span v-for="tag in service.tags" :key="tag"
                                class="px-2.5 py-1 fs-small font-medium uppercase tracking-wider bg-(--text)/10 text-(--text-2) rounded-md">
                                {{ tag }}
                            </span>
                        </div>
                    </div>

                    <div
                        class="flex flex-row items-center justify-between md:justify-end flex-1 m-2 lg:mb-6 w-full md:w-auto gap-6 md:gap-8">
                        <NuxtLink :to="`/services/${service.slug}`"
                            class="inline-flex items-center px-5 py-2.5 text-(--text-2) font-medium bg-transparent !fs-body border border-(--text)/30 transition-all duration-300 lg:opacity-0 lg:translate-x-4 rounded-lg gap-2 group-hover:opacity-100 group-hover:translate-x-0 focus-visible:opacity-100 focus-visible:translate-x-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) hover:bg-(--text) hover:text-(--bg) hover:border-transparent motion-reduce:lg:translate-x-0 nav-links"
                            :aria-label="t('index.services_section.learn_more_about', { service: service.accessible_name || (service.title.toLowerCase() ?? service.feed_title?.toLowerCase()) })">
                            {{ t('index.services_section.learn_more') }}
                            <UIcon name="fa7-solid:arrow-right"
                                class="text-sm transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>
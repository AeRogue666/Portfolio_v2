<script setup lang="ts">
import type { ServiceResolved } from '~/types/service';

const props = defineProps<{
    services: ServiceResolved[];
    servicePage: boolean;
}>();

const { t } = useI18n();
const activeIndex = ref<number | null>(0);

function toggleService(index: number) {
    activeIndex.value = activeIndex.value === index ? null : index;
}
function handleEscape(event: KeyboardEvent) {
    activeIndex.value = null;

    const target = event.currentTarget as HTMLElement;
    const button = target.closest('li')?.querySelector('button');
    if (button) {
        (button as HTMLElement).focus();
    }
}
</script>

<template>
    <ul class="flex flex-col w-full max-w-6xl mx-auto px-4 py-12 space-y-0" aria-label="Liste de mes prestations">
        <li v-for="(service, i) in services" :key="i" :class="[
            'flex flex-col py-6 border-b border-(--text)/10 relative transition-all duration-500 ease-in-out',
            activeIndex === i ? 'bg-(--bg) px-4 rounded-xl border-transparent' : ''
        ]">
            <h2 v-if="servicePage" :id="`${service.slug}-title`" class="m-0">
                <UButton type="button" variant="ghost" color="neutral" :id="`service-title-${service.slug}`"
                    :aria-expanded="activeIndex === i ? 'true' : 'false'"
                    :aria-controls="`service-panel-${service.slug}`"
                    class="group justify-between items-center w-full px-4 py-3 rounded-lg text-(--text) bg-transparent border border-transparent transition-all duration-200 hover:bg-(--text) hover:text-(--bg) active:bg-(--text) active:text-(--bg) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) shadow-none whitespace-normal text-left gap-4 cursor-pointer fs-title font-semibold leading-snug text-scalable tracking-tight"
                    @click="toggleService(i)">
                    <span>{{ service.title ?? "" }}</span>
                    <UIcon :name="activeIndex === i ? 'fa7-solid:minus' : 'fa7-solid:plus'"
                        class="text-xl text-(--text-muted) group-hover:text-inherit shrink-0 transition-transform duration-300" />
                </UButton>
            </h2>

            <h3 v-else :id="`${service.slug}-title`" class="m-0">
                <UButton type="button" variant="ghost" color="neutral" :id="`service-title-${service.slug}`"
                    :aria-expanded="activeIndex === i ? 'true' : 'false'"
                    :aria-controls="`service-panel-${service.slug}`"
                    class="group justify-between items-center w-full px-4 py-3 rounded-lg text-(--text) bg-transparent border border-transparent transition-all duration-200 hover:bg-(--text) hover:text-(--bg) active:bg-(--text) active:text-(--bg) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) shadow-none whitespace-normal text-left gap-4 cursor-pointer fs-subtitle font-bold tracking-tight"
                    @click="toggleService(i)">
                    <span>{{ service.title ?? "" }}</span>
                    <UIcon :name="activeIndex === i ? 'fa7-solid:minus' : 'fa7-solid:plus'"
                        class="text-xl text-(--text-muted) group-hover:text-inherit shrink-0 transition-transform duration-300" />
                </UButton>
            </h3>

            <section :id="`service-panel-${service.slug}`" :aria-labelledby="`service-title-${service.slug}`"
                :inert="activeIndex !== i ? true : undefined" :class="[
                    'grid transition-all duration-500 ease-in-out',
                    activeIndex === i ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                ]">
                <article class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 overflow-hidden px-4">
                    <div class="w-full md:max-w-[50%] lg:max-w-xl space-y-6 mt-6 gap-4">
                        <template v-for="(description, d) in service.description" :key="d">
                            <template v-if="description.title">
                                <h3 v-if="servicePage" :id="`service-subtitle-${service.slug}-${d}`"
                                    class="fs-subtitle text-inherit font-bold tracking-tight transition-colors duration-300">
                                    {{ description.title }}
                                </h3>
                                <h4 v-else :id="`service-subtitle-${service.slug}-${d}`"
                                    class="fs-lead text-inherit font-bold tracking-tight transition-colors duration-300">
                                    {{ description.title }}
                                </h4>
                            </template>

                            <p v-if="description.content" class="fs-body text-(--text-2) leading-relaxed">
                                {{ description.content }}
                            </p>

                            <ul v-if="description.children?.length" class="pl-6 space-y-2">
                                <li v-for="(child, c) in description.children" :key="c"
                                    class="fs-body text-(--text-2) leading-relaxed list-disc pl-1">
                                    <strong>
                                        {{ child.title }}:
                                    </strong>
                                    <span class="fs-small">
                                        {{ child.content }}
                                    </span>
                                </li>
                            </ul>
                        </template>

                        <div v-if="service.tags?.length" class="flex flex-wrap pt-2 gap-2">
                            <span v-for="tag in service.tags" :key="tag"
                                class="px-2.5 py-1 fs-small font-medium uppercase tracking-wider bg-(--text)/10 text-(--text-2) rounded-md">
                                {{ tag }}
                            </span>
                        </div>
                    </div>

                    <NuxtLink :to="`/services/${service.slug}`"
                        class="inline-flex items-center self-start lg:self-auto px-5 py-2.5 text-(--text) font-medium bg-transparent fs-body border border-(--text)/30 transition-all duration-300 opacity-100 lg:translate-x-4 rounded-lg gap-2 group-hover:translate-x-0 focus-visible:translate-x-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) hover:bg-(--text) hover:text-(--bg) hover:border-transparent motion-reduce:lg:translate-x-0 nav-links mb-6"
                        :aria-label="t('index.services_section.learn_more_about', { service: service.accessible_name || (service.title.toLowerCase() ?? service.feed_title?.toLowerCase()) })"
                        @keydown.escape="handleEscape">
                        {{ t('index.services_section.learn_more') }}
                        <UIcon name="fa7-solid:arrow-right"
                            class="text-sm transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none" />
                    </NuxtLink>
                </article>
            </section>
        </li>
    </ul>
</template>
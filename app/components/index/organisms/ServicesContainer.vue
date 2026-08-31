<script setup lang="ts">
import type { ServiceResolved } from '~/app/types/service';

const props = defineProps<{
    services: ServiceResolved[];
}>();

const { t } = useI18n();
</script>

<template>
    <UPricingPlans class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mx-auto px-4">
        <UPricingPlan v-for="(service, i) in services" :key="i" v-bind="service" orientation="vertical"
            :title="service.feed_title ?? service.title" :description="service.feed_summary ?? service.description"
            :highlight="service.highlighted"
            class="p-8 rounded-xl border border-(--bg-2) bg-(--bg) shadow-md transition-all duration-300 hover:border-(--accent)/40 group"
            :class="[
                service.highlighted === true
                    ? 'border-(--accent) bg-(--bg-3) shadow-xl ring-2 ring-(--accent)/30 scale-[1.02]'
                    : 'border-(--bg-3) bg-(--card-note-bg) hover:border-(--accent)/40 shadow-sm'
            ]" :ui="{
                root: 'flex flex-col justify-between h-full space-y-4',
                title: '!fs-subtitle text-(--text) font-bold tracking-tight group-hover:text-(--accent) transition-colors whitespace-normal break-words',
                description: '!fs-small text-(--text-2) mt-2 whitespace-normal leading-relaxed',
            }">

            <template #button>
                <div class="flex justify-center mt-auto pt-4">
                    <NuxtLink :to="`/services/${service.slug}`"
                        class="inline-flex items-center px-5 py-2.5 gap-2 rounded-lg border font-medium transition-all duration-200 hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) !fs-body"
                        :class="[
                            service.highlighted === true
                                ? 'bg-(--accent)/60 text-(--text) border-transparent hover:bg-(--text) hover:text-(--bg) shadow-sm'
                                : 'border-(--text)/30 text-(--text-2) hover:bg-(--text) hover:text-(--bg) hover:border-transparent'
                        ]">
                        {{ t('index.services_section.learn_more_button') }}
                        <UIcon name="fa7-solid:arrow-right" class="text-sm transition-transform duration-200 group-hover:translate-x-1" />
                    </NuxtLink>
                </div>
            </template>
        </UPricingPlan>
    </UPricingPlans>
</template>
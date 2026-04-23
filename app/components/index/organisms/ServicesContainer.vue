<script setup lang="ts">
import type { ServiceResolved } from '~/app/types/service';

const props = defineProps<{
    services: ServiceResolved[];
}>();

const { t } = useI18n();
</script>

<template>
    <UPricingPlans>
        <UPricingPlan v-for="(service, i) in services" :key="i" v-bind="service" orientation="vertical"
            :tagline="service.tag" :title="service.feed_title ?? service.title"
            :description="service.feed_summary ?? service.description" :highlight="service.highlighted"
            class="flex flex-col justify-between p-6 rounded-xl border transition-all duration-300 bg-(--card-note-bg)"
            :class="[
                service.highlighted === true
                    ? 'border-(--accent) bg-(--bg-3) scale-105 shadow-lg'
                    : 'border-(--bg-3) bg-(--card-note-bg)'
            ]" :button="{
                label: t('index.services_section.learn_more_button')
            }" :ui="{
                title: 'text-(--text)',
                description: 'text-(--text-2)',
                featureTitle: 'text-(--text-2)'
            }">

            <template #button>
                <NuxtLink :to="`/services/${service.slug}`"
                    class="inline-flex items-center px-5 py-2.5 gap-2 rounded-lg border border-(--accent)/40 text-(--accent) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body">
                    {{ t('index.services_section.learn_more_button') }}
                    <UIcon name="fa7-solid:arrow-right" class="text-sm" />
                </NuxtLink>
            </template>
        </UPricingPlan>
    </UPricingPlans>
</template>
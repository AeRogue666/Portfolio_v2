<script setup lang="ts">
import type { Service } from '~/app/types/service';

const props = defineProps<{
    services: Service[];
}>();

const { t } = useI18n();
</script>

<template>
    <UPricingPlans class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UPricingPlan v-for="service in services" :key="service.slug" orientation="vertical"
            :tagline="service.tag" :title="service.feedTitle ?? service.title"
            :description="service.feedSummary ?? service.description" :highlight="service.highlighted"
            class="flex flex-col justify-between p-6 rounded-xl border transition-all duration-300 bg-(--card-note-bg)"
            :class="[
                service.highlighted === true
                    ? 'border-(--accent) bg-(--bg-3) scale-105 shadow-lg'
                    : 'border-(--bg-3) bg-(--card-note-bg)'
            ]" :button="{
                label: t('index.services_section.learn_more_button')
            }" :ui="{
                title: 'text-(--text)',
                description: 'text-(--text-2) truncate',
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
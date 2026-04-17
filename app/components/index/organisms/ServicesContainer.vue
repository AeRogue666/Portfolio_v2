<script setup lang="ts">
import type { ServiceResolved } from '~/app/types/service';

const props = defineProps<{
    services: ServiceResolved[];
}>();

const { t } = useI18n();
</script>

<template>
    <div class="grid md:grid-cols-3 gap-6 mt-10">
        <div v-for="(service, i) in services" :key="i"
            class="flex flex-col justify-between p-6 rounded-xl border transition-all duration-300" :class="[
                service.highlighted === true
                    ? 'border-(--accent) bg-(--bg-3) scale-105 shadow-lg'
                    : 'border-(--bg-3) bg-(--card-note-bg)'
            ]">
            <div>
                <h2 :id="`${service.slug}-title`"
                    class="font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 fs-title">
                    {{ service.feed_title }}
                </h2>

                <p class="font-normal lg:text-center w-full text-(--text-2) mb-6 sm:px-16 fs-lead">
                    {{ service.feed_summary }}
                </p>

                <span v-if="service.highlighted"
                    class="inline-block fs-small px-3 py-1 rounded-full bg-(--accent)/20 text-(--accent) mb-4">
                    {{ 'Recommandé' }}
                </span>
            </div>

            <NuxtLink :to="`/services/${service.slug}`" class="inline-flex items-center justify-center mt-6 px-5 py-2.5 rounded-lg border border-(--accent)/40 text-(--accent) font-medium hover:bg-(--accent)/10 transition">
                {{ t('index.services_section.learn_more_button') }}
                <UIcon name="fa7-solid:arrow-right" class="ml-2 text-sm" />
            </NuxtLink>
        </div>
    </div>
    <!-- <UPricingPlans>
        <UPricingPlan v-for="(service, i) in services" :key="i" v-bind="service" class="bg-(--card-note-bg)"
            orientation="vertical" :button="{
                label: t('index.plan_section.learn_more_button')
            }" :ui="{
                description: 'text-(--text-3)',
                featureTitle: 'text-(--text-2)'
            }">
            
            <template #button>
                <NuxtLink :to="`/services/${service.slug}`"
                    class="inline-flex items-center px-5 py-2.5 gap-2 rounded-lg border border-(--accent)/40 text-(--accent) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body">
                    {{ t('index.plan_section.learn_more_button') }}
                    <UIcon name="fa7-solid:arrow-right" class="text-sm" />
                </NuxtLink>
            </template>
</UPricingPlan>
</UPricingPlans> -->
</template>
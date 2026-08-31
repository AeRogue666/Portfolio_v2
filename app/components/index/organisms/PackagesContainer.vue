<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
    services: {
        title: string;
        description: string;
        price: string;
        ttc: boolean;
        features: string[];
        badge?: string;
    }[];
}>();
</script>

<template>
    <UPricingPlans class="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
        <UPricingPlan v-for="(service, i) in services" :key="i" v-bind="service" orientation="vertical"
            :title="service.title" :description="service.description"
            :price="service.price !== t('plans.on_estimate') ? `${t('plans.price_starting_at')} ${service.price} ${service.ttc === true ? 'TTC' : 'H.T'}*` : `${service.price}*`"
            :features="service.features"
            :badge="service.badge == 'Populaire' ? { label: 'Populaire', color: 'neutral', variant: 'solid' } : service.badge"
            class="p-8 rounded-xl border border-(--bg-2) bg-(--bg) shadow-md transition-all duration-300 hover:border-(--accent)/40 group"
            :highlight="false" :ui="{
                root: 'flex flex-col justify-between h-full md:flex-row gap-6',
                title: '!fs-subtitle text-(--text) tracking-tight group-hover:text-(--accent) transition-colors whitespace-normal break-words',
                description: '!fs-small text-(--text-2) mt-1 whitespace-normal',
                price: '!fs-title font-extrabold text-(--text) mt-2',
                features: 'flex flex-col gap-3 border-t md:border-t-0 border-(--bg-2) pt-5 w-full',
                feature: 'flex items-start gap-2.5',
                featureTitle: '!fs-body text-(--text-2) leading-snug !whitespace-normal break-words',
                featureIcon: 'w-5 h-5 text-(--accent) shrink-0 mt-0.5'
            }" icon="fa7-solid:circle-check">
        </UPricingPlan>
    </UPricingPlans>
</template>
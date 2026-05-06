<script setup lang="ts">
const props = defineProps<{
    services: {
        title: string;
        price: string;
        ttc: boolean;
        features: string[];
    }[];
}>();
</script>

<template>
    <UPricingPlans>
        <UPricingPlan v-for="(service, i) in services" :key="i" v-bind="service" orientation="vertical"
            :title="service.title" :price="`${service.price} ${service.ttc === true ? 'TTC' : 'H.T'}*`"
            :features="service.features"
            class="flex flex-col justify-between p-6 rounded-xl border transition-all duration-300 bg-(--card-note-bg)"
            :highlight="false" :ui="{
                title: 'text-(--text)',
                description: 'text-(--text-2)',
                featureTitle: 'text-(--text-2)'
            }">
        </UPricingPlan>
    </UPricingPlans>
</template>
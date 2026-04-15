<script setup lang="ts">
import type { PlanResolved } from '~/app/types/plan';

const props = defineProps<{
    plans: PlanResolved[];
}>();

const { t } = useI18n();

onMounted(() => {
    console.log(props.plans)
})
</script>

<template>
    <UPricingPlans>
        <UPricingPlan v-for="(plan, i) in plans" :key="i" v-bind="plan" class="bg-(--card-note-bg)"
            orientation="vertical" :button="{
                label: t('index.plan_section.learn_more_button')
            }" :ui="{
                description: 'text-(--text-3)',
                featureTitle: 'text-(--text-2)'
            }">
            
            <template #button>
                <NuxtLink :to="`/plans/${plan.slug}`"
                    class="inline-flex items-center px-5 py-2.5 gap-2 rounded-lg border border-(--accent)/40 text-(--accent) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body">
                    {{ t('index.plan_section.learn_more_button') }}
                    <UIcon name="fa7-solid:arrow-right" class="text-sm" />
                </NuxtLink>
            </template>
        </UPricingPlan>
    </UPricingPlans>
</template>
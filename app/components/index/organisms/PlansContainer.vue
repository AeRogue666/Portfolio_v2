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

            <template #features v-if="plan.features">
                <ul class="flex flex-col gap-3 flex-1 mt-6 grow-0">
                    <li v-for="(feature, i) of plan.features" class="flex items-center gap-2 min-w-0" :key="i">
                        <span class="iconify fa7-solid:check size-5 shrink-0 text-primary" aria-hidden="true"></span>
                        <span class="text-(--text-muted) text-sm truncate">{{ feature }}</span>
                    </li>
                </ul>
            </template>
            
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
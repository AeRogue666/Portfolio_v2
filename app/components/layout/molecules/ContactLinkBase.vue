<script setup lang="ts">
const props = defineProps<{
    to?: string;
    ctaLabel?: string;
    ctaClass?: string;
    ctaIcon?: string;
    projectType?: string;
    subType?: string;
}>();

const leadStore = useLeadStore();

function handleCtaClick() {
    if (props.projectType && props.subType) {
        console.log(props.projectType, props.subType)
        leadStore.setInitialProject(props.projectType, props.subType)
        leadStore.step = 3
    } else if (props.projectType && !props.subType) {
        leadStore.setInitialProject(props.projectType, "")
        leadStore.step = 2
    }
}
</script>

<template>
    <NuxtLink :to="props.to || '/contact'" size="xl"
        :class="props.ctaClass || 'bg-(--bg-3) text-(--text) fs-body leading-relaxed whitespace-normal wrap-break-word max-w-[65%] sm:max-w-none'"
        @click="handleCtaClick">
        <UIcon :name="props.ctaIcon || 'fa7-solid:message'" aria-hidden="true" />
        <span>{{ props.ctaLabel || 'Démarrer votre projet' }}</span>
    </NuxtLink>
</template>
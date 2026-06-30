<script setup lang="ts">
const { t } = useI18n();
const leadStore = useLeadStore(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

const options = [
    {
        label: t('sendmessagemodal.types.message'),
        value: "message",
    },
    {
        label: t('sendmessagemodal.types.creation'),
        value: "creation",
    },
    {
        label: t('sendmessagemodal.types.refonte'),
        value: "refonte",
    },
    {
        label: t('sendmessagemodal.types.optimisation'),
        value: "optimisation",
    },
    {
        label: t('sendmessagemodal.types.maintenance'),
        value: "maintenance",
    },
    {
        label: t('sendmessagemodal.types.audit'),
        value: "audit",
    },
    {
        label: t('sendmessagemodal.types.formation'),
        value: "formation",
    },
]
</script>

<template>
    <div class="grid sm:grid-cols-2 gap-4">
        <UCard v-for="opt in options" :key="opt.value" :class="[
            'cursor-pointer transition',
            leadStore.data.projectType === opt.value
                ? 'ring-2 ring-(--focus) border-(--border-subtle)'
                : 'hover:border-(--accent-hover)'
        ]" @click="leadStore.data.projectType = opt.value" :ui="{
            body: grayscale && colorMode.value == 'dark'
                ? 'bg-(--bg-3) text-inverted fs-body'
                : 'bg-(--bg-3) text-(--text) fs-body'
        }">
            {{ opt.label }}
        </UCard>
    </div>
</template>
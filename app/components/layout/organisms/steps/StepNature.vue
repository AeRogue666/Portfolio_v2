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
        icon: "fa7-solid:envelope"
    },
    {
        label: t('sendmessagemodal.types.creation'),
        value: "creation",
        icon: "fa7-solid:file-code"
    },
    {
        label: t('sendmessagemodal.types.refonte'),
        value: "refonte",
        icon: "fa7-solid:brush"
    },
    {
        label: t('sendmessagemodal.types.optimisation'),
        value: "optimisation",
        icon: "fa7-solid:circle-up"
    },
    {
        label: t('sendmessagemodal.types.maintenance'),
        value: "maintenance",
        icon: "fa7-solid:server"
    },
    {
        label: t('sendmessagemodal.types.audit'),
        value: "audit",
        icon: "fa7-solid:magnifying-glass"
    },
    {
        label: t('sendmessagemodal.types.formation'),
        value: "formation",
        icon: "fa7-solid:user-graduate"
    },
]
</script>

<template>
    <div class="grid sm:grid-cols-2 gap-4">
        <UButton v-for="opt in options" :key="opt.value" type="button" @click="leadStore.data.projectType = opt.value" :icon="opt.icon" :class="[
            'cursor-pointer transition',
            leadStore.data.projectType === opt.value
                ? 'ring-2 ring-(--focus) border-(--border-subtle)'
                : 'hover:border-(--accent-hover)'
        ]" :ui="{
            base: grayscale && colorMode.value == 'dark'
                ? 'bg-(--bg-3) text-inverted fs-body'
                : 'bg-(--bg-3) text-(--text) fs-body'
        }">
            {{ opt.label }}
        </UButton>
    </div>
</template>
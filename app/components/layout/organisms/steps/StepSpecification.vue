<script setup lang="ts">
const { t } = useI18n();
const leadStore = useLeadStore(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

const options = computed(() => {
    switch (leadStore.data.projectType) {
        case "creation":
            return [
                { value: "onepage", label: t('sendmessagemodal.subtypes.creation.onepage') },
                { value: "vitrine", label: t('sendmessagemodal.subtypes.creation.vitrine') },
                { value: "professionnel", label: t('sendmessagemodal.subtypes.creation.professionnel') },
                { value: "ecommerce", label: t('sendmessagemodal.subtypes.creation.ecommerce') },
                { value: "reservation", label: t('sendmessagemodal.subtypes.creation.reservation') },
                { value: "custom", label: t('sendmessagemodal.subtypes.creation.custom') }
            ];
        case "refonte":
            return [
                { value: "refonte-design", label: t('sendmessagemodal.subtypes.refonte.design') },
                { value: "refonte-performance", label: t('sendmessagemodal.subtypes.refonte.performance') },
                { value: "refonte-accessibilite", label: t('sendmessagemodal.subtypes.refonte.accessibilite') },
                { value: "refonte-securite", label: t('sendmessagemodal.subtypes.refonte.securite') },
                { value: "refonte-fonctionnalite", label: t('sendmessagemodal.subtypes.refonte.fonctionnalite') },
            ]
        case "optimisation":
            return [
                { value: "optimisation-accessibilite", label: t('sendmessagemodal.subtypes.optimisation.accessibilite') },
                { value: "optimisation-seo", label: t('sendmessagemodal.subtypes.optimisation.seo') },
                { value: "optimisation-securite", label: t('sendmessagemodal.subtypes.optimisation.securite') },
                { value: "optimisation-multi", label: t('sendmessagemodal.subtypes.optimisation.optimisation-multi') }
            ];
        case "audit":
            return [
                { value: "audit-accessibilite", label: t('sendmessagemodal.subtypes.audit.accessibilite') },
                { value: "audit-seo", label: t('sendmessagemodal.subtypes.audit.seo') },
                { value: "audit-securite", label: t('sendmessagemodal.subtypes.audit.securite') },
                { value: "audit-all", label: t('sendmessagemodal.subtypes.audit.all') },
            ]
        case "maintenance":
            return [
                { value: "maintenance-onepage", label: t('sendmessagemodal.subtypes.maintenance.onepage') },
                { value: "maintenance-vitrine", label: t('sendmessagemodal.subtypes.maintenance.vitrine') },
                 { value: "maintenance-professionnel", label: t('sendmessagemodal.subtypes.maintenance.professionnel') },
                { value: "maintenance-ecommerce", label: t('sendmessagemodal.subtypes.maintenance.ecommerce') },
                 { value: "maintenance-custom", label: t('sendmessagemodal.subtypes.maintenance.custom') },
                { value: "maintenance-ponctuelle", label: t('sendmessagemodal.subtypes.maintenance.ponctuelle') },
            ]
        case "formation":
            return [
                { value: "ordinateur", label: t('sendmessagemodal.subtypes.formation.ordinateur') },
                { value: "internet", label: t('sendmessagemodal.subtypes.formation.internet') },
                { value: "email", label: t('sendmessagemodal.subtypes.formation.email') },
                { value: "securite-numerique", label: t('sendmessagemodal.subtypes.formation.securite-numerique') },
                { value: "ia", label: t('sendmessagemodal.subtypes.formation.ia') },
                { value: "custom", label: t('sendmessagemodal.subtypes.formation.custom') }
            ]
        default:
            return []
    }
});
</script>

<template>
    <div>
        <h3 class="fs-subtitle mb-4">
            Précisons votre besoin
        </h3>

        <UContainer class="grid sm:grid-cols-2 gap-3">
            <UCard v-for="opt in options" :key="opt.value" :class="[
                'cursor-pointer transition',
                leadStore.data.subType === opt.value
                    ? 'ring-2 ring-(--focus) border-(--border-subtle)'
                    : 'hover:border-(--accent-hover)'
            ]" @click="leadStore.data.subType = opt.value" :ui="{
                body: grayscale && colorMode.value == 'dark'
                    ? 'bg-(--bg-3) text-inverted fs-body'
                    : 'bg-(--bg-3) text-(--text) fs-body'
            }">
                {{ opt.label }}</UCard>
        </UContainer>
    </div>
</template>
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
                { value: "onepage", label: t('sendmessagemodal.subtypes.creation.onepage'), icon: "fa7-solid:1" },
                { value: "vitrine", label: t('sendmessagemodal.subtypes.creation.vitrine'), icon: "fa7-solid:2" },
                { value: "professionnel", label: t('sendmessagemodal.subtypes.creation.professionnel'), icon: "fa7-solid:3" },
                { value: "ecommerce", label: t('sendmessagemodal.subtypes.creation.ecommerce'), icon: "fa7-solid:4" },
                { value: "reservation", label: t('sendmessagemodal.subtypes.creation.reservation'), icon: "fa7-solid:5" },
                { value: "custom", label: t('sendmessagemodal.subtypes.creation.custom'), icon: "fa7-solid:6" }
            ];
        case "refonte":
            return [
                { value: "refonte-design", label: t('sendmessagemodal.subtypes.refonte.design'), icon: "fa7-solid:1" },
                { value: "refonte-performance", label: t('sendmessagemodal.subtypes.refonte.performance'), icon: "fa7-solid:2" },
                { value: "refonte-accessibilite", label: t('sendmessagemodal.subtypes.refonte.accessibilite'), icon: "fa7-solid:3" },
                { value: "refonte-securite", label: t('sendmessagemodal.subtypes.refonte.securite'), icon: "fa7-solid:4" },
                { value: "refonte-fonctionnalite", label: t('sendmessagemodal.subtypes.refonte.fonctionnalite'), icon: "fa7-solid:5" },
            ]
        case "optimisation":
            return [
                { value: "optimisation-accessibilite", label: t('sendmessagemodal.subtypes.optimisation.accessibilite'),icon: "fa7-solid:1" },
                { value: "optimisation-seo", label: t('sendmessagemodal.subtypes.optimisation.seo'), icon: "fa7-solid:2" },
                { value: "optimisation-securite", label: t('sendmessagemodal.subtypes.optimisation.securite'), icon: "fa7-solid:3" },
                { value: "optimisation-multi", label: t('sendmessagemodal.subtypes.optimisation.optimisation-multi'), icon: "fa7-solid:4" }
            ];
        case "audit":
            return [
                { value: "audit-accessibilite", label: t('sendmessagemodal.subtypes.audit.accessibilite'), icon: "fa7-solid:1" },
                { value: "audit-seo", label: t('sendmessagemodal.subtypes.audit.seo'), icon: "fa7-solid:2" },
                { value: "audit-securite", label: t('sendmessagemodal.subtypes.audit.securite'),icon: "fa7-solid:3" },
                { value: "audit-all", label: t('sendmessagemodal.subtypes.audit.all'), icon: "fa7-solid:4" },
                { value: "audit-flash", label: t('sendmessagemodal.subtypes.audit.flash_audit'), icon: "fa7-solid:5" },
            ];
        case "maintenance":
            return [
                { value: "maintenance-onepage", label: t('sendmessagemodal.subtypes.maintenance.onepage'), icon: "fa7-solid:1" },
                { value: "maintenance-vitrine", label: t('sendmessagemodal.subtypes.maintenance.vitrine'), icon: "fa7-solid:2" },
                { value: "maintenance-professionnel", label: t('sendmessagemodal.subtypes.maintenance.professionnel'), icon: "fa7-solid:3" },
                { value: "maintenance-ecommerce", label: t('sendmessagemodal.subtypes.maintenance.ecommerce'), icon: "fa7-solid:4" },
                { value: "maintenance-custom", label: t('sendmessagemodal.subtypes.maintenance.custom'), icon: "fa7-solid:5" },
                { value: "maintenance-ponctuelle", label: t('sendmessagemodal.subtypes.maintenance.ponctuelle'), icon: "fa7-solid:6" },
            ];
        case "formation":
            return [
                { value: "ordinateur", label: t('sendmessagemodal.subtypes.formation.ordinateur'), icon: "fa7-solid:1" },
                { value: "internet", label: t('sendmessagemodal.subtypes.formation.internet'), icon: "fa7-solid:2" },
                { value: "email", label: t('sendmessagemodal.subtypes.formation.email'), icon: "fa7-solid:3" },
                { value: "securite-numerique", label: t('sendmessagemodal.subtypes.formation.securite-numerique'), icon: "fa7-solid:4" },
                { value: "ia", label: t('sendmessagemodal.subtypes.formation.ia'), icon: "fa7-solid:5" },
                { value: "custom", label: t('sendmessagemodal.subtypes.formation.custom'), icon: "fa7-solid:6" }
            ];
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
            <UButton v-for="opt in options" :key="opt.value" :icon="opt.icon"
                @click="leadStore.data.subType = opt.value" :class="[
                    'cursor-pointer transition',
                    leadStore.data.subType === opt.value
                        ? 'ring-2 ring-(--focus) border-(--border-subtle)'
                        : 'hover:border-(--accent-hover)'
                ]" :ui="{
                base: grayscale && colorMode.value == 'dark'
                    ? 'bg-(--bg-3) text-inverted fs-body'
                    : 'bg-(--bg-3) text-(--text) fs-body'
            }">
                {{ opt.label }}
            </UButton>
        </UContainer>
    </div>
</template>
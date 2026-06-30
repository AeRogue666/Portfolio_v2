<script setup lang="ts">
import { QUALIFICATION } from "../../../../../config/qualification";

const { t } = useI18n();
const leadStore = useLeadStore(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

const fields = computed(() => {
    switch (leadStore.data.projectType) {
        case "creation":
        case "refonte":
            return [
                {
                    key: "budgetRange",
                    title: "Pour quel budget ?",
                    options: [
                        { value: '<1k', label: t('sendmessagemodal.budget.inferieur_a', { value: '1000', suite: 'H.T' }) },
                        { value: '1-3k', label: t('sendmessagemodal.budget.compris_entre', { value1: '1000', value2: '3000', suite: 'H.T' }) },
                        { value: '3-8k', label: t('sendmessagemodal.budget.compris_entre', { value1: '3000', value2: '8000', suite: 'H.T' }) },
                        { value: '8k+', label: t('sendmessagemodal.budget.superieur_a', { value: '8000', suite: 'H.T' }) }
                    ]
                },
                {
                    key: "deadline",
                    title: "Pour quand ?",
                    options: [
                        { value: "flexible", label: t('sendmessagemodal.deadline.flexible') },
                        { value: "1-3m", label: t('sendmessagemodal.deadline.compris_entre', { value1: '1', value2: '3', suite: 'mois' }) },
                        { value: "<1m", label: t('sendmessagemodal.deadline.inferieur_a', { value: '1', suite: 'mois' }) },
                        { value: "urgent", label: t('sendmessagemodal.deadline.urgent') }
                    ]
                }
            ]
        case "optimisation":
            return [
                {
                    key: "budgetRange",
                    title: "Pour quel budget ?",
                    options: [
                        { value: "<250", label: t('sendmessagemodal.budget.inferieur_a', { value: '250', suite: 'H.T' }) },
                        { value: "<500", label: t('sendmessagemodal.budget.inferieur_a', { value: '500', suite: 'H.T' }) },
                        { value: "<1k", label: t('sendmessagemodal.budget.inferieur_a', { value: '1000', suite: 'H.T' }) },
                        { value: "1k+", label: t('sendmessagemodal.budget.superieur_a', { value: '1000', suite: 'H.T' }) }
                    ]
                }
            ]
        case "maintenance":
            return [
                {
                    key: "budgetRange",
                    title: "Pour quel budget ?",
                    options: [
                        { value: "<30", label: t('sendmessagemodal.budget.inferieur_a', { value: '30', suite: 'H.T par mois' }) },
                        { value: "<50", label: t('sendmessagemodal.budget.inferieur_a', { value: '50', suite: 'H.T par mois' }) },
                        { value: "<70", label: t('sendmessagemodal.budget.inferieur_a', { value: '70', suite: 'H.T par mois' }) },
                        { value: "50", label: t('sendmessagemodal.budget.intervention_ponctuelle', { value: '50', suite: '€/h H.T' }) },
                    ]
                }
            ]
        case "audit":
            return [
                {
                    key: "trainingFormat",
                    title: "Durée souhaitée",
                    options: [
                        { value: "demijournee", label: t('sendmessagemodal.format.demi_journee') },
                        { value: "1D", label: t('sendmessagemodal.format.journee') },
                        { value: "mD", label: t('sendmessagemodal.format.plusieurs_journees') },
                        { value: "idk", label: t('sendmessagemodal.format.ne_sais_pas') }
                    ]
                },
                {
                    key: "deadline",
                    title: "Pour quand ?",
                    options: [
                        { value: "3m+", label: t('sendmessagemodal.deadline.superieur_a', { value: '3', suite: 'mois' }) },
                        { value: "1-3m", label: t('sendmessagemodal.deadline.compris_entre', { value1: '1', value2: '3', suite: 'mois' }) },
                        { value: "<1m", label: t('sendmessagemodal.deadline.inferieur_a', { value: '1', suite: 'mois' }) },
                        { value: "urgent", label: t('sendmessagemodal.deadline.urgent') }
                    ]
                }
            ]
        case "formation":
            return [
                {
                    key: "personNumber",
                    title: "Nombre de personnes",
                    options: [
                        { value: "1p", label: t('sendmessagemodal.person.une_personne') },
                        { value: "2-5p", label: t('sendmessagemodal.person.compris_entre', { value1: '2', value2: '5', suite: 'personnes' }) },
                        { value: "6-10p", label: t('sendmessagemodal.person.compris_entre', { value1: '6', value2: '10', suite: 'personnes' }) },
                        { value: "10p+", label: t('sendmessagemodal.person.superieur_a', { value: '10', suite: 'personnes' }) }
                    ]
                },
                {
                    key: "trainingFormat",
                    title: "Durée souhaitée",
                    options: [
                        { value: "1h", label: t('sendmessagemodal.format.une_seance') },
                        { value: "demijournee", label: t('sendmessagemodal.format.demi_journee') },
                        { value: "1D", label: t('sendmessagemodal.format.journee') },
                        { value: "mD", label: t('sendmessagemodal.format.plusieurs_journees') },
                        { value: "idk", label: t('sendmessagemodal.format.ne_sais_pas') }
                    ]
                },
                {
                    key: "deadline",
                    title: "Quand souhaitez-vous la réaliser ?",
                    options: [
                        { value: "3m+", label: t('sendmessagemodal.deadline.superieur_a', { value: '3', suite: 'mois' }) },
                        { value: "1-3m", label: t('sendmessagemodal.deadline.compris_entre', { value1: '1', value2: '3', suite: 'mois' }) },
                        { value: "<1m", label: t('sendmessagemodal.deadline.inferieur_a', { value: '1', suite: 'mois' }) },
                        { value: "urgent", label: t('sendmessagemodal.deadline.urgent') }
                    ]
                }
            ]
        default:
            return [];
    }
});

function toggleField<K extends 'personNumber' | 'budgetRange' | 'trainingFormat' | 'deadline'>(field: K, value: string) {
    leadStore.data[field] = leadStore.data[field] === value ? "" : value;
}
</script>

<template>
    <div class="space-y-6">
        <div v-for="field in fields"> <!-- QUALIFICATION[projectType] -->
            <h3 class="fs-subtitle mb-3">{{ field.title }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                <UButton v-for="option in field.options" :key="option.value" variant="ghost"
                    @click="toggleField(field.key, option.value)" :label="option.label"
                    class="block w-3xs xl:w-xs mt-3 mx-4 text-(--text) hover:bg-(--focus) disabled:bg-(--bg-3) disabled:text-(--text-muted) fs-body ring-1 ring-(--border-medium)"
                    :ui="{
                        base: grayscale && colorMode.value == 'dark'
                            ? 'text-inverted'
                            : ''
                    }" :active="leadStore.data[field.key] === option.value" active-class="bg-(--bg-3) text-(--text)" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { t } = useI18n();
const leadScore = useLeadStore(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

const options = computed(() => {
    switch (leadScore.data.projectType) {
        case "creation":
        case "refonte":
            return [
                { value: "vitrine", label: "Site vitrine" },
                { value: "ecommerce", label: "E-commerce" },
                { value: "reservation", label: "Réservation en ligne" },
                { value: "custom", label: "Projet métier spécifique" }
            ];
        case "optimisation":
            return [
                { value: "accessibilite", label: "Accessibilité" },
                { value: "seo", label: "SEO & Performance" },
                { value: "securite", label: "Sécurité" }
            ];
        case "audit":
            return [
                { value: "audit-accessibilite", label: "Audit accessibilité" },
                { value: "audit-seo", label: "Audit SEO & Performance" },
                { value: "audit-securite", label: "Audit Sécurité" }
            ]
        case "formation":
            return [
                { value: "ordinateur", label: "Utilisation ordinateur" },
                { value: "internet", label: "Internet" },
                { value: "email", label: "Messagerie email" },
                { value: "securite-numerique", label: "Sécurité numérique" },
                { value: "ia", label: "Intelligence artificielle" },
                { value: "formation-custom", label: "Formation personnalisée" }
            ]
        default:
            return []
    }
})
</script>

<template>
    <div>
        <h3 class="fs-subtitle mb-4">
            Précisons votre besoin
        </h3>

        <UContainer class="grid sm:grid-cols-2 gap-3">
            <UCard v-for="opt in options" :key="opt.value" :class="[
                'cursor-pointer transition',
                leadScore.data.subType === opt.value
                    ? 'ring-2 ring-(--focus) border-(--border-subtle)'
                    : 'hover:border-(--accent-hover)'
            ]" @click="leadScore.data.subType = opt.value" :ui="{
                body: grayscale && colorMode.value == 'dark'
                    ? 'bg-(--bg-3) text-inverted fs-body'
                    : 'bg-(--bg-3) text-(--text) fs-body'
            }">
                {{ opt.label }}</UCard>
        </UContainer>
    </div>
</template>
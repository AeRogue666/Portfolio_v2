<script setup lang="ts">
const { t } = useI18n();
const leadStore = useLeadStore(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

const pageOptions = ['1-3', '4-10', '10+'],
    featureOptions = ['Paiement en ligne', 'Espace client', 'Blog', 'Multilingue', 'Automatisation', 'API externe'],
    structuralTypes = ["creation", "refonte", "audit"],
    featuresTypes = ["creation", "refonte", "optimisation"];

function toggleFeature(feature: any) {
    console.log(feature, typeof feature);

    if (!leadStore.data.complexity.features) {
        leadStore.data.complexity.features = [];
    }
    const index = leadStore.data.complexity.features.indexOf(feature);
    console.log(index);

    if (index === -1) {
        leadStore.data.complexity.features.push(feature);
    } else {
        leadStore.data.complexity.features.splice(feature, 1);
    }
}

function togglePage(page: string) {
    if (!leadStore.data.complexity.pages) {
        leadStore.data.complexity.pages = "";
    }
    const indexDeadline = leadStore.data.complexity.pages.indexOf(page);
    if (indexDeadline === -1) {
        leadStore.data.complexity.pages = page;
    } else {
        leadStore.data.complexity.pages = "";
    }
}
</script>

<template>
    <div class="space-y-6">
        <UContainer v-if="structuralTypes.includes(leadStore.data.projectType)">
            <h3 class="fs-subtitle mb-3">
                Structure du projet
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-6">
                <UButton v-for="p in pageOptions" :key="p" variant="ghost" @click="togglePage(p)" :label="`${p} pages`"
                    class="block w-3xs xl:w-xs mt-3 mx-4 text-(--text) hover:bg-(--focus) disabled:bg-(--bg-3) disabled:text-(--text-muted) fs-body ring-1 ring-(--border-medium)"
                    :ui="{
                        base: grayscale && colorMode.value == 'dark'
                            ? 'text-inverted'
                            : ''
                    }" :active="leadStore.data.complexity.pages === p" active-class="bg-(--bg-3) text-(--text)" />
            </div>

            <div class="mt-4">
                <UCheckbox v-model="leadStore.data.complexity.cms" label="Cocher si besoin d'un CMS"
                    description="(Système de Gestion de Contenus en français)" icon="fa7-solid:heart" :ui="{
                        base: 'ring-2 ring-(--border-medium)',
                        indicator: 'bg-(--bg-2) text-(--accent)'
                    }" />
            </div>
        </UContainer>

        <UContainer v-if="featuresTypes.includes(leadStore.data.projectType)">
            <h3 class="fs-subtitle mb-3">
                Fonctionnalités envisagées
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                <UButton v-for="f in featureOptions" :key="f" variant="ghost" @click="toggleFeature(f)" :label="f"
                    class="block w-3xs xl:w-xs mt-3 mx-4 text-(--text) hover:bg-(--focus) disabled:bg-(--bg-3) disabled:text-(--text-muted) fs-body ring-1 ring-(--border-medium)"
                    :ui="{
                        base: grayscale && colorMode.value == 'dark'
                            ? 'text-inverted'
                            : ''
                    }" :active="leadStore.data.complexity.features.indexOf(f) !== -1 ? true : false" active-class="bg-(--bg-3) text-(--text)" />
            </div>
        </UContainer>

        <UContainer>
            <h3 class="fs-subtitle mb-3">
                Objectifs & contexte
            </h3>

            <div class="flex flex-col gap-4">
                <UFormField :label="t('sidebar-left.modal-message.step-complexity.business-goals-label')" name="message"
                    :ui="{
                        label: 'text-(--text-2) fs-body',
                    }" required>
                    <UTextarea v-model="leadStore.data.businessGoals" type="text" :rows="10" :maxrows="20"
                        minlength="20" maxlength="3000"
                        :placeholder="t('sidebar-left.modal-message.step-complexity.business-goals-placeholder', { maxlength: 3000 })"
                        class="block w-3xs md:w-full mt-3 mx-4" :ui="{
                            base: grayscale && colorMode.value == 'dark'
                                ? 'bg-(--bg-2) text-inverted fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                                : 'bg-(--bg-2) text-(--text-2) fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                        }" required />
                </UFormField>

                <UFormField :label="t('sidebar-left.modal-message.step-complexity.problems-label')" name="message" :ui="{
                    label: 'text-(--text-2) fs-body',
                }" required>
                    <UTextarea v-model="leadStore.data.problems" type="text" :rows="10" :maxrows="20" minlength="20"
                        maxlength="3000"
                        :placeholder="t('sidebar-left.modal-message.step-complexity.problems-placeholder', { maxlength: 3000 })"
                        class="block w-3xs md:w-full mt-3 mx-4" :ui="{
                            base: grayscale && colorMode.value == 'dark'
                                ? 'bg-(--bg-2) text-inverted fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                                : 'bg-(--bg-2) text-(--text-2) fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                        }" required />
                </UFormField>
            </div>
        </UContainer>
    </div>
</template>
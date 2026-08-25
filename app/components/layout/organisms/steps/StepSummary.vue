<script setup lang="ts">
const { t } = useI18n();
const leadStore = useLeadStore(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

const colorProjectType = [
    { value: "creation", color: "primary" },
    { value: "refonte", color: "warning" },
    { value: "optimisation", color: "error" },
    { value: "audit_a11y", color: "info" },
    { value: "audit_seo", color: "info" },
    { value: "formation", color: "info" }
];
const colorSubType = [
    { value: "vitrine", color: "secondary" },
    { value: "ecommerce", color: "warning" },
    { value: "reservation", color: "info" },
    { value: "custom", color: "info" },
    { value: "accessibilite", color: "info" },
    { value: "seo", color: "info" },
    { value: "securite", color: "info" },
    { value: "audit-accessibilite", color: "info" },
    { value: "audit-seo", color: "info" },
    { value: "audit-securite", color: "info" },
    { value: "audit-flash", color: "info" },
    { value: "ordinateur", color: "info" },
    { value: "internet", color: "info" },
    { value: "email", color: "info" },
    { value: "securite-numerique", color: "info" },
    { value: "ia", color: "info" },
    { value: "formation", color: "info" }
];

const colorProjectTypeFilter = computed(() => colorProjectType.filter(c => c.value === leadStore.data.projectType).map(r => r.color)[0]);
const colorSubTypeFilter = computed(() => colorSubType.filter(c => c.value === leadStore.data.subType).map(r => r.color)[0]);
</script>

<template>
    <div class="flex flex-col space-y-4">
        <UCard v-if="leadStore.data.projectType !== 'message'" :ui="{
            root: 'bg-(--bg) text-(--text) fs-body',
            body: grayscale && colorMode.value == 'dark'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-inverted'
                : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
        }">
            <div class="flex flex-col items-baseline gap-4">
                <p class="font-semibold tracking-widest uppercase fs-small my-4">
                    <strong class="uppercase mr-6">Type :</strong>
                    <UBadge :label="leadStore.data.projectType" :color="colorProjectTypeFilter" />
                </p>

                <p class="font-semibold tracking-widest uppercase fs-small my-4">
                    <strong class="uppercase mr-6">Nature :</strong>
                    <UBadge :label="leadStore.data.subType" :color="colorSubTypeFilter" />
                </p>
            </div>

            <div class="flex flex-col items-baseline gap-4">
                <p class="font-semibold tracking-widest fs-small my-4">
                    <strong class="uppercase mr-6">Budget :</strong>
                    {{ leadStore.data.budgetRange }}€
                </p>

                <p class="font-semibold tracking-widest uppercase fs-small my-4">
                    <strong class="uppercase mr-6">Délai :</strong>
                    {{ leadStore.data.deadline }}
                </p>
            </div>

            <div v-if="leadStore.data.complexity" class="flex flex-col items-baseline gap-4">
                <p v-if="leadStore.data.complexity.pages" class="font-semibold tracking-widest uppercase fs-small">
                    <strong class="uppercase mr-6">Pages :</strong>
                    {{ leadStore.data.complexity.pages }}
                </p>
                <p class="font-semibold tracking-widest uppercase fs-small">
                    <strong class="uppercase mr-6">Fonctionnalités :</strong>
                    {{ leadStore.data.complexity.features }}
                </p>
                <p class="font-semibold tracking-widest uppercase fs-small">
                    <strong class="uppercase mr-6">CMS :</strong>
                    {{ leadStore.data.complexity.cms.toString() === "true" ? 'OUI' : 'NON' }}
                </p>
            </div>

            <div v-if="leadStore.data.businessGoals || leadStore.data.problems" class="flex flex-col items-baseline gap-4">
                <p v-if="leadStore.data.businessGoals" class="font-semibold tracking-widest fs-small my-4">
                    <strong class="uppercase mr-6">Objectifs :</strong>
                    {{ leadStore.data.businessGoals }}
                </p>

                <p v-if="leadStore.data.problems" class="font-semibold tracking-widest fs-small my-4">
                    <strong class="uppercase mr-6">Problèmes :</strong>
                    {{ leadStore.data.problems }}
                </p>
            </div>

            <div v-if="leadStore.data.contact.website" class="flex flex-col items-baseline gap-4">
                <p class="font-semibold tracking-widest uppercase fs-small">
                    <strong class="uppercase mr-6">SITE INTERNET :</strong>
                    {{ leadStore.data.contact.website }}
                </p>
            </div>
        </UCard>
        <div v-else></div>

        <UFormField :label="t('sidebar-left.modal-message.step-summary.email_label')" name="email" :ui="{
            label: 'text-(--text-2) fs-body',
        }" required>
            <UInput v-model="leadStore.data.contact.email"
                :placeholder="t('sidebar-left.modal-message.step-summary.email_placeholder')" size="xl" tabindex="0"
                class="block w-3xs md:w-full mt-3 mx-4" :ui="{
                    base: grayscale && colorMode.value == 'dark'
                        ? 'bg-(--bg-2) text-inverted fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                        : 'bg-(--bg-2) text-(--text-2) fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                }" required />
        </UFormField>

        <UFormField :label="t('sidebar-left.modal-message.step-summary.textarea_label')" name="message" :ui="{
            label: 'text-(--text-2) fs-body',
        }">
            <UTextarea v-model="leadStore.data.contact.message" type="text" :rows="10" :maxrows="20" minlength="20"
                maxlength="3000" autocomplete="off"
                :placeholder="t('sidebar-left.modal-message.step-summary.textarea_placeholder')"
                class="block w-3xs md:w-full mt-3 mx-4" :ui="{
                    base: grayscale && colorMode.value == 'dark'
                        ? 'bg-(--bg-2) text-inverted fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                        : 'bg-(--bg-2) text-(--text-2) fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                }" />
        </UFormField>
    </div>
</template>
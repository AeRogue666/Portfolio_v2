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
    { value: "creation", color: "theme-bg-1" },
    { value: "refonte", color: "theme-bg-2" },
    { value: "optimisation", color: "theme-bg-2" },
    { value: "maintenance", color: "theme-bg-3" },
    { value: "maintenance-informatique", color: "theme-bg-2" },
    { value: "audit", color: "theme-bg-3" },
    { value: "formation", color: "theme-bg-3" }
];
const colorSubType = [
    { value: "vitrine", color: "theme-bg-3" },
    { value: "ecommerce", color: "theme-bg-3" },
    { value: "reservation", color: "theme-bg-3" },
    { value: "custom", color: "theme-bg-3" },
    { value: "accessibilite", color: "theme-bg-3" },
    { value: "seo", color: "theme-bg-3" },
    { value: "securite", color: "theme-bg-3" },
    { value: "performance", color: "theme-bg-3" },
    { value: "all", color: "theme-bg-3" },
    { value: "maintenance-it-particulier", color: "theme-bg-3" },
    { value: "maintenance-it-professionnel", color: "theme-bg-3" },
    { value: "maintenance-it-ponctuelle", color: "theme-bg-3" },
    { value: "maintenance-it-urgent", color: "warning" },
    { value: "audit-accessibilite", color: "theme-bg-3" },
    { value: "audit-seo", color: "theme-bg-3" },
    { value: "audit-securite", color: "theme-bg-3" },
    { value: "audit-all", color: "theme-bg-3" },
    { value: "audit-flash", color: "theme-bg-3" },
    { value: "ordinateur", color: "theme-bg-3" },
    { value: "internet", color: "theme-bg-3" },
    { value: "email", color: "theme-bg-3" },
    { value: "securite-numerique", color: "theme-bg-3" },
    { value: "ia", color: "theme-bg-3" },
    { value: "formation", color: "theme-bg-3" }
];

const colorProjectTypeFilter = computed(() => colorProjectType.find(c => c.value === leadStore.data.projectType)?.color || 'primary');
const colorSubTypeFilter = computed(() => colorSubType.find(c => c.value === leadStore.data.subType)?.color || 'info');

const rejectedProjectTypes = ['formation', 'audit'];
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

            <div v-if="leadStore.data.budgetRange || leadStore.data.deadline"
                class="flex flex-col items-baseline gap-4">
                <p class="font-semibold tracking-widest fs-small my-4">
                    <strong class="uppercase mr-6">Budget :</strong>
                    {{ leadStore.data.budgetRange }}€
                </p>

                <p class="font-semibold tracking-widest uppercase fs-small my-4">
                    <strong class="uppercase mr-6">Délai :</strong>
                    {{ t(`sendmessagemodal.deadline.${leadStore.data.deadline}`) }}
                </p>
            </div>

            <div v-if="leadStore.data.complexity && !rejectedProjectTypes.includes(leadStore.data.projectType)"
                class="flex flex-col items-baseline gap-4">
                <p v-if="leadStore.data.complexity.pages" class="font-semibold tracking-widest uppercase fs-small">
                    <strong class="uppercase mr-6">Pages :</strong>
                    {{ leadStore.data.complexity.pages }}
                </p>
                <p v-if="!leadStore.data.complexity.features" class="font-semibold tracking-widest uppercase fs-small">
                    <strong class="uppercase mr-6">Fonctionnalités :</strong>
                    {{ leadStore.data.complexity.features }}
                </p>
                <p class="font-semibold tracking-widest uppercase fs-small">
                    <strong class="uppercase mr-6">CMS :</strong>
                    {{ leadStore.data.complexity.cms === true ? 'OUI' : 'NON' }}
                </p>
                <p v-if="leadStore.data.complexity.computerRange" class="font-semibold tracking-widest uppercase fs-small">
                    <strong class="uppercase mr-6">
                        Nombre d'ordinateurs :
                    </strong>
                    <span>{{ leadStore.data.complexity.computerRange > 100 ? '100+' : leadStore.data.complexity.computerRange }}</span>
                </p>
            </div>

            <div v-if="leadStore.data.projectType === 'formation'" class="flex flex-col items-baseline gap-4">
                <p v-if="leadStore.data.personNumber" class="font-semibold tracking-widest uppercase fs-small">
                    <strong class="uppercase mr-6">Nombre de personnes :</strong>
                    {{ t(`sendmessagemodal.person.${leadStore.data.personNumber}`) }}
                </p>
                <p v-if="leadStore.data.publicType" class="font-semibold tracking-widest uppercase fs-small">
                    <strong class="uppercase mr-6">Type de public :</strong>
                    {{ t(`sendmessagemodal.publicType.${leadStore.data.publicType}`) }}
                </p>
                <p v-if="leadStore.data.trainingFormat" class="font-semibold tracking-widest uppercase fs-small">
                    <strong class="uppercase mr-6">Format de formation :</strong>
                    {{ t(`sendmessagemodal.format.${leadStore.data.trainingFormat}`) }}
                </p>
            </div>

            <div v-if="leadStore.data.businessGoals || leadStore.data.problems"
                class="flex flex-col items-baseline gap-4">
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
        <div v-else>
            <span>Pas de contenu disponible</span>
        </div>

        <UFormField :label="t('contact.modal-message.step-summary.email_label')" name="email" :ui="{
            label: 'text-(--text-2) fs-body',
        }" required>
            <UInput v-model="leadStore.data.contact.email"
                :placeholder="t('contact.modal-message.step-summary.email_placeholder')" size="xl" tabindex="0"
                class="block w-3xs md:w-full mt-3 mx-4" :ui="{
                    base: grayscale && colorMode.value == 'dark'
                        ? 'bg-(--bg-2) text-inverted fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                        : 'bg-(--bg-2) text-(--text-2) fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                }" required />
        </UFormField>

        <UFormField :label="t('contact.modal-message.step-summary.textarea_label')" name="message" :ui="{
            label: 'text-(--text-2) fs-body',
        }">
            <UTextarea v-model="leadStore.data.contact.message" type="text" :rows="10" :maxrows="20" minlength="20"
                maxlength="3000" autocomplete="off"
                :placeholder="t('contact.modal-message.step-summary.textarea_placeholder')"
                class="block w-3xs md:w-full mt-3 mx-4" :ui="{
                    base: grayscale && colorMode.value == 'dark'
                        ? 'bg-(--bg-2) text-inverted fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                        : 'bg-(--bg-2) text-(--text-2) fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                }" />
        </UFormField>
    </div>
</template>
<script setup lang="ts">
import StepBudget from './steps/StepBudget.vue';
import StepComplexity from './steps/StepComplexity.vue';
import StepNature from './steps/StepNature.vue';
import StepSpecification from './steps/StepSpecification.vue';
import StepSummary from './steps/StepSummary.vue';

const props = defineProps<{
    ctaLabel?: string;
    ctaClass?: string;
    ctaIcon?: string;
}>();

const { t } = useI18n(),
    { scoreLead } = useLeadScoring(),
    leadStore = useLeadStore(),
    { submitState, loading, submit } = useContactForm();

const accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const tabs = [
    { title: "Nature" },
    { title: "Spécification" },
    { title: "Complexité" },
    { title: "Budget" },
    { title: "Récapitulatif" }
];

const totalSteps = computed(() => leadStore.data.projectType === "message" ? 2 : 5);
const isOpen = ref(false);

leadStore.restore();

/* Form functions */

function goNext() {
    if (leadStore.validateNextStep()) {
        leadStore.next()
    }
    console.log(leadStore.validateNextStep(), leadStore.step)
}

function goBack() {
    if (leadStore.validateBackStep()) {
        leadStore.back()
    }
    console.log(leadStore.validateBackStep(), leadStore.data.projectType, leadStore.step)
}

/*Submitting form */

async function handleSubmit() {
    const result = scoreLead(leadStore.data);

    leadStore.data.leadScore = result.score;
    leadStore.data.leadTier = result.tier;

    await submit({
        type: leadStore.data.projectType === "message"
            ? "message"
            : "qualified",
        email: leadStore.data.contact.email,
        message: leadStore.data.contact.message,
        website: "",
        qualification: leadStore.data.projectType !== "message" ? {
            projectType: leadStore.data.projectType,
            subType: leadStore.data.subType,
            complexity: leadStore.data.complexity,
            businessGoals: leadStore.data.businessGoals,
            problems: leadStore.data.problems,
            budgetRange: leadStore.data.budgetRange,
            deadline: leadStore.data.deadline,
            leadScore: leadStore.data.leadScore,
            leadTier: leadStore.data.leadTier
        } : undefined
    });

    leadStore.reset();
};

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

const progressBar = computed(() => leadStore.step - 1 /* (100 * leadStore.step / totalSteps.value) */);

/* Watchers */

/* watch(() => leadStore.data.projectType,
    value => {
        console.log(value)
    }
); */
watch(isOpen, async (opened) => {
    if (opened) await $fetch('/api/contact/init');
});
/* watch(leadStore, (newData) => {
    console.log(leadStore.data, leadStore.step, totalSteps.value, newData);
}); */
// onMounted(() => console.log(leadStore.data, leadStore.step, totalSteps.value));
</script>

<template>
    <UModal v-model:open="isOpen" id="contact-modal" :modal="true" fullscreen direction="left"
        :title="'Démarrons votre projet'" :description="'Quelques étapes rapides pour identifier votre besoin.'" :close="{
            color: 'neutral',
            variant: 'outline',
            class:
                'rounded-full bg-transparent fs-body text-(--text) hover:bg-(--bg-3) rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
        }" :ui="{
            content: 'w-auto bg-(--bg)',
            body: 'flex flex-col justify-center',
            description: 'text-(--text-muted)'
        }">
        <template #default>
            <UButton aria-haspopup="dialog" aria-controls="contact-modal" name="button-send-message" color="neutral"
                variant="solid" size="xl" :class="props.ctaClass || 'bg-(--bg-3) text-(--text) fs-body'"
                :icon="props.ctaIcon || 'fa7-solid:message'" :label="props.ctaLabel || 'Démarrer votre projet'" />
        </template>

        <template #body>
            <UCard :title="'Démarrons votre projet'" :description="`Etape ${leadStore.step} sur ${totalSteps}`" :ui="{
                root: 'overflow-y-auto bg-(--bg-2) ring-(--border-subtle)',
                title: 'fs-title text-(--text)',
                description: 'fs-small text-(--text-muted)',
                header: 'bg-(--bg-2) text-(--text-2) border-(--border-medium)',
                body: 'flex flex-col bg-(--bg-2) text-(--text-2) fs-body gap-6'
            }">
                <UStepper v-model="progressBar" :items="tabs" disabled :ui="{
                    header: 'flex flex-col md:flex-row gap-4',
                    trigger: grayscale
                        ? 'data-[state=active]:bg-(--bg) data-[state=active]:text-(--text-2) data-[state=inactive]:bg-(--bg-2) data-[state=inactive]:text-(--text-muted) data-[state=completed]:bg-(--bg-3) data-[state=completed]:text-(--text-muted) pointer-events-none opacity-50'
                        : 'data-[state=active]:bg-(--focus) data-[state=active]:text-(--text) data-[state=inactive]:bg-(--bg) data-[state=inactive]:text-(--text-muted) data-[state=completed]:bg-(--bg-3) data-[state=completed]:text-(--text-muted) pointer-events-none opacity-50',
                    separator: 'data-[state=active]:bg-(--focus) data-[state=inactive]:bg-(--bg) data-[state=completed]:bg-(--bg-3)'
                }" /> <!-- tabs.slice(0, totalSteps) -->

                <!-- Etapes du formulaire -->
                <Transition>
                    <!-- Nature du projet -->
                    <StepNature v-if="leadStore.step === 1" />
                    <!-- Spécification du projet -->
                    <StepSpecification v-else-if="leadStore.step === 2 && leadStore.data.projectType !== 'message'" />
                    <!-- Compléxité du projet -->
                    <StepComplexity v-else-if="leadStore.step === 3" />
                    <!-- Budget du projet -->
                    <StepBudget v-else-if="leadStore.step === 4" />
                    <!-- Résumé du projet -->
                    <StepSummary v-else-if="leadStore.step === totalSteps" />
                </Transition>

                <div class="flex flex-col md:flex-row items-center md:justify-between mt-6 gap-4">
                    <UButton label="Retour" variant="ghost" @click="goBack"
                        :disabled="leadStore.step > 1 ? false : true"
                        class="block w-3xs md:w-xs mt-3 bg-(--bg-2) text-(--text-2) fs-body ring ring-(--focus) border-(--border-subtle) hover:bg-(--bg) hover:ring-2 hover:ring-(--focus) hover:border-(--border-subtle)" />

                    <UButton label="Réinitialiser le formulaire" variant="outline" @click="leadStore.reset()"
                        :disabled="leadStore.data ? false : true"
                        class="block w-3xs md:w-xs mt-3 bg-(--bg-2) text-(--text-2) fs-body ring ring-(--accent) border-(--border-subtle) hover:bg-(--bg) hover:ring-2 hover:ring-(--focus) hover:border-(--border-subtle)" />

                    <UButton :label="`Réinitialiser l'étape ${leadStore.step}`" variant="outline"
                        @click="leadStore.resetStep()" :disabled="leadStore.data ? false : true"
                        class="block w-3xs md:w-xs mt-3 bg-(--bg-2) text-(--text-2) fs-body ring ring-(--accent) border-(--border-subtle) hover:bg-(--bg) hover:ring-2 hover:ring-(--focus) hover:border-(--border-subtle)" />

                    <UButton v-if="leadStore.step < totalSteps" label="Continuer" variant="outline" @click="goNext"
                        :disabled="leadStore.data.projectType ? false : true"
                        class="block w-3xs md:w-xs mt-3 bg-(--bg-2) text-(--text-2) fs-body ring ring-(--accent) border-(--border-subtle) hover:bg-(--bg) hover:ring-2 hover:ring-(--focus) hover:border-(--border-subtle)" />

                    <UButton v-if="leadStore.step === totalSteps" label="Envoyer ma demande" variant="outline"
                        :loading="loading" @click="handleSubmit" :disabled="leadStore.data.contact.email ? false : true"
                        class="block w-3xs md:w-xs mt-3 bg-(--bg-2) text-(--text-2) fs-body border-(--border-subtle) hover:bg-(--bg) hover:ring-2 hover:ring-(--focus) hover:border-(--border-subtle)" />
                </div>
            </UCard>
        </template>
    </UModal>
</template>

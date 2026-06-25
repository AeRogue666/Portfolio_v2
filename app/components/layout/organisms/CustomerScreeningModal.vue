c<script setup lang="ts">
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

watch(leadStore, (newLead) => {
    console.log(newLead.data)
});
watch(isOpen, async (opened) => {
    if (opened) await $fetch('/api/contact/init');
});
watch(leadStore, (newData) => {
    console.log(leadStore.data, leadStore.step, totalSteps.value, newData);
});

onMounted(() => console.log(leadStore.data, leadStore.step, totalSteps.value));

/** 
 * Sur SendMessageModal, ajouter :
 * Un outil de qualification client automatique (déterminer le besoin du client avant d'entamer une conversation)
 * Si curieux -> message simple / Si client sérieux -> projet structuré
 * Comment faire ? Pré-qualifier avant le call
 * Type de projet + complexité + budget implicite
 * 
 * Avec UTabs :
 * 
 * Tab 1 - Nature du besoin
 * Plusieurs boutons disponibles :
 * 
 * 1. Envoyer un message / Poser une question / Faire une demande
 * 2. Création d'un site
 * 3. Refonte d'un site
 * 4. Optimisations Accessibilité, SEO & Performance
 * 5. Audits Accessibilité, SEO, Performance, Sécurité
 * 6. Formation au numérique
 * 
 * En fonction du choix de l'utilisateur, il sera envoyé vers une destination :
 * 
 * 1. Message -> Directement au formulaire récapitulatif de fin (récapitulatif des actions, input email, textarea message)
 * 2. Creation -> Tab 2.1 --> Tab 3 --> Tab 4 --> Tab 5
 * 3. Refonte -> Tab 2.2 --> Tab 3 --> Tab 4 --> Tab 5
 * 4. Optimisation -> Tab 2.3 -> Tab 4 --> Tab 5
 * 5. Audit -> Tab 2.3 --> Tab 4 --> Tab 5
 * 6. Formation -> Tab 2.4 --> Tab 4 --> Tab 5
 * 
 * Tab 2.1 CREATION REFONTE : Spécification de la nature du site (site vitrine, site e-commerce, réservation, projet métier, etc.)
 * Tab 2.2 OPTIMISATION : Spécification de la nature de l'optimisation (optimisation accessibilité, optimisation SEO & performance, optimisation sécurité)
 * Tab 2.3 AUDIT : Spécification de la nature de l'audit (audit accessibilité, audit SEO & performance, audit sécurité)
 * Tab 2.4 FORMATION : Spécification de la nature de la formation (formation utilisation ordinateur, formation internet, formation messagerie mail, formation sécurité, formation outils quotidiens, formation IA, formation unique)
 * 
 * Tab 3.1 CREATION : Complexité (simple = 1-3 pages, moyenne = CMS + contenu, complexe = logique métier, mais aussi besoins cms, nombre de pages, logo, choix de couleurs, typographies, objectifs/attentes business, problèmes rencontrés, fonctionnalités envisagées, etc.)
 * Tab 3.2 REFONTE : Complexité (audit rapide + Tab 3.1)
 * Tab 3.3 OPTIMISATION : Complexité (audit rapide, objectifs/attentes business, problèmes rencontrés, fonctionnalités envisagées)
 * Tab 3.4 AUDIT : Complexité (nombre de pages, technos utilisées si connues par l'utilisateur, objectifs/attentes business, problèmes rencontrés)
 * Tab 3.5 FORMATION : Complexité (nombre de personnes, type de public, présentiel ou distanciel)
 * 
 * Tab 4 : Budget et délai (limite budgétaire, deadline, urgence)
 * Tab 5 : Récapitulatif & Formulaire de contact
 * Un récapitulatif de ce que le client a choisit est disponible avec le formulaire de contact.
*/
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
                    list: 'flex flex-col md:flex-row bg-(--bg) gap-4',
                    trigger: 'data-[state=active]:bg-(--focus) data-[state=active]:text-(--text-2) data-[state=inactive]:bg-(--bg) data-[state=inactive]:text-(--text-muted) data-[state=completed]:bg-(--bg-3) data-[state=completed]:text-(--text-muted) pointer-events-none opacity-50',
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

                <div class="flex flex-col md:flex-row items-center md:justify-between mt-6">
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

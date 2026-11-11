<script setup lang="ts">
import StepBudget from '~/components/layout/organisms/steps/StepBudget.vue';
import StepComplexity from '~/components/layout/organisms/steps/StepComplexity.vue';
import StepEnding from '~/components/layout/organisms/steps/StepEnding.vue';
import StepNature from '~/components/layout/organisms/steps/StepNature.vue';
import StepSpecification from '~/components/layout/organisms/steps/StepSpecification.vue';
import StepStarting from '~/components/layout/organisms/steps/StepStarting.vue';
import StepSummary from '~/components/layout/organisms/steps/StepSummary.vue';

const { t, locale, locales } = useI18n(),
    route = useRoute(),
    { scoreLead } = useLeadScoring(),
    leadStore = useLeadStore(),
    { submitState, loading, submit } = useContactForm(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode(),
    isSubmitted = ref(false),
    stepTitleRef = ref<HTMLElement | null>(null);

const tabs = [
    { title: "Nature" },
    { title: "Spécification" },
    { title: "Complexité" },
    { title: "Budget" },
    { title: "Récapitulatif" }
];
const totalSteps = computed(() => leadStore.data.projectType === "message" ? 2 : 5);
const progressBar = computed(() => leadStore.step);
const grayscale = computed(() => accessibilityStore.grayscale);

function goNext() {
    if (leadStore.validateNextStep()) {
        leadStore.next()
    }
}

watch(() => leadStore.step, async () => {
    await nextTick()
    if (stepTitleRef.value) {
        stepTitleRef.value.focus()
    }
});

function goBack() {
    if (leadStore.validateBackStep()) {
        leadStore.back()
    }
}

async function handleSubmit() {
    const result = scoreLead(leadStore.data);
    leadStore.data.leadScore = result.score;
    leadStore.data.leadTier = result.tier;
    isSubmitted.value = false

    try {
        await submit({
            type: leadStore.data.projectType === "message" ? "message" : "qualified",
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
        })
    } catch (error) {
        console.error("Une erreur est survenue lors de la soumission : ", error)
    } finally {
        if (submitState.value === "success") {
            isSubmitted.value = true
            leadStore.step = 6
        }
    }
}

onMounted(async () => {
    await $fetch('/api/contact/init');
    if (leadStore.hasDraft() && leadStore.data.projectType) {
        leadStore.restore()
    } else {
        leadStore.reset()
    }
});

useSeoMeta({
    title: "Démarrer un projet internet accessible | CodeKorico",
    ogTitle: "Démarrer un projet internet accessible | CodeKorico",
    description: "",
    ogDescription: "",
    ogUrl: () => `https://codekorico.com${route.path}`,
    ogImage: "https://codekorico.com",
    ogImageType: "image/png",
    ogImageWidth: 1920,
    ogImageHeight: 1080,
    ogType: "website"
})
useHead({
    link: [
        {
            key: "canonical",
            rel: "canonical",
            href: `https://codekorico.com${route.path}`
        },
        ...locales.value.map((l: { code: string }) => ({
            key: `alternate-${l.code}`,
            rel: 'alternate',
            hreflang: l.code,
            href: `https://codekorico.com${route.path}`
        } as const))
    ]
})

useSchemaOrg([
    defineWebPage({
        "@type": "ContactPage",
        name: "Espace de Qualification et Contact - CodeKorico",
        description: "Formulaire interactif à étapes pour qualifiers les besoins de création de site web, refonte, optimisation et maintenance ainsi que de formations au numérique et à l'IA éthique pour les professionnels, entreprises et particuliers.",
        provider: {
            type: "ProfessionnalService",
            '@id': "https://codekorico.com"
        }
    })
])
</script>

<template>
    <div class="w-full mx-auto px-4 py-12 text-(--text)">
        <!-- <div class="">
            <label id="progress-label" for="form-progress" class="block fs-small font-medium text-(--text-muted)">
                Progression du formulaire : Etape {{ leadStore.step }} sur {{ totalSteps }}
            </label>
            <progress id="form-progress" aria-labelledby="progress-label" :value="leadStore.step" :max="totalSteps" class="">
            </progress>
        </div> -->

        <UCard :ui="{
                root: 'overflow-y-auto bg-(--bg-2) ring-(--border-subtle)',
                title: 'fs-title text-(--text)',
                description: 'fs-small text-(--text-muted)',
                header: 'bg-(--bg-2) text-(--text-2) border-(--border-medium)',
                body: 'flex flex-col bg-(--bg-2) text-(--text-2) fs-body gap-6'
            }">
            <template #header>
                <div class="flex flex-col gap-4">
                    <h1 ref="stepTitleRef" tabindex="-1" class="fs-heading font-bold tracking-tight leading-relaxed whitespace-normal wrap-break-word">
                        Démarrons votre projet
                    </h1>
                    <p class="fs-body font-normal text-(--text-2)">
                        Etape {{ leadStore.step }} sur {{ totalSteps }}
                    </p>
                </div>
            </template>

            <UStepper v-model="progressBar" :items="tabs" disabled :ui="{
                    header: 'flex flex-col md:flex-row gap-4',
                    trigger: grayscale
                        ? 'data-[state=active]:bg-(--bg) data-[state=active]:text-(--text-2) data-[state=inactive]:bg-(--bg-2) data-[state=inactive]:text-(--text-muted) data-[state=completed]:bg-(--bg-3) data-[state=completed]:text-(--text-muted) pointer-events-none opacity-50'
                        : 'data-[state=active]:bg-(--focus) data-[state=active]:text-(--text) data-[state=inactive]:bg-(--bg) data-[state=inactive]:text-(--text-muted) data-[state=completed]:bg-(--bg-3) data-[state=completed]:text-(--text-muted) pointer-events-none opacity-50',
                    separator: 'data-[state=active]:bg-(--focus) data-[state=inactive]:bg-(--bg) data-[state=completed]:bg-(--bg-3)'
                }" />

            <Transition class="min-h-70 py-4">
                <StepStarting v-if="leadStore.step === 0" />
                <StepNature v-else-if="leadStore.step === 1" />
                <StepSpecification v-else-if="leadStore.step === 2 && leadStore.data.projectType !== 'message'" />
                <StepComplexity v-else-if="leadStore.step === 3" />
                <StepBudget v-else-if="leadStore.step === 4" />
                <StepSummary v-else-if="leadStore.step === totalSteps" />
                <StepEnding v-else-if="leadStore.step === 6" />
            </Transition>

            <div class="flex flex-col md:flex-row items-center md:justify-between mt-6 gap-4">
                <div class="flex flex-col md:flex-row mt-6 gap-4">
                    <UButton @click="goBack" :label="'Retour'" variant="ghost" :disabled="leadStore.step > 0 ? false : true" class="block w-3xs md:w-xs mt-3 bg-(--bg-2) text-(--text-2) fs-body ring ring-(--focus) border-(--border-subtle) hover:bg-(--bg) hover:ring-2 hover:ring-(--focus) hover:border-(--border-subtle)" />
                    <UButton v-if="leadStore.step < totalSteps" @click="goNext" :label="'Suivant'" variant="ghost" :disabled="leadStore.step !== 0 ? leadStore.data.projectType ? false : true : false" class="block w-3xs md:w-xs mt-3 bg-(--bg-2) text-(--text-2) fs-body ring ring-(--accent) border-(--border-subtle) hover:bg-(--bg) hover:ring-2 hover:ring-(--focus) hover:border-(--border-subtle)" />
                </div>

                <div class="flex flex-col md:flex-row mt-6 gap-4">
                    <UButton @click="leadStore.reset()" :label="'Réinitialiser le formulaire'" :disabled="leadStore.data ? false : true" variant="ghost" class="block w-3xs md:w-xs mt-3 dark:bg-(--brand-color)/20 light:bg-(--brand-color)/40 text-(--text) fs-body ring ring-(--accent) border-(--border-subtle) dark:hover:bg-(--brand-color) light:hover:bg-(--brand-color)/90 light:hover:text-inverted hover:ring-2 hover:ring-(--focus) hover:border-(--border-subtle)" />
                    <UButton @click="handleSubmit" :loading="loading" :disabled="leadStore.data.contact.email ? false : true" :label="'Soumettre le formulaire'" variant="ghost" class="block w-3xs md:w-xs mt-3 bg-(--bg-2) text-(--text-2) fs-body ring ring-(--accent) border-(--border-subtle) hover:bg-(--bg) hover:ring-2 hover:ring-(--focus) hover:border-(--border-subtle)" />
                </div>
            </div>
        </UCard>
    </div>
</template>
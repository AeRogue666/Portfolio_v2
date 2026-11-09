<script setup lang="ts">
import CustomerScreeningModal from './layout/organisms/CustomerScreeningModal.vue';

withDefaults(defineProps<{
    title: string;
    ctaLabel?: string;
    ctaClass?: string;
    ctaIcon?: string;
    projectType?: string;
    subType?: string;
    ctaBtnLabel?: string;
    ctaBtnClass?: string;
    ctaBtnIcon?: string;
    ctaBtnLink?: string;
    ctaBtnName?: string;
    ctaBtnAriaLabel?: string;
}>(), {
    title: 'Lancer votre présence sur internet dès maintenant !',
    ctaLabel: 'Démarrer votre projet',
    ctaClass: 'bg-(--bg-3) text-(--text) fs-body leading-relaxed whitespace-normal wrap-break-word max-w-[65%] sm:max-w-none',
    ctaIcon: 'fa7-solid:message',
    projectType: 'creation',
    subType: undefined,
    ctaBtnLabel: undefined,
    ctaBtnClass: undefined,
    ctaBtnIcon: undefined,
    ctaBtnLink: undefined,
    ctaBtnName: undefined,
    ctaBtnAriaLabel: undefined
})
</script>

<template>
    <div
        class="flex flex-col items-center justify-center w-full my-10 py-6 px-4 bg-(--bg-2) border border-solid border-(--border-subtle) rounded-xl gap-4">
        <p class="fs-body font-medium text-(--text) m-0 my-6 max-w-md">
            {{ title }}
        </p>

        <ClientOnly>
            <CustomerScreeningModal :cta-label="ctaLabel" :cta-icon="ctaIcon" :cta-class="ctaClass"
                :project-type="projectType" :sub-type="subType" />

            <UButton v-if="ctaBtnLabel && ctaBtnAriaLabel && ctaBtnLink" :to="ctaBtnLink" :name="ctaBtnName" :label="ctaBtnLabel" :icon="ctaBtnIcon"
                :class="ctaBtnClass" :aria-label="ctaBtnAriaLabel" />
        </ClientOnly>
    </div>
</template>
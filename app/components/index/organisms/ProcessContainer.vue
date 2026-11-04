<script setup lang="ts">
import ProcessCard from '../molecules/ProcessCard.vue';

interface Element {
    title: string,
    description?: string,
    icon: string,
    class?: string,
    iconClass?: string,
}

const props = defineProps<{
    elements: Element[];
    variant?: 'process' | 'differentiation';
}>();

const { t } = useI18n(),
    accessibilityStore = useAccessibilityStore();
const grayscale = computed(() => accessibilityStore.grayscale);

const reduceMotion = computed(() => {
    if (import.meta.client) {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
});

const sectionVariant = computed(() => props.variant || 'process');
const activeTab = ref(0);
const activeStep = ref(1);
const containerRef = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

onMounted(() => {
    if (reduceMotion.value) return;

    if (window.matchMedia('(min-width: 768px)').matches) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const stepAttr = entry.target.getAttribute("data-step");
                    if (stepAttr) activeStep.value = parseInt(stepAttr);
                }
            });
        }, {
            rootMargin: '-30% 0px -30% 0px'
        });

        const targets = containerRef.value?.querySelectorAll('.js-scroll-step');
        targets?.forEach((el) => observer?.observe(el));
    }
});

onMounted(() => {
    if (observer) observer.disconnect();
});
</script>

<template>
    <div ref="containerRef" class="w-full relative" :class="{ 'grayscale-100': grayscale }">
        <div class="w-full relative">
            <UContainer class="w-full relative">

                <!-- VERSION MOBILE -->
                <div class="block md:hidden w-full">
                    <div class="flex overflow-x-auto pb-4 gap-2 scrollbar-none" role="tablist"
                        :aria-label="t('index.expertise_section.tag')">
                        <button v-for="(_, index) in props.elements" :key="`tab-btn-${index}`" role="tab"
                            :aria-selected="activeTab === index" :aria-controls="`tab-panel-${index}`"
                            :id="`tab-id-${index}`" class="flex shrink-0 px-4 py-2 fs-small font-medium rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus)" :class="[
                                activeTab === index
                                    ? 'bg-(--text) text-(--bg) font-semibold shadow-sm'
                                    : 'bg-(--bg-2) text-(--text-2) hover:bg-(--bg-3)/10'
                            ]" @click="activeTab = index">
                            {{ index + 1 }}
                        </button>
                    </div>

                    <div v-for="(el, i) in props.elements" :key="`panel-${i}`" :id="`tab-panel-${i}`" role="tabpanel" :aria-labelledby="`tab-id-${i}`" v-show="activeTab === i" class="mt-4 focus:outline-none" tabindex="0">
                        <ProcessCard v-bind="el" :position="i + 1" :grayscale="grayscale" />
                    </div>
                </div>

                <!-- VERSION DESKTOP -->
                <div class="hidden md:flex items-start md:gap-1- w-full text-left">
                    <div class="w-2/5 pr-4 sticky top-32">
                        <nav v-if="sectionVariant === 'process'" class="relative pl-6 border-m border-(--text-2)/20" aria-label="Progression du processus">
                            <div v-if="!reduceMotion" class="absolute left-px top-0 w-0.5 bg-(--accent) transition-all duration-300" :style="{ height: `${((activeStep - 1) / (props.elements.length - 1)) * 100}%`}">  
                            </div>

                            <ul class="flex flex-col gap-12">
                                <li v-for="(el, i) in props.elements" :key="`step-indicator-${i}`" class="flex items-center min-h-8 pl-6 relative">
                                    <div class="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-(--bg) z-10" :class="[
                                        activeStep >= (i + 1) 
                                        ? 'bg-(--accent) ring-4 ring-(--accent)/20'
                                        : 'bg-(--bg-2)'
                                    ]">
                                        <span class="fs-body font-medium block leading-tight transition-all duration-300" :clas="{
                                            'text-(--text) font-semibold translate-x-1' : activeStep === (i + 1),
                                            'text-(--text-2)/40' : activeStep !== (i + 1)
                                        }">
                                        {{ el.title }}
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </nav>

                        <nav v-else class="pl-4 relative" aria-label="Points clés de différenciation">
                            <ul class="flex flex-col gap-8">
                                <li v-for="(el, i) in props.elements" :key="`diff-indicator-${i}`">
                                    <span class="font-bold block leading-tight tracking-tight text-2xl transition-all duration-300" :class="[
                                        activeStep === (i + 1) ? 'text-(--accent) translate-x-2' : 'text-(--text-2)/30'
                                    ]">
                                        {{ el.title }}
                                    </span>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <!-- COLONNE DROITE -->
                    <div class="w-3/5">
                        <!-- STRATEGIE A : Split-screen Sticky Scrol classique (Process) -->
                        <ol v-if="sectionVariant === 'process'" class="space-y-[50vh] pb-[30vh]">
                            <li v-for="(el, i) in props.elements" :key="`step-content-long-${i}`" :data-step="i + 1" class="js-scroll-step transition-all duration-500 ease-in-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100" :class="[
                                activeStep === (i + 1) ? 'opacity-100 scale-100' : 'opacity-20 scale-95 blur-[0.5px]'
                            ]">
                            <ProcessCard v-bind="el" :position="i + 1" :grayscale="grayscale" />
                            </li>
                        </ol>

                        <!-- STRATEGIE B : Sticky Stacking Cards (Differentiation) -->
                        <ol v-else class="stacking-cards-container space-y-24 pb-[20vh]">
                            <li v-for="(el, i) in props.elements" :key="`step-content-stack-${i}`" :data-step="i + 1" :style="{ '--stack-index': i }"
                            class="js-scroll-step sticky-card bg-(--bg) rounded-2xl transition-shadow duration-300" :class="{ 'shadow-xl' : activeStep >= (i + 1) }">
                            <ProcessCard v-bind="el" :position="i + 1" :grayscale="grayscale" />
                            </li>
                        </ol>
                    </div>
                </div>
            </UContainer>
        </div>
    </div>

    <!-- <UContainer ref="container" class="py-24 relative" :class="grayscale ? 'grayscale-100' : ''">
        <div class="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-x-16 gap-y-20 relative z-10">
            <ProcessCard v-for="el in props.elements" :key="el.title" v-bind="el"
                :position="props.elements.indexOf(el) + 1" :grayscale="grayscale" />
        </div>
    </UContainer> -->

    <!-- <div ref="containerRef" class="relative w-full" :class="grayscale ? 'grayscale-100' : ''">
        <div class="w-full relative" :class="sectionVariant === 'differentiation'
            ? 'md:sticky md:top-0 md:h-screen md:flex md:items-center md:py-0 md:overflow-hidden'
            : 'py-24'">
            <UContainer class="w-full relative">
                <div class="block md:hidden w-full">
                    <div class="flex overflow-x-auto pb-4 gap-2 scrollbar-none" role="tablist"
                        :aria-label="t('index.expertise_section.tag')">
                        <button v-for="(_, index) in props.elements" :key="'tab-btn-' + index" role="tab"
                            :aria-selected="activeTab === index" :aria-controls="'tab-panel-' + index"
                            :id="'tab-id-' + index"
                            class="flex shrink-0 px-4 py-2 fs-small font-medium rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus)"
                            :class="[
                                activeTab === index
                                    ? 'bg-(--text) text-(--bg) font-semibold shadow-sm'
                                    : 'bg-(--bg-2) text-(--text-2) hover:bg-(--bg-3)/10'
                            ]" @click="activeTab = index">
                            {{ index + 1 }}
                        </button>
                    </div>

                    <div v-for="(el, index) in props.elements" :key="'panel-' + index" :id="'tab-panel-' + index"
                        role="tabpanel" :aria-labelledby="'tab-id-' + index" v-show="activeTab === index"
                        class="mt-4 focus:outline-none" tabindex="0">
                        <ProcessCard v-bind="el" :position="index + 1" :grayscale="grayscale" />
                    </div>
                </div>

                <div class="hidden md:flex items-start md:gap-16 w-full text-left"
                    :class="sectionVariant === 'differentiation' ? 'md:items-center h-full' : ''">
                    <div class="w-2/5 pr-4" :class="sectionVariant === 'process' ? 'sticky top-48' : 'relative'">
                        <nav v-if="sectionVariant === 'process'" class="relative pl-6 border-l border-(--text-2)/20"
                            aria-label="Progression du processus">
                            <div class="absolute left-px top-0 w-0.5 bg-(--accent) transition-all duration-300" :style="{
                                height: `${((activeStep - 1) / (props.elements.length - 1)) * 100}%`
                            }">
                            </div>

                            <ul class="flex flex-col gap-12">
                                <li v-for="(el, index) in props.elements" :key="'step-indicator-' + index"
                                    class="flex items-center min-h-8 pl-8 relative">
                                    <div class="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300 border-2 border-(--bg) z-10"
                                        :class="[
                                            activeStep >= (index + 1) ? 'bg-(--accent) ring-4 ring-(--accent)/20' : 'bg-(--bg-2)'
                                        ]">
                                    </div>
                                    <span class="fs-body font-medium transition-all duration-300 block leading-tight"
                                        :class="[activeStep === (index + 1) ? 'text-(--text) font-semibold translate-x-1' : 'text-(--text-2)/40']">
                                        {{ el.title }}
                                    </span>
                                </li>
                            </ul>
                        </nav>

                        <nav v-else-if="sectionVariant === 'differentiation'" class="relative pl-4"
                            aria-label="Point clés de différenciation">
                            <ul class="flex flex-col gap-8">
                                <li v-for="(el, index) in props.elements" :key="'diff-indicator-' + index">
                                    <span
                                        class="fs-lead font-bold transition-all duration-300 block leading-tight tracking-tight text-2xl"
                                        :class="[
                                            activeStep === (index + 1)
                                                ? 'text-(--accent) translate-x-2'
                                                : 'text-(--text-2)/30'
                                        ]">
                                        {{ el.title }}
                                    </span>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div class="w-3/5 relative">
                        <ol v-if="sectionVariant === 'process'" class="space-y-[60vh] pb-[40vh] pt-[5vh]">
                            <li v-for="(el, index) in props.elements" :key="'step-content-long-' + index"
                                :data-step="index + 1"
                                class="transition-all duration-500 ease-in-out motion-reduce:transition-none" :class="[
                                    activeStep === (index + 1)
                                        ? 'opacity-100 scale-100'
                                        : 'opacity-15 scale-95 blur[0.3px] motion-reduce:opacity-100 motion-reduce:blur-none'
                                ]">
                                <ProcessCard v-bind="el" :position="index + 1" :grayscale="grayscale" />
                            </li>
                        </ol>

                        <ol v-else-if="sectionVariant === 'differentiation'"
                            class="flex items-center justify-center w-full h-120 relative">
                            <li v-for="(el, index) in props.elements" :key="'step-content-fade-' + index"
                                :data-step="index + 1"
                                class="flex items-center justify-center w-full absolute inset-0 transition-all duration-500 ease-in-out motion-reduce:transition-none"
                                :class="[
                                    activeStep === (index + 1)
                                        ? 'opacity-100 scale-100 pointer-events-auto translate-y-0 z-20'
                                        : 'opacity-0 scale-95 pointer-events-auto translate-y-4 Z-10'
                                ]">
                                <ProcessCard v-bind="el" :position="index + 1" :grayscale="grayscale" />
                            </li>
                        </ol>
                    </div>
                </div>
            </UContainer>
        </div>
    </div> -->
</template>

<style lang="css" scoped>
.scrollbar-none::-webkit-scrollbar {
    display: none;
}

.scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

@media (min-width: 768px) {
    .sticky-card {
        position: sticky;
        top: calc(10rem + (var(--stack-index) * 20px));
    }
}

@media (prefers-reduced-motion: reduce) {
    .sticky-card {
        position: relative !important;
        top: initial !important;
    }
}
</style>
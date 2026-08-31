<script setup lang="ts">

const accessibilityStore = useAccessibilityStore();

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

interface Props {
    imageBefore: string;
    altBefore: string;
    imageAfter: string;
    altAfter: string;
    labelText?: string;
};

withDefaults(defineProps<Props>(), {
    labelText: "Glissez pour comparer l'ancien et le nouveau site"
});

const sliderPosition = ref(50); // 50%
const sliderId = useId();
</script>

<template>
    <UContainer
        class="w-full max-w-4xl mx-auto my-6 overflow-hidden rounded-xl border border-(--bg-2) bg-(--bg) shadow-xl relative aspect-16/10 select-none group">
        <!-- Image AFTER (Background) -->
        <NuxtImg :src="imageAfter" :alt="altAfter" :class="grayscale ? 'grayscale-100' : ''"
            class="block w-full h-full absolute top-0 left-0 object-cover" loading="lazy" />

        <!-- Image BEFORE (foreground, dynamically hidden in polygon) -->
        <div class="absolute top-0 left-0 w-full h-full will-change-[clip-path]"
            :style="{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }">
            <NuxtImg :src="imageBefore" :alt="altBefore" :class="grayscale ? 'grayscale-100' : ''"
                class="block w-full h-full absolute top-0 left-0 object-cover" loading="lazy" />
        </div>

        <!-- Fixed Badges -->
        <div
            class="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md border border-(--border-subtle) bg-(--bg)/90 text-(--text-2) absolute bottom-4 left-4 z-10 pointer-events-none select-none backdrop-blur-sm shadow-sm transition-opacity group-hover:opacity-100 duration-200">
            <span>Avant</span>
        </div>

        <div
            class="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md border border-(--border-subtle) bg-(--bg)/90 text-(--text-2) absolute bottom-4 right-4 z-10 pointer-events-none select-none backdrop-blur-sm shadow-sm transition-opacity group-hover:opacity-100 duration-200">
            <span>Après</span>
        </div>

        <!-- Visual bar separator -->
        <div class="absolute top-0 bottom-0 w-0.5 bg-(--accent) -translate-x-1/2 pointer-events-none z-10"
            :style="{ left: `${sliderPosition}%` }">
            <!-- Central control button -->
            <div class="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-(--bg) border-2 border-(--accent-soft) text-(--accent) shadow-lg group-hover:scale-105 group-hover:text-(--accent-hover) transition-transform duration-200"
                aria-hidden="true">
                <UIcon name="fa7-solid:arrows-left-right" class="w-5 h-5" />
            </div>
        </div>

        <!-- Accessibility: Native transparent input focusable and controlable with keyboard arrows -->
        <label :for="sliderId" class="sr-only">{{ labelText }}</label>
        <input v-model="sliderPosition" type="range" :id="sliderId" min="0" max="100"
            class="w-full h-full absolute top-0 left-0 opacity-0 cursor-ew-resize z-20 focus-visible:outline-none" />
    </UContainer>
</template>

<style lang="css" scoped>
input[type="range"]:focus-visible~div .rounded-full {
    outline: 3px solid var(--brand, #d62628);
    outline-offset: 3px;
}
</style>
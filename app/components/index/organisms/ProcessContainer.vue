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

const accessibilityStore = useAccessibilityStore();
const grayscale = computed(() => accessibilityStore.grayscale);
</script>

<template>
    <UContainer class="py-24 relative" :class="grayscale ? 'grayscale-100' : ''">
        <ol class="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-x-16 gap-y-20 relative z-10">
            <li v-for="(el, i) in props.elements" :key="el.title" :data-step="i + 1"
                class="transition-all duration-500 ease-in-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100 opacity-100 scale-95 blur-[0.5px]">
                <ProcessCard v-bind="el" :position="i + 1" :grayscale="grayscale" />
            </li>
        </ol>
    </UContainer>
</template>

<style lang="css" scoped>
.scrollbar-none::-webkit-scrollbar {
    display: none;
}

.scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
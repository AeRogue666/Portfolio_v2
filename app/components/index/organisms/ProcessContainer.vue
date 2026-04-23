<script setup lang="ts">
import ProcessCard from '../molecules/ProcessCard.vue';

interface Element {
    title: string,
    description?: string,
    icon: string,
    size?: string | number | undefined,
    class?: string,
    iconClass?: string,
}

const props = defineProps<{
    elements: Element[];
}>();
</script>

<template>
    <UContainer ref="container" class="py-24 relative">
        <!-- Cards grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-x-16 gap-y-20 relative z-10">
            <ProcessCard v-for="el in props.elements" :key="el.title" v-bind="el" :position="props.elements.indexOf(el) + 1" />
        </div>
    </UContainer>
</template>
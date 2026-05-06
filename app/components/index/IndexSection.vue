<script setup lang="ts">
defineProps<{
    class?: string;
    fill?: string;
}>();
</script>

<template>
    <section
        class="flex flex-col justify-between items-center w-full h-auto mt-[6vh] py-30 gap-10 overflow-hidden rounded-2xl relative"
        :class="class">
        <!-- A - Grain : Texture subtile en arrière-plan -->
        <div class="absolute inset-0 pointer-events-none z-0" aria-hidden="true"></div>

        <div class="flex flex-col items-center w-full px-4 relative gap-4 z-10">
            <slot name="tag"></slot>
            <slot name="title"></slot>
            <slot name="description"></slot>
            <slot></slot>
        </div>

        <!-- B - Vague SVG de séparation avec la section suivante -->
        <svg class="block w-full h-18 absolute -bottom-px left-0 right-0 z-2" view-box="0 0 1846 320"
            preserve-aspect-ratio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M0,36 C180,72 360,0 540,28 C720,56 900,8 1080,36 C1260,60 1360,18 1846,36 L1846,72 L0,72 Z"
                :fill="`var(${fill})`" />
        </svg>
    </section>
</template>
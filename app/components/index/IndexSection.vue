<script setup lang="ts">
const props = defineProps<{
    class?: string;
    fill?: string;
}>();
</script>

<template>
    <section
        class="flex flex-col justify-between items-center w-full h-auto mt-[6vh] py-30 gap-10 overflow-hidden rounded-2xl relative"
        :class="props.class">
        <!-- A - Grain : Texture subtile en arrière-plan -->
        <div class="absolute inset-0 pointer-events-none z-0" aria-hidden="true"></div>

        <div class="flex flex-col items-center w-full px-4 relative gap-4 z-10">
            <slot name="tag"></slot>
            <slot name="title"></slot>
            <slot name="description"></slot>
            <slot></slot>
        </div>

        <!-- B - Vague SVG de séparation avec la section suivante -->
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
            class="block w-full h-auto absolute -bottom-px left-0 right-0 z-2">
            <defs>
                <linearGradient id="wave-accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.18" />
                    <stop offset="50%" stop-color="var(--accent)" stop-opacity="0.32" />
                    <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.14" />
                </linearGradient>
            </defs>

            <path fill="url(#wave-accent-grad)"
                d="M0 105c240-65 440 55 720 15s460-75 740-15c160 35 280 15 386-5v85H0Z" />

            <path class="fill-(--bg-3)" d="M0 95c180 75 360-75 540-18s360-42 540 18c180 50 280-38 766 0v95H02" />
        </svg>
    </section>
</template>
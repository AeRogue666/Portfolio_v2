<script setup lang="ts">
import IconBox from '../atoms/IconBox.vue';

const root = ref<HTMLElement | null>(null);

const props = defineProps<{
    title: string;
    description?: string;
    icon: string;
    size?: string | number;
    class?: string;
    iconClass?: string;
    position?: number;
    grayscale: boolean;
}>();

defineExpose({ root });

const colorChange = computed(() => props.grayscale
    ? 'bg-transparent text-(--text) ring-0 -top-1 -right-1'
    : 'bg-transparent text-(--text-2) ring-0 -top-1 -right-1'
);
</script>

<template>
    <div ref="root" class="flex flex-col items-center text-center gap-7 relative z-10">
        <UChip :text="position" color="neutral" class="text-6xl" inset :ui="{
            base: colorChange
        }">
            <IconBox :icon="icon" :size="size" :class="class" :icon-class="iconClass" />
        </UChip>

        <div class="flex flex-col items-center w-60 gap-3">
            <p class="text-lg lg:text-xl lg:text-center font-medium text-(--text) fs-lead">
                {{ title }}
            </p>
            <span class="text-sm text-(--text) font-semibold lg:text-center tracking-widest fs-small">
                {{ description }}
            </span>
        </div>
    </div>
</template>
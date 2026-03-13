<script setup lang="ts">
import IconBox from '../atoms/IconBox.vue';

const root = ref<HTMLElement | null>(null);

defineProps<{
    title: string;
    description?: string;
    icon: string;
    size?: string | number;
    class?: string;
    iconClass?: string;
    position?: number;
}>();

defineExpose({ root });
</script>

<template>
    <div ref="root" class="flex flex-col items-center text-center gap-7 relative z-10">
        <UChip :text="position" color="neutral" class="text-6xl" inset :ui="{
            base: 'bg-transparent ring-0 text-(--text-2) -top-1 -right-1'
        }">
            <IconBox :icon="icon" :size="size" :class="class" :icon-class="iconClass" />
        </UChip>

        <div class="flex flex-col items-center w-60 gap-3">
            <p class="text-lg lg:text-xl lg:text-center font-medium text-(--text)" style="font-size: var(--step-1);">
                {{ title }}
            </p>
            <span class="text-sm text-(--text-2)">{{ description }}</span>
        </div>
    </div>
</template>
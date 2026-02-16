<script setup lang="ts">
defineProps<{
    label: string,
    icon: string,
    size: string,
    id: string,
    variant?: "ghost" | "solid" | "outline" | "soft" | "subtle" | "link" | undefined,
    color?: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral" | undefined,
    class?: string | object | undefined,
    to?: string | undefined,
    target?: string | undefined,
}>();
</script>

<template>
    <UButton :variant="variant" :color="color" :to="to" :target="target" :id="id" :aria-labelledby="`${id}-label`"
        class="flex flex-row items-center w-10 h-10 bg-(--bg-2) text-(--text-2) rounded-full gap-2" :class="class">
        <UIcon :name="icon" :class="size" />
        <span :id="`${id}-label`" class="sr-only">{{ label }}</span>
    </UButton>
</template>
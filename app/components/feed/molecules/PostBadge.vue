<script setup lang="ts">
defineProps<{
    label: string,
    icon?: string,
    color?: "neutral" | "error" | "primary" | "secondary" | "success" | "info" | "warning" | undefined,
    variant?: "soft" | "solid" | "outline" | "subtle" | undefined,
    size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined,
    className?: string,
}>();
</script>

<template>
    <UBadge :label="label" :leading-icon="icon" :color="color ?? 'neutral'" :variant="variant ?? 'soft'"
        :size="size ?? 'md'" :class="className" />
</template>
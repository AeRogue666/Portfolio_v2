<script setup lang="ts">
const props = withDefaults(defineProps<{
    title: string
    icon?: string
    class?: string
}>(), {
    icon: undefined,
    class: ''
});
</script>

<template>
    <div class="flex flex-col p-6 bg-(--bg-2) border border-solid border-(--border-subtle) rounded-xl shadow-sm transition-all duration-200 hover:border-(--border-subtle) gap-3"
        :class="props.class">
        <div class="flex items-center gap-3">
            <UIcon v-if="icon" :name="icon" class="size-6 text-(--text) shrink-0" aria-hidden="true" />
            <h3 class="fs-subtitle font-semibold  text-(--text) tracking-tight m-0">
                {{ title }}
            </h3>
        </div>

        <div class="fs-small text-(--text-2) leading-relaxed m-0 p-6 whitespace-normal wrap-break-word">
            <slot></slot>
        </div>
    </div>
</template>
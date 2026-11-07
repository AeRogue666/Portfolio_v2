<script setup lang="ts">
const props = withDefaults(defineProps<{
    columns?: number | string
    class?: string
}>(), {
    columns: 3,
    class: ''
});

const gridColsClass = computed(() => {
    const cols = Number(props.columns)
    if (cols === 2) return 'grid-cols-1 md:grid-cols-2'
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
});
</script>

<template>
    <div class="grid w-full my-8 gap-6" :class="[gridColsClass, props.class]">
        <slot></slot>
    </div>
</template>
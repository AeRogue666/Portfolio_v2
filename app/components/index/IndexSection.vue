<script setup lang="ts">
defineProps<{
    class?: string;
}>();
</script>

<template>
    <section class="flex flex-col justify-between items-center w-full h-auto mt-[6vh] py-6 gap-12" :class="class">
        <slot name="header"></slot>
        <div class="flex flex-col items-center w-full">
            <slot name="tag"></slot>

            <slot name="title"></slot>
            
            <slot name="description"></slot>
            
            <slot></slot>
        </div>
    </section>
</template>
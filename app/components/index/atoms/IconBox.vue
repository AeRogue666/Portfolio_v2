<script setup lang="ts">
defineProps<{
    icon: string,
    size?: string | number,
    class?: string,
    iconClass?: string,
}>();
</script>

<template>
    <div class="flex justify-center items-center flex-none w-29.25 h-29.25 bg-blue-500 rounded-xl relative"
        :class="class">
        <UIcon :name="icon" :size="size" class="size-24 bg-white" :class="iconClass" />
    </div>
</template>
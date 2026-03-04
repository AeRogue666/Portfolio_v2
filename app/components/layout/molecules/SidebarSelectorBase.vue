<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col items-center w-full md:w-auto h-auto gap-4">
        <span class="text-2xl font-semibold tracking-tight leading-relaxed" style="font-size: var(--step-0);">
            <slot name="title"></slot>
        </span>
        <slot name="body"></slot>
    </div>
</template>
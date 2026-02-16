<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col items-center w-full md:w-auto h-auto gap-4">
        <span class="text-2xl font-semibold tracking-tight leading-snug"> <!-- text-base leading-relaxed text-(--text-2) max-w-[65ch] -->
            <slot name="title"></slot>
        </span>
        <slot name="body"></slot>
    </div>
</template>
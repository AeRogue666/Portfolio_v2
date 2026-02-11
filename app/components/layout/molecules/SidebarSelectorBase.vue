<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col items-center w-full md:w-auto h-auto gap-4">
        <span class="text-base font-bold">
            <slot name="title"></slot>
        </span>
        <slot name="body"></slot>
    </div>
</template>
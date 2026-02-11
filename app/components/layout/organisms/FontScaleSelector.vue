<script setup lang="ts">
defineProps<{
    fontScale: FontScale
}>();

const increaseFont = defineModel('increaseFont', { required: true });
const decreaseFont = defineModel('decreaseFont', { required: true });
</script>

<template>
    <div class="relative inline-flex items-center" role="group">
        <div class="absolute flex items-center inset-y-0 start-0 bg-(--bg-tertiary) p-0">
            <UButton label="Diminuer la taille du texte" @click="decreaseFont"
                class="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-base gap-2 text-inverted bg-(--text) hover:bg-(--text)/75 active:bg-(--focus)/75 disabled:bg-(--text-3) aria-disabled:bg-(--text-3) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary p-2">
                <UIcon name="fa7-solid:minus" class="shrink-0 size-6" />
            </UButton>
        </div>

        <span aria-live="polite" class="w-full px-20 py-1.5 rounded-md border-0 bg-(--bg-secondary)">{{
            Math.round(fontScale * 100) }} %</span>

        <div class="absolute flex items-center inset-y-0 end-0 bg-(--bg-tertiary) p-0">
            <UButton data-slot="base" label="Augmenter la taille du texte" @click="increaseFont"
                class="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-base gap-2 text-inverted bg-(--text) hover:bg-(--text)/75 active:bg-(--focus)/75 disabled:bg-(--text-3) aria-disabled:bg-(--text-3) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary p-2">
                <UIcon name="fa7-solid:plus" class="shrink-0 size-6" />
            </UButton>
        </div>
    </div>
</template>
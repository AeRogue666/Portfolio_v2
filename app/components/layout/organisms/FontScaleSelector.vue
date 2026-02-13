<script setup lang="ts">
import IconButton from '~/components/ui/IconButton.vue';

defineProps<{
    fontScale: FontScale
}>();

const increaseFont = defineModel('increaseFont', { required: true });
const decreaseFont = defineModel('decreaseFont', { required: true });
</script>

<template>
    <div class="relative inline-flex items-center" role="group">
        <div class="absolute flex items-center inset-y-0 start-0 p-0">
            <IconButton label="Diminuer la taille du texte" id="button-sidebarright-contrast-decrease"
                icon="fa7-solid:minus" @click="decreaseFont" size="shrink-0 size-6"
                class="rounded-md font-medium inline-flex justify-center items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-base gap-2 text-(--text-1) bg-(--bg-3) hover:bg-(--text-1)/75 active:bg-(--focus)/75 disabled:bg-(--text-3) aria-disabled:bg-(--text-3) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary p-2" />
        </div>

        <span aria-live="polite" class="w-full px-20 py-1.5 rounded-md border-0 bg-(--bg-2)">{{
            Math.round(fontScale * 100) }} %</span>

        <div class="absolute flex items-center inset-y-0 end-0 p-0">
            <IconButton label="Augmenter la taille du texte" id="button-sidebarright-contrast-increase"
                icon="fa7-solid:plus" @click="increaseFont" size="shrink-0 size-6"
                class="rounded-md font-medium inline-flex justify-center items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-base gap-2 text-(--text-1) bg-(--bg-3) hover:bg-(--text-1)/75 active:bg-(--focus)/75 disabled:bg-(--text-3) aria-disabled:bg-(--text-3) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary p-2" />
        </div>
    </div>
</template>
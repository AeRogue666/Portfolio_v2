<script setup lang="ts">
import { blockRegistry } from '@/lib/cms/blocks.registry';

const emit = defineEmits<{
    (e: "add", type: any): void;
}>();
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-auto">
        <UButton v-for="(_, type) in blockRegistry" :key="type" :label="`Ajouter ${type === 'image' ? `une ${type}` : `un ${type}`}`" class="rounded border fs-small px-2 py-1"
            icon="fa7-solid:plus" @click="emit('add', type)" />
    </div>
</template>
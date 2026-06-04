<script setup lang="ts">
import { blockRegistry } from '@/lib/cms/blocks.registry';
import type { Block } from '@/types/blocks.js';

defineProps<{
    blocks: Block[];
}>();

</script>

<template>
    <component v-for="block in blocks" :key="block.id" :is="blockRegistry[block.type].renderer" :block="block" />
</template>
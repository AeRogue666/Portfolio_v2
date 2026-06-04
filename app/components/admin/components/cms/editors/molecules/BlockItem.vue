<script setup lang="ts">
import type { Block } from '@/types/blocks';
import { blockRegistry } from '@/lib/cms/blocks.registry';

const props = defineProps<{
    block: Block,
    index: number;
    activeId: string | null;
}>();

const emit = defineEmits<{
    (e: "set-active", id: string): void;
    (e: "remove", id: string): void;
    (e: "add-between", type: Block["type"], index: number): void;
    (e: "move", from: number, to: number): void;
}>();

const isActive = computed(() => props.activeId === props.block.id);
const Component = computed(() => blockRegistry[props.block.type]?.component);
</script>

<template>
    <div class="border rounded-lg transition" :class="isActive ? 'ring-2 ring-blue-500' : ''"
        @click="emit('set-active', block.id)">
        <!-- HEADER -->
        <div class="flex justify-between mb-2 fs-small">
            <div class="flex items-center gap-2">
                <UIcon name="fa7-solid:grip-vertical" class="drag-handle cursor-grab" />

                <span>{{ block.type }}</span>
            </div>

            <UButton name="Delete" icon="fa7-solid:trash" color="error" variant="ghost"
                @click.stop="emit('remove', block.id)" />
        </div>

        <!-- EDITOR -->
        <component :is="Component" :block="block" />

        <!-- INSERTION BETWEEN -->
        <div class="flex justify-center mt-2 opacity-60 hover:opacity-100">
            <BlockAddMenu @add="(type: any) => emit('add-between', type, index + 1)" />
        </div>
    </div>
</template>
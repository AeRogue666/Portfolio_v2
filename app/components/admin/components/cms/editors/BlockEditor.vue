<script setup lang="ts">
import Sortable from 'sortablejs';
import type { Block } from '@/types/blocks';

import BlockAddMenu from './molecules/BlockAddMenu.vue';
import BlockItem from './molecules/BlockItem.vue';

const blocks = defineModel<Block[]>({
    required: true,
    default: () => [],
});
const route = useRoute();
const editor = useBlockEditor(blocks);
const sortableContainer = useTemplateRef<HTMLElement>('sortableContainer');

const { status } = useAutosave({
    id: route.params.id as string,
    blocks,
    save: async ({ id, blocks }) => {
        await $fetch(`/api/admin/content/${id}`, {
            method: "PUT",
            body: { blocks },
        })
    }
});

onMounted(() => {
    if (!sortableContainer.value) return

    Sortable.create(sortableContainer.value, {
        animation: 150,
        handle: '.drag-handle',

        onEnd(event) {
            const oldIndex = event.oldIndex;
            const newIndex = event.newIndex;
            if (oldIndex == null || newIndex == null || oldIndex === newIndex) return;

            editor.moveBlock(oldIndex, newIndex);
        }
    });
});

// const blockList = computed(() => blocks.value);
</script>

<template>
    <div class="space-y-4">
        <BlockAddMenu @add="editor.addBlock" />

        <div ref="sortableContainer" class="flex flex-col gap-2">
            <BlockItem v-for="(block, i) in blocks" :key="block.id" :block="block" :index="i"
                :active-id="editor.activeBlockId.value" @set-active="editor.setActive" @remove="editor.removeBlock"
                @add-between="editor.addBlock" @move="editor.moveBlock" />
            <span v-for="block in blocks" :key="block.id">{{ block }}</span>
        </div>
    </div>
</template>
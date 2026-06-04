import { createBlock } from "@/lib/cms/blocks.factory";
import type { Block } from "../types/blocks";

export function useBlockEditor(blocks: Ref<Block[]>) {
  const activeBlockId = ref<string | null>(null);

  const isDirty = ref(false);

  function setActive(id: string) {
    activeBlockId.value = id;
  }

  function addBlock(type: Block["type"], index?: number) {
    const block = createBlock(type);

    if (index === undefined) {
      blocks.value.push(block);
    } else {
      blocks.value.splice(index, 0, block);
    }

    activeBlockId.value = block.id;
    markDirty();
  }

  function removeBlock(id: string) {
    const index = blocks.value.findIndex((b) => b.id === id);
    if (index !== -1) blocks.value.splice(index, 1);
  }

  function moveBlock(from: number, to: number) {
    const item = blocks.value[from];
    if (!item) return;

    blocks.value.splice(from, 1);
    blocks.value.splice(to, 0, item);
  }

  function updateBlock(id: string, patch: Partial<Block>) {
    const block = blocks.value.find((b) => b.id === id);
    if (!block) return;
    Object.assign(block, patch);
  }

  function setBlocks(next: Block[]) {
    blocks.value = next;
    markDirty();
  }

  function markDirty() {
    isDirty.value = true;
  }

  function resetDirty() {
    isDirty.value = false;
  }

  return {
    blocks,
    activeBlockId,
    isDirty,

    setActive,
    addBlock,
    removeBlock,
    moveBlock,
    updateBlock,
    setBlocks,
    resetDirty,
  };
}

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from "@tiptap/extension-link";
import type { RichTextBlock } from '@/types/blocks';

const props = defineProps<{
    block: RichTextBlock;
}>();

const editor = useEditor({
    editable: false,

    extensions: [StarterKit, Link],
    content: props.block.content,
});
</script>

<template>
    <EditorContent :editor="editor" class="prose prose-neutral dark:prose-invert max-w-none" />
</template>
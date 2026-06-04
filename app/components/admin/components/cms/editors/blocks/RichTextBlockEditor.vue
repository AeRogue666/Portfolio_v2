<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from "@tiptap/extension-link";
import type { RichTextBlock } from '@/types/blocks';
import { createBlock } from '@/lib/cms/blocks.factory';

const props = defineProps<{
    block: RichTextBlock,
}>();

const emit = defineEmits<{
    (e: "update", value: RichTextBlock): void;
}>();

const editor = useEditor({
    content: {
        type: 'doc',
        content: [
            {
                type: "paragraph"
            }
        ]
    },
    extensions: [StarterKit, Link],
    editorProps: {
        attributes: {
            class: 'prose prose-sm focus:outline-none min-h-[200px] p-4 bg-(--bg-2) rounded-b-lg border border(--border-subtle)',
            'aria-label': 'Editeur de texte enrichi',
            role: 'textbox',
        }
    },
    onUpdate: ({ editor }) => {
        if (!props.block) {
            return createBlock("richText");
        }
        emit('update', {
            ...props.block,
            content: editor.getJSON(),
        });
    },
});

watch(() => props.block.content, (value) => {
    if (!editor.value || !value) return
    const current = editor.value.getJSON();

    if (JSON.stringify(current) === JSON.stringify(value)) return

    editor.value.commands.setContent(value);
}, {
    immediate: true,
    deep: true
});

onBeforeUnmount(() => {
    editor.value?.destroy()
});
</script>

<template>
    <div class="w-full rounded-lg border border-(--border-subtle)">
        <div class="flex flex-wrap gap-1 p-2 bg-(--bg) border-b border-(--border-subtle) rounded-t-lg" role="toolbar"
            aria-label="Formatage du texte">
            <UButton size="sm" color="neutral" :variant="editor?.isActive('bold') ? 'solid' : 'ghost'"
                icon="fa7-solid:bold" label="Gras" @click="editor?.chain().focus().toggleBold().run()" />
            <UButton size="sm" color="neutral" :variant="editor?.isActive('italic') ? 'solid' : 'ghost'"
                icon="fa7-solid:italic" label="Italique" @click="editor?.chain().focus().toggleItalic().run()" />
            <UButton size="sm" color="neutral" :variant="editor?.isActive('heading', { level: 2 }) ? 'solid' : 'ghost'"
                icon="fa7-solid:heading" label="Titre de niveau 2"
                @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" />
            <UButton size="sm" color="neutral" :variant="editor?.isActive('ul') ? 'solid' : 'ghost'"
                icon="fa7-solid:list" label="Liste de points (UL)"
                @click="editor?.chain().focus().toggleBulletList().run()" />
            <UButton size="sm" color="neutral" :variant="editor?.isActive('ol') ? 'solid' : 'ghost'"
                icon="fa7-solid:list" label="Liste ordonnée (OL)"
                @click="editor?.chain().focus().toggleOrderedList().run()" />
            <UButton size="sm" color="neutral" :variant="editor?.isActive('trash') ? 'solid' : 'ghost'"
                icon="fa7-solid:trash" label="Supprimer" @click="editor?.chain().focus().clearContent().run()" />
        </div>

        <EditorContent :editor="editor" />
    </div>
</template>
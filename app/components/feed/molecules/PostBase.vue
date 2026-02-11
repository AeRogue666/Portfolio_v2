<script setup lang="ts">
defineProps<{
    ariaRoleDescription?: string,
}>();
</script>

<template>
    <article class="flex flex-col mx-2 py-6 gap-4 border-b border-(--border-subtle)"
        :aria-roledescription="ariaRoleDescription">
        <header v-if="$slots.meta" class="flex flex-col justify-baseline items-baseline">
            <slot name="meta"></slot>
        </header>
        <section class="flex flex-col justify-baseline items-baseline">
            <slot></slot>
        </section>
        <footer v-if="$slots.actions" class="grid grid-cols-2 justify-baseline items-center">
            <slot name="actions"></slot>
        </footer>
    </article>
</template>
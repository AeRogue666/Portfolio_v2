<script setup lang="ts">
defineProps<{
    ariaRoleDescription?: string,
}>();
</script>

<template>
    <article class="flex flex-col w-full py-10"
        :aria-roledescription="ariaRoleDescription">
        <div class="flex flex-col w-full gap-6">
            <header v-if="$slots.meta" class="flex flex-col gap-3">
                <slot name="meta"></slot>
            </header>
            <section class="flex flex-col gap-4">
                <slot></slot>
            </section>
            <footer v-if="$slots.actions" class="pt-2">
                <slot name="actions"></slot>
            </footer>
        </div>
    </article>
</template>
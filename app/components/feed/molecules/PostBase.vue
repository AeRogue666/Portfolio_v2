<script setup lang="ts">
import type { FeedKind } from '~/app/types/feed';

const props = defineProps<{
    ariaRoleDescription?: string,
    cardType?: FeedKind;
}>();

const cardStyles = computed(() => {
    const baseClasses = 'flex flex-col w-full rounded-2xl transition-all duration-300 hover:shadow-lg';

    switch (props.cardType) {
        case 'project':
            return `${baseClasses} bg-(--bg-feed-project)`;
        case 'update':
            return `${baseClasses} bg-(--bg-feed-update)`;
        case 'about':
            return `${baseClasses} bg-(--bg-feed-about)`;
        default:
            return `${baseClasses} bg-(--bg-2)`;
    }
});
</script>

<template>
    <article :class="cardStyles" class="flex flex-col w-full py-10" :aria-roledescription="ariaRoleDescription">
        <div class="flex flex-col w-full gap-6">
            <header v-if="$slots.meta" class="flex flex-col mx-6 gap-4">
                <slot name="meta"></slot>
            </header>
            <section class="flex flex-col mx-6 gap-5">
                <slot></slot>
            </section>
            <footer v-if="$slots.actions" class="mx-6 pt-4 border-t border-(--border-subtle)">
                <slot name="actions"></slot>
            </footer>
        </div>
    </article>
</template>

<style lang="css" scoped>
article {
    box-shadow: 0 2px 8px oklch(29.797% 0.0421 59.168 / 0.08), 0 1px 3px oklch(29.797% 0.0421 59.168 / 0.04);
}

article:hover {
    box-shadow: 0 10px 15px oklch(29.797% 0.0421 59.168 / 0.12), 0 4px 6px oklch(29.797% 0.0421 59.168 / 0.08);
    transform: translateY(-2px);
}

article:focus-within {
    outline: 3px solid var(--focus);
    outline-offset: 3px;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(2Opx);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

article {
    animation: slideUp 0.5s ease-out;
}
</style>
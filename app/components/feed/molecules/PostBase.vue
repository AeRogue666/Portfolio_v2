<script setup lang="ts">
import type { FeedKind } from '~/app/types/feed';

const props = defineProps<{
    ariaRoleDescription?: string,
    cardType?: FeedKind;
    pinned?: boolean;
}>();

const cardStyles = computed(() => {
    const baseClasses = 'flex flex-col w-full rounded-2xl transition-all duration-300 hover:shadow-lg';

    switch (props.cardType) {
        case 'project':
            return `${baseClasses} bg-(--card-project-bg) border-l-4 border-l-(--card-project-accent)`;
        case 'update':
            return `${baseClasses} bg-(--card-update-bg) border-l-4 border-l-(--card-update-accent)`;
        case 'about':
            return `${baseClasses} bg-(--card-about-bg) border-l-4 border-l-(--card-about-accent)`;
        default:
            return `${baseClasses} bg-(--bg-2) border border-(--border-subtle)`;
    }
});
</script>

<template>
    <article :class="[cardStyles, { 'is-pinned': pinned }]" class="flex flex-col w-full py-10">
        <span class="sr-only fs-body">{{ ariaRoleDescription }}</span>
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

/* Post épinglé : liseré coloré + halo diffus pour le distinguer visuellement.
    Le box-shadow est multicouche : 
        - couche 1 : contour net 2px avec liseré vert
        - couche 2 : halo diffus color-mix pour l'aura (farming ?)
        - couche 3-4 : ombres de profondeur habituelles conservées 
*/
article.is-pinned {
    box-shadow:
        0 0 28px 6px color-mix(in srgb, var(--success) 45%, transparent),
        0 10px 15px oklch(29.797% 0.0421 59.168 / 0.12),
        0 4px 6px oklch(29.797% 0.0421 59.168 / 0.08);
    transition: translateY(-2px);
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
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
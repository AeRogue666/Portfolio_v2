<script setup lang="ts">
const feedStore = useFeedStore(),
    { t } = useI18n();

const {
    items,
    availableTags,
    selectedTags,
    selectedKinds,
    sortBy,
    status,
    error,
    toggleTag,
    toggleKind,
    setSortBy,
    resetFilters,
    loadMore,
    total
} = useFeed({ limit: 5 });

const { polite, assertive } = useAnnouncer();

// Mettre à jour le store avec les posts
watch(items, (newItems) => {
    try {
        feedStore.setPosts(newItems)
        polite('Feed reloaded successfully');
    } catch (err) {
        assertive('Error: Feed failed to reload');
    }
});

const hasActiveFilters = computed(() => selectedTags.value.length > 0 || selectedKinds.value.length > 0);

useSeoMeta(({
    title: t('seo.feed.title'),
    description: t('seo.feed.description'),
    ogTitle: t('seo.feed.title'),
    ogDescription: t('seo.feed.description'),
    ogImage: '/images/project/portfolio-v2/desktop.png',
    twitterCard: 'summary_large_image',
}));
</script>

<template>
    <UContainer tabindex="-1" aria-labelledby="feed-title">

        <!-- Filtres -->
        <FeedFilters :available-tags="availableTags" :selected-tags="selectedTags" :selected-kinds="selectedKinds"
            :sort-by="sortBy" :has-active-filters="hasActiveFilters"
            :active-filters-count="selectedTags.length + selectedKinds.length" @toggle-tag="toggleTag"
            @toggle-kind="toggleKind" @set-sort="setSortBy" @reset-filters="resetFilters" />

        <!-- Feed -->
        <Feed id="feed" :items="items" :loading="status === 'pending'" :error="error?.message ?? null" />

        <!-- Message si aucun résultat après filtrage -->
        <div v-if="status === 'success' && items.length === 0 && hasActiveFilters" aria-live="polite"
            class="py-8 text-center text-(--text-2)">
            <p class="fs-body">{{ t('feed.no_results') }}</p>
            <button @click="resetFilters"
                class="mt-4 px-4 py-2 bg-(--bg-2) hover:bg-(--bg-3) text-(--text) rounded border border-(--border-subtle) transition-colors fs-body">
                {{ t('filters.reset') }}
            </button>
        </div>

        <!-- Bouton Load More -->
        <UContainer v-if="items.length < total" class="mt-6">
            <button id="button-load-articles" :aria-label="t('feed.load_more')" role="button" aria-controls="feed"
                @click="loadMore()" :aria-busy="status === 'pending'" :disabled="status === 'pending'"
                class="w-full px-4 py-2 bg-(--bg-2) hover:bg-(--bg-3) text-(--text) rounded border border-(--border-subtle) disabled:opacity-50 disabled:cursor-not-allowed transition-colors fs-body">
                {{ t('feed.load_more') }}
            </button>
        </UContainer>

        <!-- Annonce accessibilité pour lecteurs d'écran -->
        <div v-if="status === 'success' && items.length > 0" aria-live="polite" class="sr-only">
            <span class="fs-small">{{ items.length }} {{ t('feed.loaded_new_articles') }}</span>
        </div>
    </UContainer>
</template>
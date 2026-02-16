<script setup lang="ts">
definePageMeta({
    layout: 'index-header'
});

const feedStore = useFeedStore(),
    { t } = useI18n();

const { items, total, status, error, loadMore } = useFeed({ limit: 5 });

watch(items, (newItems) => {
    feedStore.setPosts(newItems)
});

useSeoMeta(({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    ogTitle: t('seo.home.title'),
    ogDescription: t('seo.home.description'),
    ogImage: '/images/project/front-ecommerce-headless/desktop.png',
    twitterCard: 'summary_large_image',
}));
</script>

<template>
    <UContainer tabindex="-1" aria-labelledby="feed-title">
        <h1 id="feed-title" class="text-2xl font-semibold tracking-tight leading-snug sr-only" style="font-size: var(--step-3);">{{ t('index.title') }}</h1>

        <Feed id="feed" :items="items" :loading="status === 'pending'" :error="error?.message ?? null" />

        <UContainer>
            <button v-if="items.length < total" id="button-load-articles"
                :aria-label="t('index.loading_articles_button')" role="button" aria-controls="feed" @click="loadMore()"
                :aria-busy="status === 'pending'">
                {{ t('index.loading_articles_button') }}
            </button>
        </UContainer>

        <div v-if="status === 'success' && feedStore.sortedPosts.length < total" aria-live="polite" class="sr-only">
            <span>{{ total }} {{ t('index.loaded_new_articles') }}</span>
        </div>

        <footer>

        </footer>
    </UContainer>
</template>
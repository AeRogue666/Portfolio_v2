<script setup lang="ts">
import type { FeedItem } from '~/types/feed';
import PostItem from './PostItem.vue';

defineProps<{
    items: FeedItem[],
    loading: boolean,
    error: string | null,
}>();

const { t } = useI18n();
</script>

<template>
    <section class="flex flex-col divide-y divide-(--border-subtle)" aria-live="polite" id="feed">
        <p v-if="loading">{{ t('loading.loading_feed') }}...</p>
        <p v-if="error">{{ error }}</p>

        <component v-for="post in items" :post="post" :is="PostItem" :key="`${post.kind}-${post.id}`" />
    </section>
</template>
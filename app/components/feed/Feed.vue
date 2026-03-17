<script setup lang="ts">
import type { FeedItem } from '@/types/feed';
import PostItem from './PostItem.vue';

defineProps<{
    items: FeedItem[],
    loading: boolean,
    error: string | null,
}>();

const { t } = useI18n();
</script>

<template>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite" id="feed">
        <div v-if="loading" class="flex justify-center items-center py-12">
            <UIcon name="fa7-solid:spinner" class="animate-spin text-4xl text-(--accent)" />
            <span class="ml-3 text-(--text-2)">{{ t('loading.loading_feed') }}...</span>
        </div>

        <div v-if="error" class="p-6 bg-red-50 border-l-4 border-red-500 rounded-lg" role="alert">
            <p class="text-red-800 font-medium">{{ error }}</p>
        </div>
        <!-- Pinned Post -->

        <!-- Others Posts -->
        <component v-for="post in items" :post="post" :is="PostItem" :key="`${post.kind}-${post.id}`" />
    </section>
</template>
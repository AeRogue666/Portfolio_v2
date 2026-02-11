<script setup lang="ts">
import PostBase from './molecules/PostBase.vue';
import PostBadge from './molecules/PostBadge.vue';
import dayjs from 'dayjs';
import type { FeedItem } from '~/types/feed';

defineProps<{
    post: FeedItem,
}>();

const { t, locale } = useI18n();
</script>

<template>
    <PostBase>
        <template #meta>
            <section class="flex justify-between items-center w-full">
                <PostBadge :label="t(`post.type.${post.kind}`)" :color="'success'" :variant="'soft'"
                    :class-name="'bg-(--bg-tertiary) text-(--text-secondary) text-scalable'" />
                <p class="text-sm text-(--text-2) text-scalable">
                    <time :datetime="post.date">{{ dayjs(post.date).locale(locale).format('DD MMMM YYYY') }}</time>
                </p>
            </section>
        </template>

        <h2 class="text-xl font-bold mt-2 text-scalable">{{ post.title }}</h2>
        <p class="text-base text-scalable">{{ post.summary }}</p>

        <div class="flex flex-wrap gap-2">
            <UBadge v-for="tag in post.tags" :label="tag" :key="tag" variant="soft" color="neutral" size="md"
                class="bg-(--bg-tertiary) text-(--text-secondary) text-scalable" />
        </div>

        <template #actions>
            <NuxtLink :to="getPostUrl(post)" :aria-label="`${t('post.read_about')}`" class="text-scalable">
                {{ t('post.read_about') }}
            </NuxtLink>
        </template>
    </PostBase>
</template>
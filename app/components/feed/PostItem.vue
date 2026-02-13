<script setup lang="ts">
import dayjs from 'dayjs';
import PostBadge from './molecules/PostBadge.vue';
import PostBase from './molecules/PostBase.vue';
import ResponsiveImage from './organisms/ResponsiveImage.vue';
import type { FeedItem } from '~/types/feed';

const props = defineProps<{
    post: FeedItem,
}>();

const { t, locale } = useI18n();

dayjs.locale(locale.value);

const badgeLabel = computed(() => {
    if (props.post.pinned) return t('post.pinned_post');

    const kindLabel = t(`post.type.${props.post.kind}`),
        fallbackLabel = props.post.kindFallback ? t(`post.type.${props.post.kindFallback}`) : '';

    return locale.value === 'en'
        ? `${kindLabel} ${fallbackLabel}`.trim()
        : `${fallbackLabel} ${kindLabel}`.trim();
    /* if (props.post.pinned) {
        return locale.value === 'en'
            ? `${t(`post.type.${props.post.kind}`)} ${t(`post.type.${props.post.kindFallback}`)}`
            : `${t(`post.type.${props.post.kindFallback}`)} ${t(`post.type.${props.post.kind}`)}`
    }
    return t(`post.type.${props.post.kind}`); */
});

const badgeIcon = computed(() => (props.post.pinned ? 'fa7-solid:thumbtack' : undefined)),
    postUrl = computed(() => getPostUrl(props.post));
</script>

<template>
    <PostBase :aria-role-description="badgeLabel">
        <template #meta>
            <section class="flex justify-between items-center w-full">
                <PostBadge :label="badgeLabel" :icon="badgeIcon" :color="post.pinned ? 'success' : 'neutral'" />
                <p v-if="post.date" class="text-sm text-(--text-2) text-scalable">
                    <time :datetime="post.date">{{ dayjs(post.date).format('DD MMMM YYYY') }}</time>
                </p>
            </section>
            <ResponsiveImage v-if="post.image" :image="post.image" :preload="post.pinned" />
        </template>

        <h2 class="text-xl font-bold mt-2 text-scalable">{{ post.feed_title ? post.feed_title : post.title }}</h2>
        <p class="text-base text-scalable">{{ post.feed_summary ? post.feed_summary : post.summary }}</p>

        <div class="flex flex-wrap gap-2">
            <PostBadge v-for="tag in post.tags" :label="tag" :key="tag" :variant="'soft'" :color="'neutral'"
                :size="'md'" :class-name="'bg-(--bg-3) text-(--text-2) text-scalable'" />
        </div>

        <template #actions>
            <NuxtLink :to="postUrl"
                :aria-label="`${t(post.kind !== 'about' ? 'post.read_post' : `post.read_about`)} ${post.title}`"
                class="text-scalable">
                {{ t(post.kind !== 'about' ? 'post.read_post' : `post.read_about`) }}
            </NuxtLink>
        </template>
    </PostBase>
</template>
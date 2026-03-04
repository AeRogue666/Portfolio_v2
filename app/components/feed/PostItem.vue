<script setup lang="ts">
import dayjs from 'dayjs';
import PostBadge from './molecules/PostBadge.vue';
import PostBase from './molecules/PostBase.vue';
import ResponsiveImage from './organisms/ResponsiveImage.vue';
import type { FeedItem } from '@/types/feed';

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
    postUrl = computed(() => getPostUrl(props.post)),
    cardType = computed(() => props.post.kindFallback || props.post.kind);
</script>

<template>
    <PostBase :aria-role-description="badgeLabel" :card-type="cardType">
        <template #meta>
            <section class="flex justify-between items-center w-full mb-3">
                <PostBadge :label="badgeLabel" :icon="badgeIcon" :color="post.pinned ? 'success' : 'neutral'"
                    :variant="'soft'" :size="'md'" />
                <time v-if="post.date" :datetime="post.date" class="text-sm text-(--text-2) text-scalable"
                    style="font-size: var(--step--1);">{{ dayjs(post.date).format('DD MMMM YYYY') }}</time>
            </section>
            <ResponsiveImage v-if="post.image" :image="post.image" class="rounded-xl overflow-hidden" />
            <div v-else class="h-px w-full bg-(--border-subtle) my-2"></div>
        </template>

        <h2 class="text-2xl font-semibold leading-snug text-scalable text-(--text)" style="font-size: var(--step-2);">
            {{ post.feed_title ? post.feed_title : post.title }}
        </h2>
        <p class="text-base leading-relaxed text-(--text-2) text-scalable max-w-prose"
            style="font-size: var(--step-0);">
            {{ post.feed_summary ? post.feed_summary : post.summary }}
        </p>

        <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mt-2">
            <PostBadge v-for="tag in post.tags" :label="tag" :key="tag" :variant="'soft'" :color="'neutral'"
                :size="'sm'" :class-name="'bg-white/60 text-(--text-2) text-scalable border border-(--border-subtle)'"
                style="font-size: var(--step--1);" />
        </div>

        <template #actions>
            <NuxtLink :to="postUrl"
                :aria-label="`${t(post.kind !== 'about' ? 'post.read_post' : `post.read_about`)} ${post.title}`"
                class="inline-flex items-center gap-2 text-(--accent) hover:text-(--accent-hover) font-medium text-scalable transition-colors"
                style="font-size: var(--step-0);">
                {{ t(post.kind !== 'about' ? 'post.read_post' : `post.read_about`) }}
                <UIcon name="fa7-solid:arrow-right" class="text-sm" />
            </NuxtLink>
        </template>
    </PostBase>
</template>
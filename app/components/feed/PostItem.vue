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
const accessibilityStore = useAccessibilityStore();

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
    cardType = computed(() => props.post.kindFallback || props.post.kind),
    grayscale = computed(() => accessibilityStore.grayscale),
    created_atDate = computed(() => dayjs(props.post.created_at).locale(locale.value).format("DD MMMM YYYY")),
    updated_atDate = computed(() => dayjs(props.post.updated_at).locale(locale.value).format("DD MMMM YYYY"));
</script>

<template>
    <PostBase :aria-role-description="badgeLabel" :card-type="cardType" :pinned="post.pinned">
        <template #meta>
            <section class="flex justify-between items-center w-full mb-3">
                <PostBadge :label="badgeLabel" :icon="badgeIcon" :color="post.pinned ? 'success' : 'neutral'"
                    :variant="'soft'" :size="'md'"
                    :class-name="grayscale ? 'fs-body bg-(--bg-3) text-(--text-2)' : 'fs-body'"/>
                <div class="flex flex-col items-end gap-1">
                    <time v-if="post.created_at" :datetime="post.created_at" class="fs-small text-(--text-2)">
                        {{ created_atDate }}
                    </time>
                    <time v-if="post.updated_at" :datetime="post.updated_at" class="fs-small text-(--text-2)">
                       {{ t('post_updated_on') }} {{ updated_atDate }}
                    </time>
                </div>
            </section>
            <ResponsiveImage v-if="post.image" :image="post.image" class="rounded-xl overflow-hidden" />
            <div v-else class="w-full h-49.5 lg:h-47 bg-(--bg-3) my-2 rounded-xl overflow-hidden"></div>
        </template>

        <h2 class="fs-title font-semibold leading-snug text-(--text)">
            {{ post.feed_title ? post.feed_title : post.title }}
        </h2>
        <p class="fs-body leading-relaxed text-(--text-2) max-w-prose">
            {{ post.feed_summary ? post.feed_summary : post.description }}
        </p>

        <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mt-2">
            <PostBadge v-for="tag in post.tags" :label="tag" :key="tag" :variant="'soft'" :color="'neutral'"
                :size="'sm'" :class-name="'bg-white/60 text-(--text-2) fs-body border border-(--border-subtle)'" />
        </div>

        <template #actions>
            <NuxtLink :to="postUrl"
                :aria-label="`${t(post.kind !== 'about' ? 'post.read_post' : `post.read_about`)} ${post.title}`"
                class="inline-flex items-center gap-2 text-(--accent) hover:text-(--accent-hover) font-medium fs-body transition-colors">
                {{ t(post.kind !== 'about' ? 'post.read_post' : `post.read_about`) }}
                <UIcon name="fa7-solid:arrow-right" class="fs-small" />
            </NuxtLink>
        </template>
    </PostBase>
</template>
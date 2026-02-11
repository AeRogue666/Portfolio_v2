<script setup lang="ts">
import PostBase from './molecules/PostBase.vue';
import ResponsiveImage from './organisms/ResponsiveImage.vue';
import PostBadge from './molecules/PostBadge.vue';
import dayjs from 'dayjs';
import type { FeedItem } from '~/types/feed';

const props = defineProps<{
    post: FeedItem,
}>();

const { t, locale } = useI18n();

const badgeLabel = computed(() => locale.value == 'en'
    ? `${t(`post.type.${props.post.kind}`)} ${t(`post.type.${props.post.kindFallback}`)}`
    : `${t(`post.type.${props.post.kindFallback}`)} ${t(`post.type.${props.post.kind}`)}`)
</script>

<template>
    <PostBase :aria-role-description="t('post.pinned_post')">
        <template #meta>
            <section class="flex justify-between items-center w-full">
                <PostBadge :label="badgeLabel" :color="'success'" :variant="'soft'" :icon="'fa7-solid:thumbtack'"
                    :class-name="'bg-(--bg-tertiary) text-(--text-secondary) text-scalable hover:bg-(--link-hover)'" />
                <p class="text-sm text-(--text-2) text-scalable">
                    <time :datetime="post.date">{{ dayjs(post.date).locale(locale).format('DD MMMM YYYY') }}</time>
                </p>
            </section>
            <ResponsiveImage v-if="post.image" :image="post.image" :preload="true" />
        </template>

        <h2 class="text-xl font-bold mt-2 text-scalable">{{ post.title }}</h2>
        <p class="text-base text-scalable">{{ post.summary }}</p>

        <div class="flex flex-wrap gap-2">
            <UBadge v-for="tag in post.tags" :label="tag" :key="tag" variant="soft" color="neutral" size="md"
                class="bg-(--bg-tertiary) text-(--text-secondary) text-scalable" />
        </div>

        <template #actions>
            <NuxtLink :to="getPostUrl(post)" :aria-label="`${t('post.read_post')} ${post.title}`"
                class="text-scalable">
                {{ t('post.read_post') }}
            </NuxtLink>
        </template>
    </PostBase>
</template>
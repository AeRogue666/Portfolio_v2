<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import dayjs from 'dayjs';
import PostBadge from '@/components/feed/molecules/PostBadge.vue';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';
import type { UpdateResolved } from '@/types/update';

const route = useRoute(),
    { t, locale, locales } = useI18n();

const asyncKey = computed(() => `update-${route.params.slug}-${locale.value}`);
const { data: update, error } = await useAsyncData<UpdateResolved>(
    () => asyncKey.value,
    () => $fetch(`/api/updates/${route.params.slug}`, {
        query: { locale: locale.value }
    }),
    {
        watch: [locale]
    }
);
if (error.value) {
    throw createError({ statusCode: 404, message: 'update data is not found', statusMessage: 'update data is not found', cause: error.value, fatal: true });
}

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: t('breadcrumb.updates'),
        to: ''
    },
    {
        label: update.value?.title,
        to: `/updates/${update.value?.slug}`
    }
];

/* useSchemaOrg([
    defineupdate({
        name: update.value?.title,
        description: update.value?.summary,
        datePublished: update.value?.date,
        image: update.value?.image?.sources.desktop,
        author: {
            type: 'Person',
            name: 'Aureldev'
        }
    })
]) */

useHead(() => ({
    link: [
        {
            rel: 'canonical',
            href: `https://aureldev.dev/updates/${route.params.slug}`
        },
        ...locales.value.map(l => ({
            rel: 'alternate',
            hreflang: l.code,
            href: `https://aureldev.dev/${l.code}/${route.params.slug}`
        }))
    ]
}));

watchEffect(() => {
    if (!update.value) return;

    useSeoMeta({
        title: update.value?.title,
        description: update.value?.summary,
        ogTitle: update.value?.title,
        ogDescription: update.value?.summary,
        ogType: 'article',
        ogImage: update.value?.image?.sources.detail.desktop,
        ogImageAlt: update.value?.image?.alt,
        twitterCard: 'summary_large_image',
    });
});
</script>

<template>
    <ArticleLayout v-if="update">
        <template #header>
            <UBreadcrumb :items="breadcrumbItems" class="my-2 fs-body">
                <template #separator>
                    <span class="mx-2 text-(--text-muted)">/</span>
                </template>
            </UBreadcrumb>
            <p class="fs-small text-(--text-2) leading-snug">
                {{ t('update.published_on') }}
                <time :datetime="update.date">{{ dayjs(update.date).format('DD MMMM YYYY') }}</time>
            </p>

            <h1 id="article-title" class="fs-heading font-semibold tracking-tight leading-snug mt-2">
                {{ update.title }}
            </h1>
            <p class="fs-subtitle text-(--text-2) leading-snug max-w-[65ch]">
                {{ update.summary }}
            </p>

            <NuxtImg :src="update.image?.sources.detail.mobile"
                :srcset="`${update.image?.sources.detail.mobile} 640w, ${update.image?.sources.detail.tablet} 768w, ${update.image?.sources.detail.desktop} 1024w`"
                width="1280" height="960" sizes="xs:100vw md:80vw lg:64rem" :alt="update.image?.alt"
                class="my-2 rounded-lg" :placeholder="true" />
            <!-- sizes="xs:100vw md:80vw lg:64rem" -->
            <!-- sizes="(min-width: 80rem) 64rem, (min-width: 64rem) 80vw, 100vw" -->
            <!-- width="768" height="432" -->

            <dl class="grid grid-cols-1 sm:grid-cols-2 mt-6 text-sm gap-4">
                <dt class="fs-lead font-semibold leading-snug">
                    {{ t('update.tags') }}
                </dt>
                <dd class="flex flex-wrap gap-2">
                    <PostBadge v-for="tech in update.tags" :label="tech" :key="tech" :variant="'soft'"
                        :color="'neutral'" :size="'md'"
                        :class-name="'bg-(--bg-3) text-(--text-2) fs-body border border-(--border-subtle)'" />
                </dd>
            </dl>
        </template>

        <section aria-labelledby="content">
            <h2 id="content" class="fs-title font-semibold leading-snug">
                {{ t('update.content') }}
            </h2>
            <p class="fs-body text-(--text-2) leading-snug max-w-[65ch]">
                {{ update.content }}
            </p>
        </section>

        <template #footer>

        </template>
    </ArticleLayout>
</template>
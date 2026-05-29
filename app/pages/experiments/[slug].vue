<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import dayjs from 'dayjs';
import PostBadge from '@/components/feed/molecules/PostBadge.vue';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';
import type { Experiment } from '~/app/types/experiment';

const route = useRoute(),
    { t, locale, locales } = useI18n();

const asyncKey = computed(() => `experiment-${route.params.slug}-${locale.value}`);
const { data: experiment, error } = await useAsyncData<Experiment>(
    () => asyncKey.value,
    () => $fetch(`/api/posts/${route.params.slug}`, {
        query: { locale: locale.value }
    }),
    {
        watch: [locale]
    }
);
if (error.value) {
    throw createError({ statusCode: 404, message: 'experiment data is not found', statusMessage: 'experiment data is not found', cause: error.value, fatal: true });
}

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: t('breadcrumb.experiments'),
        to: ''
    },
    {
        label: experiment.value?.title,
        to: `/experiments/${experiment.value?.slug}`
    }
];

/* useSchemaOrg([
    defineupdate({
        name: experiment.value?.title,
        description: experiment.value?.summary,
        datePublished: experiment.value?.date,
        image: experiment.value?.image?.sources.desktop,
        author: {
            type: 'Person',
            name: 'Aureldev'
        }
    })
]) */

const articlePublishedTime = computed(() => experiment.value?.date ? dayjs(experiment.value?.date).locale(locale.value).format(): null),
    articleModifiedTime = computed(() => experiment.value?.updatedAt ? dayjs(experiment.value?.updatedAt).locale(locale.value).format(): null);
const created_atDate = computed(() => experiment.value?.date ? dayjs(experiment.value?.date).locale(locale.value).format("DD MMMM YYYY") : null),
    updated_atDate = computed(() => experiment.value?.updatedAt ? dayjs(experiment.value?.updatedAt).locale(locale.value).format("DD MMMM YYYY") : null);

const src = computed(() => experiment.value?.image?.sources.detail?.mobile || experiment.value?.image?.sources.feed?.mobile || ''),
    tabletSrc = computed(() => experiment.value?.image?.sources.detail?.tablet || experiment.value?.image?.sources.feed?.tablet || src),
    desktopSrc = computed(() => experiment.value?.image?.sources.detail?.desktop || experiment.value?.image?.sources.feed?.desktop || tabletSrc);

useHeadSafe(() => ({
    title: experiment.value?.title,
    meta: [
        // Meta names
        { name: 'description', content: experiment.value?.description },
        // Meta properties
        { property: 'og:title', content: experiment.value?.title },
        { property: 'og:description', content: experiment.value?.description },
        { property: 'og:type', content: 'article' },
        { property: 'article:author', content: 'Aureldev' },
        { property: 'article:published_time', content: articlePublishedTime.value ?? created_atDate.value ?? '' },
        { property: 'article:modified_time', content: articleModifiedTime.value ?? updated_atDate.value ?? '' },
        { property: 'og:image', content: src.value ?? tabletSrc.value ?? desktopSrc.value },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1920' },
        { property: 'og:image:height', content: '1080' },
    ],
    link: [
        {
            rel: 'canonical',
            href: `https://codekorico.com${route.path}`
        },
        ...locales.value.map(l => ({
            rel: 'alternate',
            hreflang: l.code,
            href: `https://codekorico.com${route.path}`
        }))
    ]
}));

useSeoMeta(({
    ogImageAlt: experiment.value?.image?.alt,
    twitterCard: 'summary_large_image',
}));

watchEffect(() => {
    if (!experiment.value) return;
});
</script>

<template>
    <template v-if="experiment">
        <ArticleLayout class="fs-body">
            <template #header>
                <UBreadcrumb :items="breadcrumbItems" class="my-2 fs-body">
                    <template #separator>
                        <span class="mx-2 text-(--text-muted)">/</span>
                    </template>
                </UBreadcrumb>
                <p class="fs-small text-(--text-2) leading-snug">
                    {{ t('experiment.published_on') }}
                    <time :datetime="experiment.date">{{ created_atDate }}</time>
                    <br>
                    <template v-if="experiment.updatedAt">
                        {{ t('post.updated_on') }}
                        <time :datetime="experiment.updatedAt">{{ updated_atDate }}</time>
                    </template>
                </p>

                <h1 id="article-title" class="fs-heading font-semibold tracking-tight leading-snug mt-2">
                    {{ experiment.title }}
                </h1>
                <p class="fs-subtitle text-(--text-2) leading-snug max-w-[65ch]">
                    {{ experiment.description }}
                </p>

                <NuxtImg :src="src" :alt="experiment.image?.alt" sizes="xs:100vw sm:100vw md:80vw lg:64rem"
                    :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`"
                    class="my-2 rounded-lg border-2 border-solid border-(--border-subtle)" loading="lazy"
                    placeholder="blur" />

                <dl class="grid grid-cols-1 sm:grid-cols-2 mt-6 text-sm gap-4">
                    <dt class="fs-lead font-semibold leading-snug">
                        {{ t('experiment.tags') }}
                    </dt>
                    <dd class="flex flex-wrap gap-2">
                        <PostBadge v-for="tech in experiment.tags" :label="tech" :key="tech" :variant="'soft'"
                            :color="'neutral'" :size="'md'"
                            :class-name="'bg-(--bg-3) text-(--text-2) fs-body border border-(--border-subtle)'" />
                    </dd>
                </dl>
            </template>

            <MDC :value="experiment.content" class="prose prose-neutral dark:prose-invert max-w-none" />

            <!-- <section aria-labelledby="content">
            <h2 id="content" class="fs-title font-semibold leading-snug">
                {{ t('experiment.content') }}
            </h2>
            <p class="fs-body text-(--text-2) leading-snug max-w-[65ch]">
                {{ experiment.content }}
            </p>
        </section> -->

            <template #footer>

            </template>
        </ArticleLayout>
    </template>
    <template v-else>
        <p class="fs-body">
            {{ t('error.content_unavailable') }}
        </p>
    </template>
</template>

<style lang="css">
h1 {
    font-size: var(--font-size-heading);
    line-height: 1.2;
}

h2 {
    font-size: var(--font-size-title);
    line-height: 1.3;
}

h3 {
    font-size: var(--font-size-subtitle);
    line-height: 1.4;
}

.lead {
    font-size: var(--font-size-lead);
    line-height: 1.6;
}

p,
li,
td,
dd {
    font-size: var(--font-size-body);
    line-height: 1.6;
}

small,
time,
caption,
.metadata {
    font-size: var(--font-size-small);
    line-height: 1.5;
}
</style>
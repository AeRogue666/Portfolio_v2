<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import dayjs from 'dayjs';

const { t, locale, locales } = useI18n(),
    route = useRoute();

const contentPath = computed(() => `/accessibility/${locale.value}`);

const { data: page, error } = await useAsyncData(
    () => `accessibility-${locale.value}`,
    () =>
        queryCollection('content')
            .path(contentPath.value) // .where('path', '=', `/accessibility/${locale.value}`)
            .first()
);
if (error.value) {
    throw createError({ status: 404, statusMessage: 'Accessibility data not found', cause: error.value, fatal: true })
}

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: t('breadcrumb.accessibility'),
        to: '/accessibility'
    },
];

const articlePublishedTime = computed(() => dayjs(page.value?.created_at).locale(locale.value).format()),
    articleModifiedTime = computed(() => dayjs(page.value?.updated_at).locale(locale.value).format());
const created_atDate = computed(() => dayjs(page.value?.created_at).locale(locale.value).format("DD MMMM YYYY")),
    updated_atDate = computed(() => dayjs(page.value?.updated_at).locale(locale.value).format("DD MMMM YYYY"));

useHeadSafe(() => ({
    title: t('seo.page.title', { pagetitle: t('breadcrumb.accessibility') }),
    meta: [
        // Meta names
        { name: 'description', content: t('seo.page.description', { pagetitle: t('breadcrumb.accessibility') }) },
        // Meta properties
        { property: 'og:title', content: t('seo.page.title', { pagetitle: t('breadcrumb.accessibility') }) },
        { property: 'og:description', content: t('seo.page.description', { pagetitle: t('breadcrumb.accessibility') }) },
        { property: 'og:type', content: 'article' },
        { property: 'article:author', content: 'Aureldev' },
        { property: 'article:published_time', content: articlePublishedTime.value ?? created_atDate.value ?? '' },
        { property: 'article:modified_time', content: articleModifiedTime.value ?? updated_atDate.value ?? '' },
    ],
    link: [
        {
            rel: 'canonical',
            href: `https://aureldev.com${route.path}`
        },
        ...locales.value.map(l => ({
            rel: 'alternate',
            hreflang: l.code,
            href: `https://aureldev.com${route.path}`
        }))
    ]
}));
</script>

<template>
    <template v-if="page">
        <article class="prose prose-neutral w-full max-w-7xl mx-auto px-4 py-10 prose-headings:scroll-mt-24 fs-body"
            aria-labelledby="article-title">
            <header class="flex flex-col mb-10">
                <UBreadcrumb :items="breadcrumbItems" class="my-2 fs-body">
                    <template #separator>
                        <span class="mx-2 text-(--text-muted)">/</span>
                    </template>
                </UBreadcrumb>

                <p class="fs-small text-(--text-2)">
                    {{ t('page.created_on') }}
                    <time v-if="created_atDate" :datetime="created_atDate">{{ created_atDate }}</time>
                    <template v-if="created_atDate">
                        {{ t('page.updated_on') }}
                        <time :datetime="updated_atDate">{{ updated_atDate }}</time>
                    </template>
                </p>

                <h1 id="article-title" class="fs-heading font-bold">{{ page.title }}</h1>
                <p class="text-(--text-2) fs-subtitle leading-snug">{{ page.description }}</p>
            </header>

            <ContentRenderer :value="page" />
        </article>
    </template>
    <p v-else class="fs-body">
        {{ t('error.content_unavailable') }}
    </p>
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
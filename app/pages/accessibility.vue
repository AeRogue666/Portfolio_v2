<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const { t, locale } = useI18n();

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

useSeoMeta(({
    title: t('seo.page.title', { pagetitle: t('breadcrumb.accessibility') }),
    description: t('seo.page.description', { pagetitle: t('breadcrumb.accessibility') }),
    ogTitle: t('seo.page.title', { pagetitle: t('breadcrumb.accessibility') }),
    ogDescription: t('seo.page.description', { pagetitle: t('breadcrumb.accessibility') }),
    ogImage: '/images/project/portfolio-v2/desktop.png',
    twitterCard: 'summary_large_image',
}));
</script>

<template>
    <article v-if="page">
        <header>
            <UBreadcrumb :items="breadcrumbItems" class="my-2 fs-body">
                <template #separator>
                    <span class="mx-2 text-(--text-muted)">/</span>
                </template>
            </UBreadcrumb>
        </header>

        <ContentRenderer :value="page" />
    </article>
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
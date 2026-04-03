<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const { t, locale } = useI18n();
const contentPath = computed(() => `/about/${locale.value}`);

const { data: page } = await useAsyncData(
    () => `about-${locale.value}`,
    () =>
        queryCollection('content')
            .path(contentPath.value) // .where('path', '=', `/about/${locale.value}`)
            .first()
);

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: t('breadcrumb.about'),
        to: '/about'
    },
];

useSeoMeta(({
    title: t('seo.page.title', { pagetitle: t('breadcrumb.about') }),
    description: t('seo.page.description', { pagetitle: t('breadcrumb.about') }),
    ogTitle: t('seo.page.title', { pagetitle: t('breadcrumb.about') }),
    ogDescription: t('seo.page.description', { pagetitle: t('breadcrumb.about') }),
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
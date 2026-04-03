<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const { t, locale } = useI18n();

const contentPath = computed(() => `/terms/${locale.value}`);

const { data: page, error } = await useAsyncData(
    () => `terms-${locale.value}`,
    () =>
        queryCollection('content')
            .path(contentPath.value) // .where('path', '=', `/legalmention/${locale.value}`)
            .first()
);
if (error.value) {
    throw createError({ status: 404, statusMessage: 'Terms of Use data not found', cause: error.value, fatal: true })
}

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: t('breadcrumb.terms_of_use'),
        to: '/terms'
    },
];

useSeoMeta(({
    title: t('seo.page.title', { pagetitle: t('breadcrumb.terms_of_use') }),
    description: t('seo.page.description', { pagetitle: t('breadcrumb.terms_of_use') }),
    ogTitle: t('seo.page.title', { pagetitle: t('breadcrumb.terms_of_use') }),
    ogDescription: t('seo.page.description', { pagetitle: t('breadcrumb.terms_of_use') }),
    ogImage: '/images/project/portfolio-v2/desktop.png',
    twitterCard: 'summary_large_image',
}));
</script>

<template>
    <template v-if="page">
        <article>
            <header>
                <UBreadcrumb :items="breadcrumbItems" class="my-2 fs-body">
                    <template #separator>
                        <span class="mx-2 text-(--text-muted)">/</span>
                    </template>
                </UBreadcrumb>
            </header>

            <ContentRenderer :value="page" />
        </article>
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
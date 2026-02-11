<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

definePageMeta({
    layout: 'index-header'
});

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
        to: '/'
    },
    {
        label: t('breadcrumb.about'),
        to: '/about'
    },
];
</script>

<template>
    <article v-if="page">
        <header>
            <UBreadcrumb :items="breadcrumbItems" class="my-2">
                <template #separator>
                    <span class="mx-2 text-(--text-muted)">/</span>
                </template>
            </UBreadcrumb>
        </header>

        <ContentRenderer :value="page" />

    </article>
    <p v-else>
        {{ t('error.content_unavailable') }}
    </p>
</template>
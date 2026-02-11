<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

definePageMeta({
    layout: 'default'
});

const { t, locale } = useI18n();

const contentPath = computed(() => `/accessibility/${locale.value}`);

const { data: page, error } = await useAsyncData(
    () => `accessibility-${locale.value}`,
    () =>
        queryCollection('content')
            .path(contentPath.value) // .where('path', '=', `/accessibility/${locale.value}`)
            .first()
);
if(error.value) {
    throw createError({ status: 404, statusMessage: 'Accessibility data not found', cause: error.value, fatal: true })
}

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: t('breadcrumb.feed'),
        to: '/'
    },
    {
        label: t('breadcrumb.accessibility'),
        to: '/accessibility'
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
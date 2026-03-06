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
        to: ''
    },
    {
        label: t('breadcrumb.terms_of_use'),
        to: '/terms'
    },
];
</script>

<template>
    <template v-if="page">
        <article>
            <header>
                <UBreadcrumb :items="breadcrumbItems" class="my-2">
                    <template #separator>
                        <span class="mx-2 text-(--text-muted)">/</span>
                    </template>
                </UBreadcrumb>
            </header>

            <ContentRenderer :value="page" />
        </article>
    </template>
    <template>
        <p>
            {{ t('error.content_unavailable') }}
        </p>
    </template>
</template>
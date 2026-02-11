<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import dayjs from 'dayjs';
import { capitalize } from 'vue';
import ArticleLayout from '~/components/layout/molecules/ArticleLayout.vue';
import type { UpdateResolved } from '~/types/update';

definePageMeta({
    layout: 'default'
});

const route = useRoute(), { t, locale, locales } = useI18n();

const { data: update, error } = await useAsyncData<UpdateResolved>(
    () => `update-${route.params.slug}-${locale.value}`,
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
        to: '/'
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
            <UBreadcrumb :items="breadcrumbItems" class="my-2">
                <template #separator>
                    <span class="mx-2 text-(--text-muted)">/</span>
                </template>
            </UBreadcrumb>
            <p class="text-sm text-(--text-2)">
                {{ t('update.published_on') }}
                <time :datetime="update.date">{{ dayjs(update.date).format('DD MMMM YYYY') }}</time>
            </p>

            <h1 id="article-title" class="text-xl font-bold mt-2">{{ update.title }}</h1>
            <p class="lead">{{ update.summary }}</p>

            <NuxtImg :src="update.image?.sources.detail.mobile" :alt="update.image?.alt"
                sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 80vw, 37.5rem"
                :srcset="`${update.image?.sources.detail.mobile} 640w, ${update.image?.sources.detail.tablet} 768w, ${update.image?.sources.detail.desktop} 1024w`"
                class="my-2 rounded-lg" itemprop="image" placeholder="blur" />

            <dl class="grid grid-cols-1 sm:grid-cols-2 mt-6 text-sm gap-4">
                <dt class="font-semibold">{{ t('update.tags') }}</dt>
                <dd class="flex flex-wrap gap-2">
                    <UBadge v-for="tag in update.tags" :label="capitalize(tag)" :key="tag" variant="soft"
                        color="neutral" class="bg-(--bg-tertiary) text-(--text-secondary)" />
                </dd>
            </dl>
        </template>

        <section aria-labelledby="content">
            <h2 id="content">{{ t('update.content') }}</h2>
            <p>{{ update.content }}</p>
        </section>

        <template #footer>

        </template>
    </ArticleLayout>
</template>
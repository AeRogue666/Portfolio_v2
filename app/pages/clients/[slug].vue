<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import type { Client } from '@/types/client';
import dayjs from 'dayjs';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';

const route = useRoute(),
    { t, locale, locales } = useI18n();

const asyncKey = computed(() => `clients-${route.params.slug}-${locale.value}`);
const { data: client, error } = await useAsyncData<Client>(
    () => asyncKey.value,
    () => $fetch(`/api/posts/${route.params.slug}`, {
        query: { locale: locale.value }
    }),
    {
        watch: [locale]
    }
);
if (error.value) {
    throw createError({ status: 404, statusMessage: 'Clients data not found', cause: error.value, fatal: true })
}

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: t('breadcrumb.clients'),
        to: ''
    },
    {
        label: client.value?.customerName,
        to: route.path
    },
];

const articlePublishedTime = computed(() => client.value?.date ? dayjs(client.value?.date).locale(locale.value).format() : null),
    articleModifiedTime = computed(() => client.value?.updatedAt ? dayjs(client.value?.updatedAt).locale(locale.value).format() : null);
const created_atDate = computed(() => client.value?.date ? dayjs(client.value?.date).locale(locale.value).format("DD MMMM YYYY") : null),
    updated_atDate = computed(() => client.value?.updatedAt ? dayjs(client.value?.updatedAt).locale(locale.value).format("DD MMMM YYYY") : null);

const src = computed(() => client.value?.image?.sources?.detail?.mobile || client.value?.image?.sources?.feed?.mobile || ''),
    tabletSrc = computed(() => client.value?.image?.sources?.detail?.tablet || client.value?.image?.sources?.feed?.tablet || src),
    desktopSrc = computed(() => client.value?.image?.sources?.detail?.desktop || client.value?.image?.sources?.feed?.desktop || tabletSrc);

useHeadSafe(() => ({
    title: client.value?.title,
    meta: [
        // Meta names
        { name: 'description', content: t('seo.page.description', { pagetitle: client.value?.description }) },
        // Meta properties
        { property: 'og:title', content: t('seo.page.title', { pagetitle: client.value?.title }) },
        { property: 'og:description', content: t('seo.page.description', { pagetitle: client.value?.description }) },
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
    ogImageAlt: client.value?.image?.alt,
    twitterCard: 'summary_large_image',
}));
</script>

<template>
    <template v-if="client">
        <ArticleLayout class="fs-body">
            <UBreadcrumb :items="breadcrumbItems" class="my-2 fs-body">
                <template #separator>
                    <span class="mx-2 text-(--text-muted)">/</span>
                </template>
            </UBreadcrumb>
            <p class="fs-small text-(--text-2)">
                {{ t('project.published_on') }}
                <time v-if="client.date" :datetime="client.date">{{ created_atDate }}</time>
                <template v-if="client.updatedAt">
                    {{ t('post.updated_on') }}
                    <time v-if="client.updatedAt" :datetime="client.updatedAt">{{ updated_atDate }}</time>
                </template>
            </p>

            <h1 id="client-title" class="flex flex-col fs-heading font-semibold tracking-tight leading-snug mt-2">
                {{ client.title }}
                <span class="fs-subtitle font-normal text-(--text-2) leading-snug">
                    {{ client.description }}
                </span>
            </h1>

            <NuxtImg :src="src" :alt="client.image?.alt" sizes="xs:100vw sm:100vw md:80vw lg:64rem"
                :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`"
                class="my-2 rounded-lg border-2 border-solid border-(--border-subtle)" loading="lazy"
                placeholder="blur" />

            <div class="flex flex-col">
                <h2 class="font-semibold leading-snug tracking-tight lg:font-extrabold lg:leading-none mb-4 fs-title">
                    {{ t('client.enterprise_name') }}
                </h2>
                <span class="fs-subtitle text-(--text-2) leading-snug">
                    {{ client.customerEnterpriseName }}
                </span>
            </div>

            <MDC :value="client.content" class="prose prose-neutral dark:prose-invert max-w-none" />

            <h2 id="testimony-title"
                class="font-semibold leading-snug tracking-tight lg:font-extrabold lg:leading-none mb-4 fs-title">
                {{ t('client.testimony') }}
            </h2>

            <UPageCard class="flex flex-col items-baseline w-auto h-auto p-3 bg-(--bg-2) rounded-lg shrink-0 grow-0"
                :ui="{
                    description: 'font-semibold text-(--text) mb-3 fs-lead'
                }">
                <template #description>
                    <p class="line-clamp-3 md:line-clamp-5">“{{ client.testimony }}”</p>
                </template>
                <template #footer>
                    <UUser :avatar="client.image" :name="client.customerName" size="xl" orientation="horizontal"
                        :key="`client-avatar-${client.customerName}`" :ui="{
                            root: 'items-center',
                            name: 'fs-small text-2xl text-(--text) font-semibold tracking-tight leading-snug',
                            description: 'flex flex-col fs-small leading-relaxed text-(--text-2)',
                            avatar: 'size-16 bg-(--bg)'
                        }">
                        <template #description>
                            <span>{{ client.customerJob }} {{ t('client.employed_at') }}
                                {{ client.customerEnterpriseName }}
                            </span>
                        </template>
                    </UUser>
                </template>
            </UPageCard>
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
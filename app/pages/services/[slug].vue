<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import dayjs from 'dayjs';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';
import PackagesContainer from '@/components/index/organisms/PackagesContainer.vue'
import CustomerScreeningModal from '~/app/components/layout/organisms/CustomerScreeningModal.vue';

const route = useRoute(),
    { t, locale, locales } = useI18n();

useSidebarFocusState();

const slug = computed(() => String(route.params.slug));
const asyncKey = computed(() => `services-${slug.value}-${locale.value}`);

const { data: service, error } = await useAsyncData(
    () => asyncKey.value,
    () => queryCollection("services")
        .where("slug", "=", slug.value)
        .where("locale", "=", locale.value)
        .first(),
    /* $fetch(`/api/services/${route.params.slug}`, {
        query: { locale: locale.value }
    }), */
);

if (error.value) throw createError({ statusCode: 500, message: 'Failed to load service', statusMessage: 'Failed to load service', cause: error.value, fatal: true });
if (!service.value) throw createError({ statusCode: 404, message: 'Service not found', statusMessage: 'Service not found', cause: error.value, fatal: true });

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: t('breadcrumb.services'),
        to: ''
    },
    {
        label: service.value?.title,
        to: route.path
    }
];

const articlePublishedTime = computed(() => dayjs(service.value?.created_at).locale(locale.value).format()),
    articleModifiedTime = computed(() => dayjs(service.value?.updated_at).locale(locale.value).format());
const created_atDate = computed(() => dayjs(service.value?.created_at).locale(locale.value).format("DD MMMM YYYY")),
    updated_atDate = computed(() => dayjs(service.value?.updated_at).locale(locale.value).format("DD MMMM YYYY"));

const src = computed(() => service.value?.image?.sources?.detail?.mobile || service.value?.image?.sources?.feed?.mobile || ''),
    tabletSrc = computed(() => service.value?.image?.sources?.detail?.tablet || service.value?.image?.sources?.feed?.tablet || src),
    desktopSrc = computed(() => service.value?.image?.sources?.detail?.desktop || service.value?.image?.sources?.feed?.desktop || tabletSrc);

useHeadSafe(() => ({
    title: t('seo.page.title', { pagetitle: service.value?.title }),
    meta: [
        // Meta names
        { name: 'description', content: t('seo.page.description', { pagetitle: service.value?.description }) },
        // Meta properties
        { property: 'og:title', content: t('seo.page.title', { pagetitle: service.value?.title }) },
        { property: 'og:description', content: t('seo.page.description', { pagetitle: service.value?.description }) },
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
            href: `https://aureldev.com${route.path}`
        },
        ...locales.value.map((l: { code: string }) => ({
            rel: 'alternate',
            hreflang: l.code,
            href: `https://aureldev.com${route.path}`
        }))
    ]
}));

useSeoMeta(({
    ogImageAlt: service.value?.image?.alt,
    twitterCard: 'summary_large_image',
}));

watchEffect(() => {
    if (!service.value) return;
});
</script>

<template>
    <template v-if="service">
        <ArticleLayout class="fs-body">
            <UBreadcrumb :items="breadcrumbItems" class="my-2 fs-body">
                <template #separator>
                    <span class="mx-2 text-(--text-muted)">/</span>
                </template>
            </UBreadcrumb>
            <p class="fs-small text-(--text-2)">
                {{ t('project.published_on') }}
                <time v-if="service.created_at" :datetime="service.created_at">{{ created_atDate }}</time>
                <template v-if="service.updated_at">
                    {{ t('post.updated_on') }}
                    <time v-if="service.updated_at" :datetime="service.updated_at">{{ updated_atDate }}</time>
                </template>
            </p>

            <h1 id="service-title" class="fs-heading font-semibold tracking-tight leading-snug mt-2">
                {{ service.title }} -
                <span class="fs-subtitle text-(--text-2) leading-snug">
                    {{ service.description }}
                </span>
            </h1>

            <div>
                <p class="fs-subtitle font-semibold tracking-tight leading-snug mt-2">{{ t('plans.warning.title') }}</p>
                <p class="fs-body text-(--text-2) leading-snug">{{ t('plans.warning.description') }}</p>
            </div>

            <ContentRenderer :value="service" />

            <ul>
                <li v-for="(content, i) in service.packages" :key="i" class="flex flex-col mb-6 gap-6">
                    <h3 class="fs-subtitle font-semibold tracking-tight leading-snug mt-2">{{ content.title }}</h3>
                    <PackagesContainer :services="content.children" />
                </li>
            </ul>

            <div class="flex flex-col md:flex-row justify-evenly">
                <CustomerScreeningModal :cta-label="t('index.landing_section.cta_project')"
                    :cta-icon="'fa7-solid:comment-dots'"
                    :cta-class="'w-min px-5 py-2.5 gap-2 rounded-lg bg-(--bg-3) border border-(--accent)/40 text-(--text) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body'" />

                <CustomerScreeningModal :cta-label="t('index.landing_section.cta_audit')" :cta-icon="'fa7-solid:chart-simple'"
                    :cta-class="'w-min px-5 py-2.5 gap-2 rounded-lg bg-(--bg-3) border border-(--accent)/40 text-(--text) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body'" />
            </div>
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
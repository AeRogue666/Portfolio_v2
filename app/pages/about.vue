<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import ArticleLayout from '../components/layout/molecules/ArticleLayout.vue';

const { t, locale, locales } = useI18n(),
    route = useRoute(),
    colorMode = useColorMode(),
    { formatDate, formatISO } = useDate();

const avatarSrc = ref<string>('/images/logo/logo_k_dark.png');

const contentPath = computed(() => `/about/${locale.value}`)
const asyncKey = computed(() => `about-${locale.value}`);

const { data: about, error } = await useAsyncData(
    () => asyncKey.value,
    () => queryCollection('about')
        .path(contentPath.value)
        .first(),
    {
        watch: [locale]
    }
);
if (error.value) {
    throw createError({ statusCode: 404, message: 'about data is not found', statusMessage: 'about data is not found', cause: error.value, fatal: true });
}

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: t('breadcrumb.about'),
        to: '/about'
    },
]);

onMounted(() => {
    watch(
        () => colorMode.value,
        (mode) => {
            avatarSrc.value = `/images/logo/logo_k_${mode}.png`
        },
        { immediate: true }
    );
});

const articlePublishedTime = computed(() => formatISO(about.value?.created_at)), // dayjs(about.value?.created_at).locale(locale.value).format()
    articleModifiedTime = computed(() => formatISO(about.value?.updated_at)); // dayjs(about.value?.updated_at).locale(locale.value).format()
const created_atDate = computed(() => formatDate(about.value?.created_at)), // dayjs(about.value?.created_at).locale(locale.value).format("DD MMMM YYYY")
    updated_atDate = computed(() => formatDate(about.value?.updated_at)); // dayjs(about.value?.updated_at).locale(locale.value).format("DD MMMM YYYY")

if (about.value) {
    useHeadSafe(() => ({
        title: t('seo.page.title', { pagetitle: t('breadcrumb.about') }),
        meta: [
            // Meta names
            { name: 'description', content: t('seo.page.description', { pagetitle: t('breadcrumb.about') }) },
            // Meta properties
            { property: 'og:title', content: t('seo.page.title', { pagetitle: t('breadcrumb.about') }) },
            { property: 'og:description', content: t('seo.page.description', { pagetitle: t('breadcrumb.about') }) },
            { property: 'og:type', content: 'article' },
            { property: 'article:author', content: 'Aureldev' },
            { property: 'article:published_time', content: articlePublishedTime.value ?? created_atDate.value ?? '' },
            { property: 'article:modified_time', content: articleModifiedTime.value ?? updated_atDate.value ?? '' },
        ],
        link: [
            {
                rel: 'canonical',
                href: `https://codekorico.com${route.path}`
            },
            ...locales.value.map((l: { code: any; }) => ({
                rel: 'alternate',
                hreflang: l.code,
                href: `https://codekorico.com${route.path}`
            }))
        ]
    }));

    useSeoMeta(({
        ogImageAlt: about.value.image?.alt,
        twitterCard: 'summary_large_image',
    }));

    useSchemaOrg([
        defineOrganization({
            name: 'CodeKorico',
            url: 'https://codekorico.com',
            logo: '',
            sameAs: [
                'https://github.com'
            ]
        }),
        defineService({
            name: about.value.title,
            description: about.value.description,
            provider: {
                type: 'Organization',
                name: 'CodeKorico',
                url: 'https://codekorico.com'
            },
            inLanguage: locale.value === 'fr' ? 'fr-FR' : 'en-US',
        })
    ]);
}
</script>

<template>
    <template v-if="about">
        <ArticleLayout class="fs-body">
            <template #header class="flex flex-col mb-10">
                <nav aria-label="Fil d'Ariane" class="my-2">
                    <UBreadcrumb :items="breadcrumbItems" class="my-2 fs-body" variant="link" color="neutral" :ui="{
                        link: 'text-(--text-2) hover:text-(--text) transition-colors',
                        linkActive: 'text-(--text-2) fs-body no-underline'
                    }">
                        <template #item-label="{ item }">
                            <span :class="[item.to ? 'underline' : 'no-underline']">
                                {{ item.label }}
                            </span>
                        </template>

                        <template #separator>
                            <span class="mx-2 text-(--text-muted)" aria-hidden="true">/</span>
                        </template>
                    </UBreadcrumb>
                </nav>

                <p class="fs-small text-(--text-2)">
                    {{ t('page.created_on') }}
                    <time v-if="about.created_at" :datetime="created_atDate">{{ created_atDate }}</time>
                    <template v-if="about.updated_at">
                        & {{ t('page.updated_on') }}
                        <time :datetime="updated_atDate">{{ updated_atDate }}</time>
                    </template>
                </p>

                <h1 id="article-title" class="fs-heading font-bold">{{ about.title }}</h1>
                <p class="text-(--text-2) fs-subtitle leading-snug">{{ about.description }}</p>
            </template>

            <div class="flex flex-col justify-center items-center">
                <UUser size="3xl" orientation="vertical" :name="t('sidebar-left.user_title')"
                    :description="t('sidebar-left.user_description')" key="user-avatar" :avatar="{
                        src: avatarSrc,
                        icon: 'fa7-solid:user',
                        alt: t('sidebar-left.user_alternative_text')
                    }" :ui="{
                        root: 'items-center',
                        name: 'fs-subtitle text-2xl text-(--text) text-center font-semibold tracking-tight leading-snug',
                        description: 'fs-body leading-relaxed text-(--text-2)',
                        avatar: `size-40 bg-(--bg-2) border-2 ${colorMode.value == 'dark' ? 'border-white' : 'border-black'}`
                    }" fetchpriority="high" />
                <span class="fs-small text-(--text-muted) leading-relaxed">
                    {{ t('about.user_tagline') }}
                </span>
            </div>

            <ContentRenderer :value="about" />
        </ArticleLayout>
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
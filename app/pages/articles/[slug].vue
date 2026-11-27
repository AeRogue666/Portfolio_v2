<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';

const route = useRoute(),
    { t, locale, locales } = useI18n(),
    { formatDate, formatISO } = useDate();

const slug = computed(() => String(route.params.slug));
const asyncKey = computed(() => `article-${slug.value}-${locale.value}`);

const { data: article, error } = await useAsyncData(
    () => asyncKey.value,
    () => queryCollection("articles")
        .where("slug", "=", slug.value)
        .where("locale", "=", locale.value)
        .first(),
    /* $fetch(`/api/articles/${route.params.slug}`, {
        query: { locale: locale.value }
    }), */
);
if (error.value) throw createError({ statusCode: 500, message: 'Failed to load article', statusMessage: 'Failed to load article', cause: error.value, fatal: true });
if (!article.value) throw createError({ statusCode: 404, message: 'article not found', statusMessage: 'article not found', cause: error.value, fatal: true });

watchEffect(() => {
    if (!article.value) return;
});

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: article.value?.title,
        to: ''
    }
]);

const articlePublishedTime = computed(() => formatISO(article.value?.created_at)), // dayjs(article.value?.created_at).locale(locale.value).format()
    articleModifiedTime = computed(() => formatISO(article.value?.updated_at)); // dayjs(article.value?.updated_at).locale(locale.value).format()
const created_atDate = computed(() => formatDate(article.value?.created_at)), // dayjs(article.value?.created_at).locale(locale.value).format("DD MMMM YYYY")
    updated_atDate = computed(() => formatDate(article.value?.updated_at)); // dayjs(article.value?.updated_at).locale(locale.value).format("DD MMMM YYYY")

const src = computed(() => article.value?.image?.sources?.detail?.mobile || article.value?.image?.sources?.feed?.mobile || ''),
    tabletSrc = computed(() => article.value?.image?.sources?.detail?.tablet || article.value?.image?.sources?.feed?.tablet || src.value),
    desktopSrc = computed(() => article.value?.image?.sources?.detail?.desktop || article.value?.image?.sources?.feed?.desktop || tabletSrc.value);

if (article.value) {
    useSeoMeta({
        title: `${article.value.title} | CodeKorico`,
        ogTitle: `${article.value.title} | CodeKorico`,
        description: article.value.description,
        ogDescription: article.value.description,
        ogUrl: () => `https://codekorico.com${route.path}`,
        ogImage: () => `https://codekorico.com/images/${route.path}/mobile.png`,
        ogImageAlt: article.value.image?.alt,
        ogImageType: 'image/png',
        ogImageWidth: 1080,
        ogImageHeight: 1920,
        ogType: 'article',
        articleAuthor: ['CodeKorico'],
        articlePublishedTime: articlePublishedTime.value ?? created_atDate.value ?? "",
        articleModifiedTime: articleModifiedTime.value ?? updated_atDate.value ?? "",
    }),
        useHead({
            link: [
                {
                    rel: 'canonical',
                    href: `https://codekorico.com${route.path}`
                },
                ...locales.value.map((l: { code: string }) => ({
                    rel: 'alternate',
                    hreflang: l.code,
                    href: `https://codekorico.com${route.path}`
                } as const))
            ]
        });
}
/* <NuxtPicture :src="src" :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`" :img-attrs="{
                alt: article.image?.alt,
                srcset: `${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`,
                sizes: 'sm:100vw md:80vw lg:64rem',
                class: 'my-2 rounded-lg border-2 border-solid border-(--border-subtle)'
            }" :widths="[320, 640, 960, 1280, 1536, 1920]" format="png" placeholder="blur" /> */
/* <picture>
                <source :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`" type="image/png"
                    :widths="[320, 640, 960, 1280, 1536, 1920]" />
                <img :src="src" :alt="article.image?.alt" sizes="sm:100vw md:80vw lg:64rem"
                    class="my-2 rounded-lg border-2 border-solid border-(--border-subtle)" />
            </picture> */
</script>

<template>
    <template v-if="article">
        <ArticleLayout class="fs-body">
            <template #header>
                <UBreadcrumb :items="breadcrumbItems" :aria-label="t('breadcrumb.title')" class="my-2 fs-body"
                    color="neutral" :ui="{
                        list: 'flex flex-col md:flex-row items-start',
                        link: 'text-(--text-2) hover:text-(--text) transition-colors'
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

                <p class="fs-small text-(--text-2)">
                    {{ t('project.published_on') }}
                    <time v-if="article.created_at" :datetime="articlePublishedTime">{{ created_atDate }}</time>
                    <template v-if="article.updated_at">
                        & {{ t('post.updated_on') }}
                        <time :datetime="articleModifiedTime">{{ updated_atDate }}</time>
                    </template>
                </p>

                <h1 id="article-title" class="fs-heading font-semibold tracking-tight leading-snug my-2">
                    {{ article.title }}
                </h1>
                <p class="fs-subtitle text-(--text-2) leading-snug">
                    {{ article.description }}
                </p>
            </template>

            <ContentRenderer :value="article" class="prose prose-neutral dark:prose-invert max-w-none" />

            <template #footer>
                <a v-if="article.links?.linkedin" :href="article.links.linkedin"
                    class="inline-flex items-center gap-2 fs-body text-(--accent) hover:text-(--accent-hover) font-medium text-scalable transition-colors">
                    {{ t('article.watch_code') }}
                </a>
                <a v-if="article.links?.devto" :href="article.links.devto"
                    class="inline-flex items-center gap-2 fs-body text-(--accent) hover:text-(--accent-hover) font-medium text-scalable transition-colors">
                    {{ t('article.watch_demo') }}
                </a>
                <a v-if="article.links?.medium" :href="article.links.medium"
                    class="inline-flex items-center gap-2 fs-body text-(--accent) hover:text-(--accent-hover) font-medium text-scalable transition-colors">
                    {{ t('article.watch_demo') }}
                </a>
                <a v-if="article.links?.original" :href="`https://codekorico.com${route.path}`"
                    class="inline-flex items-center gap-2 fs-body text-(--accent) hover:text-(--accent-hover) font-medium text-scalable transition-colors">
                    {{ t('article.watch_demo') }}
                </a>
            </template>
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
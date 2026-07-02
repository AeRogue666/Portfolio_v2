<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';

const route = useRoute(),
    { t, locale, locales } = useI18n(),
    { formatDate, formatISO } = useDate();

useSidebarFocusState();

const slug = computed(() => String(route.params.slug));
const asyncKey = computed(() => `clients-${slug.value}-${locale.value}`);

const { data: client, error } = await useAsyncData(
    () => asyncKey.value,
    () => queryCollection("clients")
        .where("slug", "=", slug.value)
        .where("locale", "=", locale.value)
        .first(),

    /* $fetch(`/api/clients/${route.params.slug}`, {
        query: { locale: locale.value }
    }), */
);

if (error.value) throw createError({ statusCode: 500, message: 'Failed to load client', statusMessage: 'Failed to load client', cause: error.value, fatal: true });
if (!client.value) throw createError({ statusCode: 404, message: 'Client not found', statusMessage: 'Client not found', cause: error.value, fatal: true });


const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: t('breadcrumb.clients'),
        to: ''
    },
    {
        label: client.value?.customer_name,
        to: route.path
    },
]);

const articlePublishedTime = computed(() => formatISO(client.value?.created_at)), // dayjs(client.value?.created_at).locale(locale.value).format()
    articleModifiedTime = computed(() => formatISO(client.value?.updated_at)); // dayjs(client.value?.updated_at).locale(locale.value).format()
const created_atDate = computed(() => formatDate(client.value?.created_at)), // dayjs(client.value?.created_at).locale(locale.value).format("DD MMMM YYYY")
    updated_atDate = computed(() => formatDate(client.value?.updated_at)); // dayjs(client.value?.updated_at).locale(locale.value).format("DD MMMM YYYY")

const src = computed(() => client.value?.image?.sources?.detail?.mobile || client.value?.image?.sources?.feed?.mobile || ''),
    tabletSrc = computed(() => client.value?.image?.sources?.detail?.tablet || client.value?.image?.sources?.feed?.tablet || src),
    desktopSrc = computed(() => client.value?.image?.sources?.detail?.desktop || client.value?.image?.sources?.feed?.desktop || tabletSrc);

useHeadSafe(() => ({
    title: client.value?.title,
    meta: [
        // Meta names
        { name: 'description', content: client.value?.description },
        // Meta properties
        { property: 'og:title', content: client.value?.title },
        { property: 'og:description', content: client.value?.description },
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
        ...locales.value.map((l: { code: string }) => ({
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
                <time v-if="client.created_at" :datetime="client.created_at">{{ created_atDate }}</time>
                <template v-if="client.updated_at">
                    {{ t('post.updated_on') }}
                    <time v-if="client.updated_at" :datetime="client.updated_at">{{ updated_atDate }}</time>
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
                    {{ client.customer_enterprise_name }}
                </span>
            </div>

            <ContentRenderer :value="client" />

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
                    <UUser :avatar="client.image" :name="client.customer_name" size="xl" orientation="horizontal"
                        :key="`client-avatar-${client.customer_name}`" :ui="{
                            root: 'items-center',
                            name: 'fs-small text-2xl text-(--text) font-semibold tracking-tight leading-snug',
                            description: 'flex flex-col fs-small leading-relaxed text-(--text-2)',
                            avatar: 'size-16 bg-(--bg)'
                        }">
                        <template #description>
                            <span>{{ client.customer_job }} {{ t('client.employed_at') }}
                                {{ client.customer_enterprise_name }}
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
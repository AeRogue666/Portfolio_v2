<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import type { ClientResolved } from '@/types/client';
import dayjs from 'dayjs';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';

const route = useRoute(),
    { t, locale, locales } = useI18n();

const asyncKey = computed(() => `clients-${route.params.slug}-${locale.value}`);
const { data: page, error } = await useAsyncData<ClientResolved>(
    () => asyncKey.value,
    () => $fetch(`/api/clients/${route.params.slug}`, {
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
        label: page.value?.customer_name,
        to: route.path
    },
];

useHead(() => ({
    link: [
        {
            rel: 'canonical',
            href: `https://aureldev.dev/projects/${route.params.slug}`
        },
        ...locales.value.map(l => ({
            rel: 'alternate',
            hreflang: l.code,
            href: `https://aureldev.dev/${l.code}/${route.params.slug}`
        }))
    ]
}));

watchEffect(() => {
    if (!page.value) return;

    useSeoMeta(({
        title: t('seo.page.title', { pagetitle: page.value.customer_name }),
        description: t('seo.page.description', { pagetitle: `${page.value?.title} ${page.value?.description}` }),
        ogTitle: t('seo.page.title', { pagetitle: page.value?.title }),
        ogDescription: t('seo.page.description', { pagetitle: `${page.value?.title} ${page.value?.description}` }),
        ogImage: page.value?.image?.sources?.detail.mobile,
        ogImageAlt: page.value?.image?.alt,
        twitterCard: 'summary_large_image',
    }));
});

onMounted(() => {
    console.log(page.value)
});

const src = computed(() => page.value?.image?.sources?.detail?.mobile || page.value?.image?.sources?.feed?.mobile || ''),
    tabletSrc = computed(() => page.value?.image?.sources?.detail?.tablet || page.value?.image?.sources?.feed?.tablet || src),
    desktopSrc = computed(() => page.value?.image?.sources?.detail?.desktop || page.value?.image?.sources?.feed?.desktop || tabletSrc);

const created_atDate = computed(() => dayjs(page.value?.created_at).locale(locale.value).format("DD MMMM YYYY")),
    updated_atDate = computed(() => dayjs(page.value?.updated_at).locale(locale.value).format("DD MMMM YYYY"));
</script>

<template>
    <template v-if="page">
        <ArticleLayout class="fs-body">
            <UBreadcrumb :items="breadcrumbItems" class="my-2 fs-body">
                <template #separator>
                    <span class="mx-2 text-(--text-muted)">/</span>
                </template>
            </UBreadcrumb>
            <p class="fs-small text-(--text-2)">
                {{ t('project.published_on') }}
                <time v-if="page.created_at" :datetime="page.created_at">{{ created_atDate }}</time>
                <template v-if="page.updated_at">
                    {{ t('post.updated_on') }}
                    <time v-if="page.updated_at" :datetime="page.updated_at">{{ updated_atDate }}</time>
                </template>
            </p>

            <h1 id="client-title" class="fs-heading font-semibold tracking-tight leading-snug mt-2">
                {{ page.title }}
            </h1>
            <span class="fs-subtitle text-(--text-2) leading-snug">
                {{ t('client.subtitle') }} {{ page.customer_enterprise_name }}
            </span>

            <NuxtImg :src="src" :alt="page.image?.alt" sizes="xs:100vw sm:100vw md:80vw lg:64rem"
                :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`"
                class="my-2 rounded-lg border-2 border-solid border-(--border-subtle)" loading="lazy"
                placeholder="blur" />

            <ContentRenderer :value="page" />

            <div class="flex flex-col">
                <h2 id="testimony-title"
                    class="font-semibold leading-snug tracking-tight lg:font-extrabold lg:leading-none mb-4 fs-title">
                    {{ t('client.testimony') }}
                </h2>
                <blockquote>
                    <p class="fs-body text-(--text-2) leading-snug">
                        "{{ page.testimony }}"
                    </p>
                </blockquote>
                <p class="fs-small text-(--text-2) leading-snug">
                    <cite>{{ page.customer_name }}</cite>
                </p>
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
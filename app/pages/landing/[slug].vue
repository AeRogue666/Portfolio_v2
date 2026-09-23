<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';
import CustomerScreeningModal from '@/components/layout/organisms/CustomerScreeningModal.vue';

const route = useRoute(),
    { t, locale, locales } = useI18n(),
    { formatDate, formatISO } = useDate();

useSidebarFocusState();

const slug = computed(() => String(route.params.slug));
const asyncKey = computed(() => `landing-${slug.value}-${locale.value}`);

const { data: landing, error } = await useAsyncData(
    () => asyncKey.value,
    () => queryCollection("landing")
        .where("slug", "=", slug.value)
        .where("locale", "=", locale.value)
        .first(),
);

if (error.value) throw createError({ statusCode: 500, message: 'Failed to load landing page', statusMessage: 'Failed to load landing page', cause: error.value, fatal: true });
if (!landing.value) throw createError({ statusCode: 404, message: 'Landing page not found', statusMessage: 'Landing page not found', cause: error.value, fatal: true });

const articlePublishedTime = computed(() => formatISO(landing.value?.created_at)), // dayjs(landing.value?.created_at).locale(locale.value).format()
    articleModifiedTime = computed(() => formatISO(landing.value?.updated_at)); // dayjs(landing.value?.updated_at).locale(locale.value).format()
const created_atDate = computed(() => formatDate(landing.value?.created_at)), // dayjs(landing.value?.created_at).locale(locale.value).format("DD MMMM YYYY")
    updated_atDate = computed(() => formatDate(landing.value?.updated_at)); // dayjs(landing.value?.updated_at).locale(locale.value).format("DD MMMM YYYY")

const src = computed(() => landing.value?.image?.sources?.detail?.mobile || landing.value?.image?.sources?.feed?.mobile || ''),
    tabletSrc = computed(() => landing.value?.image?.sources?.detail?.tablet || landing.value?.image?.sources?.feed?.tablet || src),
    desktopSrc = computed(() => landing.value?.image?.sources?.detail?.desktop || landing.value?.image?.sources?.feed?.desktop || tabletSrc);

const landingType = computed(() => slug.value.split('-')[0]);

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: t('breadcrumb.landing'),
        to: ''
    },
    {
        label: landing.value.feed_title,
        to: ''
    }
];

if (landing.value) {
    useSeoMeta({
        title: `${landing.value.title} | CodeKorico`,
        ogTitle: `${landing.value.title} | CodeKorico`,
        description: landing.value.description,
        ogDescription: landing.value.description,
        ogUrl: () => `https://codekorico.com${route.path}`,
        ogImage: `https://codekorico.com${route.path}`,
        ogImageAlt: landing.value.image?.alt,
        ogImageType: 'image/png',
        ogImageWidth: 1920,
        ogImageHeight: 1080,
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
</script>

<template>
    <template v-if="landing">
        <ArticleLayout class="fs-body">
            <template #header>
                <UBreadcrumb :items="breadcrumbItems" :aria-label="t('breadcrumb.title')" class="my-2 fs-body"
                    color="neutral" :ui="{
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
                    <time v-if="landing.created_at" :datetime="articlePublishedTime">{{ created_atDate }}</time>
                    <template v-if="landing.updated_at">
                        & {{ t('post.updated_on') }}
                        <time :datetime="articleModifiedTime">{{ updated_atDate }}</time>
                    </template>
                </p>

                <h1 id="landing-title" class="fs-heading font-semibold tracking-tight leading-snug my-2">
                    {{ landing.title }}
                </h1>
                <p class="fs-subtitle text-(--text-2) leading-snug">
                    {{ landing.description }}
                </p>
            </template>

            <div class="flex flex-col md:flex-row justify-evenly">
                <CustomerScreeningModal :cta-label="t('index.landing_section.cta_audit')"
                    :cta-icon="'fa7-solid:chart-simple'"
                    :cta-class="'inline-flex items-center justify-center px-5 py-2.5 gap-2 rounded-lg bg-(--text) text-(--bg) border border-transparent transition-all duration-200 hover:bg-(--bg-3)/10 hover:text-(--text) hover:border-(--text) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) fs-lead shadow-md'"
                    :project-type="'audit'" :sub-type="'audit-flash'" />

                <CustomerScreeningModal :cta-label="t('index.landing_section.cta_project')"
                    :cta-icon="'fa7-solid:comment-dots'"
                    :cta-class="'inline-flex items-center justify-center px-5 py-2.5 gap-2 rounded-lg bg-(--bg-2) text-(--text) border transition-all duration-200 hover:bg-(--text) hover:text-(--bg) hover:border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) fs-body shadow-sm'" />
            </div>

            <ContentRenderer :value="landing" />

            <div class="flex flex-col md:flex-row justify-evenly">
                <CustomerScreeningModal :cta-label="t('index.landing_section.cta_project')"
                    :cta-icon="'fa7-solid:comment-dots'"
                    :cta-class="'inline-flex items-center justify-center px-5 py-2.5 gap-2 rounded-lg bg-(--text) text-(--bg) border border-transparent transition-all duration-200 hover:bg-(--bg-3)/10 hover:text-(--text) hover:border-(--text) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) fs-lead shadow-md'" />

                <CustomerScreeningModal :cta-label="t('index.landing_section.cta_audit')"
                    :cta-icon="'fa7-solid:chart-simple'"
                    :cta-class="'inline-flex items-center justify-center px-5 py-2.5 gap-2 rounded-lg bg-(--bg-2) text-(--text) border transition-all duration-200 hover:bg-(--text) hover:text-(--bg) hover:border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) fs-body shadow-sm'"
                    :project-type="'audit'" :sub-type="'audit-flash'" />
            </div>

            <div>
                <p class="fs-subtitle font-semibold tracking-tight leading-snug mt-2">{{ t('plans.warning.title') }}</p>
                <p class="fs-body text-(--text-2) leading-snug">{{ t('plans.warning.description') }}</p>
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
<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';
import PackagesContainer from '@/components/index/organisms/PackagesContainer.vue'
import CustomerScreeningModal from '@/components/layout/organisms/CustomerScreeningModal.vue';

const route = useRoute(),
    { t, locale, locales } = useI18n(),
    { formatDate, formatISO } = useDate();

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
        to: ''
    }
];

const articlePublishedTime = computed(() => formatISO(service.value?.created_at)), // dayjs(service.value?.created_at).locale(locale.value).format()
    articleModifiedTime = computed(() => formatISO(service.value?.updated_at)); // dayjs(service.value?.updated_at).locale(locale.value).format()
const created_atDate = computed(() => formatDate(service.value?.created_at)), // dayjs(service.value?.created_at).locale(locale.value).format("DD MMMM YYYY")
    updated_atDate = computed(() => formatDate(service.value?.updated_at)); // dayjs(service.value?.updated_at).locale(locale.value).format("DD MMMM YYYY")

const src = computed(() => service.value?.image?.sources?.detail?.mobile || service.value?.image?.sources?.feed?.mobile || ''),
    tabletSrc = computed(() => service.value?.image?.sources?.detail?.tablet || service.value?.image?.sources?.feed?.tablet || src),
    desktopSrc = computed(() => service.value?.image?.sources?.detail?.desktop || service.value?.image?.sources?.feed?.desktop || tabletSrc);

const serviceType = computed(() => slug.value.split('-')[0]);

watchEffect(() => {
    if (!service.value) return;
});

if (service.value) {
    useSeoMeta({
        title: `${service.value.title} | CodeKorico`,
        ogTitle: `${service.value.title} | CodeKorico`,
        description: service.value.description,
        ogDescription: service.value.description,
        ogImage: `https://codekorico.com${route.path}`,
        ogImageAlt: t('seo.page.description', { pagetitle: service.value?.title }),
        ogImageType: 'image/png',
        ogImageWidth: 1920,
        ogImageHeight: 1080,
        ogType: 'article',
        articleAuthor: ['CodeKorico'],
        articlePublishedTime: articlePublishedTime.value ?? created_atDate.value ?? '',
        articleModifiedTime: articleModifiedTime.value ?? updated_atDate.value ?? '',
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
            name: service.value.title,
            description: service.value.description,
            provider: {
                type: 'Organization',
                name: 'CodeKorico',
                url: 'https://codekorico.com'
            },
            inLanguage: locale.value === 'fr' ? 'fr-FR' : 'en-US',
            offers: service.value.packages?.map((pkg: any) => ({
                type: 'Offer',
                itemOffered: {
                    type: 'Service',
                    name: pkg.title
                }
            }))
        })
    ]);
}
</script>

<template>
    <template v-if="service">
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
                    <time v-if="service.created_at" :datetime="articlePublishedTime">{{ created_atDate }}</time>
                    <template v-if="service.updated_at">
                        & {{ t('post.updated_on') }}
                        <time :datetime="articleModifiedTime">{{ updated_atDate }}</time>
                    </template>
                </p>

                <h1 id="service-title" class="fs-heading font-semibold tracking-tight leading-snug my-2">
                    {{ service.title }}
                </h1>
                <p class="fs-subtitle text-(--text-2) leading-snug">
                    {{ service.description }}
                </p>
            </template>

            <ContentRenderer :value="service" />

            <ul>
                <li v-for="(content, i) in service.packages" :key="i" class="flex flex-col mb-6 gap-6">
                    <h2 class="fs-subtitle font-semibold tracking-tight leading-snug mt-2">{{ content.title }}</h2>
                    <PackagesContainer :services="content.children" />
                </li>
            </ul>

            <div class="flex flex-col md:flex-row justify-evenly">
                <CustomerScreeningModal :cta-label="t('index.landing_section.cta_project')"
                    :cta-icon="'fa7-solid:comment-dots'"
                    :cta-class="'inline-flex items-center justify-center px-5 py-2.5 gap-2 rounded-lg bg-(--text) text-(--bg) border border-transparent transition-all duration-200 hover:bg-(--bg-3)/10 hover:text-(--text) hover:border-(--text) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) fs-body shadow-md'"
                    :project-type="serviceType" />
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
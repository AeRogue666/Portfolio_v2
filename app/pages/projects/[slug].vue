<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import dayjs from 'dayjs';
import PostBadge from '@/components/feed/molecules/PostBadge.vue';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';
import type { ProjectResolved } from '@/types/project';

const route = useRoute(),
    { t, locale, locales } = useI18n();

const asyncKey = computed(() => `project-${route.params.slug}-${locale.value}`);
const { data: project, error } = await useAsyncData<ProjectResolved>(
    () => asyncKey.value,
    () => $fetch(`/api/projects/${route.params.slug}`, {
        query: { locale: locale.value }
    }),
    {
        watch: [locale]
    }
);
if (error.value) {
    throw createError({ statusCode: 404, message: 'project data is not found', statusMessage: 'project data is not found', cause: error.value, fatal: true });
}

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: t('breadcrumb.projects'),
        to: ''
    },
    {
        label: project.value?.title,
        to: `/projects/${project.value?.slug}`
    }
];

/* useSchemaOrg([
    defineProject({
        name: project.value?.title,
        description: project.value?.summary,
        datePublished: project.value?.date,
        image: project.value?.image?.sources.desktop,
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
    if (!project.value) return;

    useSeoMeta({
        title: project.value?.title,
        description: project.value?.description,
        ogTitle: project.value?.title,
        ogDescription: project.value?.description,
        ogType: 'article',
        ogImage: project.value?.image?.sources.detail.desktop,
        ogImageAlt: project.value?.image?.alt,
        twitterCard: 'summary_large_image',
    });
});

const src = computed(() => project.value?.image?.sources.feed?.mobile || project.value?.image?.sources.detail?.mobile || ''),
    tabletSrc = computed(() => project.value?.image?.sources.feed?.tablet || project.value?.image?.sources.detail?.tablet || src),
    desktopSrc = computed(() => project.value?.image?.sources.feed?.desktop || project.value?.image?.sources.detail?.desktop || tabletSrc);

const created_atDate = computed(() => dayjs(project.value?.created_at).locale(locale.value).format("DD MMMM YYYY")),
    updated_atDate = computed(() => dayjs(project.value?.updated_at).locale(locale.value).format("DD MMMM YYYY"));

/* <NuxtPicture :src="src" :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`" :img-attrs="{
                alt: project.image?.alt,
                srcset: `${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`,
                sizes: 'sm:100vw md:80vw lg:64rem',
                class: 'my-2 rounded-lg border-2 border-solid border-(--border-subtle)'
            }" :widths="[320, 640, 960, 1280, 1536, 1920]" format="png" placeholder="blur" /> */
/* <picture>
                <source :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`" type="image/png"
                    :widths="[320, 640, 960, 1280, 1536, 1920]" />
                <img :src="src" :alt="project.image?.alt" sizes="sm:100vw md:80vw lg:64rem"
                    class="my-2 rounded-lg border-2 border-solid border-(--border-subtle)" />
            </picture> */
</script>

<template>
    <ArticleLayout v-if="project" style="font-size: var(--step-0);">
        <template #header>
            <UBreadcrumb :items="breadcrumbItems" class="my-2 fs-body">
                <template #separator>
                    <span class="mx-2 text-(--text-muted)">/</span>
                </template>
            </UBreadcrumb>
            <p class="fs-small text-(--text-2)">
                {{ t('project.published_on') }}
                <time v-if="project.created_at" :datetime="project.created_at">{{ created_atDate }}</time>
                <template>
                    {{ t('post.updated_on') }}
                    <time v-if="project.updated_at" :datetime="project.updated_at">{{ updated_atDate }}</time>
                </template>
            </p>

            <h1 id="article-title" class="fs-heading font-semibold tracking-tight leading-snug mt-2">
                {{ project.title }}
            </h1>
            <p class="fs-subtitle text-(--text-2) leading-snug">
                {{ project.description }}
            </p>

            <NuxtImg :src="src" :alt="project.image?.alt" sizes="xs:100vw sm:100vw md:80vw lg:64rem"
                :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`"
                class="my-2 rounded-lg border-2 border-solid border-(--border-subtle)" loading="lazy"
                placeholder="blur" />

            <dl class="grid grid-cols-1 sm:grid-cols-2 mt-6 text-sm gap-4">
                <div>
                    <dt class="fs-lead font-semibold leading-snug">
                        {{ t('project.role') }}
                    </dt>
                    <dd class="fs-body text-(--text-2) leading-snug">
                        {{ project.role }}
                    </dd>
                </div>
                <div>
                    <dt class="fs-lead font-semibold leading-snug">
                        {{ t('project.stack') }}
                    </dt>
                    <dd class="flex flex-wrap gap-2">
                        <PostBadge v-for="tech in project.stack" :label="tech" :key="tech" :variant="'soft'"
                            :color="'neutral'" :size="'md'"
                            :class-name="'bg-(--bg-3) text-(--text-2) fs-body border border-(--border-subtle)'" />
                    </dd>
                </div>
            </dl>
        </template>

        <ContentRenderer :value="project" class="prose prose-neutral dark:prose-invert max-w-none" />

        <template #footer>
            <a v-if="project.links?.github" :href="project.links.github"
                class="inline-flex items-center gap-2 fs-body text-(--accent) hover:text-(--accent-hover) font-medium text-scalable transition-colors">
                {{ t('project.watch_code') }}
            </a>
            <a v-if="project.links?.demo" :href="project.links.demo"
                class="inline-flex items-center gap-2 fs-body text-(--accent) hover:text-(--accent-hover) font-medium text-scalable transition-colors">
                {{ t('project.watch_demo') }}
            </a>
        </template>
    </ArticleLayout>
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
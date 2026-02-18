<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import dayjs from 'dayjs';
import PostBadge from '@/components/feed/molecules/PostBadge.vue';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';
import type { ProjectResolved } from '@/types/project';

definePageMeta({
    layout: 'default'
});

const route = useRoute(), { t, locale, locales } = useI18n();

const { data: project, error } = await useAsyncData<ProjectResolved>(
    () => `project-${route.params.slug}-${locale.value}`,
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
        to: ''
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
        description: project.value?.summary,
        ogTitle: project.value?.title,
        ogDescription: project.value?.summary,
        ogType: 'article',
        ogImage: project.value?.image?.sources.detail.desktop,
        ogImageAlt: project.value?.image?.alt,
        twitterCard: 'summary_large_image',
    });
});
</script>

<template>
    <ArticleLayout v-if="project" style="font-size: var(--step-0);">
        <template #header>
            <UBreadcrumb :items="breadcrumbItems" class="my-2">
                <template #separator>
                    <span class="mx-2 text-(--text-muted)">/</span>
                </template>
            </UBreadcrumb>
            <p class="text-sm text-(--text-2)">
                {{ t('project.published_on') }}
                <time :datetime="project.date">{{ dayjs(project.date).format('DD MMMM YYYY') }}</time>
            </p>

            <h1 id="article-title" class="text-2xl font-semibold tracking-tight leading-snug mt-2"
                style="font-size: var(--step-3);">{{ project.title }}</h1>
            <p class="text-base text-(--text-2) leading-snug max-w-[65ch]" style="font-size: var(--step--1);">
                {{ project.summary }}
            </p>

            <NuxtImg :src="project.image?.sources.detail.mobile" :alt="project.image?.alt"
                sizes="(min-width: 80rem) 64rem, (min-width: 64rem) 80vw, 100vw"
                :srcset="`${project.image?.sources.detail.mobile} 640w, ${project.image?.sources.detail.tablet} 768w, ${project.image?.sources.detail.desktop} 1024w`"
                class="my-2 rounded-lg" itemprop="image" placeholder="blur" />

            <dl class="grid grid-cols-1 sm:grid-cols-2 mt-6 text-sm gap-4">
                <div>
                    <dt class="text-2xl font-semibold leading-snug text-scalable" style="font-size: var(--step-2);">{{
                        t('project.role') }}</dt>
                    <dd class="text-base text-(--text-2) leading-snug max-w-[65ch]" style="font-size: var(--step--1);">
                        {{ project.role }}</dd>
                </div>
                <div>
                    <dt class="text-2xl font-semibold leading-snug text-scalable" style="font-size: var(--step-2);">{{
                        t('project.stack') }}</dt>
                    <dd class="flex flex-wrap gap-2">
                        <PostBadge v-for="tech in project.stack" :label="tech" :key="tech" :variant="'soft'"
                            :color="'neutral'" :size="'md'" :class-name="'bg-(--bg-3) text-(--text-2) text-scalable'" />
                    </dd>
                </div>
                <div>
                    <dt class="text-2xl font-semibold leading-snug text-scalable" style="font-size: var(--step-2);">{{
                        t('project.context') }}</dt>
                    <dd class="text-base text-(--text-2) leading-snug max-w-[65ch]" style="font-size: var(--step--1);">
                        {{
                            project.context }}</dd>
                </div>
            </dl>
        </template>

        <section aria-labelledby="problem">
            <h2 id="problem" class="text-2xl font-semibold leading-snug text-scalable"
                style="font-size: var(--step-2);">{{
                    t('project.problem') }}</h2>
            <p class="text-base text-(--text-2) leading-snug max-w-[65ch]" style="font-size: var(--step--1);">{{
                project.problem
                }}</p>
        </section>

        <section aria-labelledby="solution">
            <h2 id="solution" class="text-2xl font-semibold leading-snug text-scalable"
                style="font-size: var(--step-2);">
                {{ t('project.solution') }}
            </h2>
            <p class="text-base text-(--text-2) leading-snug max-w-[65ch]" style="font-size: var(--step--1);">
                {{ project.solution }}
            </p>
        </section>

        <section aria-labelledby="tech">
            <h2 id="tech" class="text-2xl font-semibold leading-snug text-scalable" style="font-size: var(--step-2);">
                {{ t('project.technical_choices') }}
            </h2>
            <ul class="flex flex-col justify-center items-baseline">
                <li v-for="tech in project.technicalChoices" :key="tech.title">
                    <strong>{{ tech.title }}</strong> - {{ tech.description }}
                </li>
            </ul>
        </section>

        <section aria-labelledby="a11y">
            <h2 id="a11y" class="text-2xl font-semibold leading-snug text-scalable" style="font-size: var(--step-2);">
                {{ t('project.accessibility') }}
            </h2>
            <p class="text-base text-(--text-2) leading-snug max-w-[65ch]" style="font-size: var(--step--1);">
                {{ project.accessibility }}</p>
        </section>

        <section aria-labelledby="results">
            <h2 id="results" class="text-2xl font-semibold leading-snug text-scalable"
                style="font-size: var(--step-2);">
                {{ t('project.learnings') }}
            </h2>
            <ul>
                <li v-for="learning in project.learnings" class="flex flex-col" :key="learning">{{ learning }}</li>
            </ul>
        </section>

        <template #footer>
            <a v-if="project.links?.github" :href="project.links.github">{{ t('project.watch_code') }}</a>
            <a v-if="project.links?.demo" :href="project.links.demo">{{ t('project.watch_demo') }}</a>
        </template>
    </ArticleLayout>
</template>
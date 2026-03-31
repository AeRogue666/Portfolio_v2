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
        description: project.value?.summary,
        ogTitle: project.value?.title,
        ogDescription: project.value?.summary,
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

            <h1 id="article-title" class="fs-heading font-semibold tracking-tight leading-snug mt-2">{{ project.title }}
            </h1>
            <p class="fs-subtitle text-(--text-2) leading-snug">
                {{ project.description }}
            </p>

            <NuxtImg :src="src"
                :srcset="`${src} 640w, ${tabletSrc} 768w, ${desktopSrc} 1024w`"
                width="1280" height="960" sizes="xs:100vw md:80vw lg:64rem" :alt="project.image?.alt"
                class="my-2 rounded-lg border-2 border-solid border-(--border-subtle)" :placeholder="true" />
            <!-- width="768" height="432" -->
            <!-- sizes="xs:100vw md:80vw lg:64rem" -->

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
        <!-- <section aria-labelledby="context">
            <h2 class="fs-title font-semibold leading-snug">
                {{ t('project.context') }}
            </h2>
            <p class="fs-body text-(--text-2) leading-snug">
                {{ project.context }}
            </p>
        </section>

        <section aria-labelledby="problem">
            <h2 id="problem" class="fs-title font-semibold leading-snug">
                {{ t('project.problem') }}
            </h2>
            <p class="fs-body text-(--text-2) leading-snug">
                {{ project.problem }}
            </p>
        </section>

        <section aria-labelledby="solution">
            <h2 id="solution" class="fs-title font-semibold leading-snug">
                {{ t('project.solution') }}
            </h2>
            <p class="fs-body text-(--text-2) leading-snug">
                {{ project.solution }}
            </p>
        </section>

        <section aria-labelledby="tech">
            <h2 id="tech" class="fs-title font-semibold leading-snug">
                {{ t('project.technical_choices') }}
            </h2>
            <ul class="flex flex-col justify-center items-baseline">
                <li v-for="tech in project.technicalChoices" :key="tech.title"
                    class="fs-body text-(--text-2) leading-snug">
                    <strong>{{ tech.title }}</strong> - {{ tech.description }}
                </li>
            </ul>
        </section>

        <section aria-labelledby="a11y">
            <h2 id="a11y" class="fs-title font-semibold leading-snug">
                {{ t('project.accessibility') }}
            </h2>
            <p class="fs-body text-(--text-2) leading-snug">
                {{ project.accessibility }}</p>
        </section>

        <section aria-labelledby="results">
            <h2 id="results" class="fs-title font-semibold leading-snug">
                {{ t('project.learnings') }}
            </h2>
            <ul>
                <li v-for="learning in project.learnings" class="flex flex-col" :key="learning">
                    <p class="fs-body text-(--text-2) leading-snug">{{ learning }}
                    </p>
                </li>
            </ul>
        </section> -->

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
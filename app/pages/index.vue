<script setup lang="ts">
import type { FeedResponse } from '../types/feed';
import IndexSection from '../components/index/IndexSection.vue';
import LandingSection from '../components/index/LandingSection.vue';
import ExpertiseContainer from '../components/index/organisms/ExpertiseContainer.vue';
import PlansContainer from '../components/index/organisms/PlansContainer.vue';
import SendMessageModal from '../components/layout/organisms/SendMessageModal.vue';
import CarouselWrapper from '../components/index/organisms/CarouselWrapper.vue';
import type { PlanResolved, PlanResponse } from '../types/plan';

const { t, locale } = useI18n(),
    colorMode = useColorMode(),
    avatarSrc = ref('https://avatars.githubusercontent.com/u/38510448?v=4'),
    fillColor = ref<string[] | undefined>(undefined);

useSidebarFocusState();

const { data: postsData } = await useAsyncData(
    () => `index-projects-${locale.value}`,
    () => $fetch<FeedResponse>('/api/posts', {
        query: { locale: locale.value }
    }),
    { watch: [locale] }
);

const clientsCarouselItems = computed(() => {
    if (!postsData.value?.items) return [];

    // Filter Clients data
    return postsData.value.items.filter(item =>
        (item.kind === 'client' || item.kindFallback === 'client') && item.image
    ).map(item => ({
        title: item.feed_title,
        description: item.feed_summary,
        testimony: item.testimony,
        customer_name: item.customer_name,
        image: item.image!.sources.feed?.mobile || '',
        alt: item.image!.alt,
        link: `/clients/${item.slug}`,
    }));
})

const realisationsCarouselItems = computed(() => {
    if (!postsData.value?.items) return [];

    // Filter Projects data
    return postsData.value.items.filter(item =>
        (item.kind === 'project' || item.kindFallback === 'project') && item.image
    )
        .map(item => ({
            image: item.image!.sources.detail?.mobile
                || item.image!.sources.feed?.mobile
                || '',
            alt: item.image!.alt,
            description: item.feed_title ?? item.title,
            link: `/projects/${item.slug}`,
        }));
});

const { data: plansData } = await useAsyncData(
    () => `index-plans-${locale.value}`,
    () => $fetch<PlanResponse>('/api/plans', {
        query: { locale: locale.value }
    }),
    { watch: [locale] }
);

const plansContainerItems = computed(() => {
    if(!plansData.value?.items) return [];

    return plansData.value.items;
});

onMounted(() => {
    watch(
        () => colorMode.value,
        (mode) => {
            avatarSrc.value =
                mode === 'dark'
                    ? 'https://github.com/nuxt.png'
                    : 'https://avatars.githubusercontent.com/u/38510448?v=4'
            fillColor.value =
                mode === 'dark'
                    ? undefined
                    : ['--bg', '--bg', '--bg', '--bg', '--bg', '--bg']
        },
        { immediate: true }
    );
});

useSeoMeta(({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    ogTitle: t('seo.home.title'),
    ogDescription: t('seo.home.description'),
    ogImage: '/images/project/portfolio-v2/desktop.png',
    twitterCard: 'summary_large_image',
}));
</script>

<template>
    <UContainer class="max-w-none">
        <!-- Landing section -->
        <LandingSection id="landing-section" aria-labelledby="index-title" tabindex="-1"
            :fill="fillColor?.[0] ?? '--bg-3'">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) fs-small tracking-widest uppercase">
                    {{ t('index.user_title') }}
                </span>
            </template>

            <template #title>
                <h1 id="index-title"
                    class="flex flex-col font-bold fs-hero tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36">
                    <span class="text-(--accent)">{{ t('index.landing_section.title_accent') }}</span>
                    <span class="text-(--text)">{{ t('index.landing_section.title_rest') }}</span>
                </h1>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48 fs-subtitle">
                    {{ t('index.landing_section.description') }}
                </p>
            </template>

            <NuxtLink to="/feed"
                class="inline-flex items-center px-5 py-2.5 gap-2 rounded-lg border border-(--accent)/40 text-(--accent) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body">
                {{ t('index.landing_section.cta') }}
                <UIcon name="fa7-solid:arrow-right" class="text-sm" />
            </NuxtLink>
        </LandingSection>

        <!-- Clients section -->
        <IndexSection id="client-section" :class="'bg-(--bg-3)'" :fill="fillColor?.[1] ?? '--card-experiment-bg'">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase fs-small">
                    {{ t('index.client_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 id="clients-title"
                    class="font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36 fs-title">
                    {{ t('index.client_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48 fs-lead">
                    {{ t('index.client_section.description') }}
                </p>
            </template>

            <UCarousel v-if="clientsCarouselItems.length !== 0" v-slot="{ item }" class-names arrows dots
                :autoplay="{ delay: 6000 }" :items="clientsCarouselItems" class="w-full max-w-md my-10" :ui="{
                    item: 'basis-full',
                    prev: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg-(--bg-3) text-(--text-2) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90',
                    next: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg(--bg-3) text-(--text) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90'
                }">
                <NuxtLink :to="item.link"
                    class="flex flex-col items-center w-auto h-auto lg:h-92 p-3 lg:p-4 rounded-lg shrink-0 grow-0">
                    <div class="flex flex-col items-start w-full my-auto">
                        <h3 class="fs-subtitle font-semibold mb-4">
                            {{ item.title }}
                            <p class="fs-lead font-normal lg:text-center text-(--text) mb-3">
                                {{ item.description }}
                            </p>
                        </h3>

                        <span class="fs-body font-normal lg:text-center text-(--text) mb-3">
                            {{ item.testimony }}
                        </span>
                    </div>

                    <div class="flex flex-col lg:w-[50%] gap-4">
                        <NuxtImg :src="item.image" :alt="item.alt" sizes="xs:40vw md:10vw lg:20rem"
                            class="w-min rounded-xl overflow-hidden object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy" :placeholder="true" />
                    </div>
                </NuxtLink>
            </UCarousel>
            <div v-else class="flex justify-center items-center w-full my-10">
                <span class="text-base font-semibold lg:text-center text-(--text) mb-3 fs-body">
                    {{ t('index.client_section.be_the_first') }}
                </span>
            </div>
        </IndexSection>

        <!-- Realisations section -->
        <IndexSection id="campain-section" :class="'bg-(--card-experiment-bg)'"
            :fill="fillColor?.[2] ?? '--card-project-bg'">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase fs-small">
                    {{ t('index.campain_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 id="campain-title"
                    class="font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36 fs-title">
                    {{ t('index.campain_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48 fs-lead">
                    {{ t('index.campain_section.description') }}
                </p>
            </template>

            <CarouselWrapper :items="realisationsCarouselItems" class="w-full max-w-md mx-auto my-10" :ui="{
                item: 'basis-[90%] transition-opacity [&:not(.is-snapped)]:opacity-10',
                prev: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg-(--bg-3) text-(--text-2) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90',
                next: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg(--bg-3) text-(--text) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90'
            }" />
        </IndexSection>

        <!-- Expertise section -->
        <IndexSection id="expertise-section" :class="'bg-(--card-project-bg)'"
            :fill="fillColor?.[3] ?? '--card-job-bg'">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase fs-small">
                    {{ t('index.expertise_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 id="expertise-title"
                    class="font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36 fs-title">
                    {{ t('index.expertise_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48 fs-lead">
                    {{ t('index.expertise_section.description') }}
                </p>
            </template>

            <ExpertiseContainer />
        </IndexSection>

        <!-- Plan section -->
        <IndexSection id="plan-section" :class="'bg-(--card-job-bg)'" :fill="fillColor?.[4] ?? '--card-about-bg'">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase fs-small">
                    {{ t('index.plan_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 id="expertise-title"
                    class="font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36 fs-title">
                    {{ t('index.plan_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48 fs-lead">
                    {{ t('index.plan_section.description') }}
                </p>
            </template>

            <PlansContainer :plans="plansContainerItems" />
        </IndexSection>

        <!-- Contact section -->
        <IndexSection id="contact-section" :class="'bg-(--card-about-bg)'" :fill="fillColor?.[5] ?? '--bg-2'">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase fs-small">
                    {{ t('index.contact_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 id="contact-title"
                    class="font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36 fs-title">
                    {{ t('index.contact_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48 fs-lead">
                    {{ t('index.contact_section.description') }}
                </p>
            </template>

            <SendMessageModal />
        </IndexSection>
    </UContainer>
</template>
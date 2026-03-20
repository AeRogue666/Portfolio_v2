<script setup lang="ts">
import SendMessageModal from '../components/layout/organisms/SendMessageModal.vue';
import CarouselWrapper from '../components/index/organisms/CarouselWrapper.vue';
import IndexSection from '../components/index/IndexSection.vue';
import type { FeedResponse } from '../types/feed';
import LandingSection from '../components/index/LandingSection.vue';
import ExpertiseContainer from '../components/index/ExpertiseContainer.vue';

const { t, locale } = useI18n(),
    colorMode = useColorMode(),
    avatarSrc = ref('https://avatars.githubusercontent.com/u/38510448?v=4');

useSidebarFocusState();

const clientsCarouselItems = ref<{
    image: string;
    alt: string;
    description: string;
}[]>([]);

const { data: postsData } = await useAsyncData(
    () => `index-projects-${locale.value}`,
    () => $fetch<FeedResponse>('/api/posts', {
        query: { locale: locale.value }
    }),
    { watch: [locale] }
);

const realisationsCarouselItems = computed(() => {
    if (!postsData.value?.items) return [];

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

/* const realisationsCarouselItems = ref<{
    image: string;
    alt: string;
    description: string;
    link: string;
}[]>([
    {
        image: '/images/project/plateforme-gestion-recettes/desktop.png',
        alt: '',
        description: 'A multi-role recipe management platform',
        link: '/projects/plateforme-gestion-recettes'
    },
    {
        image: '/images/project/front-ecommerce-headless/desktop.png',
        alt: '',
        description: 'An asian online store',
        link: '/projects/front-ecommerce-headless'
    },
    {
        image: '/images/update/exploration-prisma/desktop.png',
        alt: '',
        description: 'Exploration of Prisma possibilities',
        link: '/updates/exploration-prisma'
    }
]); */

onMounted(() => {
    watch(
        () => colorMode.value,
        (mode) => {
            avatarSrc.value =
                mode === 'dark'
                    ? 'https://github.com/nuxt.png'
                    : 'https://avatars.githubusercontent.com/u/38510448?v=4'
        },
        { immediate: true }
    );
});

useSeoMeta(({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    ogTitle: t('seo.home.title'),
    ogDescription: t('seo.home.description'),
    ogImage: '/images/project/front-ecommerce-headless/desktop.png',
    twitterCard: 'summary_large_image',
}));
</script>

<template>
    <UContainer tabindex="-1" aria-labelledby="index-title" class="max-w-none">
        <!-- Landing section -->
        <LandingSection id="landing-section" aria-labelledby="index-title" fill="--card-update-bg">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase"
                    style="font-size: clamp(0.75rem, var(--step--1), 1rem);">
                    {{ t('index.user_title') }}
                </span>
            </template>

            <template #title>
                <h1 id="index-title"
                    class="flex flex-col font-bold tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36"
                    style="font-size: clamp(1.5rem, var(--step-5), 4rem);">
                    <span class="text-(--accent)">{{ t('index.landing_section.title_accent') }}</span>
                    <span class="text-(--text)">{{ t('index.landing_section.title_rest') }}</span>
                </h1>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48"
                    style="font-size: clamp(1rem, var(--step-1), 2rem);">
                    {{ t('index.landing_section.description') }}
                </p>
            </template>

            <NuxtLink to="/feed"
                class="inline-flex items-center px-5 py-2.5 gap-2 rounded-lg border border-(--accent)/40 text-(--accent) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus)"
                style="font-size: var(--step-0);">
                {{ t('index.landing_section.cta') }}
                <UIcon name="fa7-solid:arrow-right" class="text-sm" />
            </NuxtLink>
        </LandingSection>

        <!-- Clients section -->
        <IndexSection v-if="clientsCarouselItems.length !== 0" id="client-section"
            :class="'bg-(--card-project-bg)'" fill="--card-update-bg">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase"
                    style="font-size: clamp(0.75rem, var(--step--1), 1rem);">
                    {{ t('index.client_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 id="clients-title"
                    class="text-2xl font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36"
                    style="font-size: clamp(1rem, var(--step-2), 2rem);">
                    {{ t('index.client_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48"
                    style="font-size: clamp(1rem, var(--step-1), 2rem);">
                    {{ t('index.client_section.description') }}
                </p>
            </template>

            <UCarousel v-if="clientsCarouselItems.length !== 0" v-slot="{ item }" class-names loop arrows dots
                auto-scroll :items="clientsCarouselItems" class="w-full max-w-md my-10" :ui="{
                    item: 'basis-1/3'
                }">
                <NuxtImg :src="item.image" :alt="item.alt" sizes="xs:100vw md:80vw lg:64rem"
                    class="rounded-xl overflow-hidden object-cover transition-transform duration-300 hover:scale-105"
                    densities="x1" loading="lazy" :placeholder="true" />
                <span class="text-base font-semibold lg:text-center text-(--text) mb-3"
                    style="font-size: var(--step-0);">
                    {{ item.description }}
                </span>
                <!-- sizes="(min-width: 80rem) 64rem, (min-width: 64rem) 80vw, 100vw" :srcset="`${item.image} 640w, ${item.image} 768w, ${item.image} 1024w`"  -->
            </UCarousel>
            <div v-else class="flex justify-center items-center w-full my-10">
                <span class="text-base font-semibold lg:text-center text-(--text) mb-3"
                    style="font-size: var(--step-0);">{{
                        t('index.client_section.be_the_first') }}</span>
            </div>
        </IndexSection>

        <!-- Realisations section -->
        <IndexSection id="campain-section" :class="'bg-(--card-update-bg)'" fill="--card-about-bg">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase"
                    style="font-size: clamp(0.75rem, var(--step--1), 1rem);">
                    {{ t('index.campain_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 id="campain-title"
                    class="text-2xl font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36"
                    style="font-size: clamp(1rem, var(--step-2), 2rem);">
                    {{ t('index.campain_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48"
                    style="font-size: clamp(1rem, var(--step-1), 2rem);">
                    {{ t('index.campain_section.description') }}
                </p>
            </template>

            <CarouselWrapper :items="realisationsCarouselItems" class="w-full max-w-md mx-auto my-10" :ui="{
                item: 'basis-[90%] transition-opacity [&:not(.is-snapped)]:opacity-10'
            }" />
        </IndexSection>

        <!-- Expertise section -->
        <!-- <IndexSection id="expertise-section" :class="'bg-(--bg-elevated)'" fill="--card-about-bg">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase"
                    style="font-size: clamp(0.75rem, var(--step--1), 1rem);">
                    {{ t('index.expertise_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 id="expertise-title"
                    class="font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36"
                    style="font-size: clamp(1rem, var(--step-2), 2rem);">
                    {{ t('index.expertise_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48"
                    style="font-size: clamp(1rem, var(--step-1), 2rem);">
                    {{ t('index.expertise_section.description') }}
                </p>
            </template>

            <ExpertiseContainer />
        </IndexSection> -->

        <!-- Contact section -->
        <IndexSection id="contact-section" :class="'bg-(--card-about-bg)'" fill="--bg-2">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase"
                    style="font-size: clamp(0.75rem, var(--step--1), 1rem);">
                    {{ t('index.contact_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 id="contact-title"
                    class="font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36"
                    style="font-size: clamp(1rem, var(--step-2), 2rem);">
                    {{ t('index.contact_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48"
                    style="font-size: clamp(1rem, var(--step-1), 2rem);">
                    {{ t('index.contact_section.description') }}
                </p>
            </template>

            <SendMessageModal />
        </IndexSection>
    </UContainer>
</template>
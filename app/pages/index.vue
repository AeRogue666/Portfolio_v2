<script setup lang="ts">
import type { FeedResponse } from '../types/feed';
import type { ServiceResponse } from '~/app/types/service';
import IndexSection from '../components/index/IndexSection.vue';
import LandingSection from '../components/index/LandingSection.vue';
import ClientCarousel from '../components/index/organisms/ClientCarousel.vue';
import ProcessContainer from '../components/index/organisms/ProcessContainer.vue';
import ServicesContainer from '../components/index/organisms/ServicesContainer.vue';
import SendMessageModal from '../components/layout/organisms/SendMessageModal.vue';
import dayjs from 'dayjs';

const { t, locale } = useI18n(),
    colorMode = useColorMode();

useSidebarFocusState();

// Clients + Realisations sections
const postsAsyncKey = computed(() => `index-projects-${locale.value}`);
const { data: postsData, error: postsError } = await useAsyncData(
    () => postsAsyncKey.value,
    () => $fetch<FeedResponse>('/api/posts', {
        query: { locale: locale.value }
    }),
    { watch: [locale] }
);
if (postsError.value) {
    throw createError({ status: 404, statusMessage: 'Posts data not found', cause: postsError.value, fatal: true })
}

const clientsCarouselItems = computed(() => {
    if (!postsData.value?.items) return [];

    return postsData.value.items.filter(item =>
        (item.kind === 'client' || item.kindFallback === 'client') && item.image
    ).map(item => ({
        title: item.feed_title ?? item.title,
        description: item.feed_summary ?? item.description,
        testimony: item.testimony,
        customer_name: item.customer_name,
        customer_job: item.customer_job,
        customer_city: item.customer_city,
        customer_enterprise_name: item.customer_enterprise_name,
        image: item.image!.sources.feed?.mobile
            || item.image!.sources.detail?.mobile
            || '',
        alt: item.image!.alt,
        link: `/clients/${item.slug}`,
    }))
});

// Services section
const servicesAsyncKey = computed(() => `index-services-${locale.value}`);
const { data: servicesData, error: servicesError } = await useAsyncData<ServiceResponse>(
    () => servicesAsyncKey.value,
    () => $fetch('/api/services', {
        query: { locale: locale.value }
    }),
    { watch: [locale] }
);
if (servicesError.value) {
    throw createError({ status: 404, statusMessage: 'Pricing services data not found', cause: servicesError.value, fatal: true })
}
const servicesContainerItems = computed(() => {
    if (!servicesData.value?.items) return [];

    const servicesItems = servicesData.value.items;
    const filteredElements = servicesItems.filter(item => item.slug == 'formation');
    const nonFilteredElements = servicesItems.filter(item => item.slug !== 'formation');

    return [...nonFilteredElements, ...filteredElements];
});

interface Element {
    title: string,
    description?: string,
    icon: string,
    size?: string | number | undefined,
    class?: string,
    iconClass?: string,
}

const expertiseElements = reactive<Element[]>([
    {
        title: t('index.expertise_section.process.1.title'),
        description: t('index.expertise_section.process.1.description'),
        icon: 'fa7-solid:magnifying-glass',
        size: 'xl',
        class: 'bg-cyan-500',
        iconClass: 'bg-blue-500',
    },
    {
        title: t('index.expertise_section.process.2.title'),
        description: t('index.expertise_section.process.2.description'),
        icon: 'fa7-solid:pen-ruler',
        size: 'xl',
        class: 'bg-pink-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: t('index.expertise_section.process.3.title'),
        description: t('index.expertise_section.process.3.description'),
        icon: 'fa7-solid:shapes',
        size: 'xl',
        class: 'bg-green-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: t('index.expertise_section.process.4.title'),
        description: t('index.expertise_section.process.4.description'),
        icon: 'fa7-solid:warning',
        size: 'xl',
        class: 'bg-orange-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: t('index.expertise_section.process.5.title'),
        description: t('index.expertise_section.process.5.description'),
        icon: 'fa7-solid:comments',
        size: 'xl',
        class: 'bg-yellow-500',
        iconClass: 'size-24 bg-white',
    },
    /* {
        title: t('index.expertise_section.process.3.title'),
        description: t('index.expertise_section.process.3.description'),
        icon: 'fa7-solid:dollar-sign',
        size: 'xl',
        class: 'bg-green-500',
        iconClass: 'size-24 bg-white',
    }, */
]);

const differenciationElements = reactive<Element[]>([
    {
        title: t('index.differenciation_section.process.1.title'),
        description: t('index.differenciation_section.process.1.description'),
        icon: 'fa7-solid:user-check',
        size: 'xl',
        class: 'bg-yellow-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: t('index.differenciation_section.process.2.title'),
        description: t('index.differenciation_section.process.2.description'),
        icon: 'fa7-brands:accessible-icon',
        size: 'xl',
        class: 'bg-purple-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: t('index.differenciation_section.process.3.title'),
        description: t('index.differenciation_section.process.3.description'),
        icon: 'fa7-solid:arrow-trend-up',
        size: 'xl',
        class: 'bg-green-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: t('index.differenciation_section.process.4.title'),
        description: t('index.differenciation_section.process.4.description'),
        icon: 'fa7-brands:kakao-talk',
        size: 'xl',
        class: 'bg-lime-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: t('index.differenciation_section.process.5.title'),
        description: t('index.differenciation_section.process.5.description'),
        icon: 'material-symbols:language-french',
        size: 'xl',
        class: 'bg-blue-500',
        iconClass: 'size-24 bg-white',
    },
]);

const articlePublishedTime = computed(() => dayjs('01-01-2026').locale(locale.value).format()),
    articleModifiedTime = computed(() => dayjs(new Date()).locale(locale.value).format());

useSeoMeta(({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    ogTitle: t('seo.home.title'),
    ogDescription: t('seo.home.description'),
    ogType: 'website',
    ogLocale: locale.value,
    ogUrl: 'https://aureldev.com',
    ogSiteName: 'Aureldev',
    articlePublishedTime: articlePublishedTime.value,
    articleModifiedTime: articleModifiedTime.value,
    ogImageWidth: '1920',
    ogImageHeight: '1080',
    ogImage: '/images/logo/AurelDev_logo_fond_violet_texte_blanc.png',
    ogImageType: 'image/png',
    ogImageAlt: t('seo.home.description'),
    twitterCard: 'summary_large_image',
}));
</script>

<template>
    <UContainer class="max-w-none">
        <!-- Landing section -->
        <LandingSection id="landing-section" aria-labelledby="index-title" tabindex="-1" :fill="'--bg-3'">
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

            <SendMessageModal :cta-label="t('index.landing_section.cta_project')" :cta-icon="'fa7-solid:comment-dots'"
                :cta-class="'px-5 py-2.5 gap-2 rounded-lg bg-(--bg-3) border border-(--accent)/40 text-(--text) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body'" />

            <SendMessageModal :cta-label="t('index.landing_section.cta_audit')" :cta-icon="'fa7-solid:chart-simple'"
                :cta-class="'px-5 py-2.5 gap-2 rounded-lg bg-(--bg-3) border border-(--accent)/40 text-(--text) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body'" />
        </LandingSection>

        <!-- Clients section -->
        <!-- A ajouter : 
         Prénom + métier + ville -> Contexte AVANT / APRES -->
        <IndexSection id="client-section" :class="'bg-(--bg-3)'" :fill="'--card-experiment-bg'">
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

            <ClientCarousel v-if="clientsCarouselItems.length !== 0" :client="clientsCarouselItems" />
            <div v-else class="flex justify-center items-center w-full my-10">
                <span class="text-base font-semibold lg:text-center text-(--text) mb-3 fs-body">
                    {{ t('index.client_section.be_the_first') }}
                </span>
            </div>
            <!-- <UCarousel v-if="clientsCarouselItems.length !== 0" v-slot="{ item }" class-names arrows dots
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
                            <p v-if="item.description" class="fs-lead font-normal lg:text-center text-(--text) mb-3">
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
            </div> -->
        </IndexSection>

        <!-- Plan section (Offres) -->
        <IndexSection id="services-section" :class="'bg-(--card-job-bg)'" :fill="'--card-about-bg'">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase fs-small">
                    {{ t('index.services_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 id="expertise-title"
                    class="font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36 fs-title">
                    {{ t('index.services_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="font-normal lg:text-center w-full text-(--text-2) mb-6 sm:px-16 xl:px-48 fs-lead">
                    {{ t('index.services_section.description') }}
                </p>
            </template>

            <ServicesContainer :services="servicesContainerItems" />
        </IndexSection>

        <!-- Expertise section (Process) -->
        <IndexSection id="expertise-section" :class="'bg-(--card-project-bg)'" :fill="'--card-job-bg'">
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

            <ProcessContainer :elements="expertiseElements" />
        </IndexSection>

        <!-- Section différenciation (ou la fin de la section process) -->
        <IndexSection id="differenciation-section" :class="'bg-(--card-job-bg)'" :fill="'--card-about-bg'">
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase fs-small">
                    {{ t('index.differenciation_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 id="differenciation-title"
                    class="font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36 fs-title">
                    {{ t('index.differenciation_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48 fs-lead">
                    {{ t('index.differenciation_section.description') }}
                </p>
            </template>

            <ProcessContainer :elements="differenciationElements" />
        </IndexSection>

        <!-- Contact section (CTA) -->
        <IndexSection id="contact-section" :class="'bg-(--card-about-bg)'" :fill="'--bg-2'">
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

            <SendMessageModal :cta-label="t('index.landing_section.cta_project')" :cta-icon="'fa7-solid:comment-dots'"
                :cta-class="'px-5 py-2.5 gap-2 rounded-lg bg-(--bg-3) border border-(--accent)/40 text-(--text) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body'" />

            <SendMessageModal :cta-label="t('index.landing_section.cta_contact_me')" :cta-icon="'fa7-solid:message'"
                :cta-class="'px-5 py-2.5 gap-2 rounded-lg bg-(--bg-3) border border-(--accent)/40 text-(--text) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body'" />
        </IndexSection>
    </UContainer>
</template>
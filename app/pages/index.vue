<script setup lang="ts">
import SendMessageModal from '../components/layout/organisms/SendMessageModal.vue';
import CarouselWrapper from '../components/index/organisms/CarouselWrapper.vue';
import ExpertiseContainer from '../components/index/ExpertiseContainer.vue';
import IndexSection from '../components/index/IndexSection.vue';

const { t } = useI18n(),
    colorMode = useColorMode(),
    avatarSrc = ref('https://avatars.githubusercontent.com/u/38510448?v=4');

useSidebarFocusState();

const clientsCarouselItems = ref<{
    image: string;
    alt: string;
    description: string;
}[]>([]);

const realisationsCarouselItems = ref<{
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
]);

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

/* definePageMeta({
    layout: {
        name: 'index-header',
        props: {
            leftOpen: false,
            rightOpen: false,
        },
    },
}); */
</script>

<template>
    <UContainer tabindex="-1" aria-labelledby="index-title">
        <!-- Landing section -->
        <IndexSection id="landing-section" :class="'bg-(--bg-3)'">
            <template #tag>
                <span class="text-xl font-semibold lg:text-2xl lg:text-center text-(--text) mb-6"
                    style="font-size: var(--step-3);">
                    {{ t('index.user_title') }}
                </span>
            </template>

            <template #title>
                <h1 id="index-title"
                    class="text-4xl font-bold tracking-tight lg:font-extrabold md:text-5xl lg:text-6xl lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36 text-(--text)"
                    style="font-size: var(--step-5);">
                    {{ t('index.landing_section.title') }}
                </h1>
            </template>

            <template #description>
                <p class="text-lg font-normal text-body lg:text-xl lg:text-center text-(--text-2) mb-6 sm:px-16 xl:px-48"
                    style="font-size: var(--step-1);">
                    {{ t('index.landing_section.description') }}
                </p>
            </template>
        </IndexSection>

        <!-- Clients section -->
        <IndexSection v-if="clientsCarouselItems.length !== 0" id="client-section"
            :class="'bg-(--card-project-accent) '">
            <template #tag>
                <span class="text-base font-semibold lg:text-center text-(--text) mb-3"
                    style="font-size: var(--step-0);">
                    {{ t('index.client_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 class="text-2xl font-semibold leading-snug text-scalable text-(--text)"
                    style="font-size: var(--step-2);">
                    {{ t('index.client_section.title') }}
                </h2>
            </template>

            <UCarousel v-slot="{ item }" class-names loop arrows dots auto-scroll :items="clientsCarouselItems"
                class="w-full max-w-md my-10" :ui="{
                    item: 'basis-1/3'
                }">
                <NuxtImg :src="item.image" :alt="item.alt" sizes="xs:100vw md:80vw lg:64rem"
                    class="rounded-xl overflow-hidden object-cover transition-transform duration-300 hover:scale-105"
                    densities="x1" loading="lazy" :placeholder="true" />
                <span>{{ item.description }}</span>
                <!-- sizes="(min-width: 80rem) 64rem, (min-width: 64rem) 80vw, 100vw" :srcset="` ${item.image} 640w, ${item.image} 768w, ${item.image} 1024w`" -->
            </UCarousel>
        </IndexSection>

        <!-- Realisations section -->
        <IndexSection id="campain-section" :class="'bg-(--card-update-accent)'">
            <template #tag>
                <span class="text-base font-semibold lg:text-center text-(--text) mb-3"
                    style="font-size: var(--step-0);">
                    {{ t('index.campain_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 class="text-2xl font-semibold leading-snug text-scalable text-(--text)"
                    style="font-size: var(--step-2);">
                    {{ t('index.campain_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="text-lg font-normal text-body lg:text-xl lg:text-center text-(--text-2) mb-6 sm:px-16 xl:px-48"
                    style="font-size: var(--step-1);">
                    {{ t('index.campain_section.description') }}
                </p>
            </template>

            <CarouselWrapper :items="realisationsCarouselItems" class="w-full max-w-md mx-auto my-10" :ui="{
                item: 'basis-[90%] transition-opacity [&:not(.is-snapped)]:opacity-10'
            }" />
        </IndexSection>

        <!-- Expertise section -->
        <!-- <IndexSection id="expertise-section" :class="'bg-(--border-subtle)'">
            <template #tag>
                <span class="text-base font-semibold lg:text-center text-(--text) mb-3"
                    style="font-size: var(--step-0);">
                    {{ t('index.expertise_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 class="text-2xl font-semibold leading-snug text-scalable text-(--text)"
                    style="font-size: var(--step-2);">
                    {{ t('index.expertise_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="text-lg font-normal text-body lg:text-xl lg:text-center text-(--text-2) mb-6 sm:px-16 xl:px-48"
                    style="font-size: var(--step-1);">
                    {{ t('index.expertise_section.description') }}
                </p>
            </template>

            <ExpertiseContainer />
        </IndexSection> -->

        <!-- Contact section -->
        <IndexSection id="contact-section" :class="'bg-(--card-about-accent)'">
            <template #title>
                <h2 class="text-2xl font-semibold leading-snug text-scalable text-(--text)"
                    style="font-size: var(--step-2);">
                    {{ t('index.contact_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="text-lg font-normal text-body lg:text-xl lg:text-center text-(--text-2) mb-6 sm:px-16 xl:px-48"
                    style="font-size: var(--step-1);">
                    {{ t('index.contact_section.description') }}
                </p>
            </template>

            <SendMessageModal />
        </IndexSection>
    </UContainer>
</template>
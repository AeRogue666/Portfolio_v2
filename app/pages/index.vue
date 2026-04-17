<script setup lang="ts">
import type { FeedResponse } from '../types/feed';
import type { ServiceResponse } from '~/app/types/service';
import IndexSection from '../components/index/IndexSection.vue';
import LandingSection from '../components/index/LandingSection.vue';
import ExpertiseContainer from '../components/index/organisms/ExpertiseContainer.vue';
import ServicesContainer from '../components/index/organisms/ServicesContainer.vue';
import SendMessageModal from '../components/layout/organisms/SendMessageModal.vue';

const { t, locale } = useI18n(),
    colorMode = useColorMode(),
    avatarSrc = ref('https://avatars.githubusercontent.com/u/38510448?v=4'),
    fillColor = ref<string[] | undefined>(undefined);

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
        title: item.feed_title,
        description: item.feed_summary,
        testimony: item.testimony,
        customer_name: item.customer_name,
        image: item.image!.sources.feed?.mobile || '',
        alt: item.image!.alt,
        link: `/clients/${item.slug}`,
    }));
}),
    realisationsCarouselItems = computed(() => {
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

    return servicesData.value.items
});

// Problems section
const problemsData = await queryCollection('problems')
    .where('locale', '=', locale.value)
    .first();

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

            <SendMessageModal :cta-label="t('index.landing_section.cta_project')" :cta-icon="'fa7-solid:comment-dots'"
                :cta-class="'px-5 py-2.5 gap-2 rounded-lg bg-(--bg-3) border border-(--accent)/40 text-(--text) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body'" />

            <SendMessageModal :cta-label="t('index.landing_section.cta_audit')" :cta-icon="'fa7-solid:chart-simple'"
                :cta-class="'px-5 py-2.5 gap-2 rounded-lg bg-(--bg-3) border border-(--accent)/40 text-(--text) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body'" />

            <!-- <NuxtLink to="/feed"
                class="inline-flex items-center px-5 py-2.5 gap-2 rounded-lg border border-(--accent)/40 text-(--accent) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body">
                <UIcon name="fa7-solid:arrow-right" class="text-sm" />
                {{ t('index.landing_section.cta_feed') }}
            </NuxtLink> -->
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
        <!-- <IndexSection id="campain-section" :class="'bg-(--card-experiment-bg)'"
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
        </IndexSection> -->

        <!-- Section Problème -->
        <!--
            Aujourd'hui, beaucoup de sites web :
                - sont lents
                - ne sont pas bien référencés
                - ne donnent pas confiance
                - ne convertissent pas

            Résultat : vous perdez des clients sans le savoir.
        -->
        <IndexSection>
            <template #tag>
                <span class="font-semibold lg:text-center text-(--text-2) tracking-widest uppercase fs-small">
                    {{ t('index.problem_section.tag') }}
                </span>
            </template>

            <template #title>
                <h2 id="campain-title"
                    class="font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36 fs-title">
                    {{ t('index.problem_section.title') }}
                </h2>
            </template>

            <template #description>
                <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48 fs-lead">
                    {{ t('index.problem_section.description') }}
                </p>
            </template>

            <ContentRenderer v-if="problemsData" :value="problemsData" />
            <span>{{ problemsData }}</span>
        </IndexSection>

        <!-- Section Solution -->
        <!-- 
            "Un site pensé pour votre activité"

            Je ne crée pas juste des sites.
            Je crée des outils qui :
                - donnent confiance à vos visiteurs
                - sont rapides et agréables à utiliser
                - sont visibles sur Google
                - vous apportent des contacts
        -->

        <!-- Plan section (Offres) -->
        <!-- 
            "Ce que je peux faire pour vous"

            Création de site (title)
            
            Un site clair, professionnel et efficace
            -> Idéal si vous partez de zéro ou souhaitez une refonte

            Optimisation & SEO (title)

            Amélioration de votre site existant
            -> Plus rapide, mieux référencé, plus efficace

            Accompagnement (title)

            Support, maintenance et conseils
            -> Pour un site fiable sur le long terme

            Mettre un texte + lien : "Je propose également des formations numériques -> en savoir plus"
        -->

        <IndexSection id="services-section" :class="'bg-(--card-job-bg)'" :fill="fillColor?.[4] ?? '--card-about-bg'">
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
            
        <!-- <IndexSection id="services-section" :class="'bg-(--card-job-bg)'" :fill="fillColor?.[4] ?? '--card-about-bg'">
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
        </IndexSection> -->

        <!-- Expertise section (Process) -->
        <!--
            "Comment ça se passe ?"

            1. On échange sur votre besoin
            2. Je vous propose une solution simple et claire
            3. Je crée ou améliore votre site et vous tiens au courant sur son avancée
            4. On teste et optimise ensemble
            5. Le site est désormais à vous mais je vous accompagne si besoin
        -->
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

        <!-- Section différenciation (ou la fin de la section process) -->
        <!--
            "Pourquoi travailler avec moi ?"

            - Approche centrée utilisateur
            - Accessibilité (votre site est accessible à tous)
            - Performance (site rapide)
            - Explications simples, sans jargon
        -->

        <!-- Contact section (CTA) -->
        <!--
            "Prêt à améliorer votre présence en ligne ?"

            Ne laissez pas votre site vous faire perdre des clients.

            [Discuter de votre projet]
            [Me contacter]
        -->
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

            <SendMessageModal :cta-label="t('index.landing_section.cta_project')" :cta-icon="'fa7-solid:comment-dots'"
                :cta-class="'px-5 py-2.5 gap-2 rounded-lg bg-(--bg-3) border border-(--accent)/40 text-(--text) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body'" />
        </IndexSection>
    </UContainer>
</template>
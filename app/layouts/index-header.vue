<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import AppIndexHeader from "../components/layout/AppIndexHeader.vue";
import SidebarLeftDesktop from "../components/layout/SidebarLeftDesktop.vue";

interface Partner {
    tag: string,
    title: string,
    image: string;
    imageAlt?: string,
    class?: string,
    imageClass?: string,
}

const { t, locale } = useI18n(),
    accessibilityStore = useAccessibilityStore();

const grayscale = computed(() => accessibilityStore.grayscale);

const itemsFooterNavigation = computed<NavigationMenuItem[]>(() => [
    {
        label: t('sidebar-left.navigation.legal_notices'),
        icon: "fa7-solid:file-contract",
        to: "/legal-notices",
    },
    {
        label: t('sidebar-left.navigation.terms_of_use'),
        icon: "fa7-solid:file-contract",
        to: "/terms",
    },
    {
        label: t('sidebar-left.navigation.accessibility_statement'),
        icon: "fa7-brands:accessible-icon",
        to: "/accessibility",
    },
    {
        label: t('sidebar-left.navigation.landing_page'),
        icon: "fa7-brands:accessible-icon",
        to: "/landing/accessibilite-web-ardeche",
    },
]);

const partnerIndexElements = reactive<Partner[]>([
    {
        tag: t('index.partner_section.partners.1.tag'),
        title: t('index.partner_section.partners.1.header_title'),
        image: '/images/logo/partenaires/emerveilles_par_ardeche.png',
        imageAlt: t('index.partner_section.partners.1.image_alt'),
        class: 'md:col-span-2',
        imageClass: 'h-14'
    },
    {
        tag: t('index.partner_section.partners.2.tag'),
        title: t('index.partner_section.partners.2.header_title'),
        image: '/images/logo/partenaires/pollen_scop.png',
        imageAlt: t('index.partner_section.partners.2.image_alt'),
        class: '',
        imageClass: 'h-12'
    },
]);

useHead(() => ({
    htmlAttrs: {
        lang: locale.value
    }
}));
</script>

<template>
    <div class="min-h-screen flex flex-col bg-(--bg)">
        <AppIndexHeader />

        <div class="flex flex-1 lg:overflow-hidden">
            <SidebarLeftDesktop class="shrink-0" />
            <!-- INDEX CONTAINER -->
            <div class="flex flex-col flex-1 w-full overflow-y-auto min-h-0">
                <main id="main-content" tabindex="-1" class="flex-1 w-full max-w-auto mx-auto fs-body">
                    <NuxtPage />
                </main>

                <footer class="flex w-full mt-auto px-4 py-8 border-t border-(--bg-3) bg-(--bg) text-(--text-2) shrink-0">
                    <div
                        class="flex flex-col justify-between items-start max-w-6xl mx-auto gap-8 lg:gap-12">
                        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
                            <address class="flex flex-col not-italic max-w-sm w-full fs-small leading-relaxed gap-3">
                                <span class="font-bold fs-body text-(--text) mb-1">CodeKorico</span>

                                <div class="flex items-center gap-2 whitespace-normal wrap-break-word">
                                    <UIcon name="fa7-solid:envelope" class="text-(--text-muted) shrink-0 fs-small"
                                        aria-hidden="true" />
                                    <a href="mailto:contact@codekorico.com"
                                        class="hover:text-(--accent) transition-colors focus-visible:outline-2 focus-visible:outline-(--focus) rounded">contact@codekorico.com</a>
                                </div>

                                <div
                                    class="flex items-start border-t border-(--bg-3)/50 mt-1 whitespace-normal wrap-break-word gap-2">
                                    <UIcon name="fa7-solid:phone" class="text-(--text-muted) shrink-0 fs-small"
                                        aria-hidden="true" />
                                    <a href="tel:+3343347803"
                                        class="hover:text-(--accent) transition-colors focus-visible:outline-2 focus-visible:outline-(--focus) rounded">07
                                        43 34 78 03</a>
                                </div>

                                <div
                                    class="flex items-start border-t border-(--bg-3)/50 mt-1 whitespace-normal wrap-break-word gap-2">
                                    <UIcon name="fa7-solid:location-dot"
                                        class="text-(--text-muted) shrink-0 fs-small mt-1" aria-hidden="true" />
                                    <p class="text-(--text-3)">
                                        Pépinière d'entreprises l'Espélidou<br />
                                        555 Chemin des Traverses<br />
                                        07200 LACHAPELLE-SOUS-AUBENAS
                                    </p>
                                </div>

                                <div
                                    class="flex items-start !fs-small text-(--text-3) border-t border-(--bg-3)/50 mt-1 whitespace-normal wrap-break-word gap-2">
                                    <UIcon name="fa7-solid:id-card" class="text-(--text-muted) shrink-0 text-xs"
                                        aria-hidden="true" />
                                    <p>
                                        <span class="font-semibold text-(--text-2)">SIRET :</span> 439 076 563 00147
                                        <span class="italic">RCS Aubenas (POLLEN SCOP)</span>
                                    </p>
                                </div>
                            </address>

                            <div
                                class="flex flex-col sm:flex-row lg:flex-col justify-self-start items-start w-full lg:w-auto gap-6">
                                <div v-for="(partner, index) of partnerIndexElements" :key="index"
                                    class="flex items-center w-full sm:w-auto min-w-50 bg-(--bg-2)/20 px-3 py-2 border border-(--bg-3)/40 rounded-lg gap-4">
                                    <img :src="partner.image" :alt="partner.imageAlt ?? ''" width="52" height="52"
                                        class="sepia-80 opacity-60 transition-all duration-300 hover:sepia-0 hover:opacity-100 dark:brightness-125 dark:contrast-75 shrink-0"
                                        :class="[partner.imageClass, grayscale ? 'grayscale-100' : '']" />
                                    <span class="fs-small text-(--text-2) leading-tight font-medium">{{ partner.title
                                        }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col items-start lg:items-center w-full mt-2 lg:mt-0 gap-6">
                            <UNavigationMenu highlight-color="neutral" orientation="horizontal"
                                :items="itemsFooterNavigation" :ui="{
                                    list: 'gap-3 flex-col xl:flex-row lg:flex-col xl:flex-row items-start lg:items-end xl:items-center', // ul
                                    item: '', // li
                                    link: 'data-active:bg-(--bg-3) data-active:text-(--text) text-(--text-2) hover:bg-(--bg-2) transition-colors rounded-lg px-2 py-1', // a
                                    linkLeadingIcon: 'text-(--text-muted)',
                                    linkLabel: 'text-sm leading-relaxed whitespace-normal break-words max-w-[65ch]',
                                }"
                                class="m-0 px-2 py-8 lg:pt-2 lg:pb-0 bg-transparent opacity-100 data-[orientation=vertical]:w-full fs-body" />

                            <p class="fs-small text-(--text-3)">
                                Copyright Aureldev - CodeKorico © {{ new Date().getUTCFullYear() }}
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>
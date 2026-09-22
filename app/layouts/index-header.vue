<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import AppIndexHeader from "../components/layout/AppIndexHeader.vue";
import SidebarLeftDesktop from "../components/layout/SidebarLeftDesktop.vue";

const { t, locale } = useI18n();
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

                <footer class="flex flex-col lg:flex-row justify-center items-center w-full mt-auto py-6 shrink-0">
                    <div class="flex flex-col justify-center items-center lg:mr-6 gap-6">
                        <div class="flex flex-col justify-center items-center gap-4">
                            <img src="/images/logo/partenaires/pollen_scop.png" alt="Logo de la CAE Pollen SCOP"
                                width="57" height="57"
                                class="sepia-80 opacity-60 transition-all duration-300 hover:sepia-0 hover:opacity-100 dark:brightness-125 dark:contrast-75" />
                            <span class="fs-small">Membre de la Coopérative d'Entreprise Pollen SCOP</span>
                        </div>
                        <div class="flex flex-col justify-center items-center gap-4">
                            <img src="/images/logo/partenaires/emerveilles_par_ardeche.png"
                                alt="Logo de Emerveillés par l'Ardèche" width="50" height="52"
                                class="sepia-80 opacity-60 transition-all duration-300 hover:sepia-0 hover:opacity-100 dark:brightness-125 dark:contrast-75" />
                            <span class="fs-small">CodeKorico est émerveillé par l'Ardèche</span>
                        </div>
                    </div>

                    <div class="flex flex-col justify-center items-center lg:mr-6 lg:gap-6">
                        <UNavigationMenu highlight-color="neutral" orientation="horizontal"
                            :items="itemsFooterNavigation" :ui="{
                                list: 'gap-3 flex-col xl:flex-row', // ul
                                item: '', // li
                                link: 'data-active:bg-(--bg-3) data-active:text-(--text) text-(--text-2) hover:bg-(--bg-2) transition-colors rounded-lg px-2 py-1', // a
                                linkLeadingIcon: 'text-(--text-muted)',
                                linkLabel: 'text-sm leading-relaxed truncate max-w-[65ch]',
                            }"
                            class="m-0 px-2 py-8 lg:pt-2 lg:pb-0 bg-transparent opacity-100 data-[orientation=vertical]:w-full fs-body" />

                        <p class="fs-small text-(--text-3)">
                            Copyright Aureldev - CodeKorico © {{ new Date().getUTCFullYear() }}
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>
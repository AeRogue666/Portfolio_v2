<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import SidebarLeftDesktop from "../components/layout/SidebarLeftDesktop.vue";
import type { NavigationMenuItem } from "@nuxt/ui";

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
        icon: "fa7-brands:a11y-project",
        to: "/accessibility",
    },
]);

useHead(() => ({
    htmlAttrs: {
        lang: locale.value
    }
}));
</script>

<template>
    <div class="min-h-screen flex flex-col bg-(--bg) lg:max-h-screen lg:overflow-hidden">
        <AppHeader />

        <div class="min-h-screen">
            <div
                class="flex flex-col flex-1 lg:flex-row lg:h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
                <SidebarLeftDesktop />
                <!-- FEED CONTAINER -->
                <main id="main-content" tabindex="-1" aria-labelledby="feed-title"
                    class="flex-1 w-full h-full max-w-auto mx-auto fs-body">
                    <NuxtPage />
                </main>

                <footer class="flex flex-col justify-center items-center">
                    <UNavigationMenu highlight-color="neutral" orientation="horizontal" :items="itemsFooterNavigation"
                        :ui="{
                            list: 'gap-3', // ul
                            item: '', // li
                            link: 'data-active:bg-(--bg-3) data-active:text-(--text) text-(--text-2) hover:bg-(--bg-2) transition-colors rounded-lg px-2 py-1', // a
                            linkLeadingIcon: 'text-(--text-muted)',
                            linkLabel: 'text-sm leading-relaxed truncate max-w-[65ch]',
                        }" class="m-0 px-2 py-8 lg:pt-2 lg:pb-0 bg-transparent opacity-100 data-[orientation=vertical]:w-full fs-body" />

                    <p class="fs-small text-(--text-3)">
                        Copyright Aureldev - CodeKorico © {{ new Date().getUTCFullYear() }}
                    </p>
                </footer>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import SendMessageModal from './SendMessageModal.vue';
import IconButton from '../../ui/IconButton.vue';

const { t } = useI18n(),
    colorMode = useColorMode(),
    avatarSrc = ref('https://avatars.githubusercontent.com/u/38510448?v=4');

const itemsNavigation = computed<NavigationMenuItem[]>(() => [
    {
        label: t('sidebar-left.navigation.homepage'),
        icon: "fa7-solid:home",
        to: "/",
        active: true
    },
    {
        label: t('sidebar-left.navigation.feed'),
        icon: 'fa7-solid:message',
        to: '/feed',
    },
    {
        label: t('sidebar-left.navigation.accessibility_statement'),
        icon: "fa7-brands:accessible-icon",
        to: "/accessibility",
    },
    {
        label: t('sidebar-left.navigation.accessibility_report'),
        icon: "fa7-solid:newspaper",
        to: "/accessibility-report",
    },
    {
        label: t('sidebar-left.navigation.problem_report'),
        icon: 'fa7-solid:warning',
        to: '/report',
    },
]),
    itemsFooterNavigation = computed<NavigationMenuItem[]>(() => [
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
</script>

<template>
    <aside id="sidebar-left"
        class="block w-full lg:w-auto min-w-60 h-full bg-(--bg) basis-0.5 relative">

        <UContainer class="flex flex-col items-center w-full h-full mt-4 gap-4 overflow-y-scroll">
            <div class="flex flex-col justify-center items-center">
                <UUser size="3xl" orientation="vertical" :name="t('sidebar-left.user_title')"
                    :description="t('sidebar-left.user_description')" key="user-avatar" :avatar="{
                        src: avatarSrc,
                        icon: 'fa7-solid:user',
                        alt: t('sidebar-left.user_alternative_text')
                    }" :ui="{
                        root: 'items-center',
                        name: 'text-(length:--step-2) text-2xl text-(--text-1) font-semibold tracking-tight leading-snug',
                        description: 'text-(length:--step-0) leading-relaxed text-(--text-2)',
                        avatar: 'size-40 bg-(--bg-2)'
                    }" />
                <span class="fs-small text-(--text-muted) leading-relaxed max-w-[65ch]">
                    {{ t('sidebar-left.user_tagline') }}
                </span>
            </div>

            <span class="fs-body text-(--text-2) leading-relaxed">
                {{ t('sidebar-left.contact_me') }}
            </span>

            <SendMessageModal />

            <div class="inline-flex items-baseline">
                <UTooltip :text="t('sidebar-left.open_github')">
                    <IconButton :variant="'ghost'" :color="'neutral'" :to="'https://github.com/AeRogue666'"
                        :target="'_blank'" :size="'size-16'" :icon="'fa7-brands:github'" label="Github"
                        id="button-sidebarleft-github" :class="'size-16'" />
                </UTooltip>

                <UTooltip :text="t('sidebar-left.open_linkedin')">
                    <IconButton :variant="'ghost'" :color="'neutral'" :to="'https://linkedin.com/aurelien-gasnier'"
                        :target="'_blank'" :size="'size-16'" :icon="'fa7-brands:linkedin'" label="Linkedin"
                        id="button-sidebarleft-linkedin" :class="'size-16'" />
                </UTooltip>
            </div>

            <UNavigationMenu highlight-color="neutral" orientation="vertical" :items="itemsNavigation" :ui="{
                list: 'flex flex-col gap-3', // ul
                item: '', // li
                link: 'data-active:before:bg-(--bg-3) hover:bg-(--bg-2)', // a
                linkLeadingIcon: 'text-(--text-muted)',
                linkLabel: 'text-base leading-relaxed truncate max-w-[65ch]',
            }" class="m-0 px-2 py-8 lg:pt-2 bg-transparent opacity-100 data-[orientation=vertical]:w-full fs-body" />

            <UFooter :ui="{
                container: 'flex-col p-0 lg:p-0',
                center: ''
            }">
                <UNavigationMenu highlight-color="neutral" orientation="horizontal" :items="itemsFooterNavigation" :ui="{
                    list: 'gap-3', // ul
                    item: '', // li
                    link: 'data-active:before:bg-(--bg-3) hover:bg-(--bg-2)', // a
                    linkLeadingIcon: 'text-(--text-muted)',
                    linkLabel: 'text-base leading-relaxed truncate max-w-[65ch]',
                }" class="m-0 px-2 py-8 lg:pt-2 bg-transparent opacity-100 data-[orientation=vertical]:w-full fs-body" />

                <template #right>
                    <p class="fs-small text-(--text-3)">
                        Copyright Aureldev © {{ new Date().getUTCFullYear() }}
                    </p>
                </template>
            </UFooter>
        </UContainer>
    </aside>
</template>
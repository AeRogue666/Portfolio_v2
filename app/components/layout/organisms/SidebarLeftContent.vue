<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { capitalize } from 'vue';
import SendMessageModal from './SendMessageModal.vue';
import IconButton from '../../ui/IconButton.vue';

const { t } = useI18n(),
    colorMode = useColorMode();

const itemsNavigation = computed<NavigationMenuItem[]>(() => [
    {
        label: capitalize(t('sidebar-left.navigation.accessibility_statement')),
        icon: "fa7-brands:accessible-icon",
        to: "/accessibility",
    },
    {
        label: capitalize(t('sidebar-left.navigation.problem_report')),
        icon: 'fa7-solid:warning',
        to: '/report',
    }
]);

const avatarSrc = computed(() => {
    if(colorMode.unknown) 
        return 'https://avatars.githubusercontent.com/u/38510448?v=4'

    return colorMode.value === 'dark'
        ? 'https://github.com/nuxt.png'
        : 'https://avatars.githubusercontent.com/u/38510448?v=4'
});
</script>

<template>
    <aside id="mobile-menu"
        class="block w-full lg:w-auto min-w-60 h-auto bg-(--bg) basis-0.5 relative [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar]:w-2">

        <UContainer class="flex flex-col items-center w-full h-full mt-4 gap-4">
            <div class="flex flex-col justify-center items-baseline">
                <UUser size="3xl" orientation="vertical" :name="t('sidebar-left.user_title')"
                    :description="t('sidebar-left.user_description')" key="user-avatar" :avatar="{
                        src: avatarSrc,
                        icon: 'fa7-solid:user',
                        alt: t('sidebar-left.user_alternative_text')
                    }" :ui="{
                        root: 'items-center',
                        name: 'text-(--text-1)',
                        description: 'text-(--text-2)',
                        avatar: 'size-48 bg-(--bg-2)'
                    }" />
            </div>

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
                root: '',
                list: 'flex flex-col gap-2', // ul
                label: 'text-3xl text-(--text) font-semibold',
                childList: 'sm:w-72',
                childLinkWrapper: 'pb-2', // li
                childLink: '', // a
                childLinkDescription: 'text-balance line-clamp-2',
                link: 'text-(--text)',
                linkLeadingIcon: 'text-(--text-muted)',
                linkLabel: 'text-(--text) text-base truncate',
                linkTrailingIcon: 'text-xl',
            }" class="h-screen m-0 px-2 py-8 lg:pt-2 bg-transparent opacity-100 data-[orientation=vertical]:w-full" />
        </UContainer>
    </aside>
</template>
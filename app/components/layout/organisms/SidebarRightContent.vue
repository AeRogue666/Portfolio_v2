<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui';
import FontScaleSelector from './FontScaleSelector.vue';
import SidebarSelectorBase from '../molecules/SidebarSelectorBase.vue';
import SwitchButton from '../../ui/SwitchButton.vue';

const accessibilityStore = useAccessibilityStore(),
    { t, locale, locales, setLocale } = useI18n(),
    colorMode = useColorMode();

// Font family
const fontFamilyItems = ref<SelectMenuItem[]>([
    {
        label: 'Source Sans 3',
        value: 'source-sans'
    },
    {
        label: 'Atkinson Hyperlegible',
        value: 'atkinson'
    },
    {
        label: 'Roboto',
        value: 'roboto'
    }
]);

const fontFamily = computed({
    get: () => accessibilityStore.fontFamily,
    set: (value) => accessibilityStore.changeFont(value)
});

// Toggles
const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
}),
    underlineLinks = computed({
        get: () => accessibilityStore.underlineLinks,
        set: () => accessibilityStore.toggleUnderlineLinks(),
    });

const switching = ref(false);

async function changeLanguage(newLocale: any) {
    if (newLocale === locale.value) return

    switching.value = true
    await setLocale(newLocale)
    switching.value = false
};
</script>

<template>
    <aside id="mobile-menu"
        class="block w-full lg:w-auto min-w-60 h-screen bg-(--bg) basis-0.5 relative [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar]:w-2">
        <UContainer class="flex flex-col items-center w-full h-auto my-4 gap-4">

            <!-- THEME -->
            <SidebarSelectorBase>
                <template #title>
                    {{ t('sidebar-right.theme') }}
                </template>

                <template #body>
                    <UColorModeSelect color="neutral" size="xl" :ui="{
                        base: 'bg-(--bg-2)',
                        content: 'bg-(--bg-2)',
                        value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : ''
                    }" />
                </template>
            </SidebarSelectorBase>

            <!-- LANGUAGE -->
            <SidebarSelectorBase>
                <template #title>
                    {{ t('sidebar-right.language') }}
                </template>

                <template #body>
                    <ULocaleSelect :model-value="locale" :locales="locales" @update:model-value="changeLanguage"
                        :disabled="switching" color="neutral" size="xl" :ui="{
                            base: 'bg-(--bg-2)',
                            content: 'bg-(--bg-2)',
                            value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : ''
                        }" class="w-48" />
                </template>
            </SidebarSelectorBase>

            <!-- FONT SCALE -->
            <SidebarSelectorBase>
                <template #title>
                    {{ t('sidebar-right.contrast') }}
                </template>

                <template #body>
                    <FontScaleSelector :font-scale="accessibilityStore.fontScale"
                        :increase-font="accessibilityStore.increaseFont"
                        :decrease-font="accessibilityStore.decreaseFont" />
                </template>
            </SidebarSelectorBase>

            <!-- FONT FAMILY -->
            <SidebarSelectorBase>
                <template #title>
                    {{ t('sidebar-right.font') }}
                </template>

                <template #body>
                    <USelect v-model="fontFamily" :items="fontFamilyItems" value-key="value" label-key="label"
                        color="neutral" size="xl" aria-label="Font selector" :ui="{
                            base: 'bg-(--bg-2)',
                            content: 'bg-(--bg-2)',
                            value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : ''
                        }" />
                </template>
            </SidebarSelectorBase>

            <!-- GRAYSCALE -->
            <SidebarSelectorBase>
                <template #title>
                    {{ t('sidebar-right.grayscale') }}
                </template>
                <template #body>
                    <!-- <USwitch v-model="grayscale" :text="'Grayscale switch'" color="neutral" size="xl"
                        unchecked-icon="fa7-solid:xmark" checked-icon="fa7-solid:check" /> -->
                    <SwitchButton id="button-switch-grayscale" label="Grayscale switch" type="button" color="neutral"
                        variant="soft" :checked="grayscale" @click="accessibilityStore.toggleGrayscale" />
                </template>
            </SidebarSelectorBase>

            <!-- UNDERLINE LINKS -->
            <SidebarSelectorBase>
                <template #title>
                    {{ t('sidebar-right.underline_links') }}
                </template>
                <template #body>
                    <SwitchButton id="button-switch-underlinelinks" label="Underline links switch" type="button"
                        color="neutral" variant="soft" :checked="underlineLinks"
                        @click="accessibilityStore.toggleUnderlineLinks" />
                </template>
            </SidebarSelectorBase>

            <!-- RESET -->
            <UButton :label="t('sidebar-right.reset_params')" variant="soft"
                class="justify-center items-center w-full md:w-[50%] h-auto bg-(--bg-2) text-(--text) hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent px-2 py-2"
                @click="accessibilityStore.reset()" />
        </UContainer>
    </aside>
</template>
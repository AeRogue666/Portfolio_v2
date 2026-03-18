<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui';
import FontScaleSelector from './FontScaleSelector.vue';
import SidebarSelectorBase from '../molecules/SidebarSelectorBase.vue';

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
    set: (value: string) => accessibilityStore.changeFont(value as FontFamily)
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
async function changeLanguage(newLocale: string) {
    if (newLocale === locale.value) return

    switching.value = true
    await setLocale(newLocale as "en" | "fr")
    switching.value = false
};

/* <SwitchButton id="button-switch-grayscale" label="Grayscale switch" type="button" color="neutral"
            variant="soft" :checked="grayscale" @click="accessibilityStore.toggleGrayscale" />
    <SwitchButton id="button-switch-underlinelinks" label="Underline links switch" type="button" color="neutral"
            variant="soft" :checked="underlineLinks" @click="accessibilityStore.toggleUnderlineLinks" />  */
/* opacity-50 hover:opacity-100 focus:opacity-100; :icon="isOpen ? 'fa7-solid:chevron-right' : 'fa7-solid:chevron-left'" */
</script>

<template>
    <SidebarSelectorBase>
        <template #title>
            {{ t('sidebar-right.theme') }}
        </template>
        <template #body>
            <UColorModeSelect :ui="{
                base: 'bg-(--bg-2)',
                content: 'bg-(--bg-2)',
                value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                item: grayscale && colorMode.value == 'dark' ? 'text-inverted text-(length:--step--1)' : 'text-(length:--step--1)',
            }" class="ring-transparent transitions-color w-48" style="font-size: var(--step--1);" />
        </template>
    </SidebarSelectorBase>

    <SidebarSelectorBase>
        <template #title>
            {{ t('sidebar-right.language') }}
        </template>
        <template #body>
            <ULocaleSelect :model-value="locale" :locales="locales" @update:model-value="changeLanguage"
                :disabled="switching" color="neutral" size="xl" :ui="{
                    base: 'bg-(--bg-2) text-(length:--step--1)',
                    content: 'bg-(--bg-2)',
                    value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                    item: grayscale && colorMode.value == 'dark' ? 'text-inverted text-(length:--step--1)' : 'text-(length:--step--1)'
                }" class="ring-transparent transitions-color w-48" />
        </template>
    </SidebarSelectorBase>

    <SidebarSelectorBase>
        <template #title>
            {{ t('sidebar-right.contrast') }}
        </template>
        <template #body>
            <FontScaleSelector :font-scale="accessibilityStore.fontScale"
                :increase-font="accessibilityStore.increaseFont" :decrease-font="accessibilityStore.decreaseFont" />
        </template>
    </SidebarSelectorBase>

    <SidebarSelectorBase>
        <template #title>
            {{ t('sidebar-right.font') }}
        </template>
        <template #body>
            <USelect v-model="fontFamily" :items="fontFamilyItems" color="neutral" size="xl" :ui="{
                base: 'bg-(--bg-2) text-(length:--step--1)',
                content: 'bg-(--bg-2)',
                value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                item: grayscale && colorMode.value == 'dark' ? 'text-inverted text-(length: --step--1)' : 'text-(length: --step--1)'
            }" class="ring-transparent transitions-color w-48" />
        </template>
    </SidebarSelectorBase>

    <SidebarSelectorBase>
        <template #title>
            {{ t('sidebar-right.grayscale') }}
        </template>

        <template #body>
            <USwitch v-model="grayscale" @click="accessibilityStore.toggleGrayscale" checked-icon="fa7-solid:check"
                unchecked-icon="fa7-solid:xmark" size="xl" color="neutral" :ui="{
                    root: 'flex flex-col-reverse items-center',
                    base: grayscale && colorMode.value === 'dark' ? 'text-inverted text-(length: --step-1)  data-[state=unchecked]:bg-(--bg-3)' : 'text-(length: --step-1)  data-[state=unchecked]:bg-(--bg-3)',
                    label: grayscale && colorMode.value === 'dark' ? 'text-inverted text-(length: --step-1)' : 'text-(length: --step-1)',
                    thumb: 'data-[state=unchecked]:bg-(--accent) data-[state=checked]:bg-(--accent-soft)'
                }" :aria-label="t('sidebar-right.grayscale')" />
        </template>
    </SidebarSelectorBase>

    <SidebarSelectorBase>
        <template #title>
            {{ t('sidebar-right.underline_links') }}
        </template>

        <template #body>
            <USwitch v-model="underlineLinks" @click="accessibilityStore.toggleUnderlineLinks"
                checked-icon="fa7-solid:check" unchecked-icon="fa7-solid:xmark" size="xl" color="neutral" :ui="{
                    root: 'flex flex-col-reverse items-center',
                    base: grayscale && colorMode.value === 'dark' ? 'text-inverted text-(length: --step-1)  data-[state=unchecked]:bg-(--bg-3)' : 'text-(length: --step-1) data-[state=unchecked]:bg-(--bg-3)',
                    label: grayscale && colorMode.value === 'dark' ? 'text-inverted text-(length: --step-1)' : 'text-(length: --step-1)',
                    thumb: 'data-[state=unchecked]:bg-(--accent) data-[state=checked]:bg-(--accent-soft)'
                }" :aria-label="t('sidebar-right.underline_links')" />
        </template>
    </SidebarSelectorBase>

    <UButton :label="t('sidebar-right.reset_params')" variant="soft"
        class="justify-center items-center w-full md:w-[50%] h-auto bg-(--bg-2) text-(--text) hover:bg-(--accent-hover) hover:text-white active:bg-elevated focus:outline-none focus-visible:bg-(--bg-3) focus:ring-2 focus:ring-inverted hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent px-2 py-2"
        @click="accessibilityStore.reset()" style="font-size: var(--step-0);" />
</template>
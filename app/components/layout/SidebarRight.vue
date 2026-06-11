<script setup lang="ts">
import IconButton from '../ui/IconButton.vue';
import SidebarRightContent from './organisms/SidebarRightContent.vue';

const { t } = useI18n(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const grayscale = computed(() => accessibilityStore.grayscale);

const isOpen = ref<boolean>(false);
</script>

<template>
    <USlideover v-model:open="isOpen" :title="t('sidebar-right.title')" :description="t('sidebar-right.description')" :ui="{
        content: 'bg-(--bg)',
        description: grayscale && colorMode.value == 'dark' ? 'text-inverted text-(length:--step--1)' : 'text-(length:--step--1)',
        body: 'flex flex-col items-center w-full my-4 gap-4',
        close: 'hover:bg-(--accent-hover) focus-visible:bg-(--bg-3)'
    }">
        <IconButton id="button-sidebarright-open" :variant="'ghost'" :color="'neutral'" icon="fa7-solid:gear"
            :size="'3xl'" :label="isOpen ? $t('sidebar-right.open') : t('sidebar-right.close')"
            class="text-3xl text-(length:--step-2) relative right-9 top-0 translate-x-full z-50" tabindex="0" />

        <template #body>
            <SidebarRightContent />
        </template>
    </USlideover>
</template>
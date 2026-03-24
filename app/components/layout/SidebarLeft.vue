<script setup lang="ts">
import IconButton from '../ui/IconButton.vue';
import SidebarLeftContent from "./organisms/SidebarLeftContent.vue";

const { t } = useI18n();
useSidebarFocusState();
</script>

<template>
    <USlideover side="left" :title="t('sidebar-left.title')" :description="t('sidebar-left.description')" :ui="{
        content: 'w-screen bg-(--bg)',
        body: 'p-0',
    }">
        <IconButton ref="sidebarLeftButtonMobileRef" id="button-sidebarleft-mobile" :variant="'ghost'"
            :color="'neutral'" :icon="'fa7-solid:bars'" :size="'size-10'" :label="t('sidebar-left.open')"
            :class="'size-10'" />

        <template #body>
            <SidebarLeftContent />
        </template>
    </USlideover>
</template>
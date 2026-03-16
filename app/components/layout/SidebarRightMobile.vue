<script setup lang="ts">
import IconButton from '../ui/IconButton.vue';
import SidebarRightContent from './SidebarRightDesktop.vue';

const { t } = useI18n()
</script>

<template>
    <USlideover side="right" :title="t('sidebar-right.title')" :description="t('sidebar-right.description')" :ui="{
        content: 'w-screen bg-(--bg)',
        body: 'overflow-hidden p-0',
    }">
        <IconButton ref="sidebarRightButtonMobileRef" id="button-sidebarright-mobile" :variant="'ghost'"
            :color="'neutral'" :icon="'fa7-solid:gear'" :size="'size-10'" :label="t('sidebar-right.open')"
            :class="'size-10'" />

        <template #body>
            <SidebarRightContent />
        </template>
    </USlideover>
</template>
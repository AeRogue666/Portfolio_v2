<script setup lang="ts">
import IconButton from '../ui/IconButton.vue';
import SidebarRightContent from './organisms/SidebarRightContent.vue';

const { t } = useI18n()
</script>

<template>
    <UDrawer direction="right" :title="t('sidebar-right.title')"
        :description="t('sidebar-right.description')" :ui="{
            content: 'w-screen bg-(--bg-primary)',
            container: 'overflow-hidden',
        }">
        <IconButton :variant="'ghost'" :color="'neutral'" :icon="'fa7-solid:gear'" :size="'size-10'"
            :label="t('sidebar-right.open')" id="button-sidebarright-open" :class="'size-10'" />

        <template #body>
            <SidebarRightContent />
        </template>
    </UDrawer>
</template>
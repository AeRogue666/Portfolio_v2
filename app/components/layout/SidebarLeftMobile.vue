<script setup lang="ts">
import IconButton from '../ui/IconButton.vue';
import SidebarLeftContent from "./organisms/SidebarLeftContent.vue";

const { t } = useI18n()
</script>

<template>
    <UDrawer :title="t('sidebar-left.title')" :description="t('sidebar-left.description')" direction="left" :ui="{
        content: 'w-screen bg-(--bg)',
        container: 'overflow-hidden',
    }">
        <IconButton :variant="'ghost'" :color="'neutral'" :icon="'fa7-solid:bars'" :size="'size-10'"
            :label="t('sidebar-left.open')" :class="'size-10'" />

        <template #body>
            <SidebarLeftContent />
        </template>
    </UDrawer>
</template>
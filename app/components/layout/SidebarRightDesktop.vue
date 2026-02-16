<script setup lang="ts">
import IconButton from '../ui/IconButton.vue';
import SidebarRightContent from './organisms/SidebarRightContent.vue';

defineEmits(['close']);

const { t } = useI18n();
</script>

<template>
    <div class="hidden lg:block w-72 min-h-screen sticky top-0">
        <IconButton :variant="'ghost'" :color="'neutral'" :icon="'fa7-solid:chevron-right'" :size="'3xl'"
            :label="t('sidebar-right.close')" id="button-sidebarright-close" :class="'text-3xl absolute left-4 top-4 z-50'"
            @click="$emit('close')" />
        <SidebarRightContent />
    </div>
</template>
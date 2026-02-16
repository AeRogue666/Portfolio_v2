<script setup lang="ts">
import IconButton from '../ui/IconButton.vue';
import SidebarLeftContent from './organisms/SidebarLeftContent.vue';

defineEmits(['close']);

const { t } = useI18n()
</script>

<template>
    <div class="hidden lg:block w-auto min-h-screen sticky top-0">
        <IconButton :variant="'ghost'" :color="'neutral'" :icon="'fa7-solid:chevron-left'" :size="'3xl'"
            :label="t('sidebar-left.close')" id="button-sidebarleft-close" :class="'text-3xl absolute right-4 top-4 z-50'" 
            @click="$emit('close')" />
        <SidebarLeftContent />
    </div>
</template>
<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import IconButton from '../ui/IconButton.vue';
import SidebarRightContent from './organisms/SidebarRightContent.vue';

const { t } = useI18n();

const sidebarRightRef = useTemplateRef('sidebarRightRef');

const { activate, deactivate } = useFocusTrap(sidebarRightRef, {
    immediate: false,
    escapeDeactivates: false,
    allowOutsideClick: true,
    returnFocusOnDeactivate: true,
    setReturnFocus: "#button-sidebarright-open",
});

onMounted(async () => {
    await nextTick()
    activate()
});

onBeforeUnmount(() => deactivate());
</script>

<template>
    <div ref="sidebarRightRef" class="hidden lg:block w-72 min-h-screen sticky top-0">
        <!-- Close button -->
        <IconButton id="button-sidebarright-close" :variant="'ghost'"
            :color="'neutral'" :icon="'fa7-solid:chevron-right'" :size="'3xl'" :label="t('sidebar-right.close')"
            :class="'text-3xl absolute left-6 top-6 z-50'" @click="$emit('close')" />
        <!-- Content -->
        <SidebarRightContent />
    </div>
</template>
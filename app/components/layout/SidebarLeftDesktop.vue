<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import IconButton from '../ui/IconButton.vue';
import SidebarLeftContent from './organisms/SidebarLeftContent.vue';

const props = defineProps<{
    isFirstMount: boolean;
}>();

const { t } = useI18n();
const sidebarLeftRef = useTemplateRef('sidebarLeftRef');
const { isModalOpen } = useSidebarFocusState();

const { activate, deactivate } = useFocusTrap(sidebarLeftRef, {
    immediate: false,
    escapeDeactivates: false,
    allowOutsideClick: true,
    returnFocusOnDeactivate: true,
});

let focusTrapActive = false;

const activateTrap = () => {
    if (!focusTrapActive && !isModalOpen.value) {
        activate();
        focusTrapActive = true;
    }
};

const deactivateTrap = () => {
    if (focusTrapActive) {
        deactivate();
        focusTrapActive = false;
    }
};

watch(isModalOpen, (value) => {
    if(value) {
        deactivateTrap();
    } else {
        setTimeout(() => {
            activateTrap();
        }, 100);
    }
});

onBeforeUnmount(() => {
    try {
        deactivateTrap();
    } catch (error) {
        console.log('Error trap: ', error);
    }
});

onMounted(async () => {
    await nextTick()
    if (props.isFirstMount) {
        sidebarLeftRef.value?.addEventListener('focusin', () => activateTrap(), { once: true });
        console.log('First focus');
    } else {
        activateTrap();
        console.log('Focus');
    }
});
</script>

<template>
    <div ref="sidebarLeftRef" class="hidden lg:block w-auto min-h-screen sticky top-0"
        :aria-label="t('sidebar-left.label')">
        <!-- Close button -->
        <IconButton id="button-sidebarleft-close" :variant="'ghost'" :color="'neutral'" :icon="'fa7-solid:chevron-left'"
            :size="'3xl'" :label="t('sidebar-left.close')" :class="'text-3xl text-(length:--step-2) absolute right-6 top-6 z-50'"
            @click="$emit('close')" />
        <!-- Content -->
        <SidebarLeftContent />
    </div>
</template>
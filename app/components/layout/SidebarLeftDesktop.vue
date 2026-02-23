<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import IconButton from '../ui/IconButton.vue';
import SidebarLeftContent from './organisms/SidebarLeftContent.vue';

const props = defineProps<{
    isFirstMount: boolean
}>();

const { t } = useI18n();

const sidebarLeftRef = useTemplateRef('sidebarLeftRef');

const { activate, deactivate } = useFocusTrap(sidebarLeftRef, {
    immediate: false,
    escapeDeactivates: false, // on gère la fermeture manuellement
    allowOutsideClick: true, // permet les clics hors sidebar sans bloquer
    returnFocusOnDeactivate: true, // retourne le focus sur l'élément précédent
    setReturnFocus: "#button-sidebarleft-open",
});

onMounted(async () => {
    await nextTick()

    // const isReopening = !sidebarLeftRef.value?.contains(document.activeElement);

    if(props.isFirstMount) {
        // Premier chargement : on attend que le focus entre naturellement
        sidebarLeftRef.value?.addEventListener('focusin', () => activate(), { once: true });
        console.log('First focus')
    } else {
        // Réouverture : le focus est déjà positionné ailleurs, on active directement le trap
        activate();
        console.log('Focus')
    }
});

onBeforeUnmount(() => deactivate());
</script>

<template>
    <div ref="sidebarLeftRef" class="hidden lg:block w-auto min-h-screen sticky top-0">
        <!-- Close button -->
        <IconButton id="button-sidebarleft-close" :variant="'ghost'" :color="'neutral'" :icon="'fa7-solid:chevron-left'"
            :size="'3xl'" :label="t('sidebar-left.close')" :class="'text-3xl absolute right-6 top-6 z-50'"
            @click="$emit('close')" />
        <!-- Content -->
        <SidebarLeftContent />
    </div>
</template>
<script setup lang="ts">
import IconButton from '../ui/IconButton.vue';
import SidebarLeftContent from "./organisms/SidebarLeftContent.vue";

const { t } = useI18n();
useSidebarFocusState();
</script>

<template>
    <USlideover side="left" id="sidebar-left-mobile" :title="t('sidebar-left.title')" :description="t('sidebar-left.description')" class="lg:hidden" :ui="{
        content: 'w-screen sm:max-w-md h-screen bg-(--bg)',
        body: 'p-0',
    }">
        <IconButton ref="sidebarLeftButtonMobileRef" id="button-sidebarleft-mobile" :variant="'ghost'"
            :color="'neutral'" :icon="'fa7-solid:bars'" :size="'size-10'" :label="t('sidebar-left.open')"
            :class="'size-10'" tabindex="0" />

        <template #body>
            <div class="w-full h-full overflow-y-auto">
                <SidebarLeftContent />
            </div>
        </template>
    </USlideover>
</template>
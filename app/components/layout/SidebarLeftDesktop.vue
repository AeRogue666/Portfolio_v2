<script setup lang="ts">
import SidebarLeftContent from './organisms/SidebarLeftContent.vue';

const isCollapsed = useState('sidebar-collapsed', () => false);
</script>

<template>
    <aside v-show="isCollapsed" id="sidebar-left-desktop"
        class="hidden lg:block w-87 h-auto bg-(--bg) sticky top-0 overflow-x-hidden overflow-y-auto shrink-0 fade-in">
        <SidebarLeftContent :is-collapsed="isCollapsed" class="w-64 shrink-0" />
    </aside>
</template>

<style scoped></style>
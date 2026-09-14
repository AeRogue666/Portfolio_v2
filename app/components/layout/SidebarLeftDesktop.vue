<script setup lang="ts">
import SidebarLeftContent from './organisms/SidebarLeftContent.vue';

const isCollapsed = useState('sidebar-collapsed', () => false);
const isPageFeed = computed(() => useRoute().name === 'feed');
</script>

<template>
    <aside v-show="isCollapsed" id="sidebar-left-desktop"
        class="hidden lg:block w-87 h-fit bg-(--bg) sticky top-0 overflow-x-hidden overflow-y-auto shrink-0 fade-in">
        <SidebarLeftContent :is-collapsed="!isCollapsed" :is-page-feed="isPageFeed" class="w-64 shrink-0" />
    </aside>
</template>

<style scoped></style>
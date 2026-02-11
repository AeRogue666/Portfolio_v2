<script setup lang="ts">
import SidebarLeftDesktop from "~/components/layout/SidebarLeftDesktop.vue";
import SidebarRightDesktop from "~/components/layout/SidebarRightDesktop.vue";
import AppHeader from "../components/layout/AppHeader.vue";
import IconButton from "~/components/ui/IconButton.vue";

const { locale } = useI18n(),
    leftOpen = ref(true),
    rightOpen = ref(true);

const gridTemplateColumns = computed(() => {
    if (leftOpen.value && rightOpen.value) return '18rem 1fr 18rem'
    if (leftOpen.value && !rightOpen.value) return '18rem 1fr'
    if (!leftOpen.value && rightOpen.value) return '1fr 18rem'
    return '1fr'
})

useHead(() => ({
    htmlAttrs: {
        lang: locale.value
    }
}));
</script>

<template>
    <AppHeader />

    <div class="min-h-screen">

        <!-- Desktop -->
        <div class="hidden lg:grid max-w-7xl mx-auto gap-6 transition-[grid-template-columns] duration-300"
            :style="{ gridTemplateColumns }">

            <SidebarLeftDesktop v-if="leftOpen" @close="leftOpen = false" />

            <!-- Main feed -->
            <div class="relative">
                <IconButton v-if="!leftOpen" :variant="'ghost'" :color="'neutral'" :icon="'fa7-solid:chevron-right'"
                    :size="'3xl'" :label="$t('sidebar-left.open')"
                    :class="'text-3xl absolute -left-70 top-4 opacity-50 z-50 hover:opacity-100 focus-visible:opacity-100'"
                    @click="leftOpen = true" />

                <IconButton v-if="!rightOpen" :variant="'ghost'" :color="'neutral'" :icon="'fa7-solid:chevron-left'"
                    :size="'3xl'" :label="$t('sidebar-right.open')"
                    :class="'text-3xl absolute -right-70 top-4 opacity-50 hover:opacity-100 focus-visible:opacity-100'"
                    @click="rightOpen = true" />
                <main id="main-content">
                    <NuxtPage />
                </main>
            </div>

            <SidebarRightDesktop v-if="rightOpen" @close="rightOpen = false" />
        </div>

        <!-- Mobile / Tablet -->
        <main class="lg:hidden" id="main-content">
            <NuxtPage />
        </main>
    </div>
</template>
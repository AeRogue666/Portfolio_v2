<script setup lang="ts">
import type { NuxtError } from 'nuxt/app';

const props = defineProps<{
    error: NuxtError
}>();

const accessibilityStore = useAccessibilityStore(),
    { t } = useI18n();

onMounted(() => {
    accessibilityStore.apply()
})
</script>

<template>
    <UApp>
        <a href="#main-content"
            class="absolute -top-full left-0 sr-only focus:top-0 focus:bg-(--bg) focus:text-(--text) focus:py-2 focus:px-4 focus:z-50 fs-body">
            {{ t('header.skip_content') }}
        </a>

        <UError redirect="/" :error="{
            statusCode: error.status,
            statusMessage: `We couldn't find this page.`,
            message: `It seems the answer isn't here.`
        }" :clear="{
            color: 'neutral',
            size: 'xl',
            icon: 'fa7-solid:arrow-left',
            class: 'rounded-xl'
        }" :ui="{
            statusCode: 'font-semibold lg:text-center fs-small tracking-widest uppercase',
            statusMessage: 'fs-heading text-(--text)',
            message: 'fs-subtitle text-(--text-muted)',
            links: 'fs-body text-(--text)'
        }" />
    </UApp>
</template>
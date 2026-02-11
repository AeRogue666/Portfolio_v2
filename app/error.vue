<script setup lang="ts">
import type { NuxtError } from '#app';

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
            class="absolute -top-full left-0 sr-only focus:top-0 focus:bg-(--bg-primary) focus:text-(--text-primary) focus:py-2 focus:px-4 focus:z-50">
            {{ t('header.skip_content') }}
        </a>

        <UError redirect="/" :error="{
            statusCode: error.statusCode,
            statusMessage: `We couldn't find this page.`,
            message: `It seems the answer isn't here.`
        }" :clear="{
            color: 'neutral',
            size: 'xl',
            icon: 'fa7-solid:arrow-left',
            class: 'rounded-xl'
        }" />
    </UApp>
</template>
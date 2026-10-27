<script setup lang="ts">
const { t } = useI18n();
const accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});
</script>

<template>
    <div class="flex flex-col space-y-4">
        <UCard :ui="{
            root: 'bg-(--bg) text-(--text) fs-body',
            body: grayscale && colorMode.value == 'dark'
                ? 'grid grid-cols-1 gap-6 text-inverted'
                : 'grid grid-cols-1 gap-6'
        }">
            <div class="flex flex-col items-center gap-4">
                <span class="fs-subtitle">{{ t('sidebar-left.modal-message.step-ending.title') }}</span>
                <p class="flex flex-col font-semibold tracking-widest uppercase fs-body my-4">
                        {{ t('sidebar-left.modal-message.step-ending.thank_you_message_part1') }}
                    <span>
                        {{ t('sidebar-left.modal-message.step-ending.thank_you_message_part2') }}
                    </span>
                </p>
                <p class="font-semibold tracking-widest uppercase fs-body my-4">
                    {{ t('sidebar-left.modal-message.step-ending.download_my_card') }}
                </p>
                <UButton name="button-download-card" size="xl"
                    class="inline-flex items-center justify-center px-5 py-2.5 gap-2 rounded-lg bg-(--text) text-(--bg) border border-transparent transition-all duration-200 hover:bg-(--bg-3)/10 hover:text-(--text) hover:border-(--text) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) fs-lead shadow-md whitespace-normal wrap-break-word"
                    icon="fa7-solid:card" download="/favicon.png"
                    :label="t('index.landing_section.cta_download_card')" />
                    <!-- download="/codekorico-carte_de_visite.vcf" -->
            </div>
        </UCard>
    </div>
</template>

<style lang="css"></style>
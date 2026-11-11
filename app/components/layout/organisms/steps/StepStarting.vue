<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
    <div class="flex flex-col space-y-4">
        <UCard :ui="{
            root: 'bg-(--bg) text-(--text) fs-body',
            body: 'grid grid-cols-1 gap-6'
        }">
            <div class="flex flex-col items-center gap-4">
                <h2 class="font-semibold leading-snug text-scalable tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36 fs-title">{{ t('contact.modal-message.step-starting.title') }}</h2>
                <p class="flex flex-col font-semibold tracking-widest fs-body my-4 gap-6">
                    <span>
                        {{ t('contact.modal-message.step-starting.description.1') }}
                    </span>
                    <span>
                        {{ t('contact.modal-message.step-starting.description.2') }}
                    </span>
                </p>
                <p class="font-semibold tracking-widest uppercase fs-body my-4">
                    {{ t('contact.modal-message.step-starting.description.3') }}
                </p>
            </div>
        </UCard>
    </div>
</template>

<style lang="css"></style>
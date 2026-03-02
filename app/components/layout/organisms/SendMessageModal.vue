<script setup lang="ts">
import { ContactFormSchema, type ContactFormState } from '@/utils/schemas/contact'
import type { FormSubmitEvent } from '@nuxt/ui'

const state = reactive<ContactFormState>({
    email: '',
    message: '',
    website: ''
});

const { t } = useI18n();
const { submitState, loading, submit } = useContactForm();
const { openContactModal, closeContactModal } = useModalState();

function validate(values: ContactFormState) {
    const result = ContactFormSchema.safeParse(values);

    if (result.success) return []

    return result.error.issues.map((issue: any) => ({
        name: String(issue.path[0]),
        message: issue.message
    }))
}

function resetForm() {
    state.email = ''
    state.message = ''
    state.website = ''
}

async function onSubmit(event: FormSubmitEvent<ContactFormState>) {
    await submit(event.data, resetForm);
};

onMounted(() => {
    openContactModal();
});

function handleModalClose() {
    closeContactModal();
    resetForm();
}
</script>

<template>
    <UModal id="contact-modal" :modal="true" @close="handleModalClose" fullscreen direction="left"
        :title="t('sidebar-left.modal-message.title')" :description="t('sidebar-left.modal-message.description')"
        :close="{
            color: 'neutral',
            variant: 'outline',
            class: 'rounded-full'
        }" :ui="{
            content: 'w-auto bg-(--bg)',
            body: 'flex flex-col justify-center'
        }">

        <template #default>
            <UButton aria-haspopup="dialog" aria-controls="contact-modal" name="button-send-message" color="neutral"
                variant="solid" size="xl" class="bg-(--bg-3) text-(--text) hover:text-inverted"
                :label="t('sidebar-left.modal-message.send-message_button_label')" style="font-size: var(--step-0);" />
        </template>

        <template #body>
            <div class="flex justify-center items-center w-full h-80 relative">
                <Transition name="fade-scale" mode="out-in">
                    <UForm v-if="submitState === 'idle'" key="form" :validate="validate" :state="state"
                        class="flex flex-col items-center w-full gap-4" @submit="onSubmit">
                        <UFormField :label="t('sidebar-left.modal-message.input_label')" name="email" required>
                            <UInput autofocus v-model="state.email" size="xl" :placeholder="'amazing@email.com'" :ui="{
                                base: 'w-3xs md:w-xs bg-(--bg-2) text-(--text)'
                            }" style="font-size: var(--step--1);" />
                        </UFormField>

                        <UFormField label="Website" name="website" class="hidden">
                            <UInput v-model="state.website" type="text" size="xl" class="hidden" tabindex="-1"
                                autocomplete="off" :ui="{
                                    base: 'w-3xs md:w-xs bg-(--bg-2) text-(--text)'
                                }" style="font-size: var(--step--1);" />
                        </UFormField>

                        <UFormField :label="t('sidebar-left.modal-message.textarea_label')" name="message" required>
                            <UTextarea v-model="state.message" type="text" :rows="10" :maxrows="20" minlength="20"
                                maxlength="3000" :placeholder="t('sidebar-left.modal-message.textarea_placeholder')"
                                :ui="{
                                    base: 'w-3xs md:w-xs bg-(--bg-2)'
                                }" style="font-size: var(--step--1);" />
                        </UFormField>

                        <UButton :loading="loading" :disabled="loading" type="submit" name="submit-contact-drawer"
                            color="neutral" variant="solid"
                            class="block w-3xs md:w-xs mt-3 bg-(--bg-2) text-(--text) hover:text-inverted" style="font-size: var(--step-0);">
                            {{ t('sidebar-left.modal-message.submit_button') }}
                        </UButton>
                    </UForm>

                    <div v-else-if="submitState === 'loading'" key="loading" class="flex flex-col items-center gap-6">
                        <UIcon name="fa7-solid:spinner" class="size-16 animate-spin" />
                        <p class="text-lg leading-relaxed font-medium" style="font-size: var(--step--1);">
                            {{ t('sidebar-left.modal-message.state.loading') }}
                        </p>
                    </div>

                    <div v-else-if="submitState === 'success'" key="success"
                        class="flex flex-col items-center gap-6 text-green-500">
                        <UIcon name="fa7-solid:check" class="size-16 animate-bounce" />
                        <p class="text-lg leading-relaxed font-medium" style="font-size: var(--step--1);">
                            {{ t('sidebar-left.modal-mmesage.state.success') }}
                        </p>
                        <span class="text-base leading-relaxed text-(--text-2)" style="font-size: var(--step--1);">
                            {{ t('sidebar-left.modal-message.state.waiting_before_new_message') }}
                        </span>
                    </div>

                    <div v-else-if="submitState === 'error'" key="error"
                        class="flex flex-col items-center gap-6 text-red-500">
                        <UIcon name="fa7-solid:xmark" class="size-16 animate-none" />
                        <p class="text-lg leading-relaxed font-medium" style="font-size: var(--step--1);">
                            {{ t('sidebar-left.modal-message.state.error') }}
                        </p>
                    </div>
                </Transition>
            </div>
        </template>
    </UModal>
</template>
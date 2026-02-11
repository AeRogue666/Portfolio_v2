<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const state = reactive({
    email: undefined,
    message: undefined
})

type Schema = typeof state

const toast = useToast(), { t } = useI18n();

function validate(state: Partial<Schema>): FormError[] {
    const errors = []
    if (!state.email) errors.push({ name: 'email', message: 'Required' })
    if (!state.message) errors.push({ name: 'message', message: 'Required' })
    return errors
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const eventDate = new Date(Date.now());
    const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (event.data) {
        toast.add({ title: 'Success', description: `The form has been submitted the ${formattedDate}.`, color: 'success' })
        console.log(event.data)
    }
}
</script>

<template>
    <UModal id="contact-modal" :modal="true" fullscreen direction="left"
        :title="t('sidebar-left.modal-message.title')" :description="t('sidebar-left.modal-message.description')"
        :close="{
            color: 'neutral',
            variant: 'outline',
            class: 'rounded-full'
        }" :ui="{
            content: 'w-auto bg-(--bg)'
        }">

        <template #default>
            <UButton aria-haspopup="dialog" aria-controls="contact-modal" name="button-send-message" color="neutral"
                variant="ghost" size="xl" class="bg-(--bg-2) text-(--text)"
                :label="t('sidebar-left.modal-message.send-message_button_label')" />
        </template>

        <template #body>
            <UForm :validate="validate" :state="state"
                class="flex flex-col items-baseline w-auto h-auto mx-4 mt-6 gap-4" @submit.once="onSubmit">
                <UFormField :label="t('sidebar-left.modal-message.input_label')" name="email" required>
                    <UInput autofocus v-model="state.email" size="xl" :placeholder="'amazing@email.com'" :ui="{
                        base: 'w-3xs md:w-xs bg-(--bg-2) text-(--text)'
                    }" />
                </UFormField>

                <UFormField :label="t('sidebar-left.modal-message.textarea_label')" name="message" required>
                    <UTextarea v-model="state.message" type="text" :rows="10" :maxrows="20" minlength="20"
                        maxlength="3000" :placeholder="t('sidebar-left.modal-message.textarea_placeholder')" :ui="{
                            base: 'w-3xs md:w-xs bg-(--bg-2)'
                        }" />
                </UFormField>

                <UButton type="submit" name="submit-contact-drawer" color="neutral" variant="ghost"
                    class="block w-3xs md:w-xs mt-3 bg-(--bg-2) text-(--text) hover:bg-(--accent) focus:bg-(--accent)">
                    {{ t('sidebar-left.modal-message.submit_button') }}
                </UButton>
            </UForm>
        </template>
    </UModal>
</template>
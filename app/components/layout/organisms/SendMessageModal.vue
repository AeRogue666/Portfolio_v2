<script setup lang="ts">
import {
    ContactFormSchema,
    type ContactFormState,
} from "@/utils/schemas/contact";
import type { FormSubmitEvent, SelectMenuItem } from "@nuxt/ui";

const state = reactive<ContactFormState>({
    type: "simple_contact",
    email: "",
    message: "",
    website: "",
});

const { t } = useI18n(),
    { submitState, loading, submit } = useContactForm(),
    { setModalOpen } = useSidebarFocusStateInject(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const isOpen = ref(false);

const typeItems = computed<SelectMenuItem[]>(() => [
    {
        label: t('sendmessagemodal.types.accessibility_audit'),
        value: "accessibility_audit",
    },
    {
        label: t('sendmessagemodal.types.performance-seo_audit'),
        value: "performance-seo_audit",
    },
    {
        label: t('sendmessagemodal.types.professionnal_contact'),
        value: "professionnal_contact",
    },
    {
        label: t('sendmessagemodal.types.simple_message'),
        value: "simple_contact",
    },
    {
        label: t('sendmessagemodal.types.website_creation'),
        value: "website_creation",
    },
    {
        label: t('sendmessagemodal.types.website_redesign'),
        value: "website_redesign",
    },
    {
        label: t('sendmessagemodal.types.digital_training'),
        value: "digital_training",
    },
]);
function validate(values: ContactFormState) {
    const result = ContactFormSchema.safeParse(values);

    if (result.success) return [];

    return result.error.issues.map((issue: any) => ({
        name: String(issue.path[0]),
        message: issue.message,
    }));
}

function resetForm() {
    state.type = "simple_contact";
    state.email = "";
    state.message = "";
    state.website = "";
}

async function onSubmit(event: FormSubmitEvent<ContactFormState>) {
    await submit(event.data, resetForm);
}

watch(isOpen, (value) => {
    setModalOpen(value);

    if (value) {
        nextTick(() => {
            setTimeout(() => {
                const input = document.querySelector(
                    'input[name="email"]',
                ) as HTMLInputElement;
                if (input) {
                    input.removeAttribute("inert");
                    input.removeAttribute("aria-hidden");
                    input.scrollIntoView({ behavior: "smooth" });
                    input.focus({ preventScroll: false });

                    // console.log('after focus: ', document.activeElement?.tagName, document.activeElement?.id)
                    // console.log('focused: ', document.activeElement === input)
                }
            }, 300);
        });
    }
});

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

const typeError = computed(() => {
    if (!state.type) return t("report.state.required");
    return null;
});
</script>

<template>
    <UModal v-model:open="isOpen" id="contact-modal" :modal="true" fullscreen direction="left"
        :title="t('sidebar-left.modal-message.title')" :description="t('sidebar-left.modal-message.description')"
        :close="{
            color: 'neutral',
            variant: 'outline',
            class:
                'rounded-full bg-transparent fs-body text-(--text) hover:bg-(--bg-3) rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
        }" :ui="{
        content: 'w-auto bg-(--bg)',
        body: 'flex flex-col justify-center',
    }">
        <template #default>
            <UButton aria-haspopup="dialog" aria-controls="contact-modal" name="button-send-message" color="neutral"
                variant="solid" size="xl" class="bg-(--bg-3) text-(--text) fs-body"
                :label="t('sidebar-left.modal-message.send-message_button_label')" />
        </template>

        <template #body>
            <div class="flex justify-center items-center w-full h-80 relative">
                <Transition name="fade-scale" mode="out-in">
                    <UForm v-if="submitState === 'idle'" key="form" :validate="validate" :state="state"
                        class="flex flex-col items-center w-full gap-4" @submit="onSubmit">
                        <div class="flex flex-col w-auto h-auto gap-4">
                            <label id="issue-label" for="issue-field"
                                class="block w-3xs md:w-xs fs-body text-(--text-2) after:content-['*'] after:ms-0.5 after:text-error">
                                {{ t("sidebar-left.modal-message.selectType_label") }}
                            </label>

                            <USelect v-model="state.type" :items="typeItems" id="issue-field" value-key="value"
                                label-key="label" :aria-describedby="typeError ? 'issue-error' : undefined"
                                :aria-invalid="!!typeError" name="issue" color="neutral" size="xl" :ui="{
                                    base: 'bg-(--bg-2) text-(--text-2) fs-body',
                                    content: 'bg-(--bg-2)',
                                    value:
                                        grayscale && colorMode.value == 'dark'
                                            ? 'text-inverted'
                                            : '',
                                    item:
                                        grayscale && colorMode.value == 'dark'
                                            ? 'text-inverted fs-body'
                                            : 'text-(--text-2) fs-body',
                                }" class="ring-transparent transition-colors" required />

                            <p v-if="typeError" id="issue-error" class="fs-small text-(--danger) mt-2">
                                {{ typeError }}
                            </p>
                        </div>

                        <UFormField :label="t('sidebar-left.modal-message.email_label')" name="email" :ui="{
                            label: 'text-(--text-2) fs-body',
                        }" required>
                            <UInput id="send-message-input" v-model="state.email" size="xl" tabindex="-1"
                                :placeholder="'amazing@email.com'" :ui="{
                                    base: 'w-3xs md:w-xs bg-(--bg-2) text-(--text-2) fs-body',
                                }" />
                        </UFormField>

                        <UFormField label="Website" name="website" class="hidden" :ui="{
                            label: 'text-(--text-2) fs-body',
                        }">
                            <UInput v-model="state.website" type="text" size="xl" class="hidden" autocomplete="off" :ui="{
                                base: 'w-3xs md:w-xs fs-body',
                            }" />
                        </UFormField>

                        <UFormField :label="t('sidebar-left.modal-message.textarea_label')" name="message" :ui="{
                            label: 'text-(--text-2) fs-body',
                        }" required>
                            <UTextarea v-model="state.message" type="text" :rows="10" :maxrows="20" minlength="20"
                                maxlength="3000" :placeholder="t('sidebar-left.modal-message.textarea_placeholder')
                                    " :ui="{
                    base: 'w-3xs md:w-xs bg-(--bg-2) fs-body',
                }" />
                        </UFormField>

                        <UButton :loading="loading" :disabled="loading" type="submit" name="submit-contact-drawer"
                            color="neutral" variant="solid"
                            class="block w-3xs md:w-xs mt-3 bg-(--bg-2) text-(--text-2) hover:text-inverted fs-body">
                            {{ t("sidebar-left.modal-message.submit_button") }}
                        </UButton>
                    </UForm>

                    <div v-else-if="submitState === 'loading'" key="loading" class="flex flex-col items-center gap-6">
                        <UIcon name="fa7-solid:spinner" class="size-16 animate-spin" />
                        <p class="fs-body leading-relaxed font-medium">
                            {{ t("sidebar-left.modal-message.state.loading") }}
                        </p>
                    </div>

                    <div v-else-if="submitState === 'success'" key="success"
                        class="flex flex-col items-center gap-6 text-green-500">
                        <UIcon name="fa7-solid:check" class="size-16 animate-bounce" />
                        <p class="fs-body leading-relaxed font-medium">
                            {{ t("sidebar-left.modal-message.state.success") }}
                        </p>
                        <span class="fs-body leading-relaxed text-(--text-2)">
                            {{
                                t("sidebar-left.modal-message.state.waiting_before_new_message")
                            }}
                        </span>
                    </div>

                    <div v-else-if="submitState === 'error'" key="error"
                        class="flex flex-col items-center gap-6 text-red-500">
                        <UIcon name="fa7-solid:xmark" class="size-16 animate-none" />
                        <p class="fs-body leading-relaxed font-medium">
                            {{ t("sidebar-left.modal-message.state.error") }}
                        </p>
                    </div>
                </Transition>
            </div>
        </template>
    </UModal>
</template>

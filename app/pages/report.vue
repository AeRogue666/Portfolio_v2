<script setup lang="ts">
import type { FormError, FormSubmitEvent, SelectMenuItem } from '@nuxt/ui';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';

const { t } = useI18n(),
    toast = useToast(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

type Issues = 'accessibility' | 'issue' | 'bug' | 'feedback' | 'other';

type ReportForm = {
    issue: Issues,
    description: string,
    email: string | undefined
    honeypot?: any
}

const issueItems = computed<SelectMenuItem[]>(() => [
    {
        label: t('report.issue.accessibility'),
        value: 'accessibility'
    },
    {
        label: t('report.issue.issue'),
        value: 'issue'
    },
    {
        label: t('report.issue.bug'),
        value: 'bug'
    },
    {
        label: t('report.issue.other'),
        value: 'other'
    }
]);

const form = reactive<ReportForm>({
    issue: 'accessibility',
    description: '',
    email: undefined,
});

type Schema = typeof form

function validateForm(state: Partial<Schema>): FormError[] {
    const errors = [];

    /* if (state.email) {
        errors.push({ name: 'email', message: t('report.state.required') })
    } */
    if (!state.description) {
        errors.push({ name: 'description', message: t('report.state.required') })
    }
    if (!state.issue) {
        errors.push({ name: 'issue', message: t('report.state.required') })
    }
    return errors
}

const isSubmitting = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
    isSubmitting.value = true

    try {
        await $fetch('/api/report', {
            method: 'POST',
            body: event.data
        });

        form.issue = 'accessibility';
        form.description = '';
        form.email = undefined

        toast.add({
            title: t('toast.form_submitted.title'),
            description: t('toast.form_submitted.description'),
            color: 'success'
        });
    } catch (error) {
        toast.add({
            title: t('toast.form_error_submission.title'),
            description: `[${t('report.state.error')}] ${t('toast.form_error_submission.description')}: ${error}`,
            color: 'error'
        });
    } finally {
        isSubmitting.value = false
    }
}

const issueError = computed(() => {
    if (!form.issue) return t('report.state.required')
    return null
});

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});
</script>

<template>
    <ArticleLayout>
        <template #header>
            <h1 id="article-title" class="text-2xl font-semibold leading-snug text-scalable text-(--text)"
                style="font-size: var(--step-2);">{{ t('report.title') }}</h1>
            <p class="text-base leading-relaxed text-(--text-2) text-scalable max-w-prose"
                :class="grayscale && colorMode.value == 'dark' ? 'text-white' : ''" style="font-size: var(--step-0);">
                {{ t('report.description') }}
            </p>
        </template>

        <UForm :state="form" :validate="validateForm" class="space-y-4" @submit.prevent="onSubmit">
            <div class="text-sm">
                <label id="issue-label" for="issue-field"
                    class="block font-medium text-default after:content-['*'] after:ms-0.5 after:text-error">
                    {{ t('report.form.type') }}
                </label>

                <USelect v-model="form.issue" :items="issueItems" id="issue-field" value-key="value" label-key="label"
                    :aria-describedby="issueError ? 'issue-error' : undefined" :aria-invalid="!!issueError" name="issue"
                    color="neutral" size="xl" :ui="{
                        base: 'bg-(--bg-2) text-(length:--step--1)',
                        content: 'bg-(--bg-2)',
                        value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                        item: grayscale && colorMode.value == 'dark' ? 'text-inverted text-(length:--step--1)' : 'text-(length:--step--1)'
                    }" />

                <p v-if="issueError" id="issue-error" class="text-sm text-(--danger) mt-2">{{ issueError }}</p>
            </div>

            <UFormField :label="t('report.form.description')" name="description" orientation="vertical" required>
                <UTextarea v-model="form.description" :ui="{
                    base: 'bg-(--bg-2) text-(length:--step--1)',
                    content: 'bg-(--bg-2)',
                    value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                    item: grayscale && colorMode.value == 'dark' ? 'text-inverted text-(length:--step--1)' : 'text-(length:--step--1)'
                }" required />
            </UFormField>

            <UFormField :label="t('report.form.email')" name="email" :hint="t('report.form.optional')"
                orientation="vertical" :ui="{
                    labelWrapper: 'justify-start'
                }">
                <UInput v-model="form.email" type="email" autocomplete="off" :ui="{
                    base: 'bg-(--bg-2) text-(length:--step--1)',
                    content: 'bg-(--bg-2)',
                    value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                    item: grayscale && colorMode.value == 'dark' ? 'text-inverted text-(length:--step--1)' : 'text-(length:--step--1)'
                }" />
            </UFormField>
        </UForm>

        <template #footer>
            <UButton name="button-submit-report" color="neutral" variant="ghost" size="xl"
                class="bg-(--bg-2) text-(--text)" :label="t('report.form.submit')" type="submit"
                :loading="isSubmitting" />
        </template>
    </ArticleLayout>
</template>
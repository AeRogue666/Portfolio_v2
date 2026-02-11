<script setup lang="ts">
import type { FormError, FormSubmitEvent, SelectMenuItem } from '@nuxt/ui';
import ArticleLayout from '~/components/layout/molecules/ArticleLayout.vue';

definePageMeta({
    layout: 'index-header'
})

const { t } = useI18n(), toast = useToast();

type Issues = 'accessibility' | 'issue' | 'bug' | 'feedback' | 'other';

type ReportForm = {
    issue: Issues,
    description: string,
    email: string | null
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
        label: t('report.issue.feedback'),
        value: 'feedback'
    },
    {
        label: t('report.issue.other'),
        value: 'other'
    }
]);

const form = reactive<ReportForm>({
    issue: 'accessibility',
    description: '',
    email: null,
});

type Schema = typeof form

function validateForm(state: Partial<Schema>): FormError[] {
    const errors = [];

    if (!state.email) errors.push({ name: 'email', message: t('report.state.required') })
    if (!state.description) errors.push({ name: 'description', message: t('report.state.required') })
    if (!state.issue) errors.push({ name: 'issue', message: t('report.state.required') })
    return errors
}

const isSubmitting = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (!validateForm) return
    isSubmitting.value = true

    try {
        await $fetch('/api/report', {
            method: 'POST',
            body: form
        });

        form.issue = 'accessibility';
        form.description = '';
        form.email = null
    } catch (error) {
        toast.add({ title: t('toast.form_error_submission.title'), description: `[${t('report.state.error')}] ${t('toast.form_error_submission.description')}: ${error}` })

    } finally {
        isSubmitting.value = false
        toast.add({ title: t('toast.form_submitted.title'), description: t('toast.form_submitted.description'), color: 'success' })
        console.log(event.data)
    }
}
</script>

<template>
    <ArticleLayout>
        <template #header>
            <h1 id="article-title" class="text-xl font-bold">{{ t('report.title') }}</h1>
            <p class="text-base">{{ t('report.description') }}</p>
        </template>

        <UForm :validate="validateForm" class="space-y-4" @submit.prevent="onSubmit">
            <UFormField :label="t('report.form.type')" name="text" orientation="vertical" required>
                <USelect v-model="form.issue" :items="issueItems" value-key="value" label-key="label" color="neutral"
                    size="xl" :aria-label="t('report.form.issue_selector')" :ui="{
                        base: 'bg-(--bg-secondary)',
                        content: 'bg-(--bg-secondary)'
                    }" />
            </UFormField>

            <UFormField :label="t('report.form.description')" name="textarea" orientation="vertical" required>
                <UTextarea v-model="form.description" :ui="{
                    base: 'bg-(--bg-secondary) text-xl'
                }" required />
            </UFormField>

            <UFormField :label="t('report.form.email')" name="email" :hint="t('report.form.optional')" orientation="vertical" :ui="{
                labelWrapper: 'justify-start'
            }">
                <UInput v-model="form.email" type="email" autocomplete="off" :ui="{
                    base: 'bg-(--bg-secondary) text-xl',
                }" />
            </UFormField>
        </UForm>

        <template #footer>
            <UButton name="button-submit-report" color="neutral" variant="ghost" size="xl"
                class="bg-(--bg-2) text-(--text)" :label="t('report.form.submit')" type="submit" :loading="isSubmitting" />
        </template>
    </ArticleLayout>
</template>
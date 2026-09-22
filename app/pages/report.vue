<script setup lang="ts">
import type { BreadcrumbItem, FormError, FormSubmitEvent, SelectMenuItem } from '@nuxt/ui';
import ArticleLayout from '@/components/layout/molecules/ArticleLayout.vue';

const { t, locale, locales } = useI18n(),
    toast = useToast(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode(),
    route = useRoute(),
    { formatISO } = useDate();

type Issues = 'accessibility' | 'issue' | 'bug' | 'feedback' | 'other';

type ReportForm = {
    issue: Issues,
    description: string,
    email: string | undefined
    honeypot?: any
}

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
    {
        label: t('breadcrumb.feed'),
        to: '/feed'
    },
    {
        label: t('breadcrumb.report'),
        to: ''
    },
]);

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

const articlePublishedTime = computed(() => formatISO('01-01-2026')), // dayjs('01-01-2026').locale(locale.value).format()
    articleModifiedTime = computed(() => formatISO(new Date())); // dayjs(new Date()).locale(locale.value).format()

useSeoMeta({
    title: `${t('seo.page.title', { pagetitle: t('breadcrumb.report') })} | CodeKorico`,
    ogTitle: `${t('seo.page.title', { pagetitle: t('breadcrumb.report') })} | CodeKorico`,
    description: t('seo.page.description', { pagetitle: t('breadcrumb.report') }),
    ogDescription: t('seo.page.description', { pagetitle: t('breadcrumb.report') }),
    ogUrl: () => `https://codekorico.com${route.path}`,
    ogImage: `https://codekorico.com${route.path}`,
    ogImageAlt: t('seo.page.description', { pagetitle: t('breadcrumb.report') }),
    ogImageType: 'image/png',
    ogImageWidth: 1920,
    ogImageHeight: 1080,
    articlePublishedTime: articlePublishedTime.value ?? "",
    articleModifiedTime: articleModifiedTime.value ?? "",
}),
    useHead({
        link: [
            {
                rel: 'canonical',
                href: `https://codekorico.com${route.path}`
            },
            ...locales.value.map((l: { code: string }) => ({
                rel: 'alternate',
                hreflang: l.code,
                href: `https://codekorico.com${route.path}`
            }))
        ]
    });
</script>

<template>
    <template v-if="form">
        <ArticleLayout>
            <template #header>
                <nav aria-label="Fil d'Ariane" class="my-2">
                    <UBreadcrumb :items="breadcrumbItems" class="my-2 fs-body" variant="link" color="neutral" :ui="{
                        link: 'text-(--text-2) hover:text-(--text) transition-colors',
                        linkActive: 'text-(--text-2) fs-body no-underline'
                    }">
                        <template #item-label="{ item }">
                            <span :class="[item.to ? 'underline' : 'no-underline']">
                                {{ item.label }}
                            </span>
                        </template>

                        <template #separator>
                            <span class="mx-2 text-(--text-muted)" aria-hidden="true">/</span>
                        </template>
                    </UBreadcrumb>
                </nav>

                <h1 id="article-title" class="fs-heading font-semibold tracking-tight leading-snug mt-2">
                    {{ t('report.title') }} -
                    <span class="fs-subtitle text-(--text-2) leading-snug">
                        {{ t('report.description') }}
                    </span>
                </h1>
            </template>

            <p class="fs-body text-(--text)">
                <span>{{ t('report.text.1') }}</span><br>
                <span>{{ t('report.text.2') }}</span><br>
                <span>{{ t('report.text.3') }}</span><br>
                <span>{{ t('report.text.4', { email: 'contact@codekorico.com' }) }}</span>
            </p>

            <UForm :state="form" :validate="validateForm" class="mx-4 space-y-4" @submit.prevent="onSubmit">
                <div class="text-sm">
                    <label id="issue-label" for="issue-field"
                        class="block font-medium text-(--text) after:content-['*'] after:ms-0.5 after:text-error fs-body">
                        {{ t('report.form.type') }}
                    </label>

                    <USelect v-model="form.issue" :items="issueItems" id="issue-field" value-key="value"
                        label-key="label" :aria-describedby="issueError ? 'issue-error' : undefined"
                        :aria-invalid="!!issueError" name="issue" color="neutral" size="xl"
                        class="block w-48 md:w-1/2 mt-3 ring-transparent transitions-color" :ui="{
                            base: grayscale && colorMode.value == 'dark'
                                ? 'bg-(--bg-2) text-inverted fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                                : 'bg-(--bg-2) text-(--text-2) fs-body ring-(--border-medium) placeholder:text-(--text-muted)',
                            content: 'bg-(--bg-2)',
                            value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                            item: grayscale && colorMode.value == 'dark' ? 'text-inverted fs-body' : 'fs-body'
                        }" />

                    <p v-if="issueError" id="issue-error" class="text-sm text-(--danger) mt-2">{{ issueError }}</p>
                </div>

                <UFormField :label="t('report.form.email')" name="email" orientation="vertical" :ui="{
                    labelWrapper: 'justify-start',
                    label: 'text-(--text-2) fs-body',
                    hint: 'fs-small'
                }" required>
                    <UInput v-model="form.email" type="email" autocomplete="off"
                        :placeholder="t('sidebar-left.modal-message.step-summary.email_placeholder')" size="xl"
                        tabindex="0" class="block w-3xs md:w-1/2 mt-3" :ui="{
                            base: grayscale && colorMode.value == 'dark'
                                ? 'bg-(--bg-2) text-inverted fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                                : 'bg-(--bg-2) text-(--text-2) fs-body ring-(--border-medium) placeholder:text-(--text-muted)',
                            content: 'bg-(--bg-2)',
                            value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                            item: grayscale && colorMode.value == 'dark' ? 'text-inverted fs-body' : 'fs-body',
                        }" required />
                </UFormField>

                <UFormField :label="t('report.form.description')" name="description" orientation="vertical" :ui="{
                    label: 'text-(--text-2) fs-body',
                    hint: 'fs-body'
                }" required>
                    <UTextarea v-model="form.description" type="text" :rows="10" :maxrows="20" minlength="20"
                        maxlength="3000"
                        :placeholder="t('sidebar-left.modal-message.step-complexity.business-goals-placeholder', { maxlength: 3000 })"
                        class="block w-3xs md:w-1/2 mt-3" :ui="{
                            base: grayscale && colorMode.value == 'dark'
                                ? 'bg-(--bg-2) text-inverted fs-body ring-(--border-medium) placeholder:text-(--text-muted)'
                                : 'bg-(--bg-2) text-(--text-2) fs-body ring-(--border-medium) placeholder:text-(--text-muted)',
                            content: 'bg-(--bg-2)',
                            value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                            item: grayscale && colorMode.value == 'dark' ? 'text-inverted fs-body' : 'fs-body'
                        }" required />
                </UFormField>

                <UButton name="button-submit-report" color="neutral" variant="solid" size="xl" icon="fa7-solid:message"
                    class="inline-flex items-center justify-center w-1/2 px-5 py-2.5 gap-2 rounded-lg bg-(--text) text-(--bg) border border-transparent transition-all duration-200 hover:bg-(--bg-3)/10 hover:text-(--text) hover:border-(--text) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) fs-lead shadow-md"
                    :label="t('report.form.submit')" type="submit" :loading="isSubmitting" />
            </UForm>
        </ArticleLayout>
    </template>
    <p v-else class="fs-body">
        {{ t('error.content_unavailable') }}
    </p>
</template>
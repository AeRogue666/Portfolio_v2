<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
    <UPage class="my-6">
        <div class="flex flex-col items-baseline md:items-center mx-4 md:m-0">
            <h1 id="admin-dashboard-title"
                class="flex flex-col font-bold fs-hero tracking-tight lg:font-extrabold lg:leading-none lg:text-center mb-4 lg:mb-7 xl:px-36">
                <span class="text-(--accent)">{{ t('admin.dashboard.title_accent') }}</span>
                <span class="text-(--text)">{{ t('admin.dashboard.title_rest') }}</span>
            </h1>

            <p class="font-normal lg:text-center max-w-[60vw] text-(--text-2) mb-6 sm:px-16 xl:px-48 fs-subtitle">
                {{ t('admin.dashboard.description') }}
            </p>
        </div>

        <UPageGrid class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-1">
            <UPageCard to="/admin/content" variant="solid" orientation="horizontal" reverse :ui="{
                leadingIcon: 'text-(--text-2) size-15',
                container: 'bg-(--bg-2)',
            }">
                <template #title>
                    <h2 id="content-manager-title" class="font-semibold leading-snug tracking-tight fs-title">
                        {{ t('admin.dashboard.content.title') }}
                    </h2>
                </template>

                <template #description>
                    <p class="font-normal lg:text-center w-full text-(--text-muted) fs-lead">
                        {{ t('admin.dashboard.content.description') }}
                    </p>
                </template>

                <UIcon name="fa7-solid:file-lines" class="text-(--text-2) size-60" />
            </UPageCard>
            <UPageCard to="/admin/accessibility-report" variant="solid" orientation="horizontal" reverse :ui="{
                leadingIcon: 'text-(--text-2) size-15',
                container: 'bg-(--bg-2)'
            }">
                <template #title>
                    <h2 id="accessibility_report-manager-title"
                        class="font-semibold leading-snug tracking-tight fs-title">
                        {{ t('admin.dashboard.accessibility_report.title') }}
                    </h2>
                </template>

                <template #description>
                    <p class="font-normal lg:text-center w-full text-(--text-muted) fs-lead">
                        {{ t('admin.dashboard.accessibility_report.description') }}
                    </p>
                </template>

                <UIcon name="fa7-brands:accessible-icon" class="text-(--text-2) size-60" />
            </UPageCard>
        </UPageGrid>
    </UPage>
</template>
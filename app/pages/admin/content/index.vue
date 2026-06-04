<script setup lang="ts">
import type { FeedKind } from '@prisma/client';
import AdminPostItem from '@/components/admin/AdminPostItem.vue';
import type { ButtonProps } from '@nuxt/ui';

const { t } = useI18n(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const search = ref('');
const selectedKind = ref<FeedKind | string>('all');

const { data: posts, refresh } = await useFetch('/api/admin/content');

type contentKinds = 'all' | 'project' | 'experiment' | 'about' | 'service' | 'client' | 'note' | 'job' | 'read' | 'talk' | 'page_index' | 'page_legal' | 'page_terms' | 'page_accessibility' | 'page_accessibility_report';

const kinds: { value: contentKinds; labelKey?: string; }[] = [
    { value: 'all', labelKey: 'post.type.all' },
    { value: 'project', labelKey: 'post.type.project' },
    { value: 'experiment', labelKey: 'post.type.experiment' },
    { value: 'about', labelKey: 'post.type.about' },
    { value: 'service', labelKey: 'post.type.service' },
    { value: 'client', labelKey: 'post.type.client' },
    { value: 'note', labelKey: 'post.type.note' },
    { value: 'job', labelKey: 'post.type.job' },
    { value: 'read', labelKey: 'post.type.read' },
    { value: 'talk', labelKey: 'post.type.talk' },
    { value: 'page_index', labelKey: 'post.type.page_index' },
    { value: 'page_legal', labelKey: 'post.type.page_legal' },
    { value: 'page_terms', labelKey: 'post.type.page_terms' },
    { value: 'page_accessibility', labelKey: 'post.type.page_accessibility' },
    { value: 'page_accessibility_report', labelKey: 'post.type.page_accessibility_report' },
] as const;

function getTitle(post: any) {
    const fr = post.translations?.find((t: any) => t.locale === 'fr');
    const en = post.translations?.find((t: any) => t.locale === 'en');
    return fr?.title || en?.title || post.slug
}

const filteredItems = computed(() => {
    if (!posts.value) return [];

    return posts.value.filter((p: any) => {
        const matchKind = selectedKind.value === 'all' || p.kind === selectedKind.value;

        const matchSearch = !search.value || p.slug?.toLowerCase().includes(search.value.toLowerCase()) ||
            getTitle(p).toLowerCase().includes(search.value.toLowerCase());

        return matchKind && matchSearch
    });
});

const PageHeaderLinks = ref<ButtonProps[]>([
    {
        label: 'New content',
        icon: 'fa7-solid:plus',
        to: '/admin/content/new',
        target: '_self'
    }
]);

// Grayscale
const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

// Props
const isKindSelected = (kind: contentKinds): boolean => kinds.includes({ value: kind });
</script>

<template>
    <UPage>
        <UPageHeader title="Content Manager" description="Manage all posts, pages and content"
            headline="Website content" :ui="{
                title: 'fs-title',
                description: 'fs-lead text-(--text-muted)',
                headline: 'fs-small text-(--text-2)'
            }">
            <template #links>
                <div data-slot="links" class="flex flex-wrap items-center gap-1.5">
                    <a v-for="link in PageHeaderLinks" :href="`${link.to}`" :target="`${link.target}`" data-slot="base"
                        class="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors px-2.5 py-1.5 fs-body gap-1.5 ring ring-inset ring-accented text-(--text) bg-(--bg-2) hover:bg-(--bg-3) active:bg-(--bg-3) disabled:bg-(--bg-2) aria-disabled:bg-(--bg-2) hover:text-(--text) active:text-(--text-2) focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted">
                        <span class="iconify shrink-0 size-5" :class="`i-${link.icon}`" aria-hidden="true"
                            data-slot="leadingIcon"></span>
                        <span data-slot="label" class="truncate">{{ link.label }}</span>
                    </a>
                    <UButton icon="fa7-solid:plus"
                        class="px-5 py-2.5 gap-2 rounded-lg bg-(--bg-3) border border-(--accent)/40 text-(--text) font-medium transition-colors hover:bg-(--accent)/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(---focus) fs-body"
                        @click="refresh()" :ui="{
                            base: 'bg-(--bg-2) hover:bg-(--bg-2) focus-visible:bg-(--bg-2) fs-body'
                        }">Refresh</UButton>
                </div>
            </template>
        </UPageHeader>

        <UPageBody>
            <UFormField label="Barre de recherche">
                <UInput v-model="search" icon="fa7-solid:magnifying-glass" placeholder="Search content..." size="xl" class="w-full" :ui="{
                    base: 'fs-body bg-(--bg) text-(--text) hover:bg-(--bg-2) border border-(--accent)'
                }" />
            </UFormField>

            <div class="mb-4">
                <h3 class="mb-3 fs-subtitle font-semibold text-(--text-2) leading-snug text-scalable">
                    {{ t('filters.kinds') }}
                </h3>
                <div class="flex flex-wrap gap-2" role="group" :aria-label="t('filters.kinds')">
                    <UButton v-for="kind in kinds" :key="kind.value" size="xs"
                        :variant="selectedKind === kind.value ? 'solid' : 'ghost'" :active="selectedKind === kind.value"
                        @click="selectedKind = kind.value" :aria-pressed="selectedKind === kind.value" :class="[
                            'px-3 py-2 font-medium rounded transition-colors fs-body hover:bg-(--accent-hover)',
                            selectedKind === kind.value ? 'bg-(--accent) text-(--text)' : 'bg-(--bg-2) text-(--text-2)'
                        ]" :ui="{
                            base: 'bg-(--bg-2) hover:bg-(--bg-2) focus-visible:bg-(--bg-2) fs-body',
                            content: 'bg-(--bg-2)',
                            value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                            item: grayscale && colorMode.value == 'dark' ? 'text-inverted' : ''
                        }">
                        {{ t(kind.labelKey ?? "") }}
                    </UButton>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <AdminPostItem v-for="item in filteredItems" :post="item" :key="item.id" />
            </div>
        </UPageBody>
    </UPage>
</template>
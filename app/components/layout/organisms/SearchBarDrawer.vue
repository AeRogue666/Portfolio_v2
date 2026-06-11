<script setup lang="ts">
import { toFeedItem } from '../../../../server/lib/toFeedItem';

const { t, locale } = useI18n(),
    colorMode = useColorMode();

const searchTerm = ref("");
const isOpen = ref(false);

useSidebarFocusState();

const { data: postsData, status, execute } = await useAsyncData(
    () => `searchbar-posts-${locale.value}`,
    async () => {
        const [projects, experiments, about, clients] = await Promise.all([
            queryCollection("projects").where("locale", "=", locale.value).all(),
            queryCollection("experiments").where("locale", "=", locale.value).all(),
            queryCollection("about").where("locale", "=", locale.value).all(),
            queryCollection("clients").where("locale", "=", locale.value).all(),
        ]);

        let feed = [
            ...projects.map((p: any) =>
                toFeedItem({ ...p, kind: "project" as const }),
            ),
            ...experiments.map((u: any) =>
                toFeedItem({ ...u, kind: "experiment" as const }),
            ),
            ...about.map((a: any) => toFeedItem({ ...a, kind: "about" as const })),
            ...clients.map((c: any) =>
                toFeedItem({ ...c, kind: "client" as const }),
            ),
        ];

        console.log({
            projects: projects.length,
            experiments: experiments.length,
            about: about.length,
            clients: clients.length,
        });

        return feed.map(post => ({
            id: post.id,
            label: post.feed_title ?? post.title,
            suffix: post.slug,
            to: post.slug
                ? (post.kind === 'project' || post.kindFallback === 'project'
                    ? `/projects/${post.slug}`
                    : post.kind === 'experiment' || post.kindFallback === 'experiment'
                        ? `/updates/${post.slug}`
                        : `/${post.slug}`
                )
                : undefined
        })) ?? [];
    },
    {
        watch: [locale],
    },
);

/* await useLazyFetch('/api/posts', {
    key: `searchbar-posts-${locale.value}`,
    query: { locale: locale.value },
    transform: (data: FeedResponse) => {
        return data?.items?.map(post => ({
            id: post.id,
            label: post.feed_title ?? post.title,
            suffix: post.slug,
            to: post.slug
                ? (post.kind === 'project' || post.kindFallback === 'project'
                    ? `/projects/${post.slug}`
                    : post.kind === "experiment" || post.kindFallback === "experiment"
                        ? `/updates/${post.slug}`
                        : `/${post.slug}`
                )
                : undefined,
        })) ?? [];
    },
    immediate: false
}); */

const recentItems = computed(() =>
    (postsData.value ?? []).slice(0, 5)
);

/* Groupes: suggestions si searchTerm vide, sinon résultats filtrés.
ignoreFilter: false - UCommandPalette filtre nativement sur 'label' */
const groups = computed(() => {
    if (!searchTerm.value.trim()) {
        return recentItems.value.length > 0
            ? [{
                id: 'recent',
                label: t('search.recent_label'),
                items: recentItems.value,
                ignoreFilter: true,
            }]
            : [];
    }

    return [{
        id: 'results',
        label: t('search.results_label'),
        items: postsData.value ?? [],
        ignoreFilter: false,
    }];
});

function closeDrawer() {
    isOpen.value = false;
    searchTerm.value = "";
}

function onUpdateOpen(value: boolean) {
    isOpen.value = value;
    if (value && !postsData.value) {
        execute();
    }

    if (!value) {
        searchTerm.value = "";
    }
}

// Fermer le drawer dès qu'un item est sélectionné
function onSelect() {
    nextTick(() => closeDrawer());
}
</script>

<template>
    <UDrawer v-model:open="isOpen" :title="t('search.title')" :description="t('search.description')" :handle="false"
        :ui="{
            content: 'bg-(--bg)',
            header: 'sr-only',
            body: 'p-0',
        }" @update:open="onUpdateOpen">
        <!-- Trigger -->
        <UButton :aria-label="t('search.aria_label')" :aria-description="t('search.aria_description')" color="neutral" variant="subtle" icon="fa7-solid:search"
            tabindex="0"
            class="flex flex-row items-center w-10 md:w-30 h-10 bg-(--bg-2) text-(--text-2) rounded-full gap-2 hover:bg-(--bg-2) hover:text-(--accent-hover) focus-visible:bg-(--bg-2) focus-visible:text-(--focus)">
            <span class="sr-only md:not-sr-only" style="font-size: var(--step--1);">
                {{ t('search.button_label') }}
            </span>
        </UButton>

        <template #body>
            <UCommandPalette v-model:search-term="searchTerm" :loading="status === 'pending'" :groups="groups"
                :placeholder="t('search.placeholder')" autofocus size="xl" class="bg-(--bg) text-(--text)"
                style="font-size: var(--step-0);" @update:model-value="onSelect" />
        </template>
    </UDrawer>
</template>
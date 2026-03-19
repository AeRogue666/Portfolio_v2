<script setup lang="ts">
import type { FeedResponse } from '~/app/types/feed';

const { t, locale } = useI18n(),
    colorMode = useColorMode();

const searchTerm = ref("");

const { data: postsData, status, execute } = await useLazyFetch('/api/posts', {
    key: `searchbar-posts-${locale.value}`,
    query: { locale: locale.value, q: searchTerm },
    transform: (data: FeedResponse[]) => {
        return data?.map(posts => { 
            return posts.items.map(post => ({ id: post.id, label: post.title, suffix: post.slug }))
        })
    },
    immediate: false
});

const groups = computed(() => [{
    id: 'posts',
    label: searchTerm.value ? `Posts matching "${searchTerm.value}"` : 'Posts',
    items: postsData.value || [],
    ignoreFilter: true,
}]);

function onOpen() {
    if (!postsData.value) {
        execute()
    }
}

onMounted(() => {
    console.log(postsData.value)
})

watch(postsData, (newValue) => {
    console.log(newValue)
})
</script>

<template>
    <UDrawer title="Posts search bar" description="Need to find a post? Search here!" :handle="false"
        @update:open="onOpen">
        <UButton label="Search" color="neutral" variant="subtle" icon="fa7-solid:search"
            class="flex flex-row items-center w-10 md:w-30 h-10 bg-(--bg-2) text-(--text-2) rounded-full gap-2 hover:bg-(--bg-2) hover:text-(--accent-hover) focus-visible:bg-(--bg-2) focus-visible:text-(--focus)" />

        <template #content>
            <UCommandPalette v-model:search-term="searchTerm" :loading="status === 'pending'" :groups="groups"
                placeholder="Search a post or a page" size="xl" class="h-80 bg-(--bg) text-(--text)" />
        </template>
    </UDrawer>
</template>
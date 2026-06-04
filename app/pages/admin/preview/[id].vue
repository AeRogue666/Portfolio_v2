<script setup lang="ts">
import { useContentPreview } from '@/composables/useContentPreview';
import ContentRenderer from '@/components/admin/components/cms/renderers/ContentRenderer.vue';

const route = useRoute();
const id = route.params.id as string;

const { data } = await useFetch(`/api/admin/content/${id}`);

const post = ref(data.value);
const preview = useContentPreview();

preview.subscribe((payload) => {
    post.value = payload
});

onBeforeUnmount(() => {
    preview.destroy();
});
</script>

<template>
    <div class="max-w-4xl mx-auto p-10">
        <div v-if="!post">
            Loading...
        </div>

        <div v-else>
            <h1 class="text-3xl font-bold fs-title">
                {{post.translations?.find((t: { locale: string; }) => t.locale === 'fr')?.title }}
            </h1>
            <p class="fs-subtitle mt-2">
                {{post.translations?.find((t: { locale: string; }) => t.locale === 'fr')?.description }}
            </p>
            
            <ContentRenderer :blocks="post.translations?.find((t: { locale: string; }) => t.locale === 'fr')?.blocks ? post.translations?.find((t: { locale: string; }) => t.locale === 'fr')?.blocks : []" />
        </div>
    </div>
</template>
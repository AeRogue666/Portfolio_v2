<script setup lang="ts">
import ServicesContainer from '~/components/index/organisms/ServicesContainer.vue';

const { t, locale } = useI18n();

// Services section
const servicesAsyncKey = computed(() => `index-services-${locale.value}`);
const { data: servicesData, error: servicesError } = await useAsyncData(
    () => servicesAsyncKey.value,
    () => queryCollection("services")
        .where("locale", "=", locale.value)
        .all(),
    { watch: [locale] }
);
if (servicesError.value) {
    throw createError({ status: 404, statusMessage: 'Pricing services data not found', cause: servicesError.value, fatal: true })
}
const servicesContainerItems = computed<ServiceResolved[]>(() => {
    if (!servicesData.value) return [];

    const servicesItems: ServiceResolved[] = servicesData.value.map((item) => ({
        slug: item.slug,
        created_at: item.created_at,
        updated_at: item.updated_at,
        previewUrl: item.previewUrl,
        image: item.image ? {
            alt: item.image.alt,
            sources: {
                feed: {
                    mobile: item.image.sources?.feed?.mobile ?? "",
                    tablet: item.image.sources?.feed?.tablet ?? "",
                    desktop: item.image.sources?.feed?.desktop ?? "",
                },
                detail: {
                    mobile: item.image.sources?.detail?.mobile ?? "",
                    tablet: item.image.sources?.detail?.tablet ?? "",
                    desktop: item.image.sources?.detail?.desktop ?? "",
                }
            }
        } : undefined,

        tags: item.tags,
        tag: item.tag,
        highlighted: item.highlighted ?? false,

        title: item.title ?? "",
        description: item.description,
        feed_title: item.feed_title,
        feed_summary: item.feed_summary,
        accessible_name: item.accessible_name,

        packages: item.packages ?? []
    }));

    const filteredElements = servicesItems.filter((item: { slug: string }) => item.slug == 'formation');
    const nonFilteredElements = servicesItems.filter((item: { slug: string }) => item.slug !== 'formation');

    return [...nonFilteredElements, ...filteredElements];
});

useHead({
    title: `${t('index.services_section.title')} - CodeKorico` || "Mes Services - CodeKorico",
    meta: [{ name: 'description', content: `${t('index.services_section.description')}` }]
});
</script>

<template>
    <UContainer class="prose prose-neutral w-full max-w-7xl mx-auto px-4 py-10 prose-headings:scroll-mt-24">
        <header class="flex flex-col mb-10">
            <h1 id="services-index-title"
                class="fs-heading font-bold lg:leading-none my-2">
                {{ t('index.services_section.title') || "Mes Prestations & Services" }}
            </h1>
            <p class="text-(--text-2) fs-subtitle max-w-[65ch] leading-snug wrap-break-word">
                {{ t('index.services_section.description') || 
                "Découvrez comment je peux vous accompagner dans vos projets web et d'accessibilité." }}
            </p>
        </header>

        <ServicesContainer :services="servicesContainerItems" :service-page="true" />
    </UContainer>
</template>
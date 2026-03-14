<script setup lang="ts">
defineProps<{
    items: {
        image: string;
        alt: string;
        description: string;
        link: string;
    }[]
}>();
</script>

<template>
    <UCarousel v-slot="{ item, index }" class-names arrows dots :items="items">
        <NuxtLink :id="`carousel-${index}`" :to="item.link">
            <NuxtImg :src="item.image" :alt="item.alt" width="640" height="360" densities="x1"
                class="rounded-xl overflow-hidden object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy" />
            <span>{{ item.description }}</span>
            <!-- sizes="xs:100vw md:80vw lg:64rem" -->
            <!-- sizes="(min-width: 80rem) 64rem, (min-width: 64rem) 80vw, 100vw"
                :srcset="` ${item.image} 640w, ${item.image} 768w, ${item.image} 1024w`" -->
        </NuxtLink>
    </UCarousel>
</template>
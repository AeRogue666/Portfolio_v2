<script setup lang="ts">
defineProps<{
    items: {
        image: string;
        alt: string;
        description: string;
        link: string;
    }[]
}>();
const imgClasses = "rounded-xl border-2 border-solid border-(--border-subtle) overflow-hidden object-cover transition-transform duration-300 hover:scale-105"
</script>

<template>
    <UCarousel v-slot="{ item, index }" class-names loop arrows dots :autoplay="{ delay: 2000 }" :items="items">
        <NuxtLink :id="`carousel-${index}`" :to="item.link">
            <NuxtPicture :src="item.image"
                :img-attrs="{ alt: item.alt, sizes: 'sm:100vw md:80vw lg:64rem', class: imgClasses }"
                :widths="[320, 640, 960, 1280, 1536, 1920]" format="png" densities="x1" placeholder="blur" class=""
                loading="lazy" />
            <span>{{ item.description }}</span>
        </NuxtLink>
    </UCarousel>
</template>
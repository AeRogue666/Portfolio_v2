<script setup lang="ts">
const props = defineProps<{
    client: {
        title: string;
        description?: string;
        testimony?: string;
        customer_name?: string;
        customer_job?: string;
        customer_city?: string;
        customer_enterprise_name?: string;
        image: string;
        alt: string;
        link: string;
    }[];
}>();

const testimonial = ref({});

props.client.map((item) => {
    testimonial.value = {
        user: {
            name: item.customer_name,
            description: item.customer_job,
            city: item.customer_city,
            avatar: {
                src: item.image,
                alt: item.alt,
                loading: 'lazy' as const
            }
        },
        quote: item.testimony
    }
});
</script>

<template>
    <UCarousel v-slot="{ item }" class-names arrows dots :autoplay="{ delay: 6000 }"
        :items="client" class="w-full max-w-md my-10" :ui="{
            item: 'basis-full',
            prev: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg-(--bg-3) text-(--text-2) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90',
            next: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg(--bg-3) text-(--text) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90'
        }">
        <UPageCard :description="item.testimony" :to="item.link"
            class="flex flex-col items-center w-auto h-auto lg:h-92 p-3 lg:p-4 rounded-lg shrink-0 grow-0">
            <template #footer>
                <UUser v-bind="testimonial" />
            </template>
        </UPageCard>
    </UCarousel>
</template>
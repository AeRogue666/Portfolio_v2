<script setup lang="ts">
import type { AvatarProps } from '@nuxt/ui';
import type { ClientCarouselItem } from '~/app/types/ui/client-carousel';

const props = defineProps<{
    client: ClientCarouselItem[];
}>();

const testimonial = computed(() => {
    return props.client.map((item) => ({
        user: {
            name: item.customerName ?? "",
            job: item.customerJob ?? "",
            enterprise: item.customerEnterpriseName ?? "",
            avatar: {
                src: item.image,
                alt: item.alt,
                loading: 'lazy' as const,
            } satisfies AvatarProps
        },
        quote: item.testimony ?? "",
        link: item.link
    }));
});
</script>

<template>
    <UCarousel v-slot="{ item }" class-names arrows dots :autoplay="{ delay: 6000 }" :items="testimonial"
        class="w-full max-w-md my-10" :ui="{
            item: 'basis-full',
            arrows: 'relative top-[1.5rem] md:static md:top-0',
            prev: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg-(--bg-3) text-(--text-2) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90',
            next: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg(--bg-3) text-(--text) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90'
        }">
        <UPageCard :to="item.link"
            class="flex flex-col items-center w-full h-auto lg:h-92 p-3 lg:p-4 bg-(--bg-2) rounded-lg shrink-0 grow-0"
            :ui="{
                description: 'font-semibold lg:text-center text-(--text) mb-3 fs-lead'
            }">
            <template #description>
                <p class="line-clamp-3 md:line-clamp-5">“{{ item.quote }}”</p>
            </template>
            <template #footer>
                <UUser :avatar="item.user.avatar" :name="item.user.name" size="xl" orientation="horizontal"
                    :key="`client-avatar-${item.user.name}`" :ui="{
                        root: 'items-center',
                        name: 'fs-small text-2xl text-(--text) font-semibold tracking-tight leading-snug',
                        description: 'flex flex-col fs-small leading-relaxed text-(--text-2)',
                        avatar: 'size-16 bg-(--bg-2)'
                    }">
                    <template #description>
                        <span>{{ item.user.job }}</span>
                        <span>{{ item.user.enterprise }}</span>
                    </template>
                </UUser>
            </template>
        </UPageCard>
    </UCarousel>
</template>
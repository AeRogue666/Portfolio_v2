<script setup lang="ts">
import type { AvatarProps } from '@nuxt/ui';

const props = defineProps<{
    client: {
        title: string;
        description?: string;
        testimony?: string;
        customer_name: string;
        customer_job?: string;
        customer_city?: string;
        customer_enterprise_name?: string;
        image: string;
        alt: string;
        link: string;
    }[];
}>();

const testimonial = reactive<{
    user: {
        name: string;
        description: string;
        avatar: AvatarProps;
    },
    quote?: string;
    link: string;
}[]>([]);

props.client.map((item) => {
    testimonial.map((t) => {
        t.user.name = item.customer_name,
        t.user.description = `${item.customer_job} ${item.customer_enterprise_name}`,
        t.user.avatar.src = item.image,
        t.user.avatar.alt = item.alt,
        t.user.avatar.loading = 'lazy' as const,
        t.quote = item.testimony,
        t.link = item.link
    });
});
</script>

<template>
    <UCarousel v-slot="{ item }" class-names arrows dots :autoplay="{ delay: 10000 }" :items="testimonial"
        class="w-full max-w-md my-10" :ui="{
            item: 'basis-full',
            prev: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg-(--bg-3) text-(--text-2) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90',
            next: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg(--bg-3) text-(--text) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90'
        }">
        <UPageCard :description="`“${item.quote}”`" :to="item.link"
            class="flex flex-col items-center w-60 h-auto lg:h-92 p-3 lg:p-4 bg-(--bg-2) rounded-lg shrink-0 grow-0"
            :ui="{
                description: 'font-semibold lg:text-center text-(--text) mb-3 fs-lead'
            }">
            <template #footer>
                <UUser v-for="(client, i) in item.user.avatar" size="xl" orientation="horizontal" :key="`client-avatar-${i}`" :avatar="{
                    src: client.src,
                    icon: 'fa7-solid:user',
                    alt: client.alt,
                    loading: client.loading,
                }" :ui="{
                    root: 'items-center',
                    name: 'fs-small text-2xl text-(--text) font-semibold tracking-tight leading-snug',
                    description: 'flex flex-col fs-small leading-relaxed text-(--text-2)',
                    avatar: 'size-20 bg-(--bg-2)'
                }"></UUser>

                <!-- <UUser size="xl" orientation="horizontal" :name="item.customer_name ?? ''" 
                key="user-avatar" :avatar="{
                    src: item.image,
                    icon: 'fa7-solid:user',
                    alt: item.alt
                }" :ui="{
                    root: 'items-center',
                    name: 'fs-small text-2xl text-(--text) font-semibold tracking-tight leading-snug',
                    description: 'flex flex-col fs-small leading-relaxed text-(--text-2)',
                    avatar: 'size-20 bg-(--bg-2)'
                }">
                    <template #description>
                        <span>{{ item.customer_job ?? "" }}</span>
                        <span v-if="item.customer_enterprise_name && item.customer_city">{{ item.customer_enterprise_name ?? "" }} - {{ item.customer_city ?? "" }}</span>
                        <span v-else-if="item.customer_city && !item.customer_enterprise_name">{{ item.customer_city ?? "" }}</span>
                        <span v-else-if="item.customer_enterprise_name && !item.customer_city">{{ item.customer_enterprise_name ?? "" }}</span>
                    </template>
                </UUser> -->
            </template>
        </UPageCard>
    </UCarousel>
</template>
<script setup lang="ts">
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

const testimonial = computed(() =>
    props.client.map(item => ({
        user: {
            name: item.customer_name,
            job: item.customer_job ?? "",
            enterprise: item.customer_enterprise_name ?? "",
            avatar: {
                src: item.image,
                alt: item.alt,
                loading: 'lazy' as const,
            }
        },
        quote: item.testimony,
        link: item.link
    })
    ));
</script>

<template>
    <div class="w-full max-w-xl mx-auto my-12 relative group/carousel">
        <UCarousel v-slot="{ item }" class-names arrows dots :autoplay="{ delay: 6000 }" :items="testimonial"
            class="w-full max-w-xl mx-auto my-10" :ui="{
                item: 'basis-full',
                arrows: 'relative top-[1.5rem] md:static md:top-0',
                prev: 'bg-(--text) text-(--bg) hover:bg-(--text-2) focus-visible:bg-(--text-2) disabled:opacity-30 disabled:bg-(--text) disabled:text-(--bg) transition-all shadow-md',
                next: 'bg-(--text) text-(--bg) hover:bg-(--text-2) focus-visible:bg-(--text-2) disabled:opacity-30 disabled:bg-(--text) disabled:text-(--bg) transition-all shadow-md'
            }">
            <UPageCard :to="item.link"
                class="flex flex-col w-full h-auto p-3 lg:p-6 bg-(--bg-2) relative rounded-xl border border-(--text)/5 transition-all duration-300 hover:border-(--accent)/30 hover:shadow-xl overflow-hidden group"
                :ui="{
                    description: 'flex-1 min-h-40 font-medium text-left text-(--text) leading-relaxed fs-lead mb-6 line-clamp-5',
                    footer: 'flex items-center mt-auto pt-4 border-t border-(--text)/10'
                }">
                <template #description>
                    “{{ item.quote }}”
                </template>
                <template #footer>
                    <UUser :avatar="item.user.avatar" :name="item.user.name" size="xl" orientation="horizontal"
                        :key="`client-avatar-${item.user.name}`" :ui="{
                            root: 'items-center gap-4',
                            name: 'fs-body text-(--text) font-semibold tracking-tight leading-none',
                            description: 'flex flex-col fs-small text-(--text-2) opacity-80 mt-1',
                            avatar: 'size-14 ring-(--accent)/20 bg-(--bg)'
                        }">
                        <template #description>
                            <span>{{ item.user.job }}</span>
                            <span>{{ item.user.enterprise }}</span>
                        </template>
                    </UUser>
                </template>
            </UPageCard>
        </UCarousel>
    </div>
</template>
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

onMounted(() => {
    console.log(testimonial.value, props.client)
});
</script>

<template>
    <UCarousel v-slot="{ item }" class-names arrows dots :autoplay="{ delay: 6000 }" :items="client"
        class="w-full max-w-md my-10" :ui="{
            item: 'basis-full',
            prev: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg-(--bg-3) text-(--text-2) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90',
            next: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg(--bg-3) text-(--text) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90'
        }">
        <UPageCard :description="item.testimony" :to="item.link"
            class="flex flex-col items-center w-auto h-auto lg:h-92 p-3 lg:p-4 bg-(--bg-2) rounded-lg shrink-0 grow-0"
            :ui="{
                description: 'text-(--text)'
            }">
            <template #footer>
                <UUser size="xl" orientation="horizontal" :name="item.customer_name ?? ''" :description="`
                    ${item.customer_job ?? ''}
                    ${item.customer_enterprise_name ?? ''} 
                    ${item.customer_city ?? ''}
                `" key="user-avatar" :avatar="{
                    src: item.image,
                    icon: 'fa7-solid:user',
                    alt: item.alt
                }" :ui="{
                        root: 'items-center',
                        name: 'fs-body text-2xl text-(--text) font-semibold tracking-tight leading-snug',
                        description: 'fs-body leading-relaxed text-(--text-2)',
                        avatar: 'size-20 bg-(--bg-2)'
                    }" />
            </template>
        </UPageCard>
    </UCarousel>
    <!-- <UCarousel v-if="clientsCarouselItems.length !== 0" v-slot="{ item }" class-names arrows dots
                :autoplay="{ delay: 6000 }" :items="clientsCarouselItems" class="w-full max-w-md my-10" :ui="{
                    item: 'basis-full',
                    prev: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg-(--bg-3) text-(--text-2) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90',
                    next: 'bg-(--bg-2) active:bg-(--bg-2) disabled:bg(--bg-3) text-(--text) active:text-(--text-2) disactive:text(--text-muted) hover:bg(--bg-3)/90 focus-visible:bg(--bg-3)/90'
                }">
                <NuxtLink :to="item.link"
                    class="flex flex-col items-center w-auto h-auto lg:h-92 p-3 lg:p-4 rounded-lg shrink-0 grow-0">
                    <div class="flex flex-col items-start w-full my-auto">
                        <h3 class="fs-subtitle font-semibold mb-4">
                            {{ item.title }}
                            <p v-if="item.description" class="fs-lead font-normal lg:text-center text-(--text) mb-3">
                                {{ item.description }}
                            </p>
                        </h3>

                        
                        <span class="fs-body font-normal lg:text-center text-(--text) mb-3">
                            {{ item.testimony }}
                        </span>
                    </div>

                    <div class="flex flex-col lg:w-[50%] gap-4">
                        <NuxtImg :src="item.image" :alt="item.alt" sizes="xs:40vw md:10vw lg:20rem"
                            class="w-min rounded-xl overflow-hidden object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy" :placeholder="true" />
                    </div>
                </NuxtLink>
            </UCarousel>
            <div v-else class="flex justify-center items-center w-full my-10">
                <span class="text-base font-semibold lg:text-center text-(--text) mb-3 fs-body">
                    {{ t('index.client_section.be_the_first') }}
                </span>
            </div> -->
</template>
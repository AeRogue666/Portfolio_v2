<script setup lang="ts">
interface Element {
    title: string,
    description?: string,
    icon: string,
    class?: string,
    iconClass?: string,
}

const props = defineProps<{
    elements: Element[];
}>();
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 w-full gap-6">
        <UCard v-for="(el, index) in props.elements" :key="index"
            class="group transition-all duration-300 hover:shadow-md hover:border-(--border-subtle) bg-(--card-talk-bg) overflow-hidden rounded-2xl"
            :ui="{
                body: 'p-6'
            }">
            <div class="flex flex-col items-center gap-5">
                <div
                    class="flex justify-center items-center shrink-0 w-12 h-12 rounded-xl bg-(--bg-2) border border-(--border-subtle) text-(--text-2) transition-transform group-hover:scale-105">
                    <UIcon :name="el.icon" :class="el.iconClass" />
                </div>

                <div class="flex-1 pt-1">
                    <p class="text-(--text) fs-body leading-relaxed">{{ el.title }}</p>
                </div>
            </div>
        </UCard>
    </div>
</template>
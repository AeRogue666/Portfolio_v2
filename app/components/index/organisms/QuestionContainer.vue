<script setup lang="ts">
interface Element {
    title: string,
    description?: string,
    icon: string,
    size?: string | number | undefined,
    class?: string,
    iconClass?: string,
}

const props = defineProps<{
    elements: Element[];
}>();
</script>

<template>
    <UContainer ref="container" class="flex flex-col justify-between p-6 rounded-xl border transition-all duration-300 bg-(--card-talk-bg) relative">
        <!-- Cards grid -->
        <ul class="flex flex-col gap-x-6 gap-y-10 relative z-10">
            <li v-for="el in props.elements" :key="el.title" v-bind="el" :position="props.elements.indexOf(el) + 1" class="flex items-center gap-6">
                <UIcon :name="el.icon" :size="el.size" :class="el.iconClass" />
                <span>{{ el.title }}</span>
            </li>
        </ul>
    </UContainer>
</template>
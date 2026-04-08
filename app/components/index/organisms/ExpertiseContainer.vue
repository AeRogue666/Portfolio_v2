<script setup lang="ts">
import ProcessCard from '../molecules/ProcessCard.vue';

const { t } = useI18n();

const elements = reactive<{
    title: string,
    description?: string,
    icon: string,
    size?: string | number | undefined,
    class?: string,
    iconClass?: string,
}[]>([
    {
        title: t('index.expertise_section.process.1.title'),
        description: t('index.expertise_section.process.1.description'),
        icon: 'fa7-solid:magnifying-glass',
        size: 'xl',
        class: 'bg-blue-500',
        iconClass: 'bg-blue-500',
    },
    {
        title: t('index.expertise_section.process.2.title'),
        description: t('index.expertise_section.process.2.description'),
        icon: 'fa7-solid:pen-ruler',
        size: 'xl',
        class: 'bg-pink-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: t('index.expertise_section.process.3.title'),
        description: t('index.expertise_section.process.3.description'),
        icon: 'fa7-solid:dollar-sign',
        size: 'xl',
        class: 'bg-green-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: t('index.expertise_section.process.4.title'),
        description: t('index.expertise_section.process.4.description'),
        icon: 'fa7-solid:shapes',
        size: 'xl',
        class: 'bg-purple-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: t('index.expertise_section.process.5.title'),
        description: t('index.expertise_section.process.5.description'),
        icon: 'fa7-solid:warning',
        size: 'xl',
        class: 'bg-orange-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: t('index.expertise_section.process.6.title'),
        description: t('index.expertise_section.process.6.description'),
        icon: 'fa7-solid:comments',
        size: 'xl',
        class: 'bg-lightblue-500',
        iconClass: 'size-24 bg-white',
    },
]);
</script>

<template>
    <UContainer ref="container" class="py-24 relative">
        <!-- Cards grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-x-16 gap-y-20 relative z-10">
            <ProcessCard v-for="el in elements" :key="el.title" v-bind="el" :position="elements.indexOf(el) + 1" />
        </div>
    </UContainer>
</template>
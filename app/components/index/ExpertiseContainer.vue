<script setup lang="ts">
import ProcessCard from './molecules/ProcessCard.vue';

const elements = reactive<{
    title: string,
    description?: string,
    icon: string,
    size?: string | number | undefined,
    class?: string,
    iconClass?: string,
}[]>([
    {
        title: 'Etude de vos objectifs',
        description: 'Nous étudions ensemble vos objectifs',
        icon: 'fa7-solid:magnifying-glass',
        size: 'xl',
        class: 'bg-blue-500',
        iconClass: 'bg-blue-500',
    },
    {
        title: 'Proposition d\'un projet digital sur mesure',
        description: 'Projet digital répondant à vos besoins',
        icon: 'fa7-solid:pen-ruler',
        size: 'xl',
        class: 'bg-pink-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: 'Validation budgétaire et deadline',
        description: 'Nous validons ensemble un budget ainsi qu\'une deadline raisonnable',
        icon: 'fa7-solid:dollar-sign',
        size: 'xl',
        class: 'bg-green-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: 'Pas à pas',
        description: 'Nous produisons le projet et vous tenons au courant sur son avancé de manière régulière',
        icon: 'fa7-solid:shapes',
        size: 'xl',
        class: 'bg-purple-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: 'Crashtest',
        description: 'Nous effectuons des crashtests du projet avec votre équipe en conditions réelles',
        icon: 'fa7-solid:warning',
        size: 'xl',
        class: 'bg-orange-500',
        iconClass: 'size-24 bg-white',
    },
    {
        title: 'Suivis après vente',
        description: 'Votre projet vous appartient désormais, mais nous assurons le support !',
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
<script setup lang="ts">
import ArdecheSVG from '../molecules/ArdecheSVG.vue';
import DepartementSVG from '../molecules/DepartementSVG.vue';
import DromeSVG from '../molecules/DromeSVG.vue';
import HauteLoireSVG from '../molecules/HauteLoireSVG.vue';

withDefaults(
    defineProps<{
        active?: boolean;
    }>(),
    {
        active: true
    }
);

const { t } = useI18n();

const departements = ref([
    { id: '07', name: 'Ardèche', slug: 'ardeche', component: shallowRef(ArdecheSVG) },
    { id: '26', name: 'Drôme', slug: 'drome', component: shallowRef(DromeSVG) },
    { id: '07', name: 'Haute-Loire', slug: 'haute-loire', component: shallowRef(HauteLoireSVG) },
]);

const currentIndex = ref(0);

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % departements.value.length
};

const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + departements.value.length) % departements.value.length
};
</script>

<template>
    <div class="flex items-center justify-between relative w-full min-h-100">
        <!-- Version Desktop & Tablette -->
        <div class="hidden md:block absolute inset-0 pointer-events-none">
            <DepartementSVG
                class="w-full absolute opacity-100 animate-pulse-5s department-card-bg top-1/2 right-auto lg:left-auto" />
        </div>

        <!-- Version Mobile -->
        <div class="block md:hidden absolute inset-0 pointer-events-none">
            <div class="fixed lg:absolute inset-0 flex items-center justify-center p-8">
                <div v-for="(dep, i) in departements" :key="dep.id"
                    class="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out gap-5">
                    <component :is="dep.component" class="w-10/12 h-auto max-h-[70vh]"
                        :class="i === currentIndex ? 'opacity-100 animate-pulse-5s' : 'opacity-0'" />
                    <span v-if="i === currentIndex && active" class="fixed bottom-55 fs-body font-normal">
                        {{ dep.name }}
                    </span>
                </div>

                <div
                    class="flex items-center fixed lg:absolute top-[75vh] lg:top-150 left-auto lg:left-90 mt-auto px-4 py-2 gap-6 pointer-events-auto backdrop-blur-md rounded-full border border-white/10" v-if="active">
                    <UButton icon="fa7-solid-chevron-left" variant="ghost"
                        class="p-2 rounded-full active:scale-95 transition-all text-white"
                        :aria-label="`${t('index.landing_section.department_prev')}: ${departements[currentIndex === 0 ? 2 : currentIndex]?.name}`"
                        @click="prevSlide" />

                    <div class="flex gap-2">
                        <span v-for="(_, i) in departements" :key="i"
                            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
                            :class="i === currentIndex ? 'bg-white scale-125' : 'bg-white/30'"></span>
                    </div>

                    <UButton icon="fa7-solid-chevron-right" variant="ghost"
                        class="p-2 rounded-full active:scale-95 transition-all text-white"
                        :aria-label="`${t('index.landing_section.department_next')}: ${departements[currentIndex === 2 ? 0 : currentIndex + 1]?.name}`"
                        @click="nextSlide" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.section-bg {
    transform: translate(-50%, -50%);
}

.department-card-bg {
    transform: translate(-0%, -75%);
}

.animate-pulse-5s {
    animation: pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
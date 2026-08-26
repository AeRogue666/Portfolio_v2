<script setup lang="ts">
import ArdecheSVG from '../molecules/ArdecheSVG.vue';
import DepartementSVG from '../molecules/DepartementSVG.vue';
import DromeSVG from '../molecules/DromeSVG.vue';
import HauteLoireSVG from '../molecules/HauteLoireSVG.vue';

const departements = ref([
    { id: '07', nom: 'Ardèche', slug: 'ardeche', component: shallowRef(ArdecheSVG) },
    { id: '26', nom: 'Drôme', slug: 'drome', component: shallowRef(DromeSVG) },
    { id: '07', nom: 'Haute-Loire', slug: 'haute-loire', component: shallowRef(HauteLoireSVG) },
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
    <section class="flex items-center justify-between relative w-full min-h-100">
        <!-- Version Desktop & Tablette -->
        <div class="hidden md:block absolute inset-0 pointer-events-none">
            <div class="w-4/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <DepartementSVG class="w-full opacity-25 department-card-bg"
                    alt="" />
            </div>
        </div>

        <!-- Version Mobile -->
        <div class="block md:hidden absolute inset-0 pointer-events-none">
            <div class="absolute inset-0 flex items-center justify-center p-8">
                <div v-for="(dep, i) in departements" :key="dep.id"
                    class="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out"
                    :class="i === currentIndex ? 'opacity-25' : 'opacity-0'">
                    <component :is="dep.component" class="w-11/12 h-auto max-h-[70vh]" />
                </div>
            </div>

            <div class="flex md:hidden items-center mt-auto px-4 py-2 gap-6 pointer-events-auto backdrop-blur-md rounded-full border border-white/10">
                <UButton icon="fa7-solid-chevron-left" variant="ghost"
                    class="p-2 rounded-full active:scale-95 transition-all text-white"
                    aria-label="Département précédent" @click="prevSlide" />

                <div class="flex gap-2">
                    <span v-for="(_, i) in departements" :key="i"
                        class="w-2.5 h-2.5 rounded-full transition-all duration-300"
                        :class="i === currentIndex ? 'bg-white scale-125' : 'bg-white/30'"></span>
                </div>

                <UButton icon="fa7-solid-chevron-right" variant="ghost"
                    class="p-2 rounded-full active:scale-95 transition-all text-white"
                    aria-label="Département suivant" @click="nextSlide" />
            </div>
        </div>
    </section>
</template>

<style lang="css">
.section-bg {
    transform: translate(-50%, -50%);
}

.department-card-bg {
    transform: translate(-0%, -75%);
}
</style>
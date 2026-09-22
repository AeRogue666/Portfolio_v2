<script setup lang="ts">
interface Partner {
  tag: string;
  title: string,
  description?: string,
  image: string;
  imageAlt?: string;
  class?: string;
  imageClass?: string;
}

const props = defineProps<{
  partners: Partner[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div v-for="(pt, index) in props.partners" :key="index" :position="props.partners.indexOf(pt) + 1"
      class="flex flex-col justify-between bg-(--bg-2)/20 dark:bg-(--bg-2)/10 p-8 rounded-2xl border border-(--border-subtle) gap-6 group hover:border-(--accent)/30 transition-all duration-300"
      :class="pt.class">
      <div class="max-w-md">
        <span class="fs-small font-semibold tracking-wider uppercase text-(--accent)">
          {{ pt.tag }}
        </span>
        <h3 class="fs-lead mt-2 text-(--text)">
          {{ pt.title }}
        </h3>
        <p class="fs-small mt-2 text-(--text-3) leading-relaxed">
          {{ pt.description }}
        </p>
      </div>
      <div class="flex justify-start items-center">
        <img :src="pt.image" :alt="pt.alt ?? ''" width="57" height="57"
          class="w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          :class="pt.imageClass">
      </div>
    </div>
  </div>
</template>

<style scoped></style>
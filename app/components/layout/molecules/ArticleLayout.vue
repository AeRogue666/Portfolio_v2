<script setup lang="ts">

</script>

<template>
    <article class="prose prose-neutral w-full max-w-3xl mx-auto px-4 py-10 dark:bg-black/60 prose-headings:scroll-mt-24"
        aria-labelledby="article-title">
        <header class="flex flex-col mb-10">
            <slot name="header"></slot>
        </header>

        <section class="flex flex-col gap-6 prose prose-neutral dark:prose-invert">
            <slot></slot>
        </section>

        <footer class="flex mt-10 pt-6 border-t gap-4">
            <slot name="footer"></slot>
        </footer>
    </article>
</template>
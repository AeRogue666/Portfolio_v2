<script setup lang="ts">

</script>

<template>
    <article class="prose prose-neutral w-full max-w-3xl mx-auto px-4 py-10 prose-headings:scroll-mt-24"
        aria-labelledby="article-title">
        <header class="mb-10">
            <slot name="header"></slot>
        </header>

        <section class="prose prose-neutral dark:prose-invert">
            <slot></slot>
        </section>

        <footer class="flex mt-10 pt-6 border-t gap-4">
            <slot name="footer"></slot>
        </footer>
    </article>
</template>
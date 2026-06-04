<script setup lang="ts">
import BlockEditor from './BlockEditor.vue';

const form = ref({
    blocks: []
});
</script>

<template>
    <BlockEditor v-model="form.blocks" />
</template>
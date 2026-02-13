<script setup lang="ts">
defineProps<{
    id: string,
    label: string,
    value?: string,
    checked?: boolean | false,
    disabled?: boolean | false,
    required?: boolean | false,
    color?: "neutral" | "primary" | "secondary" | "success" | "info" | "warning" | "error" | undefined,
    variant?: "link" | "outline" | "solid" | "soft" | "subtle" | "ghost" | undefined,
    type?: "button" | "reset" | "submit" | undefined,
    class?: string,
}>();
</script>

<template>
    <button :color="color" :variant="variant" :type="type" role="switch" :id="id" :label="label"
        :aria-checked="checked" :disabled="disabled" :aria-required="required"
        :data-state="checked ? 'checked' : 'unchecked'" :value="value"
        class="inline-flex items-center shrink-0 rounded-full border-2 border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 data-[state=unchecked]:bg-accented transition-[background] duration-200 data-[state=checked]:bg-inverted focus-visible:outline-inverted w-11"
        :class="class">
        <span :data-state="checked ? 'checked' : 'unchecked'"
            class="group pointer-events-none rounded-full bg-default shadow-lg ring-0 transition-transform duration-200 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:rtl:translate-x-0 flex items-center justify-center size-5 data-[state=checked]:translate-x-5 data-[state=checked]:rtl:-translate-x-5">
            <UIcon v-if="!checked" name="fa7-solid:xmark" class="absolute shrink-0 group-data-[state=unchecked]:text-dimmed opacity-0 size-10/12 transition-[color,opacity] duration-200 group-data-[state=checked]:text-highlighted group-data-[state=unchecked]:opacity-100" />
            <UIcon v-else name="fa7-solid:check" class="absolute shrink-0 group-data-[state=unchecked]:text-dimmed opacity-0 size-10/12 transition-[color,opacity] duration-200 group-data-[state=checked]:text-highlighted group-data-[state=checked]:opacity-100" />
        </span>
        <span class="sr-only">{{ checked ? 'on' : 'off' }}</span>
    </button>
</template>
<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';
import type { FeedSortValue } from '~/app/types/feedFilters';

interface Props {
    availableTags: string[];
    selectedTags: string[];
    sortBy: FeedSortValue;
    hasActiveFilters: boolean;
}

interface Emits {
    'toggle-tag': [tag: string];
    'set-sort': [sort: FeedSortValue];
    'reset-filters': [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { t } = useI18n(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const isFiltersOpen = ref(false);
const filtersPanelRef = ref<HTMLElement | null>(null);

// Computed pour synchroniser sortBy (prop) avec le USelect
const sortValue = computed<FeedSortValue>({
    get: () => props.sortBy,
    set: (value) => {
        emit('set-sort', value)
    }
});

const sortOptions = computed<SelectItem[]>(() =>
    [
        { value: 'recent', label: t('filters.sort.recent') },
        { value: 'oldest', label: t('filters.sort.oldest') },
        { value: 'alpha', label: t('filters.sort.alpha') },
        { value: 'alpha-desc', label: t('filters.sort.alpha_desc') },
    ]);

// Grayscale
const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

// Gestion de la touche Escape
const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isFiltersOpen.value) {
        isFiltersOpen.value = false
    }
};

// Gestion du focus trap (Tab et Shift+Tab)
const handlePanelKeyDown = (event: KeyboardEvent) => {
    if (!isFiltersOpen.value || !filtersPanelRef.value) return;

    const focusableElements = filtersPanelRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    const activeElement = document.activeElement;

    // Tab sur le dernier élément -> focus au premier
    if (event.key === 'Tab' && !event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }

    // Shift+Tab sur le premier élément -> focus au dernier
    if (event.key === 'Tab' && event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    }
};

const handleTagClick = (tag: string) => {
    emit('toggle-tag', tag);
};

const handleResetFilters = () => {
    emit('reset-filters');
    isFiltersOpen.value = false;
};

const handleCloseFilters = () => {
    isFiltersOpen.value = false;
};

const isTagSelected = (tag: string): boolean => {
    return props.selectedTags.includes(tag);
};

onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
})
</script>

<template>
    <section aria-label="Feed filtes">
        <!-- Tri + Bouton filtres -->
        <div class="flex justify-between items-center gap-4 mt-4 mb-4">
            <!-- Tri -->
            <div class="flex items-center gap-2">
                <label for="sort-select" class="text-sm font-(--text-2)">{{ t('filters.sort.label') }}</label>
                <USelect id="sort-select" v-model="sortValue" :items="sortOptions" color="neutral" size="xl"
                    class="transition-colors" :ui="{
                        base: 'bg-(--bg-2) hover:bg-(--bg-3) text-(length:--step--1)',
                        content: 'bg-(--bg-2)',
                        value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                        item: grayscale && colorMode.value == 'dark' ? 'text-inverted text-(length:--step--1)' : 'text-(length:--step--1)'
                    }" />
            </div>

            <!-- Bouton Filtres (CollapsibleMenu) -->
            <UButton @click="isFiltersOpen = !isFiltersOpen" :aria-expanded="isFiltersOpen"
                aria-controls="filters-panel" variant="ghost" color="neutral" size="xl"
                class="bg-(--bg-2) hover:bg-(--bg-3) text-base text-(--text-1) text-(length:--step--1) font-medium">
                <Icon name="fa7-solid:sliders" />
                {{ t('filters.filters') }}
                <Icon :name="isFiltersOpen ? 'fa7-solid:chevron-up' : 'fa7-solid:chevron-down'" />
            </UButton>

            <!-- Badge compteur de filtres actifs -->
            <div v-if="hasActiveFilters" aria-live="polite" class="text-sm text-(--text-2)">
                {{ t('filters.active_count', { count: selectedTags.length }) }}
            </div>
        </div>

        <!-- Panel des filtres (collapsible) -->
        <Transition name="slide-down">
            <div v-show="isFiltersOpen" ref="filtersPanelRef" id="filters-panel"
                class="mb-6 p-4 bg-(--bg-2) rounded border border-(--border-subtle)" role="region"
                :aria-label="t('filters.filter_options')" @keydown="handlePanelKeyDown">

                <!-- Header du panel avec bouton fermeture -->
                <div class="flex justify-between items-center mb-4 pb-3 border-b border-(--border-subtle)">
                    <h2 class="text-2xl font-semibold text-(--text-1) leading-snug text-scalable">{{
                        t('filters.filter_options') }}</h2>
                    <UButton @click="handleCloseFilters" :aria-label="t('filters.close_filters')"
                        variant="outline" color="neutral"
                        class="close-button p-1 hover:bg-(--bg-3) rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                        <Icon name="fa7-solid:xmark" size="1.25rem" />
                    </UButton>
                </div>

                <!-- Tags -->
                <div class="mb-4">
                    <h3 class="mb-3 text-xl font-semibold text-(--text-2) leading-snug text-scalable">{{
                        t('filters.tags') }}</h3>
                    <div class="flex flex-wrap gap-2">
                        <UButton v-for="tag in availableTags" :key="tag" @click="handleTagClick(tag)"
                            :aria-pressed="isTagSelected(tag)" :class="[
                                'px-3 py-2 text-sm font-medium rounded transition-colors text-(length:--step--1)',
                                isTagSelected(tag)
                                    ? 'bg-green-500 text-white ring-2 ring-green-300'
                                    : 'bg-(--bg-3) text-(--text-2) border border-bg-(--border-subtle)'
                            ]">
                            {{ tag }}
                        </UButton>
                    </div>
                    <p v-if="availableTags.length === 0" class="mt-2 text-sm text-(--text-3) italic">{{
                        t('filters.no_tags') }}</p>
                </div>

                <!-- Bouton Reset -->
                <div v-if="hasActiveFilters" class="pt-4 border-t border-(--border-subtle)">
                    <UButton @click="handleResetFilters" variant="soft" color="neutral"
                        class="text-base bg-(--danger) text-(--text-1) text-(length:--step-0) hover:bg-(--accent) font-medium">
                        <Icon name="fa7-solid:filter" class="size-4" />
                        {{ t('filters.reset') }}
                    </UButton>
                </div>
            </div>
        </Transition>
    </section>
</template>

<style lang="css" scoped>
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
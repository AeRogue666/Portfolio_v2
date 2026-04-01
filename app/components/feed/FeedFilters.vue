<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';
import type { FeedKind } from '~/app/types/feed';
import type { FeedSortValue } from '~/app/types/feedFilters';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const props = defineProps<{
    availableTags: string[];
    selectedTags: string[];
    selectedKinds: FeedKind[];
    sortBy: FeedSortValue;
    hasActiveFilters: boolean;
    activeFiltersCount: number;
}>();

const emit = defineEmits<{
    'toggle-tag': [tag: string];
    'toggle-kind': [kind: FeedKind];
    'set-sort': [sort: FeedSortValue];
    'reset-filters': [];
}>();

const { t } = useI18n(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const filtersPanelRef = ref<HTMLElement | null>(null);
const isFiltersOpen = ref(false);

const { activate, deactivate } = useFocusTrap(filtersPanelRef, {
    immediate: false,
    escapeDeactivates: true,
    allowOutsideClick: true,
    returnFocusOnDeactivate: true,
});

const handleToggleFilters = () => {
    isFiltersOpen.value = !isFiltersOpen.value;
    if (isFiltersOpen.value) {
        nextTick(() => {
            activate();

            if (!isFiltersOpen.value || !filtersPanelRef.value) return;
            const focusableElements = filtersPanelRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            const activeElement = document.activeElement;

            if (activeElement === firstElement) {
                firstElement.focus();
            } else if(activeElement === lastElement) {
                lastElement.focus();
            }
        });
    } else {
        deactivate();
    }
};

const handleCloseFilters = () => {
    isFiltersOpen.value = false;
    deactivate();
};

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

// Kinds disponibles - "pinned" est intentionnellement absent : c'est un état dérivé (kindFallback), pas un type que l'utilsiateur choisit de filtrer
const availableKinds: { value: FeedKind; labelKey: string }[] = [
    { value: 'project', labelKey: 'post.type.project' },
    { value: 'update', labelKey: 'post.type.update' },
    { value: 'about', labelKey: 'post.type.about' },
];

// Grayscale
const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

// Props
const isTagSelected = (tag: string): boolean => props.selectedTags.includes(tag),
    isKindSelected = (kind: FeedKind): boolean => props.selectedKinds.includes(kind);

// Actions Handlers
const handleTagClick = (tag: string) => emit('toggle-tag', tag),
    handleKindClick = (kind: FeedKind) => emit('toggle-kind', kind);

const handleResetFilters = () => {
    emit('reset-filters');
    handleCloseFilters();
};
</script>

<template>
    <section aria-label="Feed filters">
        <!-- Tri + Bouton filtres -->
        <div class="flex items-center gap-2 mt-4 mb-4">
            <!-- Tri -->
            <div class="flex items-center gap-2">
                <label for="sort-select" class="text-(--text-2) fs-body">
                    {{ t('filters.sort.label') }}
                </label>
                <USelect id="sort-select" v-model="sortValue" :items="sortOptions" color="neutral" size="xl"
                    class="ring-transparent transition-colors" :ui="{
                        base: 'bg-(--bg-2) hover:bg-(--bg-2) focus-visible:bg-(--bg-2) fs-body',
                        content: 'bg-(--bg-2)',
                        value: grayscale && colorMode.value == 'dark' ? 'text-inverted fs-body' : 'text-(--text) fs-body',
                        item: grayscale && colorMode.value == 'dark' ? 'text-inverted fs-body' : 'text-(--text) fs-body'
                    }" />
            </div>

            <div class="flex items-center ml-auto gap-2">
                <!-- Badge compteur de filtres actifs -->
                <div v-if="hasActiveFilters" aria-live="polite"
                    class="text-sm text-(--text-2) whitespace-nowrap fs-body">
                    {{ t('filters.active_count', { count: selectedTags.length }) }}
                </div>

                <!-- Bouton Filtres (CollapsibleMenu) -->
                <UButton @click="handleToggleFilters" :aria-expanded="isFiltersOpen" aria-controls="filters-panel"
                    variant="ghost" color="neutral" size="xl"
                    class="bg-(--bg-2) text-base text-(--text) font-medium hover:bg-(--bg-2) focus-visible:bg-(--bg-2) focus:ring-2 focus:ring-inverted fs-body">
                    <Icon name="fa7-solid:sliders" />
                    {{ t('filters.filters') }}
                    <Icon :name="isFiltersOpen ? 'fa7-solid:chevron-up' : 'fa7-solid:chevron-down'" />
                </UButton>
            </div>
        </div>

        <!-- Panel des filtres (collapsible) -->
        <Transition name="slide-down">
            <div v-show="isFiltersOpen" ref="filtersPanelRef" id="filters-panel"
                class="mb-6 p-4 bg-(--bg-2) rounded border border-(--border-subtle)" role="region"
                :aria-label="t('filters.filter_options')">

                <!-- Header du panel avec bouton fermeture -->
                <div class="flex justify-between items-center mb-4 pb-3 border-b border-(--border-subtle)">
                    <h2 class="fs-title font-semibold text-(--text-1) leading-snug">
                        {{ t('filters.filter_options') }}
                    </h2>
                    <UButton @click="handleCloseFilters" :aria-label="t('filters.close_filters')" variant="outline"
                        color="neutral"
                        class="p-1 bg-transparent fs-body text-(--text) hover:bg-(--bg-3) rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                        <Icon name="fa7-solid:xmark" size="1.25rem" />
                    </UButton>
                </div>

                <!-- Kinds -->
                <div class="mb-4">
                    <h3 class="mb-3 fs-subtitle font-semibold text-(--text-2) leading-snug text-scalable">
                        {{ t('filters.kinds') }}
                    </h3>
                    <div class="flex flex-wrap gap-2" role="group" :aria-label="t('filters.kinds')">
                        <UButton v-for="kind in availableKinds" :key="kind.value" @click="handleKindClick(kind.value)"
                            :aria-pressed="isKindSelected(kind.value)" :class="[
                                'px-3 py-2 font-medium rounded transition-colors fs-body',
                                isKindSelected(kind.value)
                                    ? 'bg-green-500 text-white ring-2 ring-blue-300'
                                    : 'bg-(--bg-3) text-(--text-2) border border-bg-(--border-subtle)'
                            ]">
                            {{ t(kind.labelKey) }}
                        </UButton>
                    </div>
                </div>

                <!-- Séparateur -->
                <hr class="w-full h-px border-0 bg(--border-subtle) my-4" aria-hidden="true">

                <!-- Tags -->
                <div class="mb-4">
                    <h3 class="mb-3 fs-subtitle font-semibold text-(--text-2) leading-snug">
                        {{ t('filters.tags') }}
                    </h3>
                    <div class="flex flex-wrap gap-2" role="group" :aria-label="t('filters.tags')">
                        <UButton v-for="tag in availableTags" :key="tag" @click="handleTagClick(tag)"
                            :aria-pressed="isTagSelected(tag)" :class="[
                                'px-3 py-2 text-sm font-medium rounded transition-colors fs-body',
                                isTagSelected(tag)
                                    ? 'bg-green-500 text-white ring-2 ring-green-300'
                                    : 'bg-(--bg-3) text-(--text-2) border border-bg-(--border-subtle)'
                            ]">
                            {{ tag }}
                        </UButton>
                    </div>
                    <p v-if="availableTags.length === 0" class="mt-2 fs-small text-(--text-3) italic">
                        {{ t('filters.no_tags') }}
                    </p>
                </div>

                <!-- Bouton Reset -->
                <div v-if="hasActiveFilters" class="pt-4 border-t border-(--border-subtle)">
                    <UButton @click="handleResetFilters" variant="soft" color="neutral"
                        class="text-base bg-(--danger) text-(--text-1) fs-body hover:bg-(--accent) font-medium">
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
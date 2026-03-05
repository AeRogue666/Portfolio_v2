<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import ArticleLayout from '../components/layout/molecules/ArticleLayout.vue';

const { t, locale } = useI18n(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

// Grayscale
const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});


// Etat des filtres
const selectedThematic = ref<string | null>(null);
const selectedStatus = ref<string | null>(null);
const searchQuery = ref('');

// Données du serveur
const { data: reportData, pending } = await useFetch("/api/accessibility-report", {
    query: {
        locale: locale.value
    },
    watch: [locale]
});

// Filtrer les données
const filteredCriteria = computed(() => {
    if (!reportData.value) return [];

    return reportData.value.criteria.filter(item => {
        const matchThematic = !selectedThematic.value || item.thematic === selectedThematic.value;
        const matchStatus = !selectedStatus.value || item.status === selectedStatus.value;
        const matchSearch = !searchQuery.value || item.criterion.toLowerCase().includes(searchQuery.value.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.value.toLowerCase());

        return matchThematic && matchStatus && matchSearch;
    });
});

// Statistiques
const stats = computed(() => {
    if (!reportData.value) return {
        total: 0,
        conformes: 0,
        nonConformes: 0,
        nonApplicables: 0,
        conformePercent: 0,
    };

    const total = reportData.value.criteria.length;
    const conformes = reportData.value.criteria.filter(c => c.status === "C").length;
    const nonConformes = reportData.value.criteria.filter(c => c.status === "NC").length;
    const nonApplicables = reportData.value.criteria.filter(c => c.status === "NA").length;

    return {
        total,
        conformes,
        nonConformes,
        nonApplicables,
        conformePercent: Math.round((conformes / total) * 100)
    };
});

// Options pour les filtres
const thematicOptions = computed(() => {
    if (!reportData.value) return [];
    return [
        { label: reportData.value.allOption, value: null },
        ...reportData.value.thematics.map(t => ({
            label: t.label,
            value: t.id,
        }))
    ];
});

const statusOptions = computed(() => {
    if (!reportData.value) return [];
    return [
        { label: reportData.value.allOption, value: null },
        { label: 'Conforme (C)', value: 'C' },
        { label: 'Non conforme (NC)', value: 'NC' },
        { label: 'Non applicable (NA)', value: 'NA' },
    ];
});

const testEnvironmentMap = [
    { value: 'Windows 11 + Chrome + NVDA 2024.1', icon: 'check' },
    { value: 'Windows 11 + Firefox + NVDA 2024.1', icon: 'xmark' },
    { value: 'Android 12 + Chrome + Talkback', icon: 'xmark' },
    { value: t('accessibility-report.test_environment.keyboard_navigation'), icon: 'check' },
];

const colorMap: Record<string, string> = {
    'images': 'blue',
    'colors': 'violet',
    'forms': 'pink',
    'navigation': 'green',
    'consultation': 'yellow',
    'elements': 'red',
    'scripts': 'indigo',
    'mandatory': 'cyan',
    'presentation': 'amber',
    'multimedia': 'orange',
    'temporal': 'purple',
    'language': 'lime',
    'links': 'sky',
};

const getThematicColor = (thematicId: string): string => {
    return colorMap[thematicId] || 'gray';
};

const getThematicLabel = (thematicId: string): string => {
    if (!reportData.value) return '';
    return reportData.value.thematics.find(t => t.id === thematicId)?.label || '';
};

const getAccessibilityColor = (accessibility: string) => {
    const score = parseInt(accessibility);
    if (score === 100) return 'bg-emerald-500/20';
    if (score >= 80 && score < 90) return 'bg-green-500/20';
    if (score >= 60 && score > 80) return 'bg-lime-500/20';
    if (score >= 40 && score > 60) return 'bg-yellow-500/20';
    if (score >= 20 && score > 40) return 'bg-orange-500/20';
    if (score < 20) return 'bg-red-500/20';
};

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: t('breadcrumb.feed'),
        to: ''
    },
    {
        label: t('breadcrumb.accessibility_report'),
        to: '/accessibility-report'
    },
];
</script>

<template>
    <ArticleLayout v-if="reportData && !pending">
        <template #header>
            <UBreadcrumb :items="breadcrumbItems" class="my-2">
                <template #separator>
                    <span class="mx-2 text-(--text-muted)">/</span>
                </template>
            </UBreadcrumb>
            <h1 id="article-title" class="text-2xl font-bold">{{ reportData.title }}</h1>
            <p class="text-base text-(--text-2)">{{ reportData.description }}</p>
        </template>

        <!-- Résumé Exécutif -->
        <section class="mb-12" aria-labelledby="summary-heading">
            <h2 id="summary-heading" clas="text-xl font-bold mb-4">{{ reportData.summaryTitle }}</h2>

            <div class="grid grid-cols-1 md:grid-cols-4 mb-8 gap-4">
                <div class="p-4 bg-(--bg-2) rounded-lg border border-(--border-subtle)">
                    <p class="text-sm text-(--text-2)">{{ reportData.conformanceLabel }}</p>
                    <p class="text-3xl font-bold text-green-500">{{ stats.conformePercent }}</p>
                </div>
                <div class="p-4 bg-(--bg-2) rounded-lg border border-(--border-subtle)">
                    <p class="text-sm text-(--text-2)">{{ reportData.conformableCriteriaLabel }}</p>
                    <p class="text-3xl font-bold">{{ stats.conformes }}/{{ stats.total }}</p>
                </div>
                <div class="p-4 bg-(--bg-2) rounded-lg border border-(--border-subtle)">
                    <p class="text-sm text-(--text-2)">{{ reportData.nonConformitiesLabel }}</p>
                    <p class="text-3xl font-bold text-orange-500">{{ stats.nonConformes }}</p>
                </div>
                <div class="p-4 bg-(--bg-2) rounded-lg border border-(--border-subtle)">
                    <p class="text-sm text-(--text-2)">{{ reportData.nonApplicablesLabel }}</p>
                    <p class="text-3xl font-bold text-gray-500">{{ stats.nonApplicables }}</p>
                </div>
                <div class="p-4 bg-(--bg-2) rounded-lg border border-(--border-subtle)">
                    <p class="text-sm text-(--text-2)">{{ reportData.statusLabel }}</p>
                    <p class="text-3xl font-bold text-blue-500">
                        {{ reportData.conformityTotal.label }} {{ stats.conformePercent == 100
                            ? reportData.conformityTotal.total
                            : reportData.conformityTotal.partial
                        }}</p>
                </div>
            </div>

            <div class="mb-6 p-4 bg-(--bg-2) rounded-lg border-l-4 border-blue-500">
                <h3 class="font-semibold mb-2">{{ reportData.testEnvironmentTitle }}</h3>
                <ul class="text-sm text-(--text-2) space-y-1">
                    <li v-for="test in testEnvironmentMap" :key="test.value">
                        <UIcon :name="`fa7-solid:${test.icon}`" size="xl" /> {{ test.value }}
                    </li>
                </ul>
            </div>
        </section>

        <!-- Scores par page -->
        <section class="mb-12" aria-labelledby="scores-heading">
            <h2 id="scores-heading" class="text-xl font-bold mb-4">{{ reportData.scoresTitle }}</h2>

            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b border-(--border-subtle) bg-(--bg-2)">
                            <th class="text-left px-4 py-3 font-semibold">
                                {{ reportData.pageLabelCol }}
                            </th>
                            <th class="text-left px-4 py-3 font-semibold">
                                {{ reportData.lighthouseCol }}
                            </th>
                            <th class="text-left px-4 py-3 font-semibold">
                                {{ reportData.waveCol }}
                            </th>
                            <th class="text-left px-4 py-3 font-semibold">
                                {{ reportData.accessibilityCol }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="score in reportData.pageScores" :key="score.page"
                            class="border-b border-(--border-subtle) hover:bg-(--bg-2) transition-colors">
                            <td class="px-4 py-3">{{ score.page }}</td>
                            <td class="text-center px-4 py-3 font-medium">{{ score.lighthouse }}/100</td>
                            <td class="text-center px-4 py-3 font-medium">{{ score.wave }}/10</td>
                            <td class="text-center px-4 py-3">
                                <span class="inline-block px-2 py-1 rounded text-xs font-semibold"
                                    :class="getAccessibilityColor(score.accessibility)">
                                    {{ score.accessibility }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Tableau RGAA avec filtres -->
        <section class="mb-12" aria-labelledby="rgaa-heading">
            <h2 id="rgaa-heading" class="text-xl font-bold mb-4">{{ reportData.rgaaTitle }}</h2>

            <!-- Filtres -->
            <div class="grid grid-cols-1 md:grid-cols-3 mb-6 gap-4">
                <div class="flex flex-col items-baseline">
                    <label id="rgaa-label" for="rgaa-search" class="text-sm mb-2">
                        {{ reportData.rgaaTitle.split(' ')[0] }}
                    </label>
                    <UInput v-model="searchQuery" id="rgaa-search"
                        icon="fa7-solid:magnifying-glass" autocomplete="off" :ui="{
                            base: 'min-w-[16rem] md:min-w-[14rem] bg-(--bg-2) text-(--text)'
                        }" />
                </div>

                <div class="flex flex-col items-baseline">
                    <label id="thematic-label" for="thematic-select" class="text-sm mb-2">
                        {{ reportData.thematicFilterLabel }}
                    </label>
                    <USelect v-model="selectedThematic" :items="thematicOptions" id="thematic-select"
                        :aria-label="reportData.thematicFilterLabel" value-key="value" label-key="label" variant="ghost"
                        color="neutral" class="transition-colors" :ui="{
                            base: 'bg-(--bg-2) min-w-[12rem]',
                            content: 'bg-(--bg-2) min-w-[12rem]',
                            value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                            item: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                        }" />
                </div>

                <div class="flex flex-col items-baseline">
                    <label id="status-label" for="status-select" class="text-sm mb-2">
                        {{ reportData.statusFilterLabel }}
                    </label>
                    <USelect v-model="selectedStatus" :items="statusOptions" id="status-select" :aria-label="reportData.statusFilterLabel"
                        value-key="value" label-key="label" variant="ghost" color="neutral" class="transition-colors"
                        :ui="{
                            base: 'bg-(--bg-2) min-w-[12rem]',
                            content: 'bg-(--bg-2) min-w-[12rem]',
                            value: grayscale && colorMode.value == 'dark' ? 'text-inverted' : '',
                            item: grayscale && colorMode.value == 'dark' ? 'text-inverted' : ''
                        }" />
                </div>
            </div>

            <!-- Tableau filtré -->
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b border-(--border-subtle) bg-(--bg-2)">
                            <th class="text-left px-4 py-3 font-semibold">
                                {{ reportData.idCol }}
                            </th>
                            <th class="text-left px-4 py-3 font-semibold">
                                {{ reportData.thematicCol }}
                            </th>
                            <th class="text-left px-4 py-3 font-semibold">
                                {{ reportData.criterionCol }}
                            </th>
                            <th class="text-left px-4 py-3 font-semibold">
                                {{ reportData.statusCol }}
                            </th>
                            <th class="text-left px-4 py-3 font-semibold">
                                {{ reportData.pagesCol }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="criteria in filteredCriteria" :key="criteria.id"
                            class="border-b border-(--border-subtle) hover:bg-(--bg-2) transition-colors">
                            <td class="px-4 py-3 font-mono text-xs font-semibold text-blue-500">{{ criteria.id }}</td>
                            <td class="text-center px-4 py-3 font-medium">
                                <span class="inline-block px-2 py-1 rounded"
                                    :class="`bg-${getThematicColor(criteria.thematic)}-500/20`">
                                    {{ getThematicLabel(criteria.thematic) }}
                                </span>
                            </td>
                            <td class="px-4 py-3">{{ criteria.criterion }}</td>
                            <td class="text-center px-4 py-3">
                                <span class="inline-block px-2 py-1 rounded text-xs font-semibold" :class="{
                                    'bg-green-500/20': criteria.status === 'C',
                                    'bg-red-500/20': criteria.status === 'NC',
                                    'bg-gray-500/20': criteria.status === 'NA',
                                }">
                                    {{ criteria.status }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-xs text-(--text-2)">
                                {{ criteria.pages.join(', ') }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Cas d'usage complexes -->
        <section class="mb-12" aria-labelledby="usecases-heading">
            <h2 id="usecases-heading" class="text-xl font-bold mb-4">
                {{ reportData.useCasesTitle }}
            </h2>
            <div class="space-y-6">
                <div v-for="usecase in reportData.useCases" :key="usecase.title"
                    class="p-4 bg-(--bg-2) rounded-lg border border-(--border-subtle)">
                    <h3 class="font-bold mb-2">{{ usecase.title }}</h3>
                    <p class="text-sm text-(--text-2) mb-3">
                        {{ usecase.description }}
                    </p>
                    <p class="text-xs text-blue-500 font-mono">
                        <strong>{{ reportData.implementationLabel }}</strong>
                        {{ usecase.implementation }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Journal des corrections -->
        <section class="mb-12" aria-labelledby="corrections-heading">
            <h2 id="corrections-heading" class="text-xl font-bold mb-4">
                {{ reportData.correctionsTitle }}
            </h2>
            <div class="space-y-4">
                <div v-for="correction in reportData.corrections" :key="correction.issue"
                    class="p-4 bg-(--bg-2) rounded-lg border-1-4 border-orange-500">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-bold">{{ correction.issue }}</h3>
                        <span class="inline-block px-2 py-1 rounded text-xs font-semibold" :class="correction.status === 'Corrigé' || correction.status === 'Fixed'
                            ? 'bg-green-500/20'
                            : 'bg-blue-500/20'
                            ">
                            {{ correction.status }}
                        </span>
                    </div>
                    <p class="text-sm text-(--text-2)">
                        <strong>{{ reportData.solutionLabel }}</strong>
                        {{ correction.solution }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Environnement de test -->
        <section class="mb-12" aria-labelledby="environment-heading">
            <h2 id="environment-heading" class="text-xl font-bold mb-4">
                {{ reportData.environmentTitle }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="env in reportData.testEnvironment" :key="env.category"
                    class="p-4 bg-(--bg-2) rounded-lg border border-(--border-subtle)">
                    <h3 class="font-bold mb-3">{{ env.category }}</h3>
                    <ul class="text-sm text-(--text-2) space-y-2">
                        <li v-for="detail in env.details" :key="detail" class="flex items-start gap-2">
                            <UIcon name="fa7-solid:check" class="mt-0.5 text-green-500 font-bold" />
                            <span>{{ detail }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Glossaire -->
        <section class="mb-12" aria-labelledby="glossary-heading">
            <h2 id="glossary-heading" class="text-xl font-bold mb-4">
                {{ reportData.glossaryTitle }}
            </h2>
            <div class="space-y-4">
                <div v-for="item in reportData.glossary" :key="item.term"
                    class="p-4 bg-(--bg-2) rounded-1g border border-(--border-subtle)">
                    <h3 class="font-bold text-blue-500 mb-2">
                        {{ item.term }}
                    </h3>
                    <p class="text-sm text-(--text-2)">{{ item.definition }}</p>
                </div>
            </div>
        </section>

        <!-- Conclusion -->
        <section class="mb-12 p-6 bg-(--bg-secondary) rounded-lg border-1-4 border-green-500"
            aria-labelledby="conclusion-heading">
            <h2 id="conclusion-heading" class="text-xl font-bold mb-4">
                {{ reportData.conclusionTitle }}
            </h2>
            <p class="text-sm text-(--text-1) mb-4 leading-relaxed">
                {{ reportData.conclusionP1 }}
            </p>
            <p class="text-sm text-(--text-1) mb-4 leading-relaxed">
                {{ reportData.conclusionP2 }}
            </p>
            <p class="text-sm text-(--text-1) mb-4 leading-relaxed">
                {{ reportData.conclusionP3 }}
            </p>
            <p class="text-sm text-(--text-1) font-semibold">
                {{ reportData.conclusionP4 }}
            </p>
        </section>
    </ArticleLayout>

    <!-- loading state -->
    <ArticleLayout v-else>
        <template #header>
            <h1 class="text-2xl font-bold">{{ t('loading.loading_feed') }}</h1>
        </template>
        <p>{{ t('loading.loading_feed') }}...</p>
    </ArticleLayout>
</template>
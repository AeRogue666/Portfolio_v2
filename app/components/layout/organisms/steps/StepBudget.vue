<script setup lang="ts">
const { t } = useI18n();
const leadScore = useLeadStore(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

const budgetOptions = ['<1k', '1-3k', '3-8k', '8k+'],
    deadlineOptions = ["flexible", "1-3m", "<1m", "urgent"];

const budgetModel = ref(''),
    deadlineModel = ref('');

function toggleBudget(budget: string) {
    if (!leadScore.data.budgetRange) {
        leadScore.data.budgetRange = "";
    }
    const indexBudget = leadScore.data.budgetRange.indexOf(budget);
    if (indexBudget === -1) {
        leadScore.data.budgetRange = budget;
    } else {
        leadScore.data.budgetRange = "";
    }
}
function toggleDeadline(deadline: string) {
    if (!leadScore.data.deadline) {
        leadScore.data.deadline = "";
    }
    const indexDeadline = leadScore.data.deadline.indexOf(deadline);
    if (indexDeadline === -1) {
        leadScore.data.deadline = deadline;
    } else {
        leadScore.data.deadline = "";
    }
}

watch(budgetModel, (newBudget) => {
    toggleBudget(newBudget);
});

watch(deadlineModel, (newDeadline) => {
    toggleDeadline(newDeadline);
});
</script>

<template>
    <div class="space-y-6">
        <div>
            <h3 class="fs-subtitle mb-3">Niveau d'investissement envisagé</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                <URadioGroup v-model="budgetModel" :items="budgetOptions" :ui="{
                    base: grayscale && colorMode.value == 'dark'
                        ? 'text-inverted'
                        : ''
                }" />
                <UButton v-for="b in budgetOptions" :key="b" variant="ghost" @click="toggleBudget(b)" :label="`${b} euros`"
                    class="block w-3xs xl:w-xs mt-3 mx-4 text-(--text) hover:bg-(--focus) disabled:bg-(--bg-3) disabled:text-(--text-muted) fs-body ring-1 ring-(--border-medium)"
                    :ui="{
                        base: grayscale && colorMode.value == 'dark'
                            ? 'text-inverted'
                            : ''
                    }" :active="leadStore.data.budgetRange === b" active-class="bg-(--bg-3) text-(--text)" />
            </div>
        </div>

        <div>
            <h3 class="fs-subtitle mb-3">Contrainte de délai</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                <URadioGroup v-model="deadlineModel" :items="deadlineOptions" :ui="{
                    base: grayscale && colorMode.value == 'dark'
                        ? 'text-inverted'
                        : ''
                }" />
                <UButton v-for="d in deadlineOptions" :key="d" variant="ghost" @click="toggleDeadline(d)" :label="d"
                    class="block w-3xs xl:w-xs mt-3 mx-4 text-(--text) hover:bg-(--focus) disabled:bg-(--bg-3) disabled:text-(--text-muted) fs-body ring-1 ring-(--border-medium)"
                    :ui="{
                        base: grayscale && colorMode.value == 'dark'
                            ? 'text-inverted'
                            : ''
                    }" :active="leadStore.data.deadline === d" active-class="bg-(--bg-3) text-(--text)" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { t } = useI18n();
const leadScore = useLeadStore(),
    accessibilityStore = useAccessibilityStore(),
    colorMode = useColorMode();

const grayscale = computed({
    get: () => accessibilityStore.grayscale,
    set: () => accessibilityStore.toggleGrayscale(),
});

const budgets = ['<1k', '1-3k', '3-8k', '8k+'],
    deadlines = ["flexible", "1-3m", "<1m", "urgent"];

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
    if(!leadScore.data.deadline) {
        leadScore.data.deadline = "";
    }
    const indexDeadline = leadScore.data.deadline.indexOf(deadline);
    if (indexDeadline === -1) {
        leadScore.data.deadline = deadline;
    } else {
        leadScore.data.deadline = "";
    }
}
</script>

<template>
    <div class="space-y-6">
        <div>
            <h3 class="fs-subtitle mb-3">Niveau d'investissement envisagé</h3>
            <div class="grid grid-cols-2 gap-3">
                <UButton v-for="b in budgets" :key="b" variant="soft"
                    :color="leadScore.data.budgetRange === b ? 'primary' : 'neutral'"
                    @click="toggleBudget(b)" :label="b"
                    class="block w-3xs xl:w-xs mt-3 mx-4 disabled:bg-(--bg-3) disabled:text-(--text-muted) fs-body ring-(--border-medium)"
                    :ui="{
                        base: grayscale && colorMode.value == 'dark'
                            ? 'text-inverted'
                            : ''
                    }" :active-class="'bg-primary/10 text-primary'" :active-color="'primary'" />
            </div>
        </div>

        <div>
            <h3 class="fs-subtitle mb-3">Contrainte de délai</h3>
            <div class="grid grid-cols-2 gap-3">
                <UButton v-for="d in deadlines" :key="d" variant="soft"
                    :color="leadScore.data.deadline === d ? 'primary' : 'neutral'" @click="toggleDeadline(d)"
                    :label="d"
                    class="block w-3xs xl:w-xs mt-3 mx-4 disabled:bg-(--bg-3) disabled:text-(--text-muted) fs-body ring-(--border-medium)"
                    :ui="{
                        base: grayscale && colorMode.value == 'dark'
                            ? 'text-inverted'
                            : ''
                    }" :active-class="'bg-primary/10 text-primary'" :active-color="'primary'" />
            </div>
        </div>
    </div>
</template>
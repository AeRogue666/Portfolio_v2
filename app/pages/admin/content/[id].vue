<script setup lang="ts">
import { useContentPreview } from '@/composables/useContentPreview';
import BlockEditor from '@/components/admin/components/cms/editors/BlockEditor.vue'

const { locale } = useI18n(),
    route = useRoute(),
    router = useRouter();

const id = route.params.id as string,
    isNew = id === 'new';
const activeLocale = ref<'fr' | 'en'>('fr');

const form = reactive<any>({
    slug: '',
    kind: 'note',

    pinned: false,
    highlighted: false,

    tags: [],
    stack: [],

    github: '',
    demo: '',
    website: '',

    previewUrl: '',
    image: null,

    translations: {
        fr: {
            title: '',
            description: '',
            blocks: []
        },
        en: {
            title: '',
            description: '',
            blocks: []
        }
    }
});

const kindOptions = [
    'all',
    'project',
    'experiment',
    'about',
    'client',
    'service',
    'note',
    'read',
    'talk',
    'job',
    'page_index',
    'page_legal',
    'page_terms',
    'page_accessibility',
    'page_accessibility_report'
] as const;

const { data: item } = await useFetch(`/api/admin/content/${id}`, {
    query: {
        locale: locale.value
    },
    watch: [locale]
});

function normalizeTranslation(translations: any[]) {
    return {
        fr: translations.find(t => t.locale === 'fr') || {},
        en: translations.find(t => t.locale === 'en') || {}
    }
}

watchEffect(() => {
    if (!item.value) return
    Object.assign(form, {
        ...item.value,
        translations: normalizeTranslation(item.value.translations || {})
    });
})

const saveState = ref<'saved' | 'saving' | 'unsaved'>('saved');

const save = async () => {
    saveState.value = 'saving';

    await $fetch(`/api/admin/content/${id}`, {
        method: 'PUT',
        body: form
    });

    saveState.value = 'saved';
};

const autosave = useDebounceFn(save, 800);
const preview = useContentPreview();

const publishPreview = useDebounceFn(() => {
    preview.publish(form.value);
}, 300);

watch(form, () => {
    if (isNew) return

    saveState.value = 'unsaved'
    autosave();
}, { deep: true });

watch(form, () => {
    publishPreview();
});

async function deleteItem() {
    if (!confirm('Delete this content?')) return

    await $fetch(`/api/admin/content/${id}`, {
        method: 'DELETE'
    });

    router.push('/admin/content');
}

function openPreview() {
    window.open(`/admin/preview/${id}`, "_blank");
}
</script>

<template>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-8 space-y-4">
            <div class="flex justify-between items-center">
                <div class="flex gap-2">
                    <UButton :to="`/admin/content`" icon="fa7-solid:arrow-left" variant="ghost" color="neutral"
                        class="mb-2">
                        Retour à la liste
                    </UButton>
                    <UButton :variant="activeLocale === 'fr' ? 'solid' : 'ghost'" @click="activeLocale = 'fr'">
                        FR
                    </UButton>
                    <UButton :variant="activeLocale === 'en' ? 'solid' : 'ghost'" @click="activeLocale = 'en'">
                        EN
                    </UButton>
                </div>

                <div class="flex gap-2">
                    <UButton label="Save" @click="save" color="primary" icon="fa7-solid:save" />
                    <UButton label="Delete" @clic="deleteItem" color="error" icon="fa7-solid:trash" />
                    <UButton label="Preview" @click="openPreview" color="info" icon="fa7-solid:eye" />
                </div>
            </div>

            <BlockEditor v-model="form.translations[activeLocale].blocks" />

            <form class="flex flex-col justify-center items-baseline w-full gap-6">
                <UFormField label="Title" class="w-full" required>
                    <UInput v-model="form.translations[activeLocale].title" placeholder="Title" size="xl" class="w-full" />
                </UFormField>

                <UFormField label="Description" class="w-full" required>
                    <UTextarea v-model="form.translations[activeLocale].description" placeholder="Description" :rows="12" class="w-full" />
                </UFormField>

                <UFormField label="Feed title" class="w-full">
                    <UInput v-model="form.translations[activeLocale].feedTitle" placeholder="Feed Title" size="xl" class="w-full" />
                </UFormField>

                <UFormField label="Feed summary" class="w-full">
                    <UTextarea v-model="form.translations[activeLocale].feedSummary" placeholder="Feed Summary" :rows="12" class="w-full" />
                </UFormField>

                <UFormField label="Role" class="w-full">
                    <UInput v-model="form.translations[activeLocale].role" placeholder="Role" size="xl" class="w-full" />
                </UFormField>

                <UFormField label="Problem" class="w-full">
                    <UInput v-model="form.translations[activeLocale].problem" placeholder="Problème" size="xl" class="w-full" />
                </UFormField>

                <UFormField label="Solution" class="w-full">
                    <UInput v-model="form.translations[activeLocale].solution" placeholder="Solution" size="xl" class="w-full" />
                </UFormField>

                <UFormField label="Technical choices" class="w-full">
                    <UTextarea v-model="form.translations[activeLocale].technichalChoices" placeholder="Technical choices" :rows="12" class="w-full" />
                </UFormField>

                <UFormField label="Accessibility" class="w-full">
                    <UTextarea v-model="form.translations[activeLocale].accessibility" placeholder="Accessibility" :rows="12" class="w-full" />
                </UFormField>

                <UFormField label="Customer name" class="w-full">
                    <UInput v-model="form.translations[activeLocale].customerName" placeholder="Customer name" size="xl" class="w-full" />
                </UFormField>
                
                <UFormField label="Customer job" class="w-full">
                    <UInput v-model="form.translations[activeLocale].customerJob" placeholder="Customer job" size="xl" class="w-full" />
                </UFormField>

                <UFormField label="Customer city" class="w-full">
                    <UInput v-model="form.translations[activeLocale].customerCity" placeholder="Customer city" size="xl" class="w-full" />
                </UFormField>

                <UFormField label="Customer enterprise name" class="w-full">
                    <UInput v-model="form.translations[activeLocale].customerEnterpriseName" placeholder="Customer enterprise name" size="xl" class="w-full" />
                </UFormField>

                <UFormField label="Testimony" class="w-full">
                    <UTextarea v-model="form.translations[activeLocale].testimony" placeholder="Testimony" :rows="12" class="w-full" />
                </UFormField>
            </form>
        </div>

        <div class="col-span-4">
            <UCard class="bg-(--bg-2) border-none">
                <div class="space-y-3">
                    <UInput v-model="form.slug" label="Slug" />

                    <USelect v-model="form.kind" :options="kindOptions" label="Kind" />

                    <UCheckbox v-model="form.pinned" label="Pinned" />
                    <UCheckbox v-model="form.highlighted" label="Highlighted" />
                </div>
            </UCard>

            <UCard class="bg-(--bg-2) border-none gap-6">
                <span class="fs-small">
                    Autosave enabled (800ms)
                </span>
                <br>
                <span class="fs-small text-(--text-2) py-2 px-4"
                    :class="saveState === 'saved' ? 'bg-(--success)' : saveState === 'saving' ? 'bg-(--info)' : saveState === 'unsaved' ? 'bg-(--warning)' : saveState === 'error' ? 'bg-(--error)' : 'bg-(--info)'">
                    State: {{ saveState }}
                </span>
            </UCard>
        </div>
    </div>
</template>
import type { FeedItem, FeedResponse } from "@/types/feed";
import type { FeedSortValue } from "../types/feedFilters";

interface UseFeedOptions {
  limit?: number;
}

export function useFeed(options?: UseFeedOptions) {
  const route = useRoute();
  const router = useRouter();
  const { locale } = useI18n();

  const limit = options?.limit ?? 5,
    offset = ref<number>(0);

  // Etat du filtrage depuis l'URL
  const selectedTags = computed<string[]>(() => {
    const tags = route.query.tags;
    if (!tags) return [];

    if (typeof tags === "string") {
      return tags.split(",").filter((tag) => tag.trim() !== "");
    }

    if (Array.isArray(tags)) {
      return tags
        .filter((tag): tag is string => typeof tag === "string")
        .filter((tag) => tag.trim() !== "");
    }

    return [];
  });

  const sortBy = computed<FeedSortValue>(() => {
    const sort = route.query.sort;
    const sortStr = typeof sort === "string" ? sort : undefined;
    if (
      sortStr &&
      ["recent", "oldest", "alpha", "alpha-desc"].includes(sortStr)
    ) {
      return sortStr as FeedSortValue;
    }
    return "recent";
  });

  const feedKey = computed(
    () => `feed-${locale.value}-${offset.value}:${limit}`,
  );

  const { data, status, error, refresh } = useAsyncData(
    feedKey,
    () =>
      $fetch<FeedResponse>("/api/posts", {
        query: {
          limit,
          offset: offset.value,
          locale: locale.value,
        },
      }),
    {
      watch: [locale, offset],
    },
  );

  // Items bruts du serveur
  const serverItems = computed(() => data.value?.items ?? []);
  const serverTotal = computed(() => data.value?.total ?? 0);

  // Obtenir tous les tags disponbiles (depuis tous les items du serveur)
  const availableTags = computed<string[]>(() => {
    const tags = new Set<string>();

    serverItems.value.forEach((item) => {
      item.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  });

  // Filtrer les items actuels par tags (logique OR)
  const filteredByTags = computed<FeedItem[]>(() => {
    if (selectedTags.value.length === 0) {
      return serverItems.value;
    }

    return serverItems.value.filter((item) =>
      item.tags?.some((tag) => selectedTags.value.includes(tag)),
    );
  });

  // Appliquer le tri
  const sortedAndFiltered = computed<FeedItem[]>(() => {
    const items = [...filteredByTags.value];

    const compareFn = (a: FeedItem, b: FeedItem) => {
      switch (sortBy.value) {
        case "recent":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "alpha":
          return a.title.localeCompare(b.title, locale.value);
        case "alpha-desc":
          return b.title.localeCompare(a.title, locale.value);
        default:
          return 0;
      }
    };

    return items.sort(compareFn);
  });

  // Items finaux à afficher (triés + filtrés)
  const items = computed(() => sortedAndFiltered.value);

  // Charger plus de posts (pagination serveur)
  function loadMore() {
    offset.value += limit;
  }

  // Mettre à jour les tags sélectionnés (persiste en URL)
  const setSelectedTags = (tags: string[]) => {
    router.push({
      query: {
        ...route.query,
        tags: tags.length > 0 ? tags.join(",") : undefined,
      },
    });
  };

  // Ajouter/retirer un tag
  const toggleTag = (tag: string) => {
    const newTags = selectedTags.value.includes(tag)
      ? selectedTags.value.filter((t) => t !== tag)
      : [...selectedTags.value, tag];
    setSelectedTags(newTags);
  };

  const setSortBy = (sort: FeedSortValue) => {
    router.push({
      query: {
        ...route.query,
        sort: sort !== "recent" ? sort : undefined,
      },
    });
  };

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    router.push({
      query: {},
    });
  };

  return {
    // Données brutes serveur
    serverItems: computed(() => serverItems.value),
    serverTotal: computed(() => serverTotal.value),

    // Données filtrées + triées (à afficher)
    items: computed(() => items.value),
    availableTags: computed(() => availableTags.value),
    total: computed(() => serverTotal.value),

    // Etat de filtrage/tri depuis URL
    selectedTags: computed(() => selectedTags.value),
    sortBy: computed(() => sortBy.value),

    // Etat du chargement
    status,
    error,

    // Actions
    toggleTag,
    setSelectedTags,
    setSortBy,
    resetFilters,
    loadMore,
    refresh,
  };
}

import type { FeedItem, FeedKind, FeedResponse } from "@/types/feed";
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

  // Kinds sélectionnés depuis l'URL (?kinds=project,update)
  const VALID_KINDS: FeedKind[] = ["project", "update", "about", "pinned"];
  const selectedKinds = computed<FeedKind[]>(() => {
    const kinds = route.query.kinds;
    const raw =
      typeof kinds === "string"
        ? kinds.split(",")
        : Array.isArray(kinds)
          ? kinds.filter((k): k is string => typeof k === "string")
          : [];
    return raw
      .map((k) => k.trim())
      .filter((k): k is FeedKind => VALID_KINDS.includes(k as FeedKind));
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

  // Les posts épinglés sont extraits en amont, avant tout filtrage ou tri.
  // Ils doivent toujours apparaître en première position (position 0)
  // quels que soient les filtres de tags actifs ou l'option de tri sélectionnée.
  const pinnedItems = computed<FeedItem[]>(() =>
    serverItems.value.filter((item) => item.pinned),
  );

  // Filtrer les items NON épinglés par tags (logique OR).
  // Les épinglés sont délibérément exclus ici : ils ne participent pas au filtrage.
  const filteredByTags = computed<FeedItem[]>(() => {
    const nonPinned = serverItems.value.filter((item) => !item.pinned);

    if (selectedTags.value.length === 0) {
      return nonPinned;
    }

    return nonPinned.filter((item) =>
      item.tags?.some((tag) => selectedTags.value.includes(tag)),
    );
  });

  // Filter par kind (logique OR) - s'applique après le filtre par tags.
  // Les épinglés sont là aussi exclus: ils ont leur propre pipeline.
  const filteredByKinds = computed<FeedItem[]>(() => {
    if (selectedKinds.value.length === 0) {
      return filteredByTags.value;
    }
    return filteredByTags.value.filter((item) =>
      selectedKinds.value.includes(item.kindFallback ?? item.kind),
    );
  });

  // Appliquer le tri aux posts normaux, puis réinjecter les épinglés en tête.
  const sortedAndFiltered = computed<FeedItem[]>(() => {
    const regularItems = filteredByKinds.value;

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

    // Les épinglés sont réinjectés ici, toujours en tête, dans leur ordre d'origine, suivis des posts normaux triés selon le critère actif.
    return [...pinnedItems.value, ...regularItems.sort(compareFn)];
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

  // Mettre à jour les kinds sélectionnés (persiste en URL)
  const setSelectedKinds = (kinds: FeedKind[]) => {
    router.push({
      query: {
        ...route.query,
        kinds: kinds.length > 0 ? kinds.join(',') : undefined,
      }
    })
  };

  // Ajouter/retirer un kind
  const toggleKind = (kind: FeedKind) => {
    const newKinds = selectedKinds.value.includes(kind)
    ? selectedKinds.value.filter((k) => k !== kind)
    : [...selectedKinds.value, kind];
    setSelectedKinds(newKinds);
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
    selectedKinds: computed(() => selectedKinds.value),
    sortBy: computed(() => sortBy.value),

    // Etat du chargement
    status,
    error,

    // Actions
    toggleTag,
    setSelectedTags,
    toggleKind,
    setSelectedKinds,
    setSortBy,
    resetFilters,
    loadMore,
    refresh,
  };
}

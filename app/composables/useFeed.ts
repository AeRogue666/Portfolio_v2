import type { FeedKind, FeedResponse } from "@/types/feed";
import type { FeedSortValue } from "../types/feedFilters";

interface UseFeedOptions {
  limit?: number;
}

export function useFeed(options?: UseFeedOptions) {
  const route = useRoute();
  const router = useRouter();
  const { locale } = useI18n();

  const limit = options?.limit ?? 10,
    offset = ref<number>(0);

  /* ======
      Récupérer les filtres depuis l'URL
    ====== */
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
    () =>
      `feed-${locale.value}-${offset.value}:${limit}-${selectedTags.value.join(",")}-${selectedKinds.value.join(",")}-${sortBy.value}`,
  );

  /* ======
    Requête au serveur (et filtrage)
    ====== */
  const { data, status, error, refresh } = useAsyncData(
    feedKey,
    () =>
      $fetch<FeedResponse>("/api/posts", {
        query: {
          limit,
          offset: offset.value,
          locale: locale.value,
          tags: selectedTags.value.join(","),
          kinds: selectedKinds.value.join(","),
          sort: sortBy.value,
        },
      }),
    {
      watch: [locale, offset, selectedTags, selectedKinds, sortBy],
    },
  );

  /* ======
    Données du serveur
    ====== */
  const items = computed(() => data.value?.items ?? []);
  const total = computed(() => data.value?.total ?? 0);
  const availableTags = computed(() => data.value?.availableTags ?? []);
  const hasMore = computed(() => data.value?.hasMore ?? []);

  /* ======
    Actions pour modifier les filtres (persiste en URL)
    Les posts épinglés sont extraits en amont (avant filtrage et tri) et apparaissent toujours en position 0.
    ====== */
  const toggleTag = (tag: string) => {
    const newTags = selectedTags.value.includes(tag)
      ? selectedTags.value.filter((t) => t !== tag)
      : [...selectedTags.value, tag];

    offset.value = 0;
    router.push({
      query: {
        ...route.query,
        tags: newTags.length > 0 ? newTags.join(",") : undefined,
      },
    });
  };

  const toggleKind = (kind: FeedKind) => {
    const newKinds = selectedKinds.value.includes(kind)
      ? selectedKinds.value.filter((k) => k !== kind)
      : [...selectedKinds.value, kind];

    offset.value = 0;
    router.push({
      query: {
        ...route.query,
        tags: newKinds.length > 0 ? newKinds.join(",") : undefined,
      },
    });
  };

  const setSortBy = (sort: FeedSortValue) => {
    offset.value = 0;
    router.push({
      query: {
        ...route.query,
        sort: sort !== "recent" ? sort : undefined,
      },
    });
  };

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    offset.value = 0;
    router.push({
      query: {},
    });
  };

  const loadMore = () => {
    offset.value += limit;
  };

  return {
    items: computed(() => items.value),
    total: computed(() => total.value),
    availableTags: computed(() => availableTags.value),
    hasMore: computed(() => data.value?.hasMore ?? false),
    status,
    error,

    selectedTags: computed(() => selectedTags.value),
    selectedKinds: computed(() => selectedKinds.value),
    sortBy: computed(() => sortBy.value),

    toggleTag,
    toggleKind,
    setSortBy,
    resetFilters,
    loadMore,
    refresh,
  };
}

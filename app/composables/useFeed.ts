import type { FeedKind } from "@/types/feed";
import type { FeedSortValue } from "../types/feedFilters";
import { toFeedItem } from "../../server/lib/toFeedItem";

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

  // Kinds sélectionnés depuis l'URL (?kinds=project,experiment)
  const VALID_KINDS: FeedKind[] = [
    "project",
    "experiment",
    "about",
    "pinned",
    "client",
    "note",
    "read",
    "talk",
    "job",
  ];
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

  /**
   * Récupération des contenus
   */

  const feedKey = computed(
    () =>
      `feed-${locale.value}-${offset.value}:${limit}-${selectedTags.value.join(",")}-${selectedKinds.value.join(",")}-${sortBy.value}`,
  );

  const { data, status, error, refresh } = useAsyncData(
    feedKey,
    async () => {
      const [projects, experiments, about, clients] = await Promise.all([
        queryCollection("projects").where("locale", "=", locale.value).all(),
        queryCollection("experiments").where("locale", "=", locale.value).all(),
        queryCollection("about").where("locale", "=", locale.value).all(),
        queryCollection("clients").where("locale", "=", locale.value).all(),
      ]);

      let feed = [
        ...projects.map((p: any) =>
          toFeedItem({ ...p, kind: "project" as const }),
        ),
        ...experiments.map((u: any) =>
          toFeedItem({ ...u, kind: "experiment" as const }),
        ),
        ...about.map((a: any) => toFeedItem({ ...a, kind: "about" as const })),
        ...clients.map((c: any) =>
          toFeedItem({ ...c, kind: "client" as const }),
        ),
      ];

      console.log({
        projects: projects.length,
        experiments: experiments.length,
        about: about.length,
        clients: clients.length,
      });

      return feed;
    },
    {
      watch: [locale],
    },
  );

  /**
   * Filtrage des contenus
   */
  const filteredItems = computed(() => {
    let items = [...(data.value ?? [])];

    if (selectedKinds.value.length) {
      items = items.filter((item) => selectedKinds.value.includes(item.kind));
    }

    if (selectedTags.value.length) {
      items = items.filter((item) =>
        selectedTags.value.every((tag) => item.tags?.includes(tag)),
      );
    }

    items.sort((a, b) => {
      if (a.kind === "pinned" && b.kind !== "pinned") return -1;
      if (a.kind !== "pinned" && b.kind === "pinned") return 1;

      // Tri
      switch (sortBy.value) {
        case "oldest":
          items.sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          );
          break;
        case "alpha":
          items.sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
          break;
        case "alpha-desc":
          items.sort((a, b) => (b.title ?? "").localeCompare(a.title ?? ""));
          break;
        default:
          items.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          );
          break;
      }
    });

    return items;
  });

  /**
   * Pagination
   */
  const paginatedItems = computed(() =>
    filteredItems.value.slice(offset.value, offset.value + limit),
  );

  const total = computed(() => filteredItems.value.length);

  const hasMore = computed(
    () => paginatedItems.value.length < filteredItems.value.length,
  );

  const availableTags = computed(() => {
    const tags = new Set<string>();

    data.value?.forEach((item) => {
      item.tags?.forEach((tag) => tags.add(tag));
    });

    return [...tags].sort();
  });

  /* ======
    Actions pour modifier les filtres (persiste en URL)
    Les posts épinglés sont extraits en amont (avant filtrage et tri) et apparaissent toujours en position 0.
    ====== */
  const toggleTag = (tag: string) => {
    const newTags = selectedTags.value.includes(tag)
      ? selectedTags.value.filter((t: string) => t !== tag)
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
      ? selectedKinds.value.filter((k: FeedKind) => k !== kind)
      : [...selectedKinds.value, kind];

    offset.value = 0;
    router.push({
      query: {
        ...route.query,
        kinds: newKinds.length > 0 ? newKinds.join(",") : undefined,
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
    items: paginatedItems,
    total,
    availableTags,
    hasMore,
    status,
    error,

    selectedKinds,
    selectedTags,
    sortBy,

    toggleTag,
    toggleKind,
    setSortBy,
    resetFilters,
    loadMore,
    refresh,
  };
}

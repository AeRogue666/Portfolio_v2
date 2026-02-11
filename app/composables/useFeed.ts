import type { FeedResponse } from "~/types/feed";

export function useFeed(options?: { limit?: number }) {
  const { locale } = useI18n();

  const limit = options?.limit ?? 5,
    offset = ref<number>(0);

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

  function loadMore() {
    offset.value += limit;
  }

  return {
    items: computed(() => data.value?.items ?? []),
    total: computed(() => data.value?.total ?? 0),
    status,
    error,
    loadMore,
    refresh,
  };
}

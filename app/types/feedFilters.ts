// Feed filters types

export type FeedSortValue = "recent" | "oldest" | "alpha" | "alpha-desc";

export interface FeedSortOption {
  value: FeedSortValue;
  label: string;
}

export interface FeedFilterState {
  selectedtags: string[];
  selectedKinds: string[];
  sortBy: FeedSortValue;
}

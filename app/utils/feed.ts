import type { FeedItem } from "~/types/feed";

// Return Vue component appropriate to use as a FeedItem
// Not neccessary anymore, PostItem do that itself

/* export function getFeedComponent(item: FeedItem) {
  if (item.pinned) return PostItem;

  const map: Record<Exclude<FeedItem["kind"], "pinned">, Component> = {
    project: PostItem,
    update: PostItem,
    about: PostItem,
  };

  return map[item.kind] ?? PostBase;
} */

// Return the right URL for a FeedItem
export function getPostUrl(post: FeedItem) {
  if (post.kind === "about") return "/about";

  // If pinned, try to get the real kind
  const trueKind =
    post.kind === "pinned"
      ? (post.kindFallback ?? post.kind) // post.id.split('-')[0]
      : post.kind;

  if (!post.slug || !trueKind) return "/about";

  return `/${trueKind}s/${post.slug}`;
}

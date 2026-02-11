import type { FeedItem } from "~/types/feed";

interface FeedState {
  posts: FeedItem[];
  loading: boolean;
  error: string | null;
}

export const useFeedStore = defineStore("feed", {
  state: (): FeedState => ({
    posts: [],
    loading: false,
    error: null,
  }),

  getters: {
    pinnedPosts: (state) => {
      return state.posts.filter((post) => post.pinned);
    },
    regularPosts: (state) => {
      return state.posts.filter((post) => !post.pinned);
    },
    getPostBySlug: (state) => {
      return (slug: string) => state.posts.find((post) => post.slug === slug);
    },
    sortedPosts(state) {
      return [...state.posts].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime();
      })
    }
  },

  actions: {
    setPosts(posts: FeedItem[]) {
      const map = new Map(this.posts.map(p => [p.id, p]));
      posts.forEach(p => map.set(p.id, p));
      this.posts = Array.from(map.values());
    },
    setError(message: string) {
      this.error = message;
    },
    reset() {
      this.posts = [];
    }
  },
});

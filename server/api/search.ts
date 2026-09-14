import { toFeedItem } from "../lib/toFeedItem";

export default defineEventHandler(async (event) => {
  const { locale } = getQuery(event) as { locale: string };
  const activeLocale = locale || "fr";

  const [projects, experiments, about, clients] = await Promise.all([
    queryCollection(event, "projects").where("locale", "=", activeLocale).all(),
    queryCollection(event, "experiments")
      .where("locale", "=", activeLocale)
      .all(),
    queryCollection(event, "about").where("locale", "=", activeLocale).all(),
    queryCollection(event, "clients").where("locale", "=", activeLocale).all(),
  ]);

  const feed = [
    ...projects.map((p: any) => toFeedItem({ ...p, kind: "project" as const })),
    ...experiments.map((u: any) =>
      toFeedItem({ ...u, kind: "experiment" as const }),
    ),
    ...about.map((a: any) => toFeedItem({ ...a, kind: "about" as const })),
    ...clients.map((c: any) => toFeedItem({ ...c, kind: "client" as const })),
  ];

  return (
    feed.map((post) => ({
      id: post.id,
      label: post.feed_title ?? post.title,
      suffix: post.slug,
      to: post.slug
        ? post.kind === "project" || post.kindFallback === "project"
          ? `/projects/${post.slug}`
          : post.kind === "experiment" || post.kindFallback === "experiment"
            ? `/updates/${post.slug}`
            : `/${post.slug}`
        : undefined,
    })) ?? []
  );
});

import { Locale } from "~/types/i18n";
import { toFeedItem } from "./toFeedItem";

export async function buildFeed(event: any, locale: Locale) {
  const [projects, experiments, about, clients] = await Promise.all([
    queryCollection(event, "projects").where("locale", "=", locale).all(),
    queryCollection(event, "experiments").where("locale", "=", locale).all(),
    queryCollection(event, "about").where("locale", "=", locale).all(),
    queryCollection(event, "clients").where("locale", "=", locale).all(),
  ]);

  let feed = [
    ...projects.map((p: any) => toFeedItem({ ...p, kind: "project" as const })),
    ...experiments.map((u: any) =>
      toFeedItem({ ...u, kind: "experiment" as const }),
    ),
    ...about.map((a: any) => toFeedItem({ ...a, kind: "about" as const })),
    ...clients.map((c: any) => toFeedItem({ ...c, kind: "client" as const })),
  ];

  return feed;
}

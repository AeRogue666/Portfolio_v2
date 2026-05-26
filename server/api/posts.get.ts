import type { Locale } from "@/types/i18n";
import { toFeedItem } from "#server/lib/toFeedItem";

export default defineEventHandler(
    async (event) => {
        try {
            const query = getQuery(event);

            const locale: Locale = query.locale === "fr" ? "fr": "en";
            console.log("API START", locale);

            const projects = await queryCollection(event, "projects").where("locale", "=", locale).all();
            const experiments = await queryCollection(event, "experiments").where("locale", "=", locale).all();
            const about = await queryCollection(event, 'about').where("locale", "=", locale).all();
            const clients = await queryCollection(event, 'clients').where("locale", "=", locale).all();

            console.log("PROJECTS OK", projects.length);
            console.log("EXPERIMENTS OK", experiments.length);
            console.log("ABOUT OK", about.length);
            console.log("CLIENTS OK", clients.length);

            return {
                ok: true,
                projectsCount: projects.length,
                experimentsCount: experiments.length,
                aboutCount: about.length,
                clientsCounts: clients.length,
                sample: projects[0] ?? null,
            };
        } catch (e: any) {
            console.log("POST API ERROR", e);

            return {
                ok: false,
                error: true,
                message: e?.message ?? String(e),
                stack: e?.stack ?? null,
            };
        }
    }
)
import { prisma } from "~~/server/db/prisma";
import fs from "node:fs/promises";
import path from "node:path";

export default defineEventHandler(async (event) => {
  const kind = getRouterParam(event, "kind");
  const id = getRouterParam(event, "id");

  if (kind === "accessibility") {
    const filePath = path.resolve(
      process.cwd(),
      "server/data/accesibility.json",
    );
    const report = JSON.parse(await fs.readFile(filePath, "utf-8"));
    const criterion = report.criteria.find((c: any) => c.id === id);

    if (!criterion) {
      throw createError({
        statusCode: 404,
        statusMessage: "Critère introuvable",
      });
    }
    return criterion;
  }

  const modelMap: Record<string, string> = {
    feed: "feed",
    projects: "project",
    experiences: "experience",
    clients: "client",
    services: "service",
    about: "about",
  };
  const modelName = modelMap[kind ?? ""];

  if(!modelName || !(modelName in prisma)) {
        throw createError({
            statusCode: 400,
            statusMessage: `Type de contenu [${kind}] invalide`
        });
    }

  try {
    const parseId = isNaN(Number(id)) ? id : Number(id);

    const item = await (prisma as any)[modelName].findUnique({
      where: {
        id: parseId,
      },
    });

    if (!item)
      throw createError({
        statusCode: 404,
        statusMessage: "Elément introuvable",
      });
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erreur Prisma: ${e}`,
    });
  }
});

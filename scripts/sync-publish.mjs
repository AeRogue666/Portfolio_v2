import fs from "node:fs/promises";
import path from "node:path";

const DEVTO_API_KEY = proces.env.DEVTO_API_KEY;
// const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
// const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN; // ex: "urn:li:person:ABCDEFGHIJ"
const SITE_URL = "https://codekorico.com";

const ALLOWED_KINDS = ["article"];
const KIND_FOLDERS = {
  article: "articles",
  project: "projects",
  experiment: "experiments",
};
const ALLOWED_LOCALES = ["en"];

if (!DEVTO_API_KEY) {
  console.error("DEVTO_API_KEY manquante");
  process.exit(1);
}

/*
 * Parseur YAML léger pour convertir le frontmatter des fichiers markdown
 */

function parseFrontmatter(rawFile) {
  const match = rawFile.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: rawFile };

  const [, yamlBlock, content] = match;
  const data = {};
  let currentListKey = null;

  for (const line of yamlBlock.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.startsWith("- ") && currentListKey) {
      data[currentListKey].push(
        trimmed
          .slice(2)
          .trim()
          .replace(/^["']|["']$/g, ""),
      );
      continue;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1 && !line.startsWith(" ")) {
      const key = line.slice(0, colonIndex).trim();
      const rawVal = line.slice(colonIndex + 1).trim();

      if (rawVal === "") {
        data[key] = [];
        currentListKey = key;
      } else {
        currentListKey = null;
        if (rawVal === "true") data[key] = true;
        else if (rawVal === "false") data[key] = false;
        else data[key] = rawVal.replace(/^["']|["']$/g, "");
      }
    }
  }

  return { data, content };
}

/*
 * Nettoie les blocs MDC (::composant ... ::) en JS pur
 */

function cleanMdcForDevto(markdown) {
  let cleaned = markdown.replace(
    /::responsive-image\s*\r?\n---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n::/g,
    (_, yamlContent) => {
      const titleMatch = yamlContent.match(/title:\s*["']?(.*?)["']?\s*$/m);
      const desktopMatch = yamlContent.match(/desktop:\s*["']?(.*?)["']?\s*$/m);
      const mobileMatch = yamlContent.match(/mobile:\s*["']?(.*?)["']?\s*$/m);

      const alt = titleMatch ? titleMatch.replace(/\\"/g, '"') : "";
      const imgPath = (desktopMatch || mobileMatch || "").trim();

      return imgPath ? `![${alt}](${SITE_URL}${imgPath})` : "";
    },
  );

  cleaned = cleaned.replace(/^::[a-zA-Z0-9_-]+[\s\S]*?^::\s*$/gm, "");
  return cleaned.replace(/\n{3,}/g, "\n\n").trim();
}

function formatDevtoTags(tags = []) {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((t) =>
      t
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ""),
    )
    .filter(Boolean)
    .slice(0, 4);
}

/*
 * Publication LinkedIn avec aperçu de lien via l'API officielle Posts
 */

/* async function publishToLinkedIn(frontmatter, canonicalUrl) {
  if (!LINKEDIN_ACCESS_TOKEN || !LINKEDIN_PERSON_URN) {
    console.log(`Identifiants LinkedIn non configurés, publication ignorée.`);
    return;
  }

  const hashtags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags
        .map((t) => `#${t.replace(/[^a-zA-Z0-9À-ÿ]/g, "")}`)
        .slice(0, 4)
        .join(" ")
    : "";

  const commentary =
    `${frontmatter.title}\n\n${frontmatter.description || ""}\n\n${hashtags}`.trim();

  const res = await fetch("https://linkedin.com", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-version": "2.0.0",
      "LinkedIn-Version": "202601",
    },
    body: JSON.stringify({
      author: LINKEDIN_PERSON_URN,
      commentary,
      visibility: "PUBLIC",
      distribution: {
        feedDistribution: "MAIN_FEED",
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      content: {
        article: {
          source: canonicalUrl,
          title: frontmatter.title,
          description: frontmatter.description || "",
        },
      },

      lifecycleState: "PUBLISHED",
      isReshareDisabledByAuthor: false,
    }),
  });

  if (!res.ok) {
    console.error(
      `Erreur LinkedIn pour "${frontmatter.title}":`,
      await res.text(),
    );
  } else {
    console.log(`Publié sur LinkedIn: "${frontmatter.title}"`);
  }
} */

async function getMarkdownFiles(dir) {
  let results = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(await getMarkdownFiles(fullPath));
      } else if (entry.name.endsWith(".md")) {
        results.push(fullPath);
      }
    }
  } catch {}
  return results;
}

async function sync() {
  const existingRes = await fetch("https://dev.to", {
    headers: {
      "api-key": DEVTO_API_KEY,
    },
  });
  const existingArticles = existingRes.ok ? await existingRes.json() : [];

  for (const kind of ALLOWED_KINDS) {
    const folder = KIND_FOLDERS[kind];
    if (!folder) continue;

    const files = await getMarkdownFiles(path.join("content", folder));

    for (const filePath of files) {
      const rawFile = await fs.readFile(filePath, "utf-8");
      const { data: frontmatter, content } = parseFrontmatter(rawFile);

      if (frontmatter.draft === true) {
        console.log(`Brouillon ignoré: "${frontmatter.title || filePath}"`);
        continue;
      }

      if (frontmatter.kind !== kind) continue;
      if (!ALLOWED_LOCALES.includes(frontmatter.locale)) continue;

      const relativeUrl =
        frontmatter.previewUrl || `/${folder}/${frontmatter.slug}`;
      const canonicalUrl = `${SITE_URL}${relativeUrl.replace(/\/$/, "")}`;

      const existing = existingArticles.find(
        (a) => a.canonical_url === canonicalUrl,
      );

      const payload = {
        article: {
          title: frontmatter.title,
          body_markdown: cleanMdcForDevto(content),
          published: false, // Mettre à true si publication directe sur DEV.to
          description: frontmatter.description,
          tags: formatDevtoTags(frontmatter.tags),
          canonical_url: canonicalUrl,
        },
      };

      const url = existing ? `https://dev.to${existing.id}` : "https://dev.to";
      const method = existing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "api-key": DEVTO_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error(`Erreur sur ${filePath} (${method}):`, await res.text());
        continue;
      }
      const result = await res.json();
      console.log(
        `${existing ? "Mis à jour" : "Créé"} : "${frontmatter.title}" (ID: ${result.id})`,
      );

      // Publication effectuée sur LinkedIn uniquement lors de la création initiale de l'article - aucune update ultérieure
      /* if (!existing) {
        await publishToLinkedIn(frontmatter, canonicalUrl);
      } */
    }
  }
}
sync();

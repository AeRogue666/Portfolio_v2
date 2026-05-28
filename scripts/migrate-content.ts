import "dotenv/config";
import type { Locale } from "@prisma/client";
import { prisma } from "#server/db/prisma";
import { readFileSync, readdirSync } from "fs";
import { join, basename, dirname } from "path";
import matter from "gray-matter";

/* const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});
export const prisma = new PrismaClient({ adapter }); */

interface ContentFile {
  kind:
    | "project"
    | "experiment"
    | "about"
    | "client"
    | "service"
    | "note"
    | "read"
    | "talk"
    | "job";
  locale: "fr" | "en";
  filePath: string;
  slug: string;
}

/***
 * Parse markdown fles and extract frontmatter + content
 */
function parseMarkdownFile(filePath: string) {
  const fileContent = readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return { frontmatter: data, content };
}

/**
 * Detect locale from filename or path
 * Expects: filename.fr.md or filename.en.md
 */
function detectLocale(filePath: string): "fr" | "en" {
  if (filePath.includes("fr.md")) return "fr";
  if (filePath.includes("en.md")) return "en";
  return "fr";
}

/**
 * Recursively scan directory for markdown files
 */
function scanDirRecursive(
  dir: string,
  kind: ContentFile["kind"],
): ContentFile[] {
  const files: ContentFile[] = [];

  try {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...scanDirRecursive(fullPath, kind));
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const locale = detectLocale(entry.name);

        const slug = basename(dirname(fullPath));

        files.push({
          kind,
          locale,
          filePath: fullPath,
          slug,
        });
      }
    }
  } catch (e) {
    console.log(`Error scanning directory ${dir}:`, e);
  }
  return files;
}

/**
 * Scan content directories and return file info
 */
async function discoverContentFiles(): Promise<ContentFile[]> {
  const files: ContentFile[] = [];
  const contentRoot = "./content";

  try {
    const entries = readdirSync(contentRoot, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const dirPath = join(contentRoot, entry.name);
      let kind: ContentFile["kind"] | null = null;

      switch (entry.name) {
        case "projects":
          kind = "project";
          break;
        case "experiments":
          kind = "experiment";
          break;
        case "about":
          kind = "about";
          break;
        case "clients":
          kind = "client";
          break;
        case "services":
          kind = "service";
          break;
        case "notes":
          kind = "note";
          break;
        case "reads":
          kind = "read";
          break;
        case "talks":
          kind = "talk";
          break;
        case "jobs":
          kind = "job";
          break;
        default:
          console.log(`Unknown content directory: ${entry.name}`);
          break;
      }
      if (kind) {
        files.push(...scanDirRecursive(dirPath, kind));
      }
    }
  } catch (e) {
    console.warn(`Error reading content root: ${e}`);
  }
  return files;
}

/**
 * Migrate single file to database
 */
async function migrateFile(fileInfo: ContentFile) {
  try {
    const { frontmatter, content } = parseMarkdownFile(fileInfo.filePath);

    // Build data object for FeedItem
    const data: any = {
      slug: fileInfo.slug,
      kind: fileInfo.kind,

      tags: frontmatter.tags || [],
      pinned: frontmatter.pinned || false,

      previewUrl: frontmatter.previewUrl,

      date: frontmatter.created_at
        ? new Date(frontmatter.created_at)
        : new Date(),
    };

    const translationData: any = {
      locale: fileInfo.locale as Locale,

      title: frontmatter.title || "",
      description: frontmatter.description || "",
      content: content || "",

      feedTitle: frontmatter.feed_title,
      feedSummary: frontmatter.feed_summary,
    };

    if (fileInfo.kind === "project") {
      data.stack = frontmatter.stack || [];
      data.github = frontmatter.links?.github;
      data.demo = frontmatter.links?.demo;
      translationData.role = frontmatter.role;
      translationData.problem = frontmatter.problem;
      translationData.solution = frontmatter.solution;
      translationData.technicalChoices = frontmatter.technicalChoices;
      translationData.accessibility = frontmatter.accessibility;
      translationData.learnings = frontmatter.learnings || [];
    }

    if (fileInfo.kind === "client") {
      data.website = frontmatter.links?.website;
      translationData.customerName = frontmatter.customer_name;
      translationData.customerJob = frontmatter.customer_job;
      translationData.customerCity = frontmatter.customer_city;
      translationData.customerEnterpriseName =
        frontmatter.customer_enterprise_name;
      translationData.testimony = frontmatter.testimony;
    }

    if (frontmatter.image) {
      data.image = frontmatter.image;
    }

    const post = await prisma.post.upsert({
      where: {
        slug: fileInfo.slug,
      },
      update: data,
      create: data,
    });

    await prisma.postTranslation.upsert({
      where: {
        postId_locale: {
          postId: post.id,
          locale: fileInfo.locale,
        },
      },
      update: translationData,
      create: {
        ...translationData,
        postId: post.id,
      },
    });

    /* const data: any = {
            slug: fileInfo.slug,
            kind: fileInfo.kind,
            locale: fileInfo.locale,

            title: frontmatter.title || "",
            description: frontmatter.description || "",
            content: content || "",

            feedTitle: frontmatter.feed_title,
            feedSummary: frontmatter.feed_summary,

            tags: frontmatter.tags || [],
            pinned: frontmatter.pinned || false,

            previewUrl: frontmatter.previewUrl,

            date: frontmatter.created_at ? new Date(frontmatter.created_at) : new Date(),
            updatedAt: frontmatter.updated_at ? new Date(frontmatter.updated_at) : new Date(),
        };

        if(frontmatter.image) {
            data.image = frontmatter.image;
        }

        if(fileInfo.kind === "project") {
            data.role = frontmatter.role;
            data.stack = frontmatter.stack || [];
            data.problem = frontmatter.problem;
            data.solution = frontmatter.solution;
            data.technicalChoices = frontmatter.technicalChoices;
            data.accessibility = frontmatter.accessibility;
            data.learnings = frontmatter.learnings || [];
            data.links = {
                github: frontmatter.links?.github,
                demo: frontmatter.links?.demo,
            };
        }

        if(fileInfo.kind === "client") {
            data.customerName = frontmatter.customer_name;
            data.customerJob = frontmatter.customer_job;
            data.customerCity = frontmatter.customer_city;
            data.customerEnterpriseName = frontmatter.customer_enterprise_name;
            data.testimony = frontmatter.testimony;
            data.links = {
                website: frontmatter.links?.website,
            };
        }

        const result = await prisma.post.upsert({
            where: {
                slug_locale: {
                    slug: fileInfo.slug,
                    locale: fileInfo.locale,
                },
            },
            update: data,
            create: data,
        });
 */
    console.log(`${fileInfo.kind} (${fileInfo.locale}): ${fileInfo.slug}`);
    return post;
  } catch (e) {
    console.error(`Error migrating ${fileInfo.filePath}: ${e}`);
    throw e;
  }
}

/**
 * Main migration flow
 */
async function migrate() {
  console.log("Starting content migration");

  try {
    // 1. Discover all content files
    console.log("Scanning content directories");
    const files = await discoverContentFiles();
    console.log(`Found ${files.length} markdown files`);

    if (files.length === 0) {
      console.log("No markdown files found. Exiting.");
      return;
    }

    // 2. Migrate each file
    let successCount = 0;
    let errorCount = 0;

    for (const fileInfo of files) {
      try {
        await migrateFile(fileInfo);
        successCount++;
      } catch (e) {
        errorCount++;
      }
    }

    // 3. Summary
    console.log("\n" + "=".repeat(50));
    console.log("Migration complete!");
    console.log(`Success: ${successCount}/${files.length}`);
    if (errorCount > 0) {
      console.log(`Errors: ${errorCount}/${files.length}`);
    }
    console.log("=".repeat(50) + "\n");
  } catch (e) {
    console.error("Fatal error during migration:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});

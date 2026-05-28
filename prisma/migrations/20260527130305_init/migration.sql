-- CreateEnum
CREATE TYPE "FeedKind" AS ENUM ('project', 'experiment', 'about', 'client', 'note', 'read', 'talk', 'job', 'pinned');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "slug" TEXT,
    "kind" "FeedKind" NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "feedTitle" TEXT,
    "feedSummary" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "previewUrl" TEXT,
    "github" TEXT,
    "demo" TEXT,
    "website" TEXT,
    "customerName" TEXT,
    "customerJob" TEXT,
    "customerCity" TEXT,
    "customerEnterpriseName" TEXT,
    "testimony" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

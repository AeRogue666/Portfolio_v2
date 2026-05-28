/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `customerCity` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `customerEnterpriseName` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `customerJob` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `feedSummary` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `feedTitle` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `locale` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `testimony` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('fr', 'en');

-- AlterEnum
ALTER TYPE "FeedKind" ADD VALUE 'service';

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
DROP COLUMN "customerCity",
DROP COLUMN "customerEnterpriseName",
DROP COLUMN "customerJob",
DROP COLUMN "customerName",
DROP COLUMN "description",
DROP COLUMN "feedSummary",
DROP COLUMN "feedTitle",
DROP COLUMN "locale",
DROP COLUMN "testimony",
DROP COLUMN "title",
ADD COLUMN     "image" JSONB,
ADD COLUMN     "stack" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- CreateTable
CREATE TABLE "PostTranslation" (
    "id" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "feedTitle" TEXT,
    "feedSummary" TEXT,
    "role" TEXT,
    "problem" TEXT,
    "solution" TEXT,
    "technicalChoices" TEXT,
    "accessibility" TEXT,
    "learnings" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "customerName" TEXT,
    "customerJob" TEXT,
    "customerCity" TEXT,
    "customerEnterpriseName" TEXT,
    "testimony" TEXT,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostTranslation_postId_locale_key" ON "PostTranslation"("postId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- AddForeignKey
ALTER TABLE "PostTranslation" ADD CONSTRAINT "PostTranslation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import { z } from "zod";
import { heroSchema } from "./blocks/hero.schema";
import { richTextSchema } from "./blocks/richText.schema";
import { imageSchema } from "./blocks/image.schema";
import { ctaSchema } from "./blocks/cta.schema";
import { packagesSchema } from "./blocks/packages.schema";

export const blockSchema = z.discriminatedUnion("type", [
  heroSchema,
  richTextSchema,
  imageSchema,
  ctaSchema,
  packagesSchema,
]);

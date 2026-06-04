import { z } from "zod";

export const imageSchema = z.object({
    id: z.string(),
    type: z.literal("image"),

    src: z.string(),
    alt: z.string().default("")
});
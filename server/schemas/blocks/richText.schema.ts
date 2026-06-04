import { z } from "zod";

export const richTextSchema = z.object({
    id: z.string(),
    type: z.literal("richText"),

    content: z.record(z.any()),
});
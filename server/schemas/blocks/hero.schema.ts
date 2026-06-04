import { z } from "zod";

export const heroSchema = z.object({
    id: z.string(),
    type: z.literal("hero"),

    title: z.string(),
    subtitle: z.string().optional()
});
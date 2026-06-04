import { z } from "zod";

export const ctaSchema = z.object({
    id: z.string(),
    type: z.literal("cta"),

    title: z.string().default(""),
    description: z.string().optional(),

    buttonLabel: z.string(),
    buttonHref: z.string()
});
import { z } from "zod";

export const packagesSchema = z.object({
    id: z.string(),
    type: z.literal("packages"),

    packages: z.array(z.object({

    }))
});
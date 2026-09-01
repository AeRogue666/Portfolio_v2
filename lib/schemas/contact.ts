import { z } from "zod";

const BaseContactSchema = z.object({
  email: z
    .email("Invalid email")
    .min(1, "Email is required")
    .max(200, "Email too long"),
  website_bot: z.string().optional(), // honeypot
  website: z.string().optional(), // needed for refonte/optimisation/maintenance/audit
});

const SimpleContactSchema = BaseContactSchema.extend({
  type: z.literal("message"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters long")
    .max(3000, "Message too long"),
});

const QualificationSchema = z.object({
  projectType: z
    .enum([
      "message",
      "creation",
      "refonte",
      "optimisation",
      "maintenance",
      "audit",
      "formation",
    ])
    .nullable(),
  subType: z.string().nullable().optional(),
  complexity: z.object({
    pages: z.string().default(""),
    features: z.array(z.string()).optional().default([]),
    cms: z.boolean().default(false),
  }).optional(),

  businessGoals: z.string().optional(),
  problems: z.string().optional(),

  budgetRange: z.string().nullable().optional(),
  deadline: z.string().nullable().optional(),

  leadScore: z.number(),
  leadTier: z.enum(["low", "medium", "high"]),
});

const QualifiedLeadSchema = BaseContactSchema.extend({
  type: z.literal("qualified"),
  message: z.string().max(3000, "Message too long").optional(),
  qualification: QualificationSchema,
});

export const ContactFormSchema = z.discriminatedUnion("type", [
  SimpleContactSchema,
  QualifiedLeadSchema,
]);

export type ContactFormState = z.infer<typeof ContactFormSchema>;

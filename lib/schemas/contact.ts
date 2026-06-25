import { z } from "zod";

const BaseContactSchema = z.object({
  email: z
    .email("Invalid email")
    .min(1, "Email is required")
    .max(200, "Email too long"),
  website: z.string().optional(), // honeypot
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
      "audit_a11y",
      "audit_seo",
      "formation",
    ])
    .nullable(),
  subType: z.string().nullable().optional(),
  complexity: z.object({
    pages: z.string().default(""),
    features: z.array(z.string()).optional().default([]),
    cms: z.string().default(""),
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

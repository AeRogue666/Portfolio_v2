import { z } from "zod";

const BaseContactSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(200, "Email too long")
    .email("Invalid email"),
  website: z.string().optional(), // honeypot
  startedAt: z.string().nullable(),
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
    .enum(["creation", "refonte", "optimisation", "audit_a11y", "audit_seo", "formation"])
    .nullable(),
  subType: z.string().nullable(),
  complexity: z.record(z.any()),

  businessGoals: z.string().optional(),
  problems: z.string().optional(),

  budgetRange: z.string().nullable(),
  deadline: z.string().nullable(),

  leadScore: z.number(),
  leadTier: z.enum(["low", "medium", "high"]),
  createdAt: z.string().nullable(),
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

import { z } from "zod";

export const ContactFormSchema = z.object({
    email: z.string().min(1, 'Email is required').max(200, 'Email too long'),
    message: z.string().min(20, 'Message must be at least 20 characters long')
    .max(3000, 'Message too long'),
    website: z.string().optional()
});

export type ContactFormState = z.infer<typeof ContactFormSchema>
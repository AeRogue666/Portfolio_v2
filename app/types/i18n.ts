export const SUPPORTED_LOCALES = ['fr', 'en'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];
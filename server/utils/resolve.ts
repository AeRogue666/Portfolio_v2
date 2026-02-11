import { Locale } from "~/types/i18n";

// Take a source (object), remove `translations` and fuse this source with the translations object.

export function resolveWithLocale<
  TSource extends { translations: Record<Locale, any> },
>(
  source: TSource,
  locale: Locale,
): Omit<TSource, "translations"> & TSource["translations"][Locale] {
  const t = source.translations[locale];

  if (!t) throw createError({ statusCode: 404 });

  const { translations, ...base } = source;

  return {
    ...base,
    ...t,
  };
}

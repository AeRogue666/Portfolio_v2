import dayjs from "dayjs";

export function useDate() {
  const { locale } = useI18n();

  const base = (date?: string | Date) => {
    return dayjs(date).locale(locale.value);
  };

  const formatDate = (
    date?: string | Date,
    format = "DD MMMM YYYY",
  ): string => {
    if (!date) return "";
    return base(date).format(format);
  };
  const formatISO = (date?: string | Date): string => {
    if (!date) return "";
    return base(date).format("YYYY-MM-DDTHH:mm:ssZ");
  };

  return {
    formatDate,
    formatISO,
  };
}

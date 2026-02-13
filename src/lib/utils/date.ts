import { format, parse, subDays } from "date-fns";

export const DATE_FORMAT_ISO = "yyyy-MM-dd";

export function parseDateParam(value: string | null): string | undefined {
  if (!value?.trim()) return undefined;
  const parsed = parse(value.trim(), DATE_FORMAT_ISO, new Date());
  if (Number.isNaN(parsed.getTime())) return undefined;
  return value.trim();
}

export function getDefaultDateRange(): { "from-date": string; "to-date": string } {
  const today = new Date();
  const from = subDays(today, 7);
  return {
    "from-date": format(from, DATE_FORMAT_ISO),
    "to-date": format(today, DATE_FORMAT_ISO),
  };
}

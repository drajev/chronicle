export function formatPrice(value: number, options?: Intl.NumberFormatOptions): string {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    ...options,
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

export function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });
}

export function formatEllipsis(text: string, start = 6, end = 4): string {
  if (!text || text.length <= start + end) return text;
  return `${text.slice(0, start)}…${text.slice(-end)}`;
}

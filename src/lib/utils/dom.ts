export const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

export const setStyleProperties = (
  el: HTMLElement | null,
  cssVars: Record<string, string>,
) => {
  if (!el) return;
  for (const [key, value] of Object.entries(cssVars)) {
    el.style.setProperty(key, value);
  }
};

export const checkVisibility = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  const viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight,
  );
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

const DEFAULT_FONT_FAMILY = `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`;

export const calculateRenderedTextWidth = (
  text: string,
  fontSize: number,
  isUppercase = false,
  fontFamily = DEFAULT_FONT_FAMILY,
): number => {
  const finalText = isUppercase ? text.toUpperCase() : text;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  (context as CanvasRenderingContext2D).font = `${fontSize}px ${fontFamily}`;
  return (context as CanvasRenderingContext2D).measureText(finalText).width;
};

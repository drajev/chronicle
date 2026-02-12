/**
 * Single source of truth for theme storage key.
 * Used by: layout (cookie), ThemeContext (cookie + localStorage).
 * public/theme-init.js must use the same string ("chronicle-theme").
 */
export const THEME_STORAGE_KEY = "chronicle-theme";

export const THEME_COOKIE_MAX_AGE = 31536000; // 1 year

(() => {
  // Must match THEME_STORAGE_KEY in src/lib/constants/theme.ts
  const k = "chronicle-theme";
  const t = localStorage.getItem(k);
  if (t !== "light" && t !== "dark") {
    return;
  }
  document.documentElement.setAttribute("data-theme", t);
  document.cookie = `${k}=${t};path=/;max-age=31536000;SameSite=Lax`;
})();

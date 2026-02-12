(() => {
  // Must match THEME_STORAGE_KEY in src/lib/constants/theme.ts
  const k = "chronicle-theme";
  const t = localStorage.getItem(k);
  if (t === "light" || t === "dark") {
    document.documentElement.setAttribute("data-theme", t);
    document.cookie = `${k}=${t};path=/;max-age=31536000;SameSite=Lax`;
  }

  // Remove extension-injected attributes so server HTML matches client during hydration
  const stripFrom = (el) => {
    if (!el?.removeAttribute) return;
    for (const name of ["cz-shortcut-listen"]) el.removeAttribute(name);
  };
  stripFrom(document.body);
  stripFrom(document.documentElement);

  // Watch for extension attributes being added and remove them immediately
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "cz-shortcut-listen") {
        const target = mutation.target;
        if (target === document.body || target === document.documentElement) {
          target.removeAttribute("cz-shortcut-listen");
        }
      }
    }
  });
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["cz-shortcut-listen"],
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["cz-shortcut-listen"],
  });
})();

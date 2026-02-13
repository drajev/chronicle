export const ROUTES = {
  home: "/",
  news: "/news",
  about: "/about",
} as const;

export const NAV_HEADER_LINKS = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.news, label: "News" },
  { href: ROUTES.about, label: "About" },
] as const;

export const NAV_FOOTER_LINKS = [
  { href: ROUTES.news, label: "News" },
  { href: ROUTES.about, label: "About" },
] as const;

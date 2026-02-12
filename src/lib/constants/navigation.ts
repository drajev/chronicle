/**
 * Route paths and nav link config. Single source of truth for links.
 */
export const ROUTES = {
  home: "/",
  about: "/about",
  styleguide: "/styleguide",
} as const;

export const NAV_HEADER_LINKS = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.about, label: "About" },
  { href: ROUTES.styleguide, label: "Styleguide" },
] as const;

export const NAV_FOOTER_LINKS = [
  { href: ROUTES.about, label: "About" },
  { href: ROUTES.styleguide, label: "Styleguide" },
] as const;

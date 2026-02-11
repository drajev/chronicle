export const camelCase = (str: string): string => {
  return str
    .trim()
    .toLowerCase()
    .replace(/^[-_\s]+/, "")
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
};

export const pascalCase = (str: string): string => {
  return str
    .split(/(?=[0-9])|(?<=[0-9])|[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map((w) => w.toLowerCase())
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join("");
};

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const kebabCase = (str: string): string => {
  if (str == null) return str;
  return str
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\w\s-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .replace(/[-_\s]+/g, "-")
    .toLowerCase()
    .replace(/^-+|-+$/g, "")
    .trim();
};

export const slugify = (str: string): string => {
  return str
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[-\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const capitalize = <S extends string>(str: S): Capitalize<S> => {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<S>;
};

export const uncapitalize = <S extends string>(str: S): Uncapitalize<S> => {
  return (str.charAt(0).toLowerCase() + str.slice(1)) as Uncapitalize<S>;
};

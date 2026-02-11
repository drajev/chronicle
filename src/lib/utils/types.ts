export type TBooleanish = boolean | "true" | "false";

export type TDict<T = unknown> = Record<string, T>;

export type TObjType<T = unknown> = { [key: string | number]: T };

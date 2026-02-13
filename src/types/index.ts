export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pageCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Section IDs match Guardian Content API. @see https://content.guardianapis.com/sections */
export type TopicCategory =
  | "business"
  | "technology"
  | "world"
  | "science"
  | "culture"
  | "sport"
  | "economics";

export interface Topic {
  id: TopicCategory;
  label: string;
  section: string;
}

/**
 * Common types used across the application
 */

/**
 * API response wrapper type
 */
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pageCount: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Topic categories for the app
 */
export type TopicCategory = "business" | "technology" | "world" | "science" | "culture";

/**
 * Topic configuration
 */
export interface Topic {
  id: TopicCategory;
  label: string;
  section: string;
}

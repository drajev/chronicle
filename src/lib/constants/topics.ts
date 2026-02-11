import type { Topic } from "@/types";

/**
 * Fixed set of topics for the app
 */
export const TOPICS: Topic[] = [
  {
    id: "business",
    label: "Business",
    section: "business",
  },
  {
    id: "technology",
    label: "Technology",
    section: "technology",
  },
  {
    id: "world",
    label: "World",
    section: "world",
  },
  {
    id: "science",
    label: "Science",
    section: "science",
  },
  {
    id: "culture",
    label: "Culture",
    section: "arts",
  },
] as const;

/**
 * Get topic by ID
 */
export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find((topic) => topic.id === id);
}

/**
 * Get topic by section name
 */
export function getTopicBySection(section: string): Topic | undefined {
  return TOPICS.find((topic) => topic.section === section);
}

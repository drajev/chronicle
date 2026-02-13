import type { Topic } from "@/types";

export const NEWS_TOPICS: Topic[] = [
  { id: "business", label: "Business", section: "business" },
  { id: "technology", label: "Technology", section: "technology" },
  { id: "world", label: "World", section: "news" },
  { id: "science", label: "Science", section: "science" },
  { id: "culture", label: "Culture", section: "culture" },
  { id: "sport", label: "Sport", section: "sport" },
  { id: "economics", label: "Economics", section: "money" },
];

/** @deprecated Use NEWS_TOPICS. Kept for backwards compatibility. */
export const TOPICS = NEWS_TOPICS;

export function getTopicById(id: string): Topic | undefined {
  return NEWS_TOPICS.find((topic) => topic.id === id);
}

export function getTopicBySection(section: string): Topic | undefined {
  return NEWS_TOPICS.find((topic) => topic.section === section);
}

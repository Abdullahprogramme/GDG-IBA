import type { SpeakerProfile } from "./home.ts";
import type { EventRecord } from "./events.ts";
export interface SpeakerRecord extends SpeakerProfile {
  slug: string;
  category: string[];
  events: string[];
  talkAbstract?: string;
  links: { linkedin?: string; x?: string; github?: string; website?: string; email?: string };
}
export const speakerCategories = [
  { value: "industry", label: "Industry" },
  { value: "student", label: "Student Speakers" },
  { value: "other", label: "Other Speakers" },
  { value: "panelist", label: "Panelists" },
  { value: "judge", label: "Judges" },
  { value: "gde", label: "Google Developer Experts" },
] as const;

export type SpeakerCategory = (typeof speakerCategories)[number]["value"];
type SpeakerFilter = { value: string; label: string };
const categoryLabels = new Map<string, string>(
  speakerCategories.map((category) => [category.value, category.label]),
);
export function speakerCategory(category: string | readonly string[]): string[] {
  const values = (Array.isArray(category) ? category : [category]).map((item) =>
    item.toLowerCase().trim().replace(/^sample\s*:?\s*/, "").replace(/[-_]+/g, " "),
  );
  const result = new Set<string>();
  for (const value of values) {
    const normalized = value
      .replace(/\bspeakers?\b/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\s/g, "-");
    if (normalized.includes("industry")) result.add("industry");
    else if (normalized.includes("student")) result.add("student");
    else if (normalized.includes("panel")) result.add("panelist");
    else if (normalized.includes("judge")) result.add("judge");
    else if (normalized.includes("other") || normalized.includes("guest")) result.add("other");
    else if (normalized) result.add(normalized);
  }
  return [...result];
}
export function availableSpeakerFilters(speakers: readonly SpeakerRecord[]): SpeakerFilter[] {
  const extraCategories = new Map<string, string>();
  for (const speaker of speakers) {
    for (const category of speaker.category) {
      const value = speakerCategory(category)[0];
      if (value && !categoryLabels.has(value)) {
        extraCategories.set(value, category.trim());
      }
    }
  }
  return [
    { value: "all", label: "All" },
    ...speakerCategories,
    ...[...extraCategories.entries()].map(([value, label]) => ({ value, label })),
  ];
}
export function filterSpeakers(
  speakers: readonly SpeakerRecord[],
  category: string,
): SpeakerRecord[] {
  return speakers
    .filter(
      (speaker) =>
        category === "all" ||
        speakerCategory(speaker.category).includes(category),
    )
    .sort((a, b) => a.name.localeCompare(b.name) || a.slug.localeCompare(b.slug));
}
export function speakerEvents(
  speaker: SpeakerRecord,
  events: readonly EventRecord[],
): EventRecord[] {
  return events
    .filter(
      (event) =>
        (speaker.events.includes(event.slug) || event.speakers.includes(speaker.slug)) &&
        event.sample === speaker.sample,
    )
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
export function pastSpeakerGroups(
  speakers: readonly SpeakerRecord[],
  events: readonly EventRecord[],
) {
  return [...events]
    .filter((event) => event.status === "past")
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .map((event) => ({
      event,
      speakers: filterSpeakers(
        speakers.filter((speaker) => speakerEvents(speaker, [event]).length > 0),
        "all",
      ),
    }))
    .filter((group) => group.speakers.length > 0);
}

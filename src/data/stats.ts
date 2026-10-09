export interface ChapterStat { label: string; value: number | null; suffix?: string }
// No chapter numbers have been confirmed. The UI should use an empty state.
export const stats: readonly ChapterStat[] = [
  { label: "Members", value: null }, { label: "Events hosted", value: null },
  { label: "Speakers", value: null }, { label: "Workshops and hackathons", value: null },
];
export const establishedYear: number | null = null;

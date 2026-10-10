export interface ChapterStat { label: string; value: number | null; suffix?: string }
export const stats: readonly ChapterStat[] = [
  { label: "Members", value: 80 }, { label: "Events hosted", value: 5, suffix: "+" },
  { label: "Speakers", value: 12 }, { label: "Workshops and hackathons", value: 5, suffix: "+" },
];
export const establishedYear: number | null = null;

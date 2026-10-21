export interface ChapterStat {
  label: string;
  value: number | null;
  suffix?: string;
}
export const stats: readonly ChapterStat[] = [
  { label: "Members", value: 80, suffix: "+" },
  { label: "Events hosted", value: 5, suffix: "+" },
  { label: "Speakers", value: 12, suffix: "+" },
  { label: "Workshops and hackathons", value: 5, suffix: "+" },
  { label: "Cummulative Digital Reach", value: 164000, suffix: "+" },
  { label: "Active Tech Community Followers", value: 5400, suffix: "+" },
  { label: "Registered GDGOC IBA Community Platform Members", value: 1000, suffix: "+" },
  { label: "Past Event Attendees", value: 4500, suffix: "+" },
];
export const establishedYear: number | null = 2019;

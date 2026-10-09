import { preferConfirmed } from "./home.ts";
import { THEME_ORDER, type ThemeName } from "../components/shapes/themes.ts";
export interface StoryMilestone {
 id: string; year: number; title: string; body: string; image?: string;
 theme: ThemeName | "red"; sample: boolean;
}
/** History reads oldest first; sample records disappear when real history arrives. */
export function orderMilestones<T extends Pick<StoryMilestone, "id" | "year" | "sample">>(records: readonly T[]): T[] {
 return preferConfirmed(records).sort((a, b) => a.year - b.year || a.id.localeCompare(b.id));
}
export function milestoneTheme(index: number): ThemeName { return THEME_ORDER[index % THEME_ORDER.length]; }

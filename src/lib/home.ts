export interface TeamProfile {
  id: string; name: string; role: string; department: string; photo: string;
  isLead: boolean; isCoLead: boolean; order: number; sample: boolean; bio?: string;
  photoPending?: boolean; organizingCommittee?: boolean;
  links: { linkedin?: string; email?: string; github?: string; website?: string };
}
export interface EventPreview {
  id: string; slug: string; title: string; date: string; category: string;
  status: "upcoming" | "past"; cover: string; summary: string; tags: string[];
  sample: boolean; registerUrl?: string; recapUrl?: string;
}
export interface SpeakerProfile {
  id: string; name: string; role: string; company: string; photo: string;
  talkTitle: string; bio: string; sample: boolean;
}
export interface GalleryPhoto {
  id: string; src: string; alt: string; width: number; height: number;
  caption?: string; sample: boolean;
}
export interface PartnerProfile { id: string; name: string; logo: string; url?: string; sample: boolean }

/** Confirmed records replace demonstrations as soon as they are available. */
export function preferConfirmed<T extends { sample: boolean }>(records: readonly T[]): T[] {
  const confirmed = records.filter(record => !record.sample);
  return confirmed.length ? confirmed : [...records];
}
export function orderTeam<T extends Pick<TeamProfile, "isLead" | "isCoLead" | "order" | "name">>(records: readonly T[]): T[] {
  const rank = (person: T) => person.isLead ? 0 : person.isCoLead ? 1 : 2;
  return [...records].sort((a, b) => rank(a) - rank(b) || a.order - b.order || a.name.localeCompare(b.name));
}
export function orderEvents<T extends Pick<EventPreview, "date">>(records: readonly T[]): T[] {
  return [...records].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
export function featuredEvent<T extends Pick<EventPreview, "date" | "status">>(records: readonly T[]): T | undefined {
  return orderEvents(records).find(event => event.status === "upcoming") ?? orderEvents(records)[0];
}
export function eventDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Karachi" }).format(new Date(value));
}

/** Fill a wide decorative track without pretending copies are new records. */
export function fillTrack<T>(items: readonly T[], minimum = 8): { item: T; copy: number }[] {
  if (!items.length) return [];
  const cycles = Math.max(1, Math.ceil(minimum / items.length));
  return Array.from({ length: cycles }, (_, copy) => items.map(item => ({ item, copy }))).flat();
}

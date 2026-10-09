import type { EventPreview, GalleryPhoto, SpeakerProfile } from "./home.ts";
import { confirmedExternalUrl } from "../data/site.ts";
export interface EventRecord extends EventPreview {
 description: string; location: string; mode: "onsite" | "online" | "hybrid"; endDate?: string;
 agenda: {time: string; title: string; speaker?: string}[]; speakers: string[]; gallery: string[];
}
export interface EventSpeaker extends SpeakerProfile { slug: string }
export const eventFilters = [
 {value:"all",label:"All"}, {value:"upcoming",label:"Upcoming"}, {value:"past",label:"Past"},
 {value:"workshop",label:"Workshops"}, {value:"hackathon",label:"Hackathons"},
 {value:"study-jam",label:"Study Jams"}, {value:"talk",label:"Talks"},
] as const;
export type EventFilterValue = typeof eventFilters[number]["value"] | "social";
export interface EventFilterState { tab: EventFilterValue; query: string; year: string }
export const defaultEventFilters: EventFilterState = {tab:"all",query:"",year:"all"};
const allowedFilters = new Set<string>([...eventFilters.map(item=>item.value),"social"]);
export function readEventFilters(search: string): EventFilterState {
 const params = new URLSearchParams(search), tab = params.get("category") ?? params.get("status") ?? "all", year = params.get("year") ?? "all";
 return {tab:allowedFilters.has(tab) ? tab as EventFilterValue : "all", query:params.get("q") ?? "", year:/^\d{4}$/.test(year)?year:"all"};
}
export function eventYear(date: string): string { return new Intl.DateTimeFormat("en",{year:"numeric",timeZone:"Asia/Karachi"}).format(new Date(date)); }
export function eventTime(date: string): string { return new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",timeZone:"Asia/Karachi"}).format(new Date(date)); }
export function filterEvents(events: readonly EventRecord[], filters: EventFilterState): EventRecord[] {
 const query = filters.query.trim().toLocaleLowerCase("en");
 return events.filter(event => (filters.tab === "all" || event.status === filters.tab || event.category === filters.tab)
  && (filters.year === "all" || eventYear(event.date) === filters.year)
  && (!query || [event.title,event.summary,event.description,event.location,...event.tags].join(" ").toLocaleLowerCase("en").includes(query)))
  .sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)||a.slug.localeCompare(b.slug));
}
export function nextUpcoming(events: readonly EventRecord[], now: number): EventRecord | undefined {
 return events.filter(event=>!event.sample&&event.status==="upcoming"&&Date.parse(event.date)>now).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date))[0];
}
export function eventAction(event: EventPreview): {href:string;label:string}|undefined {
 if(event.sample)return undefined;
 const href=confirmedExternalUrl(event.status==="upcoming"?event.registerUrl:event.recapUrl);
 return href ? {href,label:event.status==="upcoming"?"Register":"Read recap"} : undefined;
}
export function countdownParts(date: string, now: number) {
 const target=Date.parse(date);if(!Number.isFinite(target))return null;
 const remaining=Math.max(0,Math.floor((target-now)/1000));
 return {days:Math.floor(remaining/86400),hours:Math.floor(remaining%86400/3600),minutes:Math.floor(remaining%3600/60),seconds:remaining%60,finished:target<=now};
}
export function eventPhotos(event: EventRecord | undefined, photos: readonly (GalleryPhoto & {event?:string})[]): GalleryPhoto[] {
 if(!event)return [];
 const linked=photos.filter(photo=>photo.event===event.slug&&photo.sample===event.sample);
 const sources=new Set(linked.map(photo=>photo.src));
 return [...linked,...event.gallery.filter(src=>!sources.has(src)).map((src,index)=>({id:`${event.slug}-${index}`,src,alt:event.sample?"Sample event illustration; not a chapter photograph":`Photo from ${event.title}`,width:800,height:600,sample:event.sample}))];
}

import type { SpeakerProfile } from "./home.ts";
import type { EventRecord } from "./events.ts";
export interface SpeakerRecord extends SpeakerProfile {
 slug:string;category:string;events:string[];talkAbstract?:string;
 links:{linkedin?:string;x?:string;github?:string;website?:string;email?:string};
}
export const speakerCategories = [
 {value:"industry",label:"Industry"}, {value:"alumni",label:"Alumni"},
 {value:"gde",label:"Google Developer Experts"}, {value:"student",label:"Student Speakers"},
 {value:"other",label:"Other Speakers"},
] as const;
export type SpeakerCategory = typeof speakerCategories[number]["value"];
export function speakerCategory(category:string):SpeakerCategory {
 const value=category.toLowerCase().trim().replace(/^sample\s*:?\s*/,"").replace(/[-_]+/g," ");
 if(value.includes("google developer expert")||value==="gde")return "gde";
 if(value.includes("industry"))return "industry";
 if(value.includes("alumni"))return "alumni";
 if(value.includes("student"))return "student";
 return "other";
}
export function availableSpeakerFilters(speakers:readonly SpeakerRecord[]) {
 const present=new Set(speakers.map(speaker=>speakerCategory(speaker.category)));
 return [{value:"all",label:"All"},...speakerCategories.filter(category=>present.has(category.value))];
}
export function filterSpeakers(speakers:readonly SpeakerRecord[],category:string):SpeakerRecord[] {
 return speakers.filter(speaker=>category==="all"||speakerCategory(speaker.category)===category).sort((a,b)=>a.name.localeCompare(b.name)||a.slug.localeCompare(b.slug));
}
export function speakerEvents(speaker:SpeakerRecord,events:readonly EventRecord[]):EventRecord[] {
 return events.filter(event=>(speaker.events.includes(event.slug)||event.speakers.includes(speaker.slug))&&event.sample===speaker.sample).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
}
export function pastSpeakerGroups(speakers:readonly SpeakerRecord[],events:readonly EventRecord[]) {
 return [...events].filter(event=>event.status==="past").sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)).map(event=>({event,speakers:filterSpeakers(speakers.filter(speaker=>speakerEvents(speaker,[event]).length>0),"all")})).filter(group=>group.speakers.length>0);
}

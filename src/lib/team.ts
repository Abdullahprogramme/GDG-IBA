import { orderTeam, preferConfirmed, type TeamProfile } from './home.ts';
export interface TeamRecord extends TeamProfile { bio?: string; alumni: boolean; isAdvisor?: boolean }
export function partitionTeam(records: readonly TeamRecord[]) {
 const selected=orderTeam(preferConfirmed(records));
 const alumni=selected.filter(p=>p.alumni), current=selected.filter(p=>!p.alumni);
 const advisors=current.filter(p=>p.isAdvisor || /faculty advisor|faculty adviser/i.test(p.role));
 const leads=current.filter(p=>!advisors.includes(p)&&(p.isLead||p.isCoLead));
 const members=current.filter(p=>!advisors.includes(p)&&!leads.includes(p));
 const departments=[...new Set(members.map(p=>p.department))].sort((a,b)=>a.localeCompare(b)).map(name=>({name,people:members.filter(p=>p.department===name)}));
 return {leads,advisors,departments,alumni};
}
export function teamLinks(person: TeamProfile) {
 if(person.sample)return [];
 const links: {kind:'linkedin'|'github'|'email';href:string}[]=[];
 for(const kind of ['linkedin','github'] as const){try{const url=new URL(person.links[kind]??'');if(url.protocol==='https:')links.push({kind,href:url.href})}catch{}}
 if(person.links.email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.links.email))links.push({kind:'email',href:`mailto:${encodeURIComponent(person.links.email)}`});
 return links;
}

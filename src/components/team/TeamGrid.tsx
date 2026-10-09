import { Reveal } from '../motion';
import { TeamCard } from './TeamCard';
import type { TeamRecord } from '../../lib/team';
const themes=['blue','green','yellow','pink'] as const;
export function TeamGrid({departments}:{departments:{name:string;people:TeamRecord[]}[]}){
 if(!departments.length)return <div className="team-empty"><h3>The wider crew is coming into focus.</h3><p>Department profiles will appear here as the chapter confirms its team.</p></div>;
 return <div className="team-departments">{departments.map(({name,people},index)=><section className="team-department-group" key={name} aria-label={`${name} department`}><h3><span className="team-department-chip" data-theme={themes[index%4]}>{name}</span><span className="team-member-count">{people.length} {people.length===1?'member':'members'}</span></h3><div className="team-grid">{people.map((person,i)=><Reveal key={person.id} delay={Math.min(i,7)*.06}><TeamCard person={person} theme={themes[(index+i)%4]}/></Reveal>)}</div></section>)}</div>;
}

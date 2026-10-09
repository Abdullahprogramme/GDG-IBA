import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { TeamCard } from './TeamCard';
import type { TeamRecord } from '../../lib/team';
export function AlumniTeam({people}:{people:TeamRecord[]}){
 if(!people.length)return null;
 return <Accordion className="team-alumni"><AccordionItem value="past-team"><AccordionTrigger>People who helped us get here <span className="team-member-count">{people.length} profiles</span></AccordionTrigger><AccordionContent className="team-alumni-content"><div className="team-grid">{people.map((person,index)=><TeamCard person={person} key={person.id} theme={(['blue','green','yellow','pink'] as const)[index%4]}/>)}</div></AccordionContent></AccordionItem></Accordion>;
}

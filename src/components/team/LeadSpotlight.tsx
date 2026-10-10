import { motion } from 'motion/react';
import { PhotoFrame, type ThemeName } from '../shapes';
import { useMotionPreference } from '../motion/useMotionPreference';
import { TeamSocials } from './TeamSocials';
import type { TeamRecord } from '../../lib/team';
export function LeadSpotlight({people,advisor=false}:{people:TeamRecord[];advisor?:boolean}){
 const reduced=useMotionPreference();
 return <div className={`${advisor?'team-advisors':'team-leads'}${!advisor&&people.length===1?' team-leads--single':''}`}>{people.map((person,index)=><motion.article className="team-lead" data-theme={advisor?'yellow':index%2?'pink':'blue'} key={person.id} initial={false} whileInView={{scale:1,rotate:0}} viewport={{once:true,amount:.2}} transition={{duration:reduced?0:.5,delay:reduced?0:index*.1}}><motion.div initial={false} whileInView={reduced?{}:{scale:[.96,1],rotate:[index%2?2:-2,0]}} viewport={{once:true}} transition={{duration:.6}} className="team-lead-photo"><PhotoFrame theme={(advisor?'yellow':index%2?'pink':'blue') as ThemeName} src={person.photo} alt={person.photoPending?`Portrait pending for ${person.name}`:person.sample?`Sample avatar for ${person.name}; not a real organizer`:person.name} imageWidth={600} imageHeight={700}/></motion.div><div className="team-lead-copy">{person.sample&&<span className="sample-badge">SAMPLE PROFILE</span>}{person.photoPending&&<span className="sample-badge">PHOTO PENDING</span>}<h3>{person.name}</h3><p className="team-role">{person.role}</p><p className="team-lead-bio">{person.bio??'More about this team member will be shared when confirmed.'}</p><TeamSocials person={person}/></div></motion.article>)}</div>;
}

import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { teamLinks } from '../../lib/team';
import type { TeamProfile } from '../../lib/home';
export function TeamSocials({person}:{person:TeamProfile}){
 const links=teamLinks(person);if(!links.length)return null;
 return <div className="team-card-socials">{links.map(({kind,href})=><a key={kind} href={href} target={kind==='email'?undefined:'_blank'} rel={kind==='email'?undefined:'noopener noreferrer'} aria-label={kind==='email'?`Email ${person.name}`:`${person.name} on ${kind==='linkedin'?'LinkedIn':'GitHub'} (opens in a new tab)`}>{kind==='email'?<Mail size={18}/>:kind==='linkedin'?<FaLinkedinIn size={18}/>:<FaGithub size={18}/>}</a>)}</div>;
}

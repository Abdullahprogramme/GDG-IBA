import type { RefObject } from "react";
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { PhotoFrame, type ThemeName } from "../shapes";
import { useMotionPreference } from "../motion/useMotionPreference";
import { confirmedExternalUrl } from "../../data/site";
import { speakerEvents, type SpeakerRecord } from "../../lib/speakers";
import type { EventRecord } from "../../lib/events";
import { eventDate } from "../../lib/home";
export function SpeakerModal({speaker,events,open,onOpenChange,portraitId,theme="blue",returnFocus}:{speaker?:SpeakerRecord;events:EventRecord[];open:boolean;onOpenChange:(value:boolean)=>void;portraitId?:string;theme?:ThemeName;returnFocus:RefObject<HTMLElement|null>}) {
 const reduced=useMotionPreference();if(!speaker)return null;
 const sessions=speakerEvents(speaker,events);
 const socials=speaker.sample?[]:(["linkedin","x"] as const).map(platform=>({platform,href:confirmedExternalUrl(speaker.links[platform])})).filter(link=>link.href);
 return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="speaker-modal" finalFocus={returnFocus} render={<motion.div initial={{opacity:reduced?1:0,scale:reduced?1:.95}} animate={{opacity:1,scale:1}} transition={{type:"spring",stiffness:350,damping:30}}/>}>
  <div className="speaker-modal-body"><div className="speaker-modal-heading">{speaker.sample&&<span className="sample-badge">SAMPLE PROFILE / NOT A REAL SPEAKER</span>}<DialogTitle>{speaker.name}</DialogTitle><p>{speaker.role} · {speaker.company}</p><DialogDescription>{speaker.bio}</DialogDescription></div>
   <div className="speaker-modal-grid"><div className="speaker-modal-photo" data-theme={theme}><PhotoFrame theme={theme} src={speaker.photo} alt={speaker.sample?`Sample avatar for ${speaker.name}; not a real speaker portrait`:speaker.name} imageWidth={600} imageHeight={700} loading="eager" imageId={reduced?undefined:portraitId}/></div>
    <section><p className="speakers-kicker">The talk</p><h3>{speaker.talkTitle}</h3><p>{speaker.talkAbstract??"The talk abstract will be shared when available."}</p></section></div>
   <section><h3>Sessions</h3>{sessions.length?<ul className="speaker-session-list">{sessions.map(event=><li key={event.slug}><a href={`/events?event=${encodeURIComponent(event.slug)}`}><span>{event.title}</span><time dateTime={event.date}>{eventDate(event.date)}</time><span aria-hidden="true">↗</span></a>{event.sample&&<small>Sample session · not a chapter event</small>}</li>)}</ul>:<p>Linked sessions will appear here when confirmed.</p>}</section>
   {socials.length>0&&<nav className="speaker-socials" aria-label={`${speaker.name} social profiles`}>{socials.map(({platform,href})=><a key={platform} href={href} target="_blank" rel="noopener noreferrer">{platform==="linkedin"?"LinkedIn":"X"}<span aria-hidden="true">↗</span></a>)}</nav>}
  </div>
 </DialogContent></Dialog>;
}

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView } from "motion/react";
import { availableSpeakerFilters, filterSpeakers, type SpeakerRecord } from "../../lib/speakers";
import type { EventRecord } from "../../lib/events";
import { SpeakerCard } from "./SpeakerCard";
import { SpeakerModal } from "./SpeakerModal";
import { useMotionPreference } from "../motion/useMotionPreference";
const themes=["blue","green","yellow","pink"] as const;
export function SpeakerGrid({speakers,events=[],idPrefix="speaker"}:{speakers:SpeakerRecord[];events?:EventRecord[];idPrefix?:string}) {
 const [category,setCategory]=useState("all"),[selected,setSelected]=useState<SpeakerRecord>(),[open,setOpen]=useState(false),[hydrated,setHydrated]=useState(false);
 const grid=useRef<HTMLDivElement>(null),returnFocus=useRef<HTMLElement|null>(null),inView=useInView(grid,{once:true,amount:.1}),reduced=useMotionPreference(),group=useId();
 const filters=availableSpeakerFilters(speakers),visible=filterSpeakers(speakers,category),ordered=filterSpeakers(speakers,"all");
 const themeFor=(speaker:SpeakerRecord)=>themes[Math.max(0,ordered.findIndex(item=>item.slug===speaker.slug))%4];
 useEffect(()=>{const read=()=>{const params=new URLSearchParams(location.search),value=params.get("category")??"all";setCategory(availableSpeakerFilters(speakers).some(filter=>filter.value===value)?value:"all");const person=speakers.find(speaker=>speaker.slug===params.get("speaker")||speaker.id===params.get("speaker"));if(person){setSelected(person);returnFocus.current=grid.current?.closest(".site-container")?.querySelector<HTMLElement>(".speaker-filter[aria-pressed=true]")??null;}setOpen(!!person);};read();setHydrated(true);window.addEventListener("popstate",read);return()=>window.removeEventListener("popstate",read)},[speakers]);
 const changeCategory=(value:string)=>{setCategory(value);const url=new URL(location.href);if(value==="all")url.searchParams.delete("category");else url.searchParams.set("category",value);history.pushState(null,"",url.pathname+url.search+url.hash);};
 const showProfile=(speaker:SpeakerRecord,trigger:HTMLButtonElement)=>{returnFocus.current=trigger;setSelected(speaker);setOpen(true);const url=new URL(location.href);url.searchParams.set("speaker",speaker.slug);history.pushState(null,"",url.pathname+url.search+url.hash);};
 const changeOpen=(value:boolean)=>{setOpen(value);if(!value){const url=new URL(location.href);url.searchParams.delete("speaker");history.replaceState(null,"",url.pathname+url.search+url.hash);}};
 return <LayoutGroup id={group}><div className="speaker-filters" role="group" aria-label="Filter speakers">{filters.map(filter=><button type="button" className="speaker-filter" key={filter.value} aria-controls={`${idPrefix}-results`} aria-pressed={category===filter.value} onClick={()=>changeCategory(filter.value)}>{filter.label}</button>)}</div>
  <div id={`${idPrefix}-results`} className="speaker-results"><p className="speaker-result-count" aria-live="polite" aria-atomic="true">{visible.length} {visible.length===1?"speaker":"speakers"}</p><motion.div ref={grid} className="speaker-grid" layout={!reduced}><AnimatePresence initial={false} mode="popLayout">{visible.map((speaker,index)=><motion.div key={speaker.slug} layout={!reduced} initial={hydrated&&!reduced?{opacity:0,scale:.95}:false} animate={{opacity:!hydrated||inView||reduced?1:0,y:!hydrated||inView||reduced?0:24,scale:1}} exit={{opacity:0,scale:reduced?1:.95}} transition={{duration:reduced?0:.3,delay:reduced?0:Math.min(index,8)*.05}}><SpeakerCard profileSlug={speaker.slug} speaker={speaker} theme={themeFor(speaker)} onDetails={hydrated?trigger=>showProfile(speaker,trigger):undefined} detailsAvailable={!hydrated} portraitId={reduced?undefined:`${group}-${speaker.slug}`}/></motion.div>)}</AnimatePresence></motion.div>
   {!visible.length&&<div className="speakers-empty"><h3>Our speaker line-up is on its way.</h3><p>Profiles will appear here as speakers are confirmed.</p></div>}{!hydrated&&<p className="speakers-static-note">Category filters and profile dialogs are available with JavaScript enabled.</p>}
  </div><SpeakerModal speaker={selected} events={events} open={open} onOpenChange={changeOpen} theme={selected?themeFor(selected):"blue"} portraitId={selected&&!reduced?`${group}-${selected.slug}`:undefined} returnFocus={returnFocus}/>
 </LayoutGroup>;
}

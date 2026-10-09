import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Tabs, TabsContent } from "../ui/tabs";
import { EventFilter } from "./EventFilter";
import { EventCard } from "./EventCard";
import { EventDialog } from "./EventDialog";
import { FeaturedEvent } from "./FeaturedEvent";
import { useMotionPreference } from "../motion/useMotionPreference";
import type { GalleryPhoto } from "../../lib/home";
import { defaultEventFilters, eventYear, filterEvents, readEventFilters, type EventRecord, type EventSpeaker, type EventFilterState, type EventFilterValue } from "../../lib/events";
export function EventCatalog({events,speakers=[],photos=[],featured,initialNow,idPrefix="event"}:{idPrefix?:string;events:EventRecord[];speakers?:EventSpeaker[];photos?:(GalleryPhoto & {event?:string})[];featured?:EventRecord;initialNow:number}) {
 const [filters,setFilters]=useState(defaultEventFilters),[selected,setSelected]=useState<EventRecord>(),[open,setOpen]=useState(false),[hydrated,setHydrated]=useState(false);
 const root=useRef<HTMLDivElement>(null),returnFocus=useRef<HTMLElement|null>(null),group=useId(),reduced=useMotionPreference();
 const years=[...new Set(events.map(event=>eventYear(event.date)))].sort().reverse();
 const visible=filterEvents(events,filters);
 useEffect(()=>{const read=()=>{setFilters(readEventFilters(location.search));const slug=new URLSearchParams(location.search).get("event"),event=events.find(item=>item.slug===slug);if(event){setSelected(event);returnFocus.current=root.current?.querySelector<HTMLElement>(`.event-filter-pill[data-active]`)??null;}setOpen(!!event);};read();setHydrated(true);window.addEventListener("popstate",read);return()=>window.removeEventListener("popstate",read)},[events]);
 const changeFilters=(state:EventFilterState)=>{const params=new URLSearchParams(location.search);for(const key of ["category","status","q","year"])params.delete(key);if(state.tab!=="all")params.set(["upcoming","past"].includes(state.tab)?"status":"category",state.tab);if(state.query)params.set("q",state.query);if(state.year!=="all")params.set("year",state.year);const url=location.pathname+(params.size?`?${params}`:"")+location.hash;history[state.query!==filters.query?"replaceState":"pushState"](null,"",url);setFilters(state);};
 const showDetails=(event:EventRecord,trigger:HTMLButtonElement)=>{returnFocus.current=trigger;setSelected(event);setOpen(true);const url=new URL(location.href);url.searchParams.set("event",event.slug);history.pushState(null,"",url.pathname+url.search+url.hash);};
 const changeOpen=(value:boolean)=>{setOpen(value);if(!value){const url=new URL(location.href);url.searchParams.delete("event");history.replaceState(null,"",url.pathname+url.search+url.hash);}};
 return <div ref={root}><LayoutGroup id={group}><Tabs className="events-catalog" value={filters.tab} onValueChange={value=>changeFilters({...filters,tab:value as EventFilterValue})}>
  <section id={`${idPrefix}-browse`} className="events-section" aria-labelledby={`${idPrefix}-browse-title`}><div className="site-container"><p className="events-kicker">01 / Find your next session</p><h2 id={`${idPrefix}-browse-title`} className="events-heading">Something to <strong>explore.</strong></h2><p className="events-intro">Browse a topic, find an upcoming session or revisit something that sparked an idea.</p>{events.some(event=>event.sample)&&<p className="sample-notice"><span className="sample-badge">SAMPLE</span>These demonstration entries are not scheduled chapter events.</p>}<EventFilter resultsId={`${idPrefix}-results`} filters={filters} years={years} hasSocial={events.some(event=>event.category==="social")} onChange={changeFilters}/></div></section>
  <section id={`${idPrefix}-featured`} className="events-section events-featured" aria-label="Featured upcoming event"><div className="site-container"><FeaturedEvent event={featured} initialNow={initialNow}/></div></section>
  <TabsContent value={filters.tab} className="events-section events-results" id={`${idPrefix}-results`}><div className="site-container"><div className="events-result-heading"><h2 className="events-heading">Explore the <strong>sessions.</strong></h2><p aria-live="polite" aria-atomic="true">{visible.length} {visible.length===1?"event":"events"}</p></div>
   <motion.div className="event-grid" layout={!reduced}><AnimatePresence initial={false} mode="popLayout">{visible.map((event,index)=><motion.div key={event.slug} layout={!reduced} initial={hydrated?{opacity:0,scale:reduced?1:.95}:false} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:reduced?1:.95}} transition={{duration:reduced?0:.2,delay:reduced?0:Math.min(index,8)*.05}}><EventCard event={event} theme={(["blue","green","yellow","pink"] as const)[index%4]} onDetails={hydrated?trigger=>showDetails(event,trigger):undefined} detailsAvailable={!hydrated} imageId={reduced?undefined:`${group}-${event.slug}`}/></motion.div>)}</AnimatePresence></motion.div>
   {!visible.length&&<div className="events-empty"><h3>{events.length?"No events match these filters.":"Our events are on their way."}</h3><p>{events.length?"Try another topic, search term or year.":"Confirmed sessions will appear here when announced."}</p>{events.length>0&&<button className="brand-button" onClick={()=>changeFilters(defaultEventFilters)}>Clear filters</button>}</div>}
   {!hydrated&&<p className="event-static-note">Filters and event dialogs become available when JavaScript is enabled.</p>}
  </div></TabsContent>
 </Tabs><EventDialog event={selected} speakers={speakers} photos={photos} open={open} onOpenChange={changeOpen} imageId={selected&&!reduced?`${group}-${selected.slug}`:undefined} returnFocus={returnFocus}/></LayoutGroup></div>;
}

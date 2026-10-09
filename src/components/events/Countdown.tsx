import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { countdownParts } from "../../lib/events";
import { useMotionPreference } from "../motion/useMotionPreference";
export function Countdown({date,sample,initialNow}:{date:string;sample:boolean;initialNow:number}) {
 const ref=useRef<HTMLDivElement>(null), visible=useInView(ref), reduced=useMotionPreference();
 const [now,setNow]=useState(initialNow),[tabVisible,setTabVisible]=useState(true);
 const parts=sample?null:countdownParts(date,now);
 useEffect(()=>{const update=()=>setTabVisible(!document.hidden);update();document.addEventListener("visibilitychange",update);return()=>document.removeEventListener("visibilitychange",update)},[]);
 useEffect(()=>{if(sample||!visible||!tabVisible||parts?.finished)return;setNow(Date.now());const timer=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(timer)},[sample,visible,tabVisible,parts?.finished]);
 return <div ref={ref} className="event-countdown" role="timer" aria-live="off" aria-label={sample?"Sample countdown layout; no scheduled chapter event":`Time until the session on ${new Date(date).toLocaleString("en-GB",{timeZone:"Asia/Karachi"})}`}>
  <div className="countdown-tiles" aria-hidden="true">{(["days","hours","minutes","seconds"] as const).map((unit,index)=>{const value=parts?String(parts[unit]).padStart(2,"0"):"–";return <div className="countdown-tile" data-theme={(["blue","green","yellow","pink"] as const)[index]} key={unit}><div className="countdown-digit"><AnimatePresence initial={false} mode="popLayout"><motion.span key={value} initial={{y:reduced?0:16,opacity:reduced?1:0}} animate={{y:0,opacity:1}} exit={{y:reduced?0:-16,opacity:reduced?1:0}} transition={{duration:reduced?0:.2}}>{value}</motion.span></AnimatePresence></div><span>{unit}</span></div>})}</div>
  <p className="countdown-note">{sample?"Countdown begins when a real session is announced.":parts?.finished?"The scheduled start time has passed. Check the event details for updates.":"Times shown in Pakistan Standard Time."}</p>
 </div>;
}

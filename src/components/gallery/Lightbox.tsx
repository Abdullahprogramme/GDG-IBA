import type { RefObject } from 'react';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { eventDate } from '../../lib/home';
import type { GalleryRecord } from '../../lib/gallery';
export function Lightbox({photo,index,total,open,onOpenChange,onMove,reduced,layoutId,returnFocus}:{photo?:GalleryRecord;index:number;total:number;open:boolean;onOpenChange:(value:boolean)=>void;onMove:(direction:number)=>void;reduced:boolean;layoutId?:string;returnFocus:RefObject<HTMLElement|null>}){
 const touch=useRef<{x:number;y:number}|null>(null);if(!photo)return null;
 return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="gallery-lightbox" style={{translate:'none',width:'100vw',maxWidth:'none',inset:0,animation:'none'}} finalFocus={returnFocus} render={<motion.div initial={{opacity:reduced?1:0,scale:reduced?1:.97}} animate={{opacity:1,scale:1}} transition={{type:'spring',stiffness:320,damping:30}}/>} onKeyDown={event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();onMove(event.key==='ArrowLeft'?-1:1)}}}>
  <div className="gallery-lightbox-header"><DialogTitle>Snapshot</DialogTitle><span className="gallery-counter" aria-live="polite" aria-atomic="true">{index+1} / {total}</span></div>
  <div className="gallery-lightbox-image" onTouchStart={event=>{const p=event.touches[0];touch.current={x:p.clientX,y:p.clientY}}} onTouchEnd={event=>{const p=event.changedTouches[0],start=touch.current;touch.current=null;if(start&&Math.abs(p.clientX-start.x)>50&&Math.abs(p.clientX-start.x)>Math.abs(p.clientY-start.y)*1.4)onMove(p.clientX<start.x?1:-1)}}><motion.img key={photo.id} layoutId={layoutId} src={photo.fullSrc??photo.src} alt={photo.alt} width={photo.width} height={photo.height} decoding="async" loading="eager"/></div>
  <div className="gallery-lightbox-footer"><button type="button" className="lightbox-arrow" aria-label="Previous photo" disabled={total<2} onClick={()=>onMove(-1)}><ArrowLeft size={22}/></button><div className="gallery-lightbox-caption"><DialogDescription>{photo.caption??photo.alt}</DialogDescription><p>{photo.eventTitle??photo.album} <span aria-hidden="true">·</span> <time dateTime={photo.date}>{eventDate(photo.date)}</time></p>{photo.sample&&<p className="gallery-lightbox-sample">Sample illustration — not a chapter photograph.</p>}</div><button type="button" className="lightbox-arrow" aria-label="Next photo" disabled={total<2} onClick={()=>onMove(1)}><ArrowRight size={22}/></button></div>
 </DialogContent></Dialog>;
}

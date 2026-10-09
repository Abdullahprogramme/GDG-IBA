import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Chevrons } from '../shapes';
import type { GalleryRecord } from '../../lib/gallery';
const sizes='(min-width:1440px) 22vw, (min-width:1024px) 30vw, (min-width:768px) 44vw, 90vw';
export function PhotoTile({photo,index,reduced,hydrated,layoutId,onOpen}:{photo:GalleryRecord;index:number;reduced:boolean;hydrated:boolean;layoutId?:string;onOpen:(trigger:HTMLButtonElement)=>void}){
 const img=useRef<HTMLImageElement>(null),[loaded,setLoaded]=useState(false);
 useEffect(()=>{if(img.current?.complete)setLoaded(true)},[photo.src]);
 return <motion.figure layout={!reduced} whileHover={reduced?undefined:{rotate:index%2?1.5:-1.5,scale:1.03}} initial={false} exit={{opacity:0,scale:reduced?1:.97}} whileInView={reduced?{}:{opacity:[.6,1],scale:[.97,1]}} viewport={{once:true,amount:.1}} transition={{duration:reduced?0:.4,delay:reduced?0:Math.min(index%9,5)*.04}} className="gallery-tile" data-theme={(['blue','green','yellow','pink'] as const)[index%4]} data-direction={index%2?'right':'left'}>
  <button type="button" className="gallery-photo-button" disabled={!hydrated} aria-haspopup="dialog" aria-label={`Open ${photo.alt}`} onClick={event=>onOpen(event.currentTarget)} style={photo.placeholder?{backgroundImage:`url("${photo.placeholder}")`}:undefined}>
   <picture>{photo.avifSrcSet&&<source type="image/avif" srcSet={photo.avifSrcSet} sizes={sizes}/>}<motion.img ref={img} layoutId={layoutId} src={photo.src} srcSet={photo.webpSrcSet} sizes={photo.webpSrcSet?sizes:undefined} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" onLoad={()=>setLoaded(true)} data-loaded={loaded} className={hydrated?'gallery-image hydrated':'gallery-image'}/></picture><span className="gallery-photo-corner" aria-hidden="true"><Chevrons width={30} height={22}/></span>
  </button><figcaption>{photo.sample&&<span className="gallery-sample-badge">SAMPLE ILLUSTRATION</span>}<span>{photo.caption??photo.eventTitle??photo.album}</span></figcaption>
 </motion.figure>;
}

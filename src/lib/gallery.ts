import { preferConfirmed } from './home.ts';
export interface GalleryRecord {
 id:string;src:string;alt:string;album:string;event?:string;eventTitle?:string;date:string;caption?:string;width:number;height:number;sample:boolean;
 avifSrcSet?:string;webpSrcSet?:string;placeholder?:string;fullSrc?:string;
}
export const galleryAlbums=[{value:'workshops',label:'Workshops'},{value:'hackathons',label:'Hackathons'},{value:'talks',label:'Talks'},{value:'team',label:'Team'},{value:'campus',label:'Campus'}];
export function albumKey(value:string){const key=value.trim().toLowerCase().replace(/^sample\s*:?\s*/,'').replace(/[_\s]+/g,'-');return ({workshop:'workshops',hackathon:'hackathons',talk:'talks','study-jam':'workshops','study-jams':'workshops'} as Record<string,string>)[key]??key;}
export function galleryFilters(records:readonly GalleryRecord[]){const keys=[...new Set(records.map(p=>albumKey(p.album)))];return [{value:'all',label:'All'},...galleryAlbums.filter(a=>keys.includes(a.value)),...keys.filter(key=>!galleryAlbums.some(a=>a.value===key)).sort().map(value=>({value,label:records.find(p=>albumKey(p.album)===value)!.album.replace(/^sample\s*:?\s*/i,'')}))];}
export function galleryPhotos(records:readonly GalleryRecord[],album='all'){return preferConfirmed(records).filter(p=>album==='all'||albumKey(p.album)===album).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)||a.id.localeCompare(b.id));}
export function galleryPage(records:readonly GalleryRecord[],album='all',limit=24){const photos=galleryPhotos(records,album);return {photos:photos.slice(0,Math.max(0,limit)),total:photos.length,hasMore:photos.length>limit};}
export function nextPhotoIndex(index:number,direction:number,total:number){return total>0?((index+direction)%total+total)%total:0;}

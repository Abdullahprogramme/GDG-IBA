import { Marquee } from "../motion";
import { fillTrack, type GalleryPhoto } from "../../lib/home";
import type { EventRecord } from "../../lib/events";
export function EventRecap({event,photos}:{event?:EventRecord;photos:GalleryPhoto[]}) {
 return <div><p className="events-kicker">05 / A look back</p><h2 id="recap-title" className="events-heading">Moments worth <strong>keeping.</strong></h2>
  {event&&<p className="events-intro">{event.title}</p>}
  {photos.length?<><p className="recap-note">{event?.sample?"Sample illustrations only. No chapter event photographs are shown.":"Photos from our most recent past session."}</p><Marquee label="Latest event recap photos" items={photos.map(photo=>photo.alt)} speed={45} className="event-recap-marquee">{fillTrack(photos,6).map(({item:photo,copy},index)=><figure key={`${photo.id}-${copy}`} className={`recap-photo recap-photo--${index%2}`}><img src={photo.src} alt="" width={photo.width} height={photo.height} loading="lazy" decoding="async"/><figcaption>{photo.sample?"Sample illustration":photo.caption??event?.title}</figcaption></figure>)}</Marquee></>:<div className="events-empty"><h3>Snapshots are on their way.</h3><p>Photos from the latest event will appear here when available.</p></div>}
 </div>;
}

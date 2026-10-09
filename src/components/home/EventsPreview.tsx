import { EventCard } from "../events/EventCard";
import { Marquee, Reveal, Stagger, StaggerItem } from "../motion";
import { featuredEvent, orderEvents, fillTrack, type EventPreview, type GalleryPhoto } from "../../lib/home";
import { site } from "../../data/site";
export function EventsPreview({ events, photos }: { events: EventPreview[]; photos: GalleryPhoto[] }) {
  const featured = featuredEvent(events), rest = orderEvents(events).filter(event => event.id !== featured?.id).slice(0, 3);
  const detailsAvailable = site.nav.some(item => item.href === "/events" && item.available);
  return <div>
    {featured ? <div className="events-preview-grid">
      <Reveal direction="left"><EventCard event={featured} featured detailsAvailable={detailsAvailable}/></Reveal>
      {rest.length > 0 && <Stagger className="events-compact-grid">{rest.map(event => <StaggerItem key={event.id}><EventCard event={event} detailsAvailable={detailsAvailable}/></StaggerItem>)}</Stagger>}
    </div> : <div className="empty-state"><h3>Your next idea starts here.</h3><p>Workshops, study jams, and events will appear here as they are announced.</p></div>}
    {photos.length > 0 && <div className="event-photo-strip"><Marquee label="Session snapshots" items={photos.map(photo => photo.alt)} speed={45}>{fillTrack(photos).map(({ item: photo, copy }, i) => <figure key={`${photo.id}-${copy}`} className={`session-photo session-photo--${i % 2}`}><img src={photo.src} alt="" width={photo.width} height={photo.height} loading="lazy" decoding="async"/>{photo.sample && <figcaption>Sample illustration</figcaption>}</figure>)}</Marquee></div>}
  </div>;
}

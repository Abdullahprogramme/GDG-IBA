import { NotchCard } from "../shapes";
import { Reveal } from "../motion";
import { eventDate } from "../../lib/home";
import { eventAction, eventTime, type EventRecord } from "../../lib/events";
import { Countdown } from "./Countdown";
export function FeaturedEvent({event,initialNow}:{event?:EventRecord;initialNow:number}) {
 if(!event)return <div className="events-empty"><h3>Your next session is on its way.</h3><p>Upcoming events will appear here once announced. Explore the collection below in the meantime.</p></div>;
 const action=eventAction(event);
 return <Reveal><NotchCard type="tab" label={event.sample?"Sample preview":"Upcoming"} theme="blue" className="featured-event" initialHeight={440}>
  <div className="featured-event-grid"><div><p className="events-kicker">02 / Next up</p>{event.sample&&<span className="sample-badge">SAMPLE EVENT / NOT ANNOUNCED</span>}
   <h2 className="events-heading">{event.title}</h2><p className="featured-summary">{event.summary}</p><time dateTime={event.date}>{eventDate(event.date)} · {eventTime(event.date)} PKT</time><p className="featured-location">{event.location} · {event.mode}</p>
   <Countdown date={event.date} sample={event.sample} initialNow={initialNow}/>
   {action?<a className="brand-button" href={action.href} target="_blank" rel="noopener noreferrer">Register <span aria-hidden="true">↗</span></a>:<><button className="brand-button" disabled>Register</button><p className="event-action-note">{event.sample?"Demonstration only. No registration.":"Registration link coming soon."}</p></>}
  </div><figure className="featured-event-image"><img src={event.cover} alt={event.sample?`Sample artwork for ${event.title}; not an event photograph`:event.title} width={800} height={600} loading="lazy" decoding="async"/></figure></div>
 </NotchCard></Reveal>;
}

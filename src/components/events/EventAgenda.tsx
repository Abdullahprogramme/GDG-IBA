import { NotchCard } from "../shapes";
import { Reveal } from "../motion";
import type { EventRecord } from "../../lib/events";
export function EventAgenda({event}:{event?:EventRecord}) {
 return <Reveal><NotchCard type="tab" label="Agenda" theme="green" fill="var(--t-bg)" className="event-agenda-card" initialHeight={280}>
  <p className="events-kicker">04 / A plan for the session</p><h2 id="agenda-title" className="events-heading">What is <strong>coming up.</strong></h2>
  {event&&<p className="agenda-event-name">{event.title}</p>}
  {event?.sample&&<p className="sample-notice"><span className="sample-badge">SAMPLE</span>Demonstration agenda, not an announced programme.</p>}
  {event?.agenda.length?<ol className="event-agenda-list">{event.agenda.map((session,index)=><li key={`${session.time}-${index}`}><time>{session.time}</time><div><h3>{session.title}</h3>{session.speaker&&<p>{session.speaker}</p>}</div></li>)}</ol>:<p className="events-intro">The next session's agenda will appear here once it is confirmed.</p>}
 </NotchCard></Reveal>;
}

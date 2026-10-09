import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { pastSpeakerGroups, type SpeakerRecord } from "../../lib/speakers";
import type { EventRecord } from "../../lib/events";
import { eventDate } from "../../lib/home";
export function PastSpeakers({speakers,events}:{speakers:SpeakerRecord[];events:EventRecord[]}) {
 const groups=pastSpeakerGroups(speakers,events);
 if(!groups.length)return <div className="speakers-empty"><h3>More conversations are on their way.</h3><p>Speakers from past sessions will appear here when confirmed.</p></div>;
 return <Accordion className="past-speakers">{groups.map(({event,speakers:people},index)=><AccordionItem value={event.slug} key={event.slug} data-theme={(["blue","green","yellow","pink"] as const)[index%4]}>
  <AccordionTrigger><span>{event.title}<small>{eventDate(event.date)}{event.sample?" · Sample event":""}</small></span></AccordionTrigger>
  <AccordionContent className="past-speakers-content"><ul>{people.map(speaker=><li key={speaker.slug}><a href={`/speakers?speaker=${encodeURIComponent(speaker.slug)}`}><img src={speaker.photo} alt={speaker.sample?`Sample avatar for ${speaker.name}; not a real speaker portrait`:speaker.name} width={64} height={64} loading="lazy" decoding="async"/><span><strong>{speaker.name}</strong><small>{speaker.role}{speaker.sample?" · Sample profile":""}</small></span><span aria-hidden="true">↗</span></a></li>)}</ul><a className="past-event-link" href={`/events?event=${encodeURIComponent(event.slug)}`}>View session <span aria-hidden="true">↗</span></a></AccordionContent>
 </AccordionItem>)}</Accordion>;
}

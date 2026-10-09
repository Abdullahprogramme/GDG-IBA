import { NotchCard } from "../shapes";
import { confirmedExternalUrl } from "../../data/site";
import { eventDate, type EventPreview } from "../../lib/home";
import { motion } from "motion/react";
import type { ThemeName } from "../shapes";
import "./event-card.css";
export function EventCard({ event, featured = false, detailsAvailable = false, onDetails, imageId, theme = "yellow" }: { event: EventPreview; featured?: boolean; detailsAvailable?: boolean; onDetails?: (trigger: HTMLButtonElement) => void; imageId?: string; theme?: ThemeName }) {
  const external = event.sample ? undefined : confirmedExternalUrl(event.status === "upcoming" ? event.registerUrl : event.recapUrl);
  return <article className={`event-card ${featured ? "event-card--featured" : ""}`}>
    <NotchCard type="tab" theme={theme} label={event.status === "upcoming" ? "Upcoming" : "Recap"} padded={false} className="event-card-surface" initialWidth={featured ? 800 : 400} initialHeight={featured ? 430 : 420}>
      <div className="event-card-layout"><div className="event-cover"><motion.img layoutId={imageId} src={event.cover} alt={event.sample ? `Sample artwork for ${event.title}; not an event photograph` : event.title} width={800} height={600} loading="lazy" decoding="async"/><span className="event-category mono-label">{event.category}</span></div>
      <div className="event-card-copy">
        {event.sample && <span className="sample-badge">SAMPLE EVENT / NOT ANNOUNCED</span>}
        <time className="event-date mono-label" dateTime={event.date}>{eventDate(event.date)}</time><h3>{event.title}</h3><p>{event.summary}</p>
        <ul className="event-tags" aria-label="Topics">{event.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        {onDetails ? <button className="event-detail" type="button" onClick={event => onDetails(event.currentTarget)} aria-haspopup="dialog">View Details <span aria-hidden="true">↗</span></button> : detailsAvailable ? <a className="event-detail" href={`/events?event=${encodeURIComponent(event.slug)}`}>View Details <span aria-hidden="true">↗</span></a> : external ? <a className="event-detail" href={external} target="_blank" rel="noopener noreferrer">{event.status === "upcoming" ? "Register" : "Read recap"} <span aria-hidden="true">↗</span></a> : <p className="event-pending">{event.sample ? "Demonstration entry. No registration." : "Details coming soon."}</p>}
      </div></div>
    </NotchCard>
  </article>;
}

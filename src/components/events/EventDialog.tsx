import type { RefObject, WheelEvent } from "react";
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { eventDate, type GalleryPhoto } from "../../lib/home";
import {
  eventAction,
  eventPhotos,
  eventTime,
  type EventRecord,
  type EventSpeaker,
} from "../../lib/events";
import { useMotionPreference } from "../motion/useMotionPreference";
import { resolveLocalAsset } from "../../lib/local-assets";
import "./event-dialog.css";
export function EventDialog({
  event,
  speakers,
  photos,
  open,
  onOpenChange,
  imageId,
  returnFocus,
}: {
  event?: EventRecord;
  speakers: EventSpeaker[];
  photos: (GalleryPhoto & { event?: string })[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageId?: string;
  returnFocus: RefObject<HTMLElement | null>;
}) {
  const reduced = useMotionPreference();
  if (!event) return null;
  const presenters = speakers.filter(
      (speaker) => event.speakers.includes(speaker.slug) && (event.sample || !speaker.sample),
    ),
    images = eventPhotos(event, photos),
    action = eventAction(event);
  const onBodyWheel = (event: WheelEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    if (element.scrollHeight <= element.clientHeight) return;
    event.preventDefault();
    event.stopPropagation();
    element.scrollTop += event.deltaY;
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="event-dialog"
        finalFocus={returnFocus}
        render={
          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
              duration: reduced ? 0 : undefined,
            }}
          />
        }
      >
        <div
          className="event-dialog-body"
          onWheel={onBodyWheel}
          tabIndex={0}
          role="region"
          aria-label="Event details"
        >
          <div className="event-dialog-heading">
            {event.sample && <span className="sample-badge">SAMPLE EVENT / NOT ANNOUNCED</span>}
            <DialogTitle>{event.title}</DialogTitle>
            <DialogDescription>{event.summary}</DialogDescription>
          </div>
          <motion.img
            className="event-dialog-cover"
            layoutId={reduced ? undefined : imageId}
            src={event.cover}
            alt={event.sample ? "Sample event artwork; not a chapter photograph" : event.title}
            width={800}
            height={600}
          />
          <div className="event-dialog-meta">
            <time dateTime={event.date}>
              {eventDate(event.date)} · {eventTime(event.date)} PKT
            </time>
            <span>{event.category}</span>
            <span>{event.mode}</span>
            <span>{event.location}</span>
          </div>
          <section>
            <h3>About the session</h3>
            <p className="event-full-description">{event.description}</p>
          </section>
          {event.agenda.length > 0 && (
            <section>
              <h3>Agenda</h3>
              <ol className="dialog-agenda">
                {event.agenda.map((session, index) => (
                  <li key={`${session.time}-${index}`}>
                    <span>{session.time}</span>
                    <div>
                      <strong>{session.title}</strong>
                      {session.speaker && <p>{session.speaker}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}
          {presenters.length > 0 && (
            <section>
              <h3>Speakers</h3>
              <ul className="dialog-speakers">
                {presenters.map((speaker) => (
                  <li key={speaker.id}>
                    <img
                      src={resolveLocalAsset("speakers", speaker.photo)}
                      alt={
                        speaker.sample
                          ? `Sample avatar for ${speaker.name}; not a real speaker portrait`
                          : speaker.name
                      }
                      width={64}
                      height={64}
                    />
                    <div>
                      <strong>{speaker.name}</strong>
                      <p>{speaker.role}</p>
                      {speaker.sample && <small>Sample profile</small>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {images.length > 0 && (
            <section>
              <h3>{event.sample ? "Sample artwork" : "Session photos"}</h3>
              <div className="event-dialog-photos">
                {images.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </section>
          )}
          {(action || event.sample || event.status === "upcoming") && (
            <div className="event-dialog-actions">
              {action ? (
                <a
                  className="brand-button"
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {action.label} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <p>
                  {event.sample
                    ? "This is a demonstration entry. No registration or recap is available."
                    : "Registration link coming soon."}
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

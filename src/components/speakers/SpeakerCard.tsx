import { Quote, PhotoFrame, type ThemeName } from "../shapes";
import type { SpeakerProfile } from "../../lib/home";
import "./speaker-card.css";
export function SpeakerCard({ speaker, theme = "blue", onDetails, portraitId, detailsAvailable = false, profileSlug }: { speaker: SpeakerProfile; theme?: ThemeName; onDetails?: (trigger: HTMLButtonElement) => void; portraitId?: string; detailsAvailable?: boolean; profileSlug?: string }) {
  return <article className="speaker-card" data-theme={theme}>
    <div className="speaker-portrait"><PhotoFrame src={speaker.photo} alt={speaker.sample ? `Sample avatar illustration for ${speaker.name}; not a real speaker portrait` : speaker.name} theme={theme} icon="globe" imageWidth={600} imageHeight={700} imageId={portraitId}/></div>
    <div className="speaker-copy"><Quote theme={theme} variant="outline" width={66} height={66}/>{speaker.sample && <span className="sample-badge">SAMPLE SPEAKER</span>}<h3>{speaker.talkTitle}</h3><p>{speaker.bio}</p><div className="speaker-pills"><span>{speaker.name}</span><span>{speaker.company}</span></div><p className="speaker-role mono-label">{speaker.role}</p>{onDetails ? <button className="speaker-profile-button" type="button" aria-haspopup="dialog" aria-label={`View profile of ${speaker.name}`} onClick={event=>onDetails(event.currentTarget)}>View profile <span aria-hidden="true">↗</span></button> : detailsAvailable && <a className="speaker-profile-button" href={`/speakers?speaker=${encodeURIComponent(profileSlug ?? speaker.id)}`}>View profile <span aria-hidden="true">↗</span></a>}</div>
  </article>;
}

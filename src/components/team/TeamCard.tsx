import { TeamSocials } from "./TeamSocials";
import { AvatarFrame, Asterisk, type ThemeName } from "../shapes";
import type { TeamProfile } from "../../lib/home";
export function TeamCard({ person, spotlight = false, showBio = false, theme = "blue" }: { person: TeamProfile; spotlight?: boolean; showBio?: boolean; theme?: ThemeName }) {
  return <article className={`team-card ${spotlight ? "team-card--spotlight" : ""}`} data-theme={theme}>
    <div className="team-card-photo"><AvatarFrame src={person.photo} alt={person.photoPending ? `Portrait pending for ${person.name}` : person.sample ? `Sample avatar illustration for ${person.name}; not a real person` : person.name} theme={theme}/><span className="team-card-sticker"><Asterisk theme={theme} width={36} height={36}/></span></div>
    {person.photoPending && <span className="sample-badge">PHOTO PENDING</span>}
    {person.sample && <span className="sample-badge">SAMPLE PROFILE</span>}
    <h3>{person.name}</h3><p className="team-role">{person.role}</p><p className="team-department">{person.department}</p>
    {showBio && person.bio && <p className="team-card-bio">{person.bio}</p>}
    <TeamSocials person={person}/>
  </article>;
}

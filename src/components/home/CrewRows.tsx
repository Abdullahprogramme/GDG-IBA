import { TeamCard } from "../team/TeamCard";
import { Marquee, Stagger, StaggerItem } from "../motion";
import { orderTeam, fillTrack, type TeamProfile } from "../../lib/home";
const themes = ["blue", "yellow", "green", "pink"] as const;
export function CrewRows({ people }: { people: TeamProfile[] }) {
  const sorted = orderTeam(people), leaders = sorted.filter(person => person.isLead || person.isCoLead);
  const members = sorted.filter(person => !person.isLead && !person.isCoLead);
  const track = members.length ? members : sorted;
  if (!sorted.length) return <div className="site-container empty-state"><h3>Meet the crew soon.</h3><p>The people building this community will be introduced here.</p></div>;
  return <div className="crew-rows">
    {leaders.length > 0 && <Stagger className="site-container crew-spotlights">{leaders.map((person, index) => <StaggerItem key={person.id}><TeamCard person={person} spotlight theme={themes[index % 4]}/></StaggerItem>)}</Stagger>}
    <div className="crew-tracks"><Marquee label="Meet our crew" interactive speed={40}>{fillTrack(track).map(({ item: person, copy }, i) => <div key={`${person.id}-${copy}`} className="track-copy" data-marquee-copy={copy > 0 ? "" : undefined} aria-hidden={copy > 0 ? true : undefined}><TeamCard person={person} theme={themes[i % 4]}/></div>)}</Marquee>
    <Marquee label="More from the crew" interactive direction="right" speed={48}>{fillTrack([...track].reverse()).map(({ item: person, copy }, i) => <div key={`${person.id}-${copy}`} className="track-copy" data-marquee-copy={copy > 0 ? "" : undefined} aria-hidden={copy > 0 ? true : undefined}><TeamCard person={person} theme={themes[(i + 2) % 4]}/></div>)}</Marquee></div>
  </div>;
}

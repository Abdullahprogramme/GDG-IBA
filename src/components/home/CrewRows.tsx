import { TeamCard } from "../team/TeamCard";
import { Marquee, Stagger, StaggerItem } from "../motion";
import { orderTeam, fillTrack, type TeamProfile } from "../../lib/home";
const themes = ["blue", "yellow", "green", "pink"] as const;
export function CrewRows({ people }: { people: TeamProfile[] }) {
  const sorted = orderTeam(people), leaders = sorted.filter(person => person.isLead || person.isCoLead);
  const coreMembers = sorted.filter(person => !person.isLead && !person.isCoLead && !person.organizingCommittee);
  const ocMembers = sorted.filter(person => person.organizingCommittee);
  if (!sorted.length) return <div className="site-container empty-state"><h3>Meet the crew soon.</h3><p>The people building this community will be introduced here.</p></div>;
  return <div className="crew-rows">
    <section className="crew-home-row crew-home-row--lead" aria-label="GDG Lead"><div className="site-container crew-row-heading"><p>01 / GDG Lead</p></div>{leaders.length > 0 && <Stagger className={`site-container crew-spotlights${leaders.length === 1 ? " crew-spotlights--single" : ""}`}>{leaders.map((person, index) => <StaggerItem key={person.id}><TeamCard person={person} spotlight theme={themes[index % 4]}/></StaggerItem>)}</Stagger>}</section>
    <section className="crew-home-row" aria-label="Core Team"><div className="site-container crew-row-heading"><p>02 / Core Team</p></div>{coreMembers.length ? <div className="crew-tracks"><Marquee label="Core Team members" interactive speed={40}>{fillTrack(coreMembers).map(({ item: person, copy }, i) => <div key={`${person.id}-${copy}`} className="track-copy" data-marquee-copy={copy > 0 ? "" : undefined} aria-hidden={copy > 0 ? true : undefined}><TeamCard person={person} theme={themes[i % 4]}/></div>)}</Marquee></div> : <p className="site-container crew-row-empty">Core Team profiles will appear here when confirmed.</p>}</section>
    <section className="crew-home-row crew-home-row--oc" aria-label="Organizing Committee"><div className="site-container crew-row-heading"><p>03 / OC Team</p></div>{ocMembers.length ? <div className="crew-tracks"><Marquee label="Organizing Committee members" interactive direction="right" speed={48}>{fillTrack(ocMembers).map(({ item: person, copy }, i) => <div key={`${person.id}-${copy}`} className="track-copy" data-marquee-copy={copy > 0 ? "" : undefined} aria-hidden={copy > 0 ? true : undefined}><TeamCard person={person} theme={themes[(i + 2) % 4]}/></div>)}</Marquee></div> : <p className="site-container crew-row-empty">OC Team members will be added when the roster is provided.</p>}</section>
  </div>;
}

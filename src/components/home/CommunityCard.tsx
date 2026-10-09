import { NotchCard } from "../shapes";
import { Reveal } from "../motion";
import { JoinButton } from "./JoinButton";
const benefits = ["Workshops", "Group discussions", "Networking", "Project help", "Announcements"];
const icons = ["✳", "↔", "◎", "</>", "↗"];
export function CommunityCard({ url }: { url: string | null }) {
  return <Reveal><NotchCard type="tab" label="Join Us" theme="pink" className="community-card" initialWidth={1000} initialHeight={560}>
    <p className="mono-label">YOUR NEXT CHAPTER STARTS HERE</p>
    <h2 id="join-title">Join the <strong>community.</strong></h2>
    <p>Bring your questions, your ideas, and your curiosity. Find people to learn with, projects to build, and a little encouragement to keep going.</p>
    <ul className="community-benefits">{benefits.map((benefit, i) => <li key={benefit}><span aria-hidden="true">{icons[i]}</span>{benefit}</li>)}</ul>
    <JoinButton url={url}/>
  </NotchCard></Reveal>;
}

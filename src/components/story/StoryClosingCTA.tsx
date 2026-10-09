import { NotchCard, Arrow, TripleCircle } from "../shapes";
import { Reveal } from "../motion";
import { JoinButton } from "../home/JoinButton";

export function StoryClosingCTA({ url }: { url: string | null }) {
 return <Reveal><NotchCard type="tab" label="What's next" theme="pink" className="story-closing-card" initialHeight={360}>
  <div className="story-closing-icons" aria-hidden="true"><Arrow theme="pink" width={56} height={56}/><TripleCircle theme="yellow" width={64} height={64}/></div>
  <p className="story-kicker">05 / The story continues</p>
  <h2 id="story-join-title" className="story-heading">Be part of the<br/><strong>next chapter.</strong></h2>
  <p>Bring your questions, your ideas and your first attempts. There is room for you in what we build next.</p>
  <JoinButton url={url}/>
 </NotchCard></Reveal>;
}

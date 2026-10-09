import { NotchCard, PhotoFrame, Quote } from "../shapes";
import { CountUp, Reveal } from "../motion";
import type { ChapterOrigin } from "../../data/story";

export function OriginStory({ origin }: { origin: ChapterOrigin }) {
 return <Reveal><NotchCard type="tab" label="Our beginning" theme="blue" className="origin-card" initialHeight={440}>
  <div className="origin-grid"><div>
   <p className="story-kicker">01 / Where it begins</p>
   <h2 id="origin-title" className="story-heading">Curiosity brings us <strong>together.</strong></h2>
   <p>{origin.history ?? "Learning gets better when there is someone to share it with. GDG on Campus IBA is a space to explore technology beyond the classroom, ask questions and turn ideas into things we can build together."}</p>
   <p className="origin-purpose">Our purpose is simple: make room for students from every programme and experience level to learn, contribute and find their people.</p>
   {origin.foundedYear !== null ? <p className="origin-since">Since <CountUp value={origin.foundedYear} useGrouping={false} label="Founding year"/></p> : <p className="origin-pending">Our founding story and year will be shared once confirmed by the chapter.</p>}
  </div><figure className="origin-photo">
   <PhotoFrame theme="blue" src={origin.photo?.src ?? "/images/community-study.svg"} alt={origin.photo?.alt ?? "Original illustration of a laptop and study notes; not a chapter photograph"} imageWidth={600} imageHeight={450}/>
   {!origin.photo && <figcaption>Community illustration · chapter photo coming soon</figcaption>}
  </figure></div>
  <blockquote className="origin-quote"><Quote theme="blue" variant="outline" width={64} height={64}/><p>Good ideas get better when you share them.</p></blockquote>
 </NotchCard></Reveal>;
}

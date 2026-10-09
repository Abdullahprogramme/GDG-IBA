import { Marquee } from "../motion/Marquee";
import { Asterisk, Globe, Slashes, CodeHeart, LanyardStrip } from "../shapes";
import { tags } from "../../data/tags";
const icons = [Asterisk, Globe, Slashes, CodeHeart];
const palettes = ["blue", "pink", "yellow", "green"] as const;
export function TagMarquee() {
  const chips = (words: readonly string[]) => words.map((tag, index) => {
    const Icon = icons[index % icons.length];
    return <span key={tag} className="topic-chip" aria-hidden="true" data-theme={palettes[index % palettes.length]}><Icon width={22} height={22}/>{tag.toUpperCase()}</span>;
  });
  return <div className="tag-section" aria-label="What brings us together">
    <div className="tag-band">
      <Marquee label="Community topics" items={tags} speed={35} interactive>{chips(tags)}</Marquee>
      <Marquee label="More community topics" speed={45} direction="right" interactive>{chips([...tags].reverse())}</Marquee>
    </div>
    <Marquee label="Decorative developer lanyard" speed={50} className="home-lanyard"><LanyardStrip repeats={3}/></Marquee>
  </div>;
}

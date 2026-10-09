import { FloatingShape } from "../motion";
import { Arrow, TripleCircle, Slashes, Asterisk, Quote } from "../shapes";
export function CommunityVisual() {
  return <div className="community-shapes" aria-hidden="true"><div className="community-shape community-shape--arrow"><FloatingShape depth={8}><Arrow theme="blue" width={120} height={70}/></FloatingShape></div><div className="community-shape community-shape--circles"><FloatingShape depth={6}><TripleCircle theme="yellow" width={130} height={65}/></FloatingShape></div><div className="community-shape community-shape--slashes"><Slashes theme="green" width={90} height={90}/></div><div className="community-shape community-shape--asterisk"><Asterisk theme="pink" width={100} height={100}/></div><div className="community-shape community-shape--quote"><Quote theme="blue" width={70} height={70}/></div></div>;
}

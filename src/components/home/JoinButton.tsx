import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MagneticButton } from "../motion";
import { useMotionPreference } from "../motion/useMotionPreference";
import { confirmedExternalUrl } from "../../data/site";
export function JoinButton({ url }: { url: string | null }) {
  const href = confirmedExternalUrl(url), reduced = useMotionPreference(), timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [burst, setBurst] = useState(false);
  useEffect(() => () => clearTimeout(timer.current), []);
  const celebrate = () => { if (reduced) return; clearTimeout(timer.current); setBurst(true); timer.current = setTimeout(() => setBurst(false), 1200); };
  return <div className="join-button-wrap"><MagneticButton>{href ? <a href={href} className="brand-button community-join" target="_blank" rel="noopener noreferrer" onClick={celebrate}>Join The Community ↗</a> : <button className="brand-button community-join" disabled>Join The Community ↗</button>}</MagneticButton>{!href && <p className="join-pending">The official chapter registration link is coming soon.</p>}
    {burst && <div className="join-confetti" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <span key={i} style={{ "--angle": `${i * 15}deg`, "--distance": `${90 + i % 4 * 24}px`, "--confetti-color": ["#4285F4", "#EA4335", "#F9AB00", "#34A853"][i % 4] } as CSSProperties}/>)}</div>}
  </div>;
}

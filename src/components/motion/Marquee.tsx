import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useInView } from "motion/react";
import { useMotionPreference } from "./useMotionPreference";
import "./motion.css";

export interface MarqueeProps { children: ReactNode; label: string; items?: readonly string[]; speed?: number; direction?: "left" | "right"; className?: string; controls?: boolean; interactive?: boolean }
export function Marquee({ children, label, items = [], speed = 35, direction = "left", className = "", controls = true, interactive = false }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useMotionPreference();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!interactive || !ref.current) return;
    // Visual copies still respond to a pointer, while the keyboard and assistive
    // technology encounter each original record only once.
    ref.current.querySelectorAll<HTMLElement>('.motion-marquee__group[aria-hidden="true"], [data-marquee-copy]').forEach(copy => {
      copy.querySelectorAll<HTMLElement>('a[href],button,input,select,textarea,[tabindex]').forEach(element => element.tabIndex = -1);
    });
  }, [children, interactive]);
  const style = { "--marquee-duration": `${Math.max(5, speed)}s`, animationDirection: direction === "right" ? "reverse" : "normal", animationPlayState: reduced || paused || !inView ? "paused" : "running" } as CSSProperties;
  return <div ref={ref} className={`motion-marquee ${className}`} data-paused={paused || reduced}>
    <div className="motion-marquee__window" aria-hidden={interactive ? undefined : true}><div className="motion-marquee__track" style={style}>
      <div className="motion-marquee__group" inert={interactive ? undefined : true}>{children}</div><div className="motion-marquee__group" inert={interactive ? undefined : true} aria-hidden="true">{children}</div>
    </div></div>
    <div className="sr-only"><p>{label}</p>{items.length > 0 && <ul>{items.map((item, i) => <li key={`${item}-${i}`}>{item}</li>)}</ul>}</div>
    {controls && <button className="motion-marquee__control" type="button" disabled={reduced} aria-label={`${reduced ? "Motion off:" : paused ? "Resume motion:" : "Pause motion:"} ${label}`} aria-pressed={paused} onClick={() => setPaused(!paused)}>{reduced ? "Motion off" : paused ? "Resume motion" : "Pause motion"}</button>}
  </div>;
}

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useMotionPreference } from "./useMotionPreference";
import "./motion.css";

export function TextRotator({ words, interval = 2200, className = "" }: { words: readonly string[]; interval?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduced = useMotionPreference();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduced || !inView || words.length < 2) return;
    const timer = window.setInterval(() => { if (!document.hidden) setIndex(previous => (previous + 1) % words.length); }, Math.max(1000, interval));
    return () => clearInterval(timer);
  }, [reduced, inView, words.length, interval]);
  if (words.length === 0) return null;
  return <span ref={ref} className={`motion-rotator ${className}`}>
    <span className="sr-only">{words.join(". ")}</span>
    <span className="motion-rotator__sizer" aria-hidden="true">{words.map(word => <span key={word}>{word}</span>)}</span>
    <span className="motion-rotator__words" aria-hidden="true"><AnimatePresence mode="wait" initial={false}>
      <motion.span key={reduced ? "static" : index} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : "-100%" }} transition={{ duration: reduced ? 0 : 0.25 }}>{words[reduced ? 0 : index % words.length]}</motion.span>
    </AnimatePresence></span>
  </span>;
}

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { NotchCard, type ThemeName } from "../shapes";
import { useMotionPreference } from "../motion/useMotionPreference";
import type { StoryMilestone } from "../../lib/story";

export function MilestoneCard({ milestone, index, theme }: { milestone: StoryMilestone; index: number; theme: ThemeName }) {
 const ref = useRef<HTMLLIElement>(null), visible = useInView(ref, { once: true, amount: .15 }), reduced = useMotionPreference();
 const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
 const photoY = useTransform(scrollYProgress, [0, 1], [-12, 12]);
 return <li ref={ref} className={`timeline-item timeline-item--${index % 2 ? "right" : "left"}`} data-theme={theme}>
  <motion.span className="timeline-node" aria-hidden="true" initial={false} animate={{scale: visible || reduced ? 1 : 0}} transition={{ duration: reduced ? 0 : .45, ease: "backOut" }}/>
  <motion.article className="milestone-wrap" initial={false} animate={{opacity: visible || reduced ? 1 : 0, x: visible || reduced ? 0 : index % 2 ? 60 : -60}} transition={{duration: reduced ? 0 : .6}}>
   <NotchCard type="tab" theme={theme} fill="var(--t-bg)" label={String(milestone.year)} className="milestone-card" initialHeight={260}>
    {milestone.sample && <span className="sample-badge">SAMPLE / NOT CHAPTER HISTORY</span>}
    <h3>{milestone.title}</h3><p>{milestone.body}</p>
    {milestone.image && <figure className="milestone-photo"><motion.img src={milestone.image} alt={milestone.sample ? `Sample artwork for ${milestone.title}; not a chapter photograph` : `Illustration of ${milestone.title}`} width={600} height={400} loading="lazy" decoding="async" style={{y: reduced ? 0 : photoY}}/></figure>}
   </NotchCard>
  </motion.article>
 </li>;
}

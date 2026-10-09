import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { useMotionPreference } from "../motion/useMotionPreference";
import { milestoneTheme, type StoryMilestone } from "../../lib/story";
import { MilestoneCard } from "./MilestoneCard";

export function StoryTimeline({ milestones }: { milestones: StoryMilestone[] }) {
 const ref = useRef<HTMLDivElement>(null), reduced = useMotionPreference();
 const { scrollYProgress } = useScroll({target: ref, offset: ["start .75", "end .75"]});
 if (!milestones.length) return <div ref={ref} className="story-empty"><h3>Our milestones are on their way.</h3><p>The chapter's confirmed history will appear here.</p></div>;
 return <div ref={ref} className="story-timeline">
  <motion.div className="timeline-line" aria-hidden="true" style={{scaleY: reduced ? 1 : scrollYProgress}}/>
  <ol>{milestones.map((milestone, index) => <MilestoneCard key={milestone.id} milestone={milestone} index={index} theme={milestoneTheme(index)}/>)}</ol>
 </div>;
}

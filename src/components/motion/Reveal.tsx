import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, type HTMLMotionProps } from "motion/react";
import { useMotionPreference } from "./useMotionPreference";

export interface RevealProps extends HTMLMotionProps<"div"> { direction?: "up" | "down" | "left" | "right"; delay?: number }
export function Reveal({ direction = "up", delay = 0, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useMotionPreference();
  const controls = useAnimation();
  useEffect(() => {
    const offset = reduced ? { x: 0, y: 0 } : { x: direction === "left" ? -40 : direction === "right" ? 40 : 0, y: direction === "down" ? -40 : direction === "up" ? 40 : 0 };
    if (!visible) { controls.set({ opacity: 0, ...offset }); return; }
    void controls.start({ opacity: 1, x: 0, y: 0, transition: { duration: reduced ? 0.15 : 0.6, delay, ease: [0.22, 1, 0.36, 1] } });
    return () => controls.stop();
  }, [visible, reduced, direction, delay, controls]);
  return <motion.div {...props} ref={ref} initial={false} animate={controls}>{children}</motion.div>;
}

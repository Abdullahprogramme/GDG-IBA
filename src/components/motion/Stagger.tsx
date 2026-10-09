import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, type HTMLMotionProps } from "motion/react";
import { useMotionPreference } from "./useMotionPreference";

export function Stagger({ interval = 0.08, children, ...props }: HTMLMotionProps<"div"> & { interval?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const reduced = useMotionPreference();
  useEffect(() => { controls.set("hidden"); if (visible) void controls.start("visible"); return () => controls.stop(); }, [visible, controls]);
  return <motion.div {...props} ref={ref} initial={false} animate={controls} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : interval } } }}>{children}</motion.div>;
}
export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  const reduced = useMotionPreference();
  return <motion.div {...props} variants={{ hidden: { opacity: 0, y: reduced ? 0 : 40 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] } } }}>{children}</motion.div>;
}

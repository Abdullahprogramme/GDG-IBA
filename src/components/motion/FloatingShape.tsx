import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { useMotionPreference } from "./useMotionPreference";
import "./motion.css";

export function FloatingShape({ children, depth = 12, duration = 8, delay = 0, rotate = true, className = "" }: { children: ReactNode; depth?: number; duration?: number; delay?: number; rotate?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useMotionPreference();
  const id = useId();
  const x = useMotionValue(0), y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollOffset = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [depth, -depth]);
  useEffect(() => {
    if (!inView || reduced || !matchMedia("(pointer: fine)").matches) { x.set(0); y.set(0); return; }
    const move = (event: PointerEvent) => { x.set((event.clientX / innerWidth - 0.5) * depth * 2); y.set((event.clientY / innerHeight - 0.5) * depth * 2); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [inView, reduced, depth, x, y]);
  const phase = Array.from(id).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 7;
  return <motion.div ref={ref} className={`motion-floating ${className}`} style={{ y: scrollOffset }} aria-hidden="true">
    <motion.div style={{ x: reduced ? 0 : springX, y: reduced ? 0 : springY }}>
      <div className="motion-floating__loop" data-rotate={rotate} style={{ "--float-duration": `${duration}s`, animationDelay: `${-phase - delay}s`, animationPlayState: reduced || !inView ? "paused" : "running" } as CSSProperties}>{children}</div>
    </motion.div>
  </motion.div>;
}

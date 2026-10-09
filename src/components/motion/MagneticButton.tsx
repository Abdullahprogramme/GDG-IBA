import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "motion/react";
import { useMotionPreference } from "./useMotionPreference";

export function MagneticButton({ children, strength = 0.15, className, ...props }: HTMLMotionProps<"div"> & { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  const x = useMotionValue(0), y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 18 });
  const springY = useSpring(y, { stiffness: 400, damping: 18 });
  return <motion.div {...props} ref={ref} className={className} style={{ display: "inline-flex", x: reduced ? 0 : springX, y: reduced ? 0 : springY }}
    onPointerMove={event => {
      if (reduced || event.pointerType !== "mouse" || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set(Math.max(-12, Math.min(12, (event.clientX - rect.left - rect.width / 2) * strength)));
      y.set(Math.max(-12, Math.min(12, (event.clientY - rect.top - rect.height / 2) * strength)));
    }} onPointerLeave={() => { x.set(0); y.set(0); }} onBlur={() => { x.set(0); y.set(0); }}>{children}</motion.div>;
}

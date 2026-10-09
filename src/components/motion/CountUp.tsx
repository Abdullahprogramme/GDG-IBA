import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useMotionPreference } from "./useMotionPreference";

export function CountUp({ value, duration = 1.6, suffix = "", label, locale = "en-PK", useGrouping = true }: { value: number; duration?: number; suffix?: string; label?: string; locale?: string; useGrouping?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useMotionPreference();
  const [current, setCurrent] = useState(value);
  useEffect(() => {
    if (!visible || reduced) { setCurrent(value); return; }
    const control = animate(0, value, { duration, ease: "easeOut", onUpdate: number => setCurrent(Math.round(number)) });
    return () => control.stop();
  }, [visible, reduced, value, duration]);
  const formatter = new Intl.NumberFormat(locale, { useGrouping });
  const formatted = formatter.format(value) + suffix;
  return <span ref={ref}><span aria-hidden="true">{formatter.format(current)}{suffix}</span><span className="sr-only">{label ? `${label}: ` : ""}{formatted}</span></span>;
}

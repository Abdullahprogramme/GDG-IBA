import { useEffect } from "react";
import { animate, inView, stagger } from "motion";
import { useMotionPreference } from "../motion/useMotionPreference";
/** Enhance static Astro headings and artwork without hydrating each text block. */
export function HomeEffects() {
  const reduced = useMotionPreference();
  useEffect(() => {
    const animations: ReturnType<typeof animate>[] = [];
    const stops = Array.from(document.querySelectorAll<HTMLElement>(".home-section .section-heading")).map(element => inView(element, () => {
      animations.push(animate(element, { opacity: [0, 1], y: reduced ? [0, 0] : [24, 0] }, { duration: .5 }));
    }, { amount: .2 }));
    const cloud = document.querySelector<HTMLElement>(".keyword-cloud");
    const observer = cloud ? new IntersectionObserver(([entry]) => {
      cloud.dataset.loopVisible = String(entry.isIntersecting);
    }, { threshold: .1 }) : undefined;
    if (cloud) {
      observer?.observe(cloud);
      stops.push(inView(cloud, () => { animations.push(animate(Array.from(cloud.children), { opacity: [0, 1], scale: reduced ? [1, 1] : [.6, 1] }, { duration: .5, delay: stagger(reduced ? 0 : .05) })); }));
    }
    return () => { stops.forEach(stop => stop()); observer?.disconnect(); animations.forEach(animation => animation.stop()); };
  }, [reduced]);
  return null;
}

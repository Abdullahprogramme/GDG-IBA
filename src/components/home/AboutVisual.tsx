import { useEffect, useId, useRef } from "react";
import { motion, useAnimationControls, useInView } from "motion/react";
import { NotchCard, PhotoFrame, TripleCircle, Globe, Pill } from "../shapes";
import { Reveal, FloatingShape } from "../motion";
import { useMotionPreference } from "../motion/useMotionPreference";
export function AboutVisual({ src, alt, sample }: { src: string; alt: string; sample: boolean }) {
  const ref = useRef<HTMLDivElement>(null), visible = useInView(ref), reduced = useMotionPreference();
  const ring = `about-ring-${useId().replace(/:/g, "")}`;
  const image = useAnimationControls(), entered = useInView(ref, { once: true, amount: .15 });
  useEffect(() => {
    image.set(reduced ? { opacity: 0, clipPath: "inset(0% 0% 0% 0%)" } : { opacity: 1, clipPath: "inset(100% 0% 0% 0%)" });
    if (entered) void image.start({ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", transition: { duration: reduced ? .15 : .9 } });
    return () => image.stop();
  }, [entered, reduced, image]);
  return <Reveal direction="right" delay={.15}><div ref={ref} className="about-visual" data-loop-visible={visible}>
    <NotchCard theme="blue" className="about-collage" padded={false} initialWidth={520} initialHeight={450}>
      <motion.div className="about-picture" initial={false} animate={image}>
        <PhotoFrame src={src} alt={alt} theme="blue" icon="code-heart" imageWidth={800} imageHeight={600}/>
      </motion.div>
      <span className="about-card-note mono-label">{sample ? "AN ILLUSTRATION OF WHAT WE BUILD" : "OUR COMMUNITY, IN REAL LIFE"}</span>
    </NotchCard>
    <div className="about-sticker about-sticker--circles"><FloatingShape depth={6}><TripleCircle theme="yellow" width={120} height={65}/></FloatingShape></div>
    <div className="about-sticker about-sticker--pill"><Pill theme="blue" width={140} height={54}/><span>build together</span></div>
    <div className="about-sticker about-sticker--globe"><Globe theme="green" width={70} height={70}/></div>
    <svg className="about-badge" width="130" height="130" viewBox="0 0 130 130" aria-hidden="true">
      <defs><path id={ring} d="M65 65m-48 0a48 48 0 1 1 96 0a48 48 0 1 1-96 0"/></defs>
      <circle cx="65" cy="65" r="63" fill="#FFE7A5" stroke="#1E1E1E" strokeWidth="1.5"/>
      <text fontSize="10" fontFamily="Google Sans Mono,monospace" letterSpacing="1"><textPath href={`#${ring}`}>GOOGLE DEVELOPER GROUPS ON CAMPUS • </textPath></text>
      <path d="M52 53 40 65 52 77m26-24 12 12-12 12m-13-29-6 34" fill="none" stroke="#1E1E1E" strokeWidth="3"/>
    </svg>
  </div></Reveal>;
}

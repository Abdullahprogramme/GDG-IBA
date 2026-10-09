import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView, useMotionValue, useSpring } from "motion/react";
import { FloatingShape } from "../motion/FloatingShape";
import { useMotionPreference } from "../motion/useMotionPreference";
import { Globe, TripleCircle, Slashes, Asterisk, Arrow, Brace, Quote, Pill, DonutArc } from "../shapes";

export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref), reduced = useMotionPreference();
  const entered = useInView(ref, { once: true, amount: .15 }), pop = useAnimationControls();
  useEffect(() => {
    pop.set({ opacity: 0, scale: reduced ? 1 : 0 });
    if (entered) void pop.start(index => ({ opacity: 1, scale: 1, transition: reduced ? { duration: .15 } : { type: "spring", stiffness: 260, damping: 24, delay: .4 + index * .08 } }));
    return () => pop.stop();
  }, [entered, reduced, pop]);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 100, damping: 20 });
  return <div ref={ref} className="hero-scene" aria-hidden="true" data-loop-visible={inView}
    onPointerMove={event => {
      if (reduced || event.pointerType !== "mouse") return;
      const bounds = event.currentTarget.getBoundingClientRect();
      x.set((.5 - (event.clientY - bounds.top) / bounds.height) * 20);
      y.set(((event.clientX - bounds.left) / bounds.width - .5) * 20);
    }} onPointerLeave={() => { x.set(0); y.set(0); }}>
    <div className="hero-orbit hero-orbit--one"/><div className="hero-orbit hero-orbit--two"/>
    <motion.div className="hero-sprite" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }} initial={false}>
      <div className="hero-sprite__float"><img src="/3d/build-sprite.svg" width={520} height={480} alt="" fetchPriority="high" decoding="async"/></div>
    </motion.div>
    <motion.div initial={false} animate={pop} custom={0} className="hero-object hero-object--globe"><FloatingShape depth={8} rotate={false}><Globe theme="blue" width={100} height={100}/></FloatingShape></motion.div>
    <motion.div initial={false} animate={pop} custom={1} className="hero-object hero-object--circles"><FloatingShape depth={14} duration={9}><TripleCircle theme="pink" width={130} height={70}/></FloatingShape></motion.div>
    <motion.div initial={false} animate={pop} custom={3} className="hero-object hero-object--slashes"><FloatingShape depth={10} duration={7}><Slashes theme="green" width={92} height={92}/></FloatingShape></motion.div>
    <motion.div initial={false} animate={pop} custom={4} className="hero-object hero-object--asterisk"><FloatingShape depth={12} duration={10}><Asterisk theme="yellow" width={90} height={90}/></FloatingShape></motion.div>
    <motion.div initial={false} animate={pop} custom={5} className="hero-object hero-object--arrow"><Arrow theme="blue" width={140} height={70}/></motion.div>
    <motion.div initial={false} animate={pop} custom={6} className="hero-object hero-object--brace"><Brace theme="pink" width={58} height={100}/></motion.div>
    <motion.div initial={false} animate={pop} custom={7} className="hero-object hero-object--quote"><Quote theme="green" width={70} height={70}/></motion.div>
    <motion.div initial={false} animate={pop} custom={8} className="hero-object hero-object--pill"><Pill theme="yellow" width={136} height={52}/></motion.div>
    <motion.div initial={false} animate={pop} custom={9} className="hero-object hero-object--arc"><DonutArc theme="pink" width={100} height={100}/></motion.div>
    <span className="hero-scene-note">little ideas. big possibilities.</span>
  </div>;
}

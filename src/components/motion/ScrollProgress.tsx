import { motion, useScroll } from "motion/react";
export function ScrollProgress() {
  const { scrollYProgress } = useScroll({ trackContentSize: true });
  return <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX: scrollYProgress, transformOrigin: "left", position: "fixed", top: 0, left: 0, right: 0, height: 4, zIndex: 70, background: "linear-gradient(90deg,#4285F4,#EA4335,#F9AB00,#34A853)" }} />;
}

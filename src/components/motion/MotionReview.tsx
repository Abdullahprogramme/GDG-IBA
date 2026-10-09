import { Reveal, Stagger, StaggerItem, Marquee, FloatingShape, CountUp, TextRotator, MagneticButton } from "./index";
import { Globe, Slashes, TripleCircle } from "../shapes";
export function MotionReview() {
  return <div className="motion-review">
    <Reveal><h2>Learn. Build. <TextRotator words={["Belong.", "Grow.", "Create."]} /></h2><p>Sample motion studies, not chapter statistics.</p></Reveal>
    <Stagger className="motion-review__grid">{["Reveal", "Stagger", "Count up"].map(label => <StaggerItem key={label}><div className="motion-review__tile"><h3>{label}</h3><CountUp value={42} label="Sample number" /><p>Sample value</p></div></StaggerItem>)}</Stagger>
    <div className="motion-review__grid" data-theme="yellow"><FloatingShape rotate={false}><Globe /></FloatingShape><FloatingShape><Slashes /></FloatingShape><FloatingShape><TripleCircle /></FloatingShape></div>
    <MagneticButton><a className="brand-button" href="#motion-end">Try an anchor <span aria-hidden="true">↓</span></a></MagneticButton>
    <Marquee label="Sample learning topics" items={["Learn", "Build", "Belong"]}>{["Learn", "Build", "Belong", "Learn", "Build", "Belong"].map((word, i) => <span className="brand-chip" key={i}>{word}</span>)}</Marquee>
    <div id="motion-end" style={{ paddingBlock: 120 }}><Reveal direction="left"><h2>Room to grow.</h2></Reveal></div>
  </div>;
}

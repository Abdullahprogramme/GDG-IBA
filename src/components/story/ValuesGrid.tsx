import { useRef, type ComponentType } from "react";
import { useInView } from "motion/react";
import { Asterisk, TripleCircle, People, Chevrons, CodeHeart, Arrow, type ThemeName } from "../shapes";
import { Reveal } from "../motion";
const values = [
 { title: "Curiosity", description: "Ask questions. Explore a new idea.", icon: Asterisk, theme: "blue" },
 { title: "Collaboration", description: "Share what you know and build together.", icon: TripleCircle, theme: "pink" },
 { title: "Inclusion", description: "Every programme. Every starting point.", icon: People, theme: "green" },
 { title: "Learning by building", description: "Try, make, test and try again.", icon: Chevrons, theme: "yellow" },
 { title: "Open source spirit", description: "Work in the open. Help others contribute.", icon: CodeHeart, theme: "blue" },
 { title: "Giving back", description: "Make the next person's first step easier.", icon: Arrow, theme: "pink" },
] satisfies { title: string; description: string; icon: ComponentType<{theme?: ThemeName; width?: number; height?: number}>; theme: ThemeName }[];

export function ValuesGrid() {
 const ref = useRef<HTMLUListElement>(null), visible = useInView(ref, { amount: .1 });
 return <ul ref={ref} className="values-grid" data-visible={visible}>{values.map(({ title, description, icon: Icon, theme }, index) => <li key={title} data-theme={theme}>
  <Reveal delay={index * .05}><div className="value-pill"><Icon theme={theme} width={40} height={40}/><div><h3>{title}</h3><p>{description}</p></div></div></Reveal>
 </li>)}</ul>;
}

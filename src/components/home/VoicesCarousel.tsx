import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "../ui/carousel";
import { SpeakerCard } from "../speakers/SpeakerCard";
import { Quote } from "../shapes";
import { useMotionPreference } from "../motion/useMotionPreference";
import type { SpeakerProfile } from "../../lib/home";

export function VoicesCarousel({ speakers }: { speakers: SpeakerProfile[] }) {
  const ref = useRef<HTMLDivElement>(null), visible = useInView(ref, { amount: .15 }), reduced = useMotionPreference();
  const autoplay = useRef(Autoplay({ delay: 5500, playOnInit: false, stopOnInteraction: true, stopOnMouseEnter: true, stopOnFocusIn: true }));
  const [api, setApi] = useState<CarouselApi>(), [selected, setSelected] = useState(0), [paused, setPaused] = useState(false), [hovered, setHovered] = useState(false), [tabVisible, setTabVisible] = useState(true), [hydrated, setHydrated] = useState(false);
  // Two partial-width slides cannot satisfy Embla's loop geometry. Decorative
  // copies supply the track length while dots and announcements retain two items.
  const slides = speakers.length === 2 ? [...speakers, ...speakers, ...speakers] : speakers;
  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    const update = () => setTabVisible(!document.hidden);
    update(); document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update(); api.on("select", update); api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);
  useEffect(() => {
    if (!api) return;
    const plugin = autoplay.current;
    if (visible && !reduced && !paused && !hovered && tabVisible && speakers.length > 1) plugin.play(); else plugin.stop();
    return () => plugin.stop();
  }, [api, visible, reduced, paused, hovered, tabVisible, speakers.length]);
  if (!speakers.length) return <div className="empty-state"><Quote width={64} height={64}/><h3>Speaker line-up dropping soon.</h3><p>Fresh perspectives and practical ideas are on their way.</p></div>;
  const goTo = (logical: number) => {
    const distance = (index: number) => Math.min(Math.abs(index - selected), slides.length - Math.abs(index - selected));
    const target = slides.map((_, index) => index).filter(index => index % speakers.length === logical).sort((a, b) => distance(a) - distance(b))[0];
    setPaused(true); api?.scrollTo(target);
  };
  return <div ref={ref} className={`voices-carousel ${speakers.length === 1 ? "voices-carousel--single" : ""}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={event => { if (!(event.target as Element).closest(".carousel-play")) setPaused(true); }} onPointerDown={event => { if (!(event.target as Element).closest(".carousel-play")) setPaused(true); }} onClickCapture={event => { if ((event.target as Element).closest("button:not(.carousel-play)")) setPaused(true); }}>
    <Carousel opts={{ loop: speakers.length > 1, align: "center", duration: reduced ? 0 : 30 }} plugins={[autoplay.current]} setApi={setApi} aria-label="Voices on stage">
      <CarouselContent className="voices-track">{slides.map((speaker, index) => <CarouselItem key={`${speaker.id}-${index}`} className="voice-slide" aria-label={`${index % speakers.length + 1} of ${speakers.length}`} data-active={selected === index} aria-hidden={hydrated ? selected !== index : index >= speakers.length} inert={(hydrated ? selected !== index : index >= speakers.length) ? true : undefined}><SpeakerCard speaker={speaker}/></CarouselItem>)}</CarouselContent>
      <div className="carousel-controls"><CarouselPrevious className="carousel-arrow"/><div className="carousel-dots" aria-label="Choose a speaker">{speakers.map((speaker, index) => <button key={speaker.id} className={`carousel-dot dot-${index % 4}`} aria-label={`Show ${speaker.name}`} aria-current={selected % speakers.length === index ? "true" : undefined} onClick={() => goTo(index)}/>)}</div><CarouselNext className="carousel-arrow"/><button className="carousel-play" disabled={reduced || speakers.length < 2} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{reduced ? "Motion off" : paused ? "Play slides" : "Pause slides"}</button></div>
      <p className="sr-only" aria-live={paused || reduced ? "polite" : "off"}>{speakers[selected % speakers.length]?.name}, slide {selected % speakers.length + 1} of {speakers.length}</p>
    </Carousel>
  </div>;
}

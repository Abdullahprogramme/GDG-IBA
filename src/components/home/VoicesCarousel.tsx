import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "../ui/carousel";
import { SpeakerCard } from "../speakers/SpeakerCard";
import { Quote } from "../shapes";
import { useMotionPreference } from "../motion/useMotionPreference";
import type { SpeakerProfile } from "../../lib/home";

export function VoicesCarousel({ speakers }: { speakers: SpeakerProfile[] }) {
  const featuredSpeakers = speakers.slice(0, 5);
  const reduced = useMotionPreference();
  const autoplay = useRef(
    Autoplay({
      delay: 5500,
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  );
  const [api, setApi] = useState<CarouselApi>(),
    [selected, setSelected] = useState(0),
    [paused, setPaused] = useState(false),
    [tabVisible, setTabVisible] = useState(true),
    [hydrated, setHydrated] = useState(false);
  // Two partial-width slides cannot satisfy Embla's loop geometry. Decorative
  // copies supply the track length while dots and announcements retain two items.
  const slides =
    featuredSpeakers.length === 2
      ? [...featuredSpeakers, ...featuredSpeakers, ...featuredSpeakers]
      : featuredSpeakers;
  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    const update = () => setTabVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);
  useEffect(() => {
    if (!api) return;
    const plugin = autoplay.current;
    if (!reduced && !paused && tabVisible && featuredSpeakers.length > 1) plugin.play();
    else plugin.stop();
    return () => plugin.stop();
  }, [api, reduced, paused, tabVisible, featuredSpeakers.length]);
  if (!featuredSpeakers.length)
    return (
      <div className="empty-state">
        <Quote width={64} height={64} />
        <h3>Speaker line-up dropping soon.</h3>
        <p>Fresh perspectives and practical ideas are on their way.</p>
      </div>
    );
  const goTo = (logical: number) => {
    const distance = (index: number) =>
      Math.min(Math.abs(index - selected), slides.length - Math.abs(index - selected));
    const target = slides
      .map((_, index) => index)
      .filter((index) => index % featuredSpeakers.length === logical)
      .sort((a, b) => distance(a) - distance(b))[0];
    setPaused(true);
    api?.scrollTo(target);
  };
  const togglePlayback = () => {
    setPaused((value) => {
      const next = !value;
      if (!next) autoplay.current.play();
      else autoplay.current.stop();
      return next;
    });
  };
  return (
    <div
      className={`voices-carousel ${featuredSpeakers.length === 1 ? "voices-carousel--single" : ""}`}
      onFocusCapture={(event) => {
        if (!(event.target as Element).closest(".carousel-play")) setPaused(true);
      }}
      onPointerDown={(event) => {
        if (!(event.target as Element).closest(".carousel-play")) setPaused(true);
      }}
      onClickCapture={(event) => {
        if ((event.target as Element).closest("button:not(.carousel-play)")) setPaused(true);
      }}
    >
      <Carousel
        opts={{ loop: featuredSpeakers.length > 1, align: "center", duration: reduced ? 0 : 30 }}
        plugins={[autoplay.current]}
        setApi={setApi}
        aria-label="Voices on stage"
      >
        <CarouselContent className="voices-track">
          {slides.map((speaker, index) => (
            <CarouselItem
              key={`${speaker.id}-${index}`}
              className="voice-slide"
              aria-label={`${(index % featuredSpeakers.length) + 1} of ${featuredSpeakers.length}`}
              data-active={selected === index}
              aria-hidden={hydrated ? selected !== index : index >= featuredSpeakers.length}
              inert={
                (hydrated ? selected !== index : index >= featuredSpeakers.length)
                  ? true
                  : undefined
              }
            >
              <SpeakerCard speaker={speaker} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="carousel-controls">
          <CarouselPrevious className="carousel-arrow" />
          <div className="carousel-dots" aria-label="Choose a speaker">
            {featuredSpeakers.map((speaker, index) => (
              <button
                key={speaker.id}
                className={`carousel-dot dot-${index % 4}`}
                aria-label={`Show ${speaker.name}`}
                aria-current={selected % featuredSpeakers.length === index ? "true" : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <CarouselNext className="carousel-arrow" />
          <button
            className="carousel-play"
            disabled={reduced || featuredSpeakers.length < 2}
            aria-pressed={paused}
            onClick={togglePlayback}
          >
            {reduced ? "Motion off" : paused ? "Play slides" : "Pause slides"}
          </button>
        </div>
        <p className="sr-only" aria-live={paused || reduced ? "polite" : "off"}>
          {featuredSpeakers[selected % featuredSpeakers.length]?.name}, slide{" "}
          {(selected % featuredSpeakers.length) + 1} of {featuredSpeakers.length}
        </p>
      </Carousel>
    </div>
  );
}

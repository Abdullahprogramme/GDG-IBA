import { useRef } from "react";
import { useInView } from "motion/react";
import { Marquee } from "../motion";
import { NotchCard } from "../shapes";
import { fillTrack, type GalleryPhoto } from "../../lib/home";
export function GalleryStrip({ photos, fullPageAvailable = false }: { photos: GalleryPhoto[]; fullPageAvailable?: boolean }) {
  const ref = useRef<HTMLDivElement>(null), visible = useInView(ref);
  if (!photos.length) return <div className="site-container empty-state"><h3>We’re making memories.</h3><p>Chapter photographs will be shared here after our first moments together.</p></div>;
  return <div ref={ref} className="gallery-stage" data-loop-visible={visible}>
    {[0, 1, 2].map(row => <Marquee key={row} label={`Snapshots row ${row + 1}`} items={row === 0 ? photos.map(photo => photo.alt) : []} direction={row % 2 ? "right" : "left"} speed={30 + row * 10} className={`gallery-track gallery-track--${row}`} interactive>
      {fillTrack(row % 2 ? [...photos].reverse() : photos).map(({ item: photo, copy }, index) => <figure key={`${photo.id}-${copy}`} aria-hidden="true" className={`gallery-photo gallery-photo--${(index + row) % 3}`}><img src={photo.src} alt="" width={photo.width} height={photo.height} loading="lazy" decoding="async"/>{photo.sample && <figcaption>Sample illustration</figcaption>}</figure>)}
    </Marquee>)}
    <div className="gallery-overlay"><NotchCard type="tab" label="Snapshots" theme="green" className="gallery-overlay-card"><p className="mono-label">A LITTLE LOOK AROUND</p><h3>A glimpse into our most memorable moments.</h3>{fullPageAvailable ? <a className="brand-button" href="/gallery">View Gallery ↗</a> : <><span className="brand-button brand-button--ghost" aria-disabled="true">View Gallery ↗</span><p className="gallery-pending">Full gallery coming soon.</p></>}</NotchCard></div>
  </div>;
}

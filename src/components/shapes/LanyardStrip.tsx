import type { HTMLAttributes } from "react";
import { Chevrons } from "./Chevrons";
import { Asterisk } from "./Asterisk";
import { Arrow } from "./Arrow";
import { Globe } from "./Globe";
import { Scallop } from "./Scallop";

/** Static artwork track. Step 5 supplies reusable marquee motion. */
export function LanyardStrip({ repeats = 3, className, ...props }: HTMLAttributes<HTMLDivElement> & { repeats?: number }) {
  return <div {...props} className={["brand-lanyard", className].filter(Boolean).join(" ")} aria-hidden="true">
    <div className="brand-lanyard__track">
      {Array.from({ length: Math.max(1, Math.min(12, Math.floor(repeats))) }, (_, i) => <div key={i} className="brand-lanyard__repeat">
        <Chevrons variant="outline" monochrome /><Asterisk /><Arrow /><Globe /><Scallop dir="down" count={3} /><Asterisk /><Arrow /><Globe /><Scallop dir="up" count={3} />
      </div>)}
    </div>
  </div>;
}

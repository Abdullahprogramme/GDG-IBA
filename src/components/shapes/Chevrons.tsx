import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
import { markPaths } from "./markPaths";
import { INK } from "./themes";

export interface ChevronsProps extends ShapeProps { surface?: "light" | "dark"; monochrome?: boolean }

export function Chevrons({ theme, surface = "light", monochrome = false, variant, ...props }: ChevronsProps) {
  return <ShapeSvg viewBox="-2 -2 36 21" width={144} height={84} theme={theme} strokeWidth={1.5} {...props}>
    {markPaths.map(({ d, fill }, i) => <path key={i} d={d}
      fill={variant === "outline" ? "none" : monochrome ? INK : theme ? `var(--t-logo-${i === 0 || i === 3 ? "a" : "b"})` : fill}
      stroke={surface === "dark" && variant !== "outline" ? "none" : INK} />)}
  </ShapeSvg>;
}

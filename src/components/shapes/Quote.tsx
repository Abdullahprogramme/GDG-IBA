import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export function Quote({ kind = "open", ...props }: ShapeProps & { kind?: "open" | "close" }) {
  return <ShapeSvg viewBox="0 0 120 100" height={100} tone="core" {...props}>
    <g transform={kind === "close" ? "translate(120 100) rotate(180)" : undefined}>
      <path d="M8 92 V55 Q8 12 49 8 V28 Q28 32 28 52 H49 V92 Z M69 92 V55 Q69 12 110 8 V28 Q89 32 89 52 H110 V92 Z" />
    </g>
  </ShapeSvg>;
}

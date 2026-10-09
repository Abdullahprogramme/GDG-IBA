import { ShapeSvg, type ShapeProps } from "./ShapeSvg";

export function Pill({ orientation = "horizontal", ...props }: ShapeProps & { orientation?: "horizontal" | "vertical" }) {
  const vertical = orientation === "vertical";
  return <ShapeSvg viewBox={vertical ? "0 0 64 160" : "0 0 160 64"} width={vertical ? 64 : 160} height={vertical ? 160 : 64} tone="core" {...props}>
    <rect x="3" y="3" width={vertical ? 58 : 154} height={vertical ? 154 : 58} rx="29" />
  </ShapeSvg>;
}

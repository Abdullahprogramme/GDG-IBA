import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export function Scallop({ count = 4, dir = "up", ...props }: Omit<ShapeProps, "dir"> & { count?: number; dir?: "up" | "down" }) {
  const arches = Math.max(1, Math.min(24, Math.floor(count)));
  return <ShapeSvg variant="outline" viewBox={`0 0 ${arches * 40 + 8} 48`} width={arches * 40 + 8} height={48} {...props}>
    <path d={Array.from({ length: arches }, (_, i) => `M${i * 40 + 4} ${dir === "up" ? 44 : 4} A20 40 0 0 ${dir === "up" ? 1 : 0} ${i * 40 + 44} ${dir === "up" ? 44 : 4}`).join(" ")} />
  </ShapeSvg>;
}

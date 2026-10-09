import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export function DonutArc(props: ShapeProps) {
  return <ShapeSvg tone="core" {...props}><path d="M60 6 A54 54 0 0 0 60 114 V88 A28 28 0 0 1 60 32 Z" /></ShapeSvg>;
}

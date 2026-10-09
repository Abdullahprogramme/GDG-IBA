import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export function Bars(props: ShapeProps) {
  return <ShapeSvg viewBox="0 0 160 100" width={160} height={100} tone="core" {...props}><rect x="4" y="4" width="152" height="38" rx="19" /><rect x="4" y="58" width="152" height="38" rx="19" /></ShapeSvg>;
}

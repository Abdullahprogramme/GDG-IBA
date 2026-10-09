import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export function People({ count = 3, ...props }: ShapeProps & { count?: 3 | 4 }) {
  return <ShapeSvg variant="outline" viewBox={`0 0 ${count * 40 + 8} 72`} width={count * 40 + 8} height={72} {...props}>
    {Array.from({ length: count }, (_, i) => <path key={i} d={`M${i * 40 + 4} 68 V28 A20 20 0 0 1 ${i * 40 + 44} 28 V68`} />)}
  </ShapeSvg>;
}

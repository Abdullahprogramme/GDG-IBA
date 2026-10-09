import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export function Lines({ count = 2, ...props }: ShapeProps & { count?: 2 | 3 }) {
  return <ShapeSvg variant="outline" viewBox="0 0 120 80" height={80} {...props}>
    {Array.from({ length: count }, (_, i) => <path key={i} d={`M8 ${20 + i * 22} H112`} />)}
  </ShapeSvg>;
}

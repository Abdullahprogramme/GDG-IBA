import { ShapeSvg, type ShapeProps } from "./ShapeSvg";

export function TripleCircle({ layout = "row", merged = false, ...props }: ShapeProps & { layout?: "row" | "stack"; merged?: boolean }) {
  const vertical = layout === "stack";
  const length = merged ? 146 : 184;
  return <ShapeSvg viewBox={vertical ? `0 0 64 ${length}` : `0 0 ${length} 64`} width={vertical ? 64 : length} height={vertical ? length : 64} strokeWidth={1.5} {...props}>
    <g transform={vertical ? "translate(64 0) rotate(90)" : undefined}>
      {merged ? <path d="M53 11 A29 29 0 1 0 53 53 A29 29 0 0 0 93 53 A29 29 0 1 0 93 11 A29 29 0 0 0 53 11 Z" /> : [32, 92, 152].map(cx => <circle key={cx} cx={cx} cy="32" r="29" />)}
    </g>
  </ShapeSvg>;
}

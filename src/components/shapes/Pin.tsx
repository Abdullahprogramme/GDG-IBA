import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export function Pin(props: ShapeProps) {
  return <ShapeSvg {...props}><path fillRule="evenodd" d="M60 116 C48 100 18 70 18 46 A42 42 0 0 1 102 46 C102 70 72 100 60 116 Z M60 26 A20 20 0 1 0 60 66 A20 20 0 1 0 60 26 Z" /></ShapeSvg>;
}

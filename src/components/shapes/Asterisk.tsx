import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export function Asterisk(props: ShapeProps) {
  return <ShapeSvg variant="outline" {...props}><path d="M60 8 V112 M8 60 H112 M23 23 L97 97 M23 97 L97 23" /></ShapeSvg>;
}

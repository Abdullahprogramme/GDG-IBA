import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export function CodeHeart(props: ShapeProps) {
  return <ShapeSvg variant="outline" viewBox="0 0 160 120" width={160} {...props}><path d="M59 20 L9 60 L59 100 M90 18 C156 -10 170 60 108 60 C170 60 156 130 90 102" /></ShapeSvg>;
}

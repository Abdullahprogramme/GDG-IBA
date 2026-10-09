import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export function Globe(props: ShapeProps) {
  return <ShapeSvg variant="outline" {...props}><circle cx="60" cy="60" r="54" /><ellipse cx="60" cy="60" rx="24" ry="54" /><path d="M12 36 H108 M12 84 H108" /></ShapeSvg>;
}

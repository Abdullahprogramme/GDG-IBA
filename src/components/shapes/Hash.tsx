import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export function Hash(props: ShapeProps) {
  return <ShapeSvg tone="core" {...props}><path fillRule="evenodd" d="M36 6 H54 L50 32 H72 L76 6 H94 L90 32 H110 V50 H86 L82 72 H106 V90 H78 L74 114 H56 L60 90 H38 L34 114 H16 L20 90 H6 V72 H24 L28 50 H10 V32 H32 Z M46 50 L42 72 H64 L68 50 Z" /></ShapeSvg>;
}

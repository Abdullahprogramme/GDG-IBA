import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export type Direction = "right" | "down" | "left" | "up";
export interface ArrowProps extends Omit<ShapeProps, "variant" | "dir"> { variant?: "line" | "block"; dir?: Direction }
export function Arrow({ variant = "line", dir = "right", ...props }: ArrowProps) {
  const rotate = { right: 0, down: 90, left: 180, up: 270 }[dir];
  const vertical = dir === "up" || dir === "down";
  const line = variant === "line";
  return <ShapeSvg viewBox={line ? (vertical ? "44 0 72 160" : "0 44 160 72") : "0 0 160 160"} width={line && vertical ? 72 : 160} height={line && !vertical ? 72 : 160} variant={line ? "outline" : "filled"} tone="core" {...props}>
    <g transform={`rotate(${rotate} 80 80)`}>
      {variant === "line" ? <path d="M8 80 H152 M118 48 Q118 80 152 80 Q118 80 118 112" /> : <path d="M8 58 H94 V20 L152 80 L94 140 V102 H8 Z" />}
    </g>
  </ShapeSvg>;
}

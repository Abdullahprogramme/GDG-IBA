import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export interface BraceProps extends Omit<ShapeProps, "variant"> { variant?: "thin" | "block" | "coil"; side?: "left" | "right" }
export function Brace({ variant = "thin", side = "left", ...props }: BraceProps) {
  return <ShapeSvg viewBox="0 0 80 160" width={80} height={160} variant={variant === "block" ? "filled" : "outline"} tone="core" {...props}>
    <g transform={side === "right" ? "translate(80 0) scale(-1 1)" : undefined}>
      {variant === "block" ? <path d="M72 5 H8 V155 H72 V123 H40 V37 H72 Z" /> : variant === "coil" ? <path d="M72 4 C24 4 24 36 54 36 C24 36 24 64 54 64 Q30 64 8 80 Q30 96 54 96 C24 96 24 124 54 124 C24 124 24 156 72 156" /> : <path d="M68 6 Q36 6 36 38 V56 Q36 80 8 80 Q36 80 36 104 V122 Q36 154 68 154" />}
    </g>
  </ShapeSvg>;
}

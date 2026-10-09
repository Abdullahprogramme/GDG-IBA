import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
export function Comma({ semicolon = false, ...props }: ShapeProps & { semicolon?: boolean }) {
  return <ShapeSvg viewBox="0 0 64 120" width={64} tone="core" {...props}>
    {semicolon && <circle cx="32" cy="22" r="17" />}
    <path d="M49 54 V72 Q49 104 15 114 V96 Q32 89 32 82 A18 18 0 1 1 49 54 Z" />
  </ShapeSvg>;
}

import type { SVGProps } from "react";
import { INK, shapeFill, themeStyle, type ShapeTone, type ThemeName } from "./themes";
import "./shapes.css";

export interface ShapeProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  theme?: ThemeName;
  tone?: ShapeTone;
  variant?: "filled" | "outline";
}

export function ShapeSvg({
  theme, tone = "halftone", variant = "filled", className, style,
  viewBox = "0 0 120 120", width = 120, height = 120,
  children, ...props
}: ShapeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox} width={width} height={height}
      fill={variant === "outline" ? "none" : shapeFill(tone)}
      stroke={INK} strokeWidth={variant === "outline" ? 1.5 : 2}
      strokeLinecap="round" strokeLinejoin="round"
      {...props}
      className={["brand-shape", className].filter(Boolean).join(" ")}
      style={{ ...themeStyle(theme), ...style }}
      preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"
    >
      {children}
    </svg>
  );
}

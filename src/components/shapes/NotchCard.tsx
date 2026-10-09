import { useEffect, useId, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { createNotchPath, type NotchPosition, type NotchType } from "./notchGeometry";
import { INK, themeStyle, type ThemeName } from "./themes";
import "./shapes.css";

export interface NotchCardProps extends HTMLAttributes<HTMLDivElement> {
  theme?: ThemeName;
  type?: NotchType;
  notch?: NotchPosition;
  notches?: readonly NotchPosition[];
  tabPosition?: "top-left" | "bottom-left";
  label?: ReactNode;
  initialWidth?: number;
  initialHeight?: number;
  radius?: number;
  fill?: string;
  /** Frames manage their own padding; regular cards use safe content insets. */
  padded?: boolean;
}

export function NotchCard({
  theme, type = "step", notch = "top-right", notches,
  tabPosition = "top-left", label, initialWidth = 640, initialHeight = 360,
  radius, fill = "#FFFFFF", padded = true, className, style, children, ...props
}: NotchCardProps) {
  const root = useRef<HTMLDivElement>(null);
  const id = `notch-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const measure = () => {
      // Transformed cards must measure their layout box, not a rotated rectangle.
      const computed = getComputedStyle(element);
      const width = Number.parseFloat(computed.width), height = Number.parseFloat(computed.height);
      if (width < 16 || height < 16) return;
      setSize(previous => Math.abs(previous.width - width) < 0.5 && Math.abs(previous.height - height) < 0.5 ? previous : { width, height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const path = createNotchPath({ ...size, type, notches: notches ?? [notch], tabPosition, radius });
  const tabHeight = Math.min(48, (size.height - 3) * 0.2);
  const rootStyle: CSSProperties & { "--notch-tab-height": string } = {
    minHeight: initialHeight, ...themeStyle(theme), "--notch-tab-height": `${tabHeight}px`, ...style,
  };
  const bodyStyle: CSSProperties = type === "step" ? {
    paddingTop: Math.max(28, size.height * 0.18),
    paddingBottom: Math.max(28, size.height * 0.18),
    paddingInline: "8%",
  } : {};
  return <div {...props} ref={root} className={["brand-notch", className].filter(Boolean).join(" ")} style={rootStyle} data-type={type} data-tab-position={tabPosition}>
    <svg className="brand-notch__surface" viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs><clipPath id={id} clipPathUnits="objectBoundingBox"><path d={path} transform={`scale(${1 / size.width} ${1 / size.height})`} /></clipPath></defs>
      <path d={path} fill={fill} />
    </svg>
    <div className="brand-notch__content" style={{ clipPath: `url(#${id})` }}>
      {padded ? <div className="brand-notch__body" style={bodyStyle}>{children}</div> : children}
      {type === "tab" && label && <div className="brand-notch__label">{label}</div>}
    </div>
    <svg className="brand-notch__surface" style={{ zIndex: 2 }} viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={path} fill="none" stroke={INK} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  </div>;
}

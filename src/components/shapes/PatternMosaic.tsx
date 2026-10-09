import type { HTMLAttributes } from "react";
import { Pill } from "./Pill";
import { Scallop } from "./Scallop";
import { Globe } from "./Globe";
import { Brace } from "./Brace";
import { TripleCircle } from "./TripleCircle";
import { Asterisk } from "./Asterisk";
import { Slashes } from "./Slashes";
import { Lines } from "./Lines";
import { Arrow } from "./Arrow";
import { People } from "./People";
import { ShapeSvg } from "./ShapeSvg";
import { themeStyle, type ThemeName } from "./themes";

export function PatternMosaic({ theme = "blue", className, style, ...props }: HTMLAttributes<HTMLDivElement> & { theme?: ThemeName }) {
  return <div {...props} className={["brand-mosaic", className].filter(Boolean).join(" ")} style={{ ...themeStyle(theme), ...style }} aria-hidden="true">
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 2" }}><Pill orientation="vertical" /></div>
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 6" }}><div className="brand-mosaic__stack"><Scallop count={6} /><ShapeSvg tone="core" viewBox="0 0 240 64" width={240} height={64}><path d="M4 4 H152 V22 H236 V60 H4 Z" /></ShapeSvg></div></div>
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 4" }}><Globe /></div>
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 2" }}><div style={{ display: "flex", width: "100%", height: "100%" }}><Brace /><ShapeSvg viewBox="0 0 64 120" width={64} height={120}><circle cx="32" cy="30" r="26" /><circle cx="32" cy="90" r="26" /></ShapeSvg></div></div>
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 2" }}><Asterisk /></div>
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 2" }}><Slashes /></div>
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 2" }}><Pill /></div>
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 2" }}><Lines /></div>
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 2" }}><div style={{ display: "flex", width: "100%", height: "100%" }}><Brace /><Pill orientation="vertical" /><Brace side="right" /></div></div>
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 3" }}><TripleCircle merged tone="core" /></div>
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 4" }}><ShapeSvg viewBox="0 0 200 100" width={200} height={100}><path d="M4 4 H138 V28 H196 V96 H4 Z" /></ShapeSvg></div>
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 3" }}><Arrow /></div>
    <div className="brand-mosaic__cell" style={{ gridColumn: "span 2" }}><People /></div>
  </div>;
}

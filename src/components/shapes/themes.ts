import type { CSSProperties } from "react";

export const INK = "#1E1E1E";
export const OFF_WHITE = "#F0F0F0";
export const THEME_ORDER = ["blue", "green", "yellow", "pink"] as const;
export type ThemeName = (typeof THEME_ORDER)[number];
export type ShapeTone = "halftone" | "core" | "pastel" | "ink";

export const themes = {
  blue: { pastel: "#C3ECF6", halftone: "#57CAFF", core: "#4285F4" },
  green: { pastel: "#CCF6C5", halftone: "#5CDB6D", core: "#34A853" },
  yellow: { pastel: "#FFE7A5", halftone: "#FFD427", core: "#F9AB00" },
  pink: { pastel: "#F8D8D8", halftone: "#FF7DAF", core: "#EA4335" },
} as const satisfies Record<ThemeName, { pastel: string; halftone: string; core: string }>;

export type ThemeStyle = CSSProperties & Record<`--t-${string}`, string>;

export function themeStyle(theme?: ThemeName): ThemeStyle {
  if (!theme) return {};
  const colours = themes[theme];
  return {
    "--t-bg": colours.pastel,
    "--t-shape": colours.halftone,
    "--t-accent": colours.core,
    "--t-logo-a": colours.core,
    "--t-logo-b": colours.halftone,
  };
}

export function shapeFill(tone: ShapeTone = "halftone"): string {
  return {
    halftone: "var(--t-shape, #57CAFF)",
    core: "var(--t-accent, #4285F4)",
    pastel: "var(--t-bg, #C3ECF6)",
    ink: INK,
  }[tone];
}

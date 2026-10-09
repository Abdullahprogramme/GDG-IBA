import { useState, type ButtonHTMLAttributes } from "react";
import { Chevrons } from "./Chevrons";
import { themeStyle, type ThemeName } from "./themes";

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onChange" | "aria-label"> {
  label: string;
  theme?: ThemeName;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Toggle({ label, theme = "blue", checked, defaultChecked = false, onCheckedChange, className, style, onClick, ...props }: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const current = checked ?? internalChecked;
  return <button {...props} type="button" role="switch" aria-label={label} aria-checked={current}
    className={["brand-toggle", className].filter(Boolean).join(" ")} style={{ ...themeStyle(theme), ...style }}
    onClick={event => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (checked === undefined) setInternalChecked(!current);
      onCheckedChange?.(!current);
    }}>
    <span className="brand-toggle__knob"><Chevrons theme={theme} /></span>
  </button>;
}

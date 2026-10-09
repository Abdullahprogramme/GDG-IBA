import type { HTMLAttributes } from "react";
import { Chevrons } from "./Chevrons";
import { Globe } from "./Globe";
import { Comma } from "./Comma";
import { themeStyle, type ThemeName } from "./themes";

export interface AvatarFrameProps extends HTMLAttributes<HTMLDivElement> { src: string; alt: string; theme?: ThemeName; loading?: "eager" | "lazy" }
export function AvatarFrame({ src, alt, theme = "blue", loading = "lazy", className, style, ...props }: AvatarFrameProps) {
  return <div {...props} className={["brand-avatar", className].filter(Boolean).join(" ")} style={{ ...themeStyle(theme), ...style }}>
    <img className="brand-avatar__image" src={src} alt={alt} width={240} height={240} loading={loading} decoding="async" />
    <div className="brand-avatar__top" aria-hidden="true"><Globe /><Comma tone="pastel" /></div>
    <div className="brand-avatar__dots" aria-hidden="true"><span /><span /></div>
    <div className="brand-avatar__bottom" aria-hidden="true"><Chevrons theme={theme} /></div>
  </div>;
}

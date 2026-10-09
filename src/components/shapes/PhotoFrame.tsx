import type { HTMLAttributes } from "react";
import { motion } from "motion/react";
import { NotchCard } from "./NotchCard";
import { Chevrons } from "./Chevrons";
import { Asterisk } from "./Asterisk";
import { CodeHeart } from "./CodeHeart";
import { Arrow } from "./Arrow";
import { Globe } from "./Globe";
import { themeStyle, type ThemeName } from "./themes";

export interface PhotoFrameProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  theme?: ThemeName;
  icon?: "asterisk" | "code-heart" | "arrow" | "globe";
  logoCorner?: "top-left" | false;
  imageWidth?: number;
  imageHeight?: number;
  loading?: "eager" | "lazy";
  imageId?: string;
}

export function PhotoFrame({ src, alt, theme = "blue", icon = "asterisk", logoCorner = "top-left", imageWidth = 640, imageHeight = 480, loading = "lazy", imageId, className, style, ...props }: PhotoFrameProps) {
  const Icon = { asterisk: Asterisk, "code-heart": CodeHeart, arrow: Arrow, globe: Globe }[icon];
  return <div {...props} className={["brand-photo", className].filter(Boolean).join(" ")} style={{ ...themeStyle(theme), aspectRatio: `${imageWidth} / ${imageHeight}`, ...style }}>
    <NotchCard initialWidth={imageWidth} initialHeight={imageHeight} style={{ minHeight: 0 }} padded={false}
      notches={logoCorner ? ["top-left", "bottom-right"] : ["bottom-right"]} fill="none">
      <motion.img layoutId={imageId} className="brand-photo__image" src={src} alt={alt} width={imageWidth} height={imageHeight} loading={loading} decoding="async" />
    </NotchCard>
    {logoCorner && <div className="brand-photo__corner" data-corner="top-left"><Chevrons theme={theme} /></div>}
    <div className="brand-photo__corner" data-corner="bottom-right"><Icon /></div>
  </div>;
}

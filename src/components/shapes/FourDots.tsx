import { ShapeSvg, type ShapeProps } from "./ShapeSvg";
import { themes } from "./themes";
export function FourDots(props: ShapeProps) {
  return <ShapeSvg viewBox="0 0 160 40" width={160} height={40} {...props}>
    {[themes.pink.core, themes.yellow.core, themes.green.core, themes.blue.core].map((fill, i) => <circle key={fill} cx={20 + i * 40} cy="20" r="16" fill={fill} />)}
  </ShapeSvg>;
}

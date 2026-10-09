export const NOTCH_POSITIONS = ["top-left", "top-right", "bottom-right", "bottom-left"] as const;
export type NotchPosition = (typeof NOTCH_POSITIONS)[number];
export type NotchType = "step" | "tab";
type Point = readonly [number, number];

export interface NotchGeometryOptions {
  width: number;
  height: number;
  radius?: number;
  type?: NotchType;
  notches?: readonly NotchPosition[];
  tabPosition?: "top-left" | "bottom-left";
}

/** Round both convex and concave polygon joins with one continuous outline. */
function roundedPolygon(points: Point[], radius: number): string {
  const corners = points.map((point, i) => {
    const before = points[(i + points.length - 1) % points.length];
    const after = points[(i + 1) % points.length];
    const incomingLength = Math.hypot(before[0] - point[0], before[1] - point[1]);
    const outgoingLength = Math.hypot(after[0] - point[0], after[1] - point[1]);
    const distance = Math.min(radius, incomingLength / 2, outgoingLength / 2);
    const offset = (neighbour: Point, length: number): Point => [
      point[0] + (neighbour[0] - point[0]) * distance / length,
      point[1] + (neighbour[1] - point[1]) * distance / length,
    ];
    return { point, incoming: offset(before, incomingLength), outgoing: offset(after, outgoingLength) };
  });
  const format = ([x, y]: Point) => `${Number(x.toFixed(3))} ${Number(y.toFixed(3))}`;
  return `M${format(corners[0].outgoing)} ` + corners.map((_, i) => {
    const corner = corners[(i + 1) % corners.length];
    return `L${format(corner.incoming)} Q${format(corner.point)} ${format(corner.outgoing)}`;
  }).join(" ") + " Z";
}

export function createNotchPath({ width, height, radius, type = "step", notches = ["top-right"], tabPosition = "top-left" }: NotchGeometryOptions): string {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width < 16 || height < 16) {
    throw new RangeError("Notch cards require finite width and height of at least 16px.");
  }
  const inset = 1.5;
  const w = width - inset * 2;
  const h = height - inset * 2;
  const r = radius ?? Math.max(20, Math.min(32, Math.min(w, h) * 0.028));
  if (!Number.isFinite(r) || r < 0) throw new RangeError("Notch radius must be finite and non-negative.");
  const nw = w * 0.3;
  const nh = h * 0.15;
  let points: Point[];
  if (type === "tab") {
    const tw = w * 0.38;
    const th = Math.min(48, h * 0.2);
    points = tabPosition === "top-left"
      ? [[0, 0], [tw, 0], [tw, th], [w, th], [w, h], [0, h]]
      : [[0, 0], [w, 0], [w, h - th], [tw, h - th], [tw, h], [0, h]];
  } else {
    const has = (position: NotchPosition) => notches.includes(position);
    const point = (x: number, y: number): Point => [x, y];
    points = [
      ...(has("top-left") ? [point(0, nh), point(nw, nh), point(nw, 0)] : [point(0, 0)]),
      ...(has("top-right") ? [point(w - nw, 0), point(w - nw, nh), point(w, nh)] : [point(w, 0)]),
      ...(has("bottom-right") ? [point(w, h - nh), point(w - nw, h - nh), point(w - nw, h)] : [point(w, h)]),
      ...(has("bottom-left") ? [point(nw, h), point(nw, h - nh), point(0, h - nh)] : [point(0, h)]),
    ];
  }
  return roundedPolygon(points.map(([x, y]) => [x + inset, y + inset]), r);
}

import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { GalleryRecord } from "./gallery";
import { basename, extname } from "node:path";
const images = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/**/*.{png,jpg,jpeg,webp,avif}",
  { eager: true },
);
const sizes = "(min-width:1440px) 22vw, (min-width:1024px) 30vw, (min-width:768px) 44vw, 90vw";
export const galleryImageSizes = sizes;
const publicImages = import.meta.glob("../../public/images/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const ignoredPublicImages = new Set(["orientation2026B.jpg"]);
export function discoverPublicGalleryImages(excludedSources: readonly string[] = []): GalleryRecord[] {
  const excluded = new Set(excludedSources);
  return Object.entries(publicImages)
    .filter(([key]) => {
      const file = basename(key);
      return !ignoredPublicImages.has(file) && !file.startsWith("sample-") && !excluded.has(`/images/${file}`);
    })
    .map(([key, src]) => {
      const file = basename(key),
        name = basename(file, extname(file)).replace(/[-_]+/g, " ");
      return {
        id: `public-${file}`,
        src: src.startsWith("/") ? src : `/images/${file}`,
        alt: `GDG on Campus IBA community photo: ${name}`,
        album: "Community",
        date: "2025-01-01T00:00:00.000Z",
        width: 800,
        height: 600,
        sample: false,
      };
    });
}
/** Repository assets are optimized at build time. Public SVGs retain their vector quality. */
export async function prepareGalleryImage(photo: GalleryRecord): Promise<GalleryRecord> {
  const key = photo.src.replace(/^\/src\//, "../");
  const image = images[key]?.default;
  if (!image) return { ...photo, fullSrc: photo.src };
  const widths = [...new Set([320, 480, 800, 1200].map((width) => Math.min(width, image.width)))];
  const [avif, webp, blur, full] = await Promise.all([
    getImage({ src: image, widths, format: "avif", quality: 65 }),
    getImage({ src: image, widths, format: "webp", quality: 80 }),
    getImage({ src: image, width: 24, format: "webp", quality: 25 }),
    getImage({ src: image, width: Math.min(1800, image.width), format: "webp", quality: 85 }),
  ]);
  return {
    ...photo,
    src: webp.src,
    width: image.width,
    height: image.height,
    avifSrcSet: avif.srcSet.attribute,
    webpSrcSet: webp.srcSet.attribute,
    placeholder: blur.src,
    fullSrc: full.src,
  };
}

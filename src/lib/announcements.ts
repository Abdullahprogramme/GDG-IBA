import type { CollectionEntry } from "astro:content";

const announcementImages = import.meta.glob("../assets/announcement/*", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;
const fallbackAnnouncementImage = "/brand/logo-stacked-light.svg";

export type Announcement = CollectionEntry<"announcements"> & {
  data: CollectionEntry<"announcements">["data"];
};

export function announcementImage(image?: string) {
  if (!image) return fallbackAnnouncementImage;
  const assetPath = image.replace(/^\/src\/assets\/announcement\//, "../assets/announcement/");
  return announcementImages[assetPath] ?? image;
}

export function sortAnnouncements(entries: Announcement[]) {
  return [...entries].sort(
    (a, b) => b.data.timeframe.start.getTime() - a.data.timeframe.start.getTime(),
  );
}

export function currentAnnouncement(entries: Announcement[], now = new Date()) {
  return sortAnnouncements(entries).find(({ data }) => {
    const started = data.timeframe.start <= now;
    const notEnded = !data.timeframe.end || data.timeframe.end >= now;
    return started && notEnded;
  });
}

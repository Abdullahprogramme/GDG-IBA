import type { SocialLink } from "../components/shared/social-types";
export interface NavItem { label: string; href: string; available: boolean }
export const site = {
  name: "Google Developer Groups on Campus Institute of Business Administration",
  shortName: "GDG on Campus IBA",
  tagline: "Learn. Build. Belong.",
  description: "A student-built community at IBA, Karachi, learning and building together through workshops, hackathons, study jams, and talks. All programmes and experience levels are welcome.",
  mission: "A place to learn, build, and belong at IBA.",
  hashtag: "#GDGOnCampus",
  // Replace nulls only with the chapter's confirmed details.
  communityUrl: null as string | null,
  socials: [] as SocialLink[],
  contact: { email: null as string | null, address: null as string | null, phone: null as string | null, hours: null as string | null, mapEmbedUrl: null as string | null, city: "Karachi, Pakistan" },
  nav: [
    { label: "Home", href: "/", available: true },
    { label: "About", href: "/#about", available: false },
    { label: "Events", href: "/events", available: true },
    { label: "Gallery", href: "/gallery", available: true },
    { label: "Team", href: "/team", available: true },
    { label: "Speakers", href: "/speakers", available: true },
    { label: "Our Story", href: "/our-story", available: true },
    { label: "Contact", href: "/contact", available: true },
  ] satisfies NavItem[],
} as const;

/** An external href must never become an executable or placeholder URL. */
export function confirmedExternalUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : undefined; } catch { return undefined; }
}
export function activeNavHref(pathname: string, hash = ""): string | undefined {
  if (pathname === "/") return homeSectionRoutes[hash] ?? "/";
  return site.nav.find(item => item.href !== "/" && !item.href.includes("#") && (pathname === item.href || pathname.startsWith(`${item.href}/`)))?.href;
}

export const homeSectionRoutes: Record<string, string> = {
  "#about": "/#about", "#crew": "/team", "#events": "/events",
  "#voices": "/speakers", "#gallery": "/gallery", "#join": "/contact",
};
/** Full inner routes take over automatically when their pages become available. */
export function navigationHref(item: NavItem): string | undefined {
  if (item.available) return item.href;
  const section = Object.entries(homeSectionRoutes).find(([, href]) => href === item.href)?.[0];
  return section ? `/${section}` : undefined;
}

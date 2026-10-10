import { z } from "astro/zod";
const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const external = z.url({ protocol: /^https$/ });
const asset = text.refine(value => value.startsWith("/") || value.startsWith("https://"), "Use a public asset path or HTTPS URL.");
const sample = { sample: z.boolean().default(false) };
const links = z.object({ linkedin: external.optional(), github: external.optional(), x: external.optional(), website: external.optional(), email: z.email().optional() }).default({});

export const eventSchema = z.object({
  ...sample, title: text, slug, date: z.coerce.date(), endDate: z.coerce.date().optional(),
  category: z.enum(["workshop", "hackathon", "study-jam", "talk", "social"]), status: z.enum(["upcoming", "past"]),
  cover: asset, summary: text, description: text, location: text, mode: z.enum(["onsite", "online", "hybrid"]),
  tags: z.array(text).default([]), speakers: z.array(slug).default([]),
  agenda: z.array(z.object({ time: text, title: text, speaker: text.optional() })).default([]),
  gallery: z.array(asset).default([]), registerUrl: external.optional(), recapUrl: external.optional(),
}).refine(event => !event.endDate || event.endDate >= event.date, { message: "Event end must follow its start.", path: ["endDate"] });
export const speakerSchema = z.object({ ...sample, name: text, slug, role: text, company: text, photo: asset, talkTitle: text, talkAbstract: text.optional(), bio: text, category: text, events: z.array(slug).default([]), links });
export const teamSchema = z.object({ ...sample, name: text, role: text, department: text, isLead: z.boolean().default(false), isCoLead: z.boolean().default(false), isAdvisor: z.boolean().default(false), organizingCommittee: z.boolean().default(false), photo: asset, photoPending: z.boolean().default(false), order: z.number().int().nonnegative(), bio: text.optional(), links, alumni: z.boolean().default(false) });
export const gallerySchema = z.object({ ...sample, src: asset, alt: text, album: text, event: slug.optional(), date: z.coerce.date(), caption: text.optional(), width: z.number().int().positive(), height: z.number().int().positive() });
export const storySchema = z.object({ ...sample, year: z.number().int().min(1900).max(2100), title: text, body: text, image: asset.optional(), theme: z.enum(["blue", "green", "yellow", "red", "pink"]) });
export const partnerSchema = z.object({ ...sample, name: text, logo: asset, url: external.optional(), tier: text.optional() });

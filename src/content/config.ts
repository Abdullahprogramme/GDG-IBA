import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { eventSchema, speakerSchema, teamSchema, gallerySchema, storySchema, partnerSchema } from "./schemas";

export const collections = {
  events: defineCollection({ loader: glob({ pattern: "**/*.md", base: "./src/content/events" }), schema: eventSchema }),
  speakers: defineCollection({ loader: glob({ pattern: "**/*.md", base: "./src/content/speakers" }), schema: speakerSchema }),
  team: defineCollection({ loader: glob({ pattern: "**/*.md", base: "./src/content/team" }), schema: teamSchema }),
  gallery: defineCollection({ loader: glob({ pattern: "**/*.json", base: "./src/content/gallery" }), schema: gallerySchema }),
  story: defineCollection({ loader: glob({ pattern: "**/*.md", base: "./src/content/story" }), schema: storySchema }),
  partners: defineCollection({ loader: glob({ pattern: "**/*.json", base: "./src/content/partners" }), schema: partnerSchema }),
};

import { getCollection } from "astro:content";
import { site } from "../data/site";
import { values } from "../data/values";
import { tags } from "../data/tags";
import { contactFaqs } from "../data/contact";
import { stats, establishedYear } from "../data/stats";

export const prerender = true;

/** Public, curated snapshot used only as the chatbot's grounded knowledge source. */
export async function GET() {
  const [events, speakers, team, stories, partners, gallery] = await Promise.all([
    getCollection("events"), getCollection("speakers"), getCollection("team"),
    getCollection("story"), getCollection("partners"), getCollection("gallery"),
  ]);

  const knowledge = {
    chapter: {
      name: site.shortName,
      fullName: site.name,
      tagline: site.tagline,
      description: site.description,
      mission: site.mission,
      city: site.contact.city,
      communityUrl: site.communityUrl,
      socials: site.socials.map(({ label, href }) => ({ label, href })),
      values,
      topics: tags,
      stats,
      establishedYear,
      faqs: contactFaqs,
    },
    events: events.map(({ id, data }) => ({ id, title: data.title, slug: data.slug, date: data.date.toISOString(), category: data.category, status: data.status, summary: data.summary, description: data.description, location: data.location, mode: data.mode, tags: data.tags, sample: data.sample, registerUrl: data.registerUrl })),
    speakers: speakers.map(({ id, data }) => ({ id, name: data.name, role: data.role, company: data.company, talkTitle: data.talkTitle, talkAbstract: data.talkAbstract, bio: data.bio, category: data.category, sample: data.sample })),
    team: team.map(({ id, data }) => ({ id, name: data.name, role: data.role, department: data.department, bio: data.bio, sample: data.sample })),
    story: stories.map(({ id, data }) => ({ id, year: data.year, title: data.title, body: data.body, sample: data.sample })),
    gallery: gallery.map(({ id, data }) => ({ id, album: data.album, alt: data.alt, caption: data.caption, date: data.date.toISOString(), sample: data.sample })),
    partners: partners.map(({ id, data }) => ({ id, name: data.name, tier: data.tier })),
    pages: ["/", "/our-story", "/events", "/speakers", "/team", "/gallery", "/contact"],
  };

  return new Response(JSON.stringify(knowledge), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}

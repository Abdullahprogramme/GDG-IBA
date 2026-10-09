# GDG on Campus IBA

Website project for **Google Developer Groups on Campus Institute of Business Administration**, Karachi.

**Learn. Build. Belong.**

The website introduces the chapter, its events, speakers, team, and journey, and helps students join the community. It uses a playful geometric design based on the Google Developer Groups on Campus brand kit, with outlined shapes, pastel sections, and accessible animation.

## Project instructions

[GDGoC_IBA_Instructions.txt](./GDGoC_IBA_Instructions.txt) is the source of truth for the design system, content models, page layouts, animation requirements, and the 72-step implementation sequence. Read it before contributing. [AGENTS.md](./AGENTS.md) contains repository development guidance.

The reference chapter site is used for layout and motion inspiration only. Its images, text, team data, and code must not be copied.

## Current status

The project is at the **foundation stage**:

- Astro with strict TypeScript, React integration, sitemap integration, and Tailwind CSS v4 is configured.
- The `@/` alias points to `src/`.
- The directory skeleton, initial brand colour tokens, local Google Sans font declarations, and basic layout are in place.
- Base shadcn/ui components and the main interaction libraries are installed.
- The brand shape library includes SVG artwork, responsive notch cards, photo/avatar frames, four theme colourways, and pattern compositions. Review variants at [`/dev/shapes`](http://localhost:4321/dev/shapes); see [shape library usage](./src/components/shapes/README.md).
- The homepage at `/` includes the hero, topic strip, About, statistics, crew, events, speakers, gallery, partners, and community CTA in the required order.

**Steps 5-11 are implemented:** motion primitives, official light/dark chapter logos, shared components, six validated collections with twelve labelled samples, metadata and routing, responsive navigation, footer, and reusable PageHero. Review `/dev/foundation`, `/dev/motion`, `/dev/shared`, and `/dev/content`. Review pages are noindex and excluded from the sitemap.

**Phase B (steps 12–22) is implemented on `/`.** The brand kit supplies the visual system; the [DSU reference site](https://www.gdgocdsu.com/) informs the layered hero, moving card rows, photo-strip composition, and community presentation. Artwork and content are original to this repository, or clearly labelled samples; DSU assets and chapter details were not copied.

**Phase C (steps 23–29) is implemented on `/our-story`.** It includes the blue page hero, origin card, mission/vision/values, chronological scroll-driven timeline, activity cards and closing Join CTA. Home's Explore Our Story link and global navigation open the page. Set confirmed founding details in `src/data/story.ts` and replace the explicitly labelled sample milestones in `src/content/story/`. The founding year stays unset until confirmed. `/dev/story` exercises test-only origin, timeline, empty-state and Join variants; it is noindex and excluded from the sitemap.

**Phase D (steps 30–37) is implemented on `/events`.** The page has a blue hero, pill tabs, search/year filters, featured upcoming event with countdown, an animated event grid, accessible detail dialogs, agenda, latest-event recap and host/speaker CTA. Home's View All Events and View Details links are live; Our Story activity links open filtered event lists. Share filters with `/events?category=workshop`, `/events?status=past`, `q` and `year`; share a dialog with `/events?event=sample-workshop`. Real data replaces samples automatically. Sample registration stays disabled and its countdown remains a placeholder. `/dev/events` contains noindex test fixtures for all categories, configured links, countdowns and empty states; it is excluded from the sitemap.

**Phase E (steps 38–43) is implemented on `/speakers`.** The page includes a pink hero, populated category filters, a responsive animated speaker grid, accessible profile dialogs, past speakers grouped by event, and a Call for Speakers CTA. Home's All Speakers link and shared navigation are live. Share filters with `/speakers?category=alumni` and profiles with `/speakers?speaker=sample-speaker`. Speaker/event relationships work from either collection; samples stay labelled and never expose social actions. `/dev/speakers` provides noindex fixtures for every category, configured social links, event associations and empty states, and is excluded from the sitemap.

**Phase F (steps 44–50) is implemented on `/team`.** The green hero introduces leadership spotlights, optional faculty guidance, department grids, an optional collapsed alumni accordion and the Join-the-team CTA. Home's Meet Everyone link and shared navigation are live. Team content comes from `src/content/team`: use `isLead`, `isCoLead`, `isAdvisor` and `alumni` to place records; regular members group by their actual `department`. Confirmed records replace samples. Social actions require confirmed profiles, HTTPS links and valid emails. No faculty advisor or alumni is invented when records are absent. `/dev/team` contains noindex fixtures for optional sections, populated departments and configured links, excluded from the sitemap.

**Phase G (steps 51–56) is implemented on `/gallery`.** Snapshots includes a yellow camera hero, populated album filters, responsive 1/2/3/4-column masonry, themed brand tiles after every nine images, 24-photo pagination and a fullscreen accessible lightbox. The lightbox supports arrows, Escape, touch swipe, counters and shared thumbnail transitions. Share albums with `/gallery?album=talks` and individual images with `/gallery?photo=sample-talk`. Home's View Gallery link and shared navigation are live. Confirmed records replace labelled sample illustrations; event captions associate only with matching sample/confirmed events. `/dev/gallery` contains thirty noindex fixtures covering all albums, pagination, empty states and optimized images, excluded from the sitemap.

For optimized gallery photos, store PNG/JPEG/WebP/AVIF files under `src/assets/gallery/` and reference them as `/src/assets/gallery/filename.jpg` in `src/content/gallery/*.json`. `gallery-images.ts` uses `astro:assets` at build time for responsive AVIF/WebP sources, accurate intrinsic dimensions, small blur placeholders and larger lightbox images. Home previews and Events recaps use the same prepared sources so repository photo paths remain usable across pages. Public SVG illustrations retain vector quality. Public or HTTPS image URLs pass through; provide suitable dimensions and already optimized files for those sources. Replace the development-only `review-brand.png` fixture with confirmed chapter content only when needed; it is not public gallery data.

**Phase H (steps 57–63) is implemented on `/contact`.** Say Hello includes contact information, email copying, configured social/Join actions, a validated message form, an optional campus map, editable FAQs and a closing community CTA. Speakers and Team prefill their subjects; Events and Home partner links open Contact. Unknown chapter contact details remain pending, and sending stays disabled until a valid access key is configured. `/dev/contact` provides noindex artificial fixtures; browser tests mock delivery and never send real messages.

**Phase I (steps 64?72) technical work is implemented:** branded 404, cross-page link/SEO/accessibility/responsive/brand audits, compact WOFF2 fonts and Netlify deployment preparation. Approved chapter content, environment values, hosting/domain configuration and live delivery checks remain pending at the owner's request. See [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md) and the detailed Work Done report in `GDGoC_IBA_Instructions.txt`. All eight public pages are assembled; samples remain labelled. Mobile Lighthouse scores are 83/83/85 for Home/Events/Gallery with accessibility 100; performance ?90 and LCP <2.5s remain open release targets.

The homepage prefers confirmed entries over samples independently for each collection. Unknown statistics display an unset state rather than zero or invented figures. Registration and social actions appear only for configured, valid HTTPS URLs. Approved photography can replace the original illustrations without changing the card layout. Asset provenance is documented in `public/images/README.md` and `public/3d/README.md`.

Reusable cards live in `components/team/TeamCard.tsx`, `components/events/EventCard.tsx`, and `components/speakers/SpeakerCard.tsx`. Below-fold interactions use `client:visible`; descriptive content remains server-rendered. Marquees pause on hover/focus and have explicit pause controls. The speaker carousel also stops for keyboard interaction, reduced motion, an inactive tab, and an offscreen viewport.

`/dev/home-interactions` is a noindex test page for configured Join/confetti, social and team links, event registration, and empty states. Its links use example.com and are test fixtures, never real chapter destinations.

## Technology

| Area | Stack |
| --- | --- |
| Framework | Astro, static-first output |
| Language | TypeScript, strict mode |
| Interactive islands | React |
| Styling | Tailwind CSS v4 through `@tailwindcss/vite` |
| UI | shadcn/ui, re-skinned to the chapter brand |
| Animation | Motion (`motion/react`), CSS keyframes for simple loops |
| Smooth scrolling | Lenis |
| Carousels | Embla Carousel and autoplay |
| Forms | React Hook Form, Zod, resolver integration, Sonner |
| Icons | Lucide React and React Icons |
| Sitemap | `@astrojs/sitemap` |
| Content | Astro Content Collections with Zod schemas |
| Contact delivery | Web3Forms browser API; access key configuration pending |

Keep most content as static Astro HTML. Use React islands where interaction requires them, and hydrate with `client:visible` or `client:idle` where possible.

Avoid adding alternative animation libraries, UI kits, or carousel libraries; the instructions specify Motion, shadcn/ui, and Embla.

## Local development

Requires **Node.js 22.12.0 or newer** and pnpm 10.34.6 (pinned in `package.json`).

Run commands from the project root:

```sh
corepack enable
pnpm install
pnpm dev
```

The development server normally serves the site at `http://localhost:4321`. Repository instructions require background mode; the pnpm command above invokes `astro dev --background`.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the background development server |
| `pnpm astro dev status` | Check the background server |
| `pnpm astro dev logs` | Read server logs |
| `pnpm astro dev stop` | Stop the background server |
| `pnpm check` | Check Astro, TypeScript, and React types |
| `pnpm test` | Verify content, filters, form safety, SEO and notch-card geometry |
| `pnpm audit:site` | Audit links and metadata in the built site |
| `pnpm build:deploy` | Validate SITE_URL, build and audit for Netlify |
| `pnpm build` | Type-check and build the static site into `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro --help` | View Astro CLI help |

## Project structure

The directories below include scaffolding for planned features; their presence does not mean those features are implemented.

```text
gdgoc-iba/
|-- public/
|   |-- brand/                 Official logo lockups
|   |-- fonts/                 Local font files
|   |-- shapes/                Exported brand SVG artwork
|   |-- 3d/                    Optional pre-rendered hero sprites
|   `-- lottie/                Optional small animation assets
|-- src/
|   |-- assets/                Event, gallery, speaker, team, partner assets
|   |-- components/
|   |   |-- ui/                Base shadcn/ui components
|   |   |-- shapes/            Brand SVG shapes, cards, frames, and compositions
|   |   |-- motion/            Planned animation primitives
|   |   |-- layout/            Planned navigation, footer, page hero
|   |   |-- shared/            Planned reusable branded components
|   |   `-- home/, events/, speakers/, team/, gallery/, story/, contact/
|   |-- content/               Planned content collections
|   |-- data/                  Planned shared site data and links
|   |-- layouts/               Base layout and planned page layout
|   |-- lib/                   Shared utilities
|   |-- pages/                 Live homepage and development review routes
|   `-- styles/globals.css     Global styles and brand tokens
|-- astro.config.ts
|-- components.json
|-- tsconfig.json
|-- GDGoC_IBA_Instructions.txt
`-- package.json
```

## Planned pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, marquee, about, stats, crew, events, speakers, gallery, partners, community CTA |
| `/#about` | “Who We Are” section on Home; links to Our Story |
| `/our-story` | Origins, mission, vision, values, milestones, and activities |
| `/events` | Event filters, featured event, event cards, details, and recaps |
| `/speakers` | Speaker filters, profiles, past talks, and call for speakers |
| `/team` | Lead spotlight, departments, advisor if applicable, and team recruitment |
| `/gallery` | Album filters, masonry photos, and accessible lightbox |
| `/contact` | Contact details, validated form, map, and FAQ |
| `/404` | Branded not-found page |

About is a section on Home. Home previews link to the corresponding full pages. **Join** is the primary CTA and must link to the chapter's confirmed GDG community page, where membership registration happens.

## Brand and design rules

Use **GDG on Campus IBA** in running copy, buttons, and short titles. Use the full official name in the header, footer, metadata, and legal line. Do not shorten the chapter name to bare “GDG”. Organizer titles must include “GDG on Campus”; use **#GDGOnCampus** on social.

Use official logo lockups and brand-kit variants. Do not stretch, rotate, arbitrarily recolour, or add effects to the logo mark.

| Theme | Pastel background | Halftone shapes | Core accent |
| --- | --- | --- | --- |
| Blue | `#C3ECF6` | `#57CAFF` | `#4285F4` |
| Green | `#CCF6C5` | `#5CDB6D` | `#34A853` |
| Yellow | `#FFE7A5` | `#FFD427` | `#F9AB00` |
| Red / Pink | `#F8D8D8` | `#FF7DAF` | `#EA4335` |

- Default light surface: `#F0F0F0`; text, outlines, and dark surfaces: `#1E1E1E`.
- Use one theme family per section, with the exceptions defined in the instructions for four-colour accents.
- Use Google Sans for brand typography and Google Sans Mono for code-style details, following the brand kit.
- Build artwork from the brand's shape vocabulary: pills, triple circles, slashes, globes, people arches, arrows, braces, and notched cards.
- Use outlined rounded forms and white notched content cards. Follow the detailed outline, gradient, typography, and pattern rules in the instructions.

Dropdowns use the shared branded `BrandSelect` on Contact and Events.

## Content and configuration

The planned collections are **events, speakers, team, gallery, story, and partners**. Their required fields and relationships are defined in the instructions.

Centralize navigation, chapter links, social profiles, and contact information in the planned `src/data/site.ts`. Keep homepage stats, marquee tags, and values in their respective data files.

Clearly mark dummy entries **Sample**. Do not invent real names, quotes, statistics, community URLs, social handles, or contact details. Obtain the chapter's confirmed content and permission to publish names, photos, and partner logos before release.

Configuration:

- `SITE_INDEXING`: defaults to disabled; set to `true` only after approving content for public search.
- `SITE_URL`: read by `astro.config.ts`; defaults to `http://localhost:4321`. Set the confirmed production origin in the build environment before deployment so sitemap URLs use the correct domain.
- `PUBLIC_WEB3FORMS_ACCESS_KEY`: the Web3Forms public access key for the chapter's confirmed receiving email. Copy `.env.example` to `.env`, add the key, restart development and rebuild. Set the same variable in the deployment environment. The key is intentionally used in the browser API; do not substitute a secret account credential.

Web3Forms is integrated but not configured. Its [free plan](https://web3forms.com/pricing) currently provides 250 monthly submissions and fits static browser-side forms. Create an access key for the receiving email in [Web3Forms](https://app.web3forms.com/), then complete the environment variable above. No account or real credential was created during development.

Confirm email, address, optional phone/hours, `mapEmbedUrl`, social profiles and `communityUrl` in `src/data/site.ts`. The map accepts HTTPS Google `/maps/embed` URLs and remains a clear pending state without a confirmed campus location. FAQ answers live in `src/data/contact.ts`. Subject links accept `general`, `partnership`, `speaker`, `team` and `other`; unknown values use General.

The form validates with Zod/react-hook-form, blocks a filled honeypot before any request, disables duplicate submissions, times out stalled requests and requires both a successful HTTP response and `success: true` before showing confirmation. Failed submissions preserve entered values and offer the configured email fallback. Tests cover mocked success, provider/network failure, retry and spam blocking. Once the key is added, send one real test and verify receipt before launch; actual delivery is not verified by the mock tests.

## Development order

Follow the numbered steps in the instruction file without changing their order:

1. Global foundation: setup, design tokens, UI styling, shapes, motion primitives, shared components, data, layouts, navigation, footer, and page hero.
2. Home, building sections from top to bottom.
3. Our Story.
4. Events.
5. Speakers.
6. Team.
7. Gallery.
8. Contact.
9. 404, real content, link audits, SEO, accessibility, performance, responsive review, brand review, and deployment.

Complete and verify each step before starting the next. Check the build and layouts at 320, 768, 1024, and 1440 pixels during implementation. Update the instruction file's **Work Done** list after task completion.

## Quality and release requirements

Release targets (repeat audits after replacing dummy content):

- Lighthouse: performance at least 90 and accessibility at least 95.
- LCP below 2.5 seconds and CLS below 0.05.
- Semantic landmarks, one H1 per page, skip link, visible keyboard focus, meaningful image alt text, and accessible dialogs and carousels.
- Respect `prefers-reduced-motion`; disable continuous motion, parallax, and automatic carousel advancement where required.
- Animate primarily transforms and opacity; pause offscreen loops and cap floating shapes at eight per viewport.
- Use optimized responsive images, lazy loading, and restrained island hydration.
- Add per-page metadata, canonical URLs, social previews, Organization/Event structured data, sitemap, and robots.txt.
- Audit all page links and confirmed external links. Social and Join links must use `rel="noopener noreferrer"` when opening a new tab.
- Complete the final responsive review at 320, 375, 768, 1024, 1440, and 1920 pixels.
- Deploy the static build to Vercel or Netlify after content, brand, accessibility, and performance checks. Configure the production URL and contact provider, then smoke-test every page and the form.

The required footer disclaimer is:

> Google Developer Groups are community-run groups for developers interested in Google technologies. This chapter is not an official Google site.

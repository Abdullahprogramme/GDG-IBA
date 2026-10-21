# GDG on Campus IBA

Website for Google Developer Groups on Campus Institute of Business Administration, Karachi.

**Learn. Build. Belong.**

A static Astro website with a geometric chapter design, local Google Sans fonts, accessible interactions, and responsive layouts. TypeScript is used throughout the application; pnpm is the package manager.

## Current status

All main pages are implemented. Content currently uses clearly labelled samples; confirmed chapter details, photos, links, contact settings, and environment values can be added later. Registration remains unavailable until configured. Contact delivery is ready once the Web3Forms key is added.

The latest local deployment build passed Astro checks and an audit of 248 links across eight public pages. Earlier responsive and accessibility audits are recorded in the local project report. Mobile Lighthouse performance scores were 83/83/85 for Home, Events, and Gallery; the performance target of 90 and LCP target below 2.5 seconds remain open.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, About, statistics, team, events, speakers, gallery, partners, and community CTA |
| `/our-story` | Origins, mission, values, milestones, and activities |
| `/events` | Search and filters, featured event, event details, and recaps |
| `/speakers` | Category filters, profiles, past speakers, and speaker CTA |
| `/team` | Leadership, departments, optional advisor/alumni, and recruitment |
| `/gallery` | Album filters, masonry gallery, pagination, and lightbox |
| `/contact` | Contact information, message form, optional map, and FAQs |
| `/404` | Branded not-found page |

About is a section of the homepage, not a separate page. Development fixtures live under `/dev/*`; they are marked noindex and excluded from the sitemap, but are still included in the static build. Vercel-specific exclusion of those fixtures remains a deployment follow-up.

## Stack

- Astro with static output, strict TypeScript, and React islands. The standalone `api/chat.ts` function handles the server-side Gemini chat on Vercel.
- Tailwind CSS v4 and shared branded UI components.
- Motion, CSS animations, Lenis, and Embla Carousel.
- Astro Content Collections with Zod validation.
- React Hook Form and Web3Forms for contact delivery.
- Sharp for build-time image optimization and `@astrojs/sitemap` for sitemap generation.
- Local Google Sans fonts, chapter logo lockups, SVG shapes, and a GDG brand-mark favicon.

## Local development

Use Node.js 22.12.0 or newer. pnpm 10.34.6 is pinned in `package.json`; the commands below use Corepack.

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

The development server normally runs at `http://localhost:4321`. The dev script starts Astro in background mode, as required by [AGENTS.md](./AGENTS.md).

| Command | Purpose |
| --- | --- |
| `corepack pnpm dev` | Start the background development server |
| `corepack pnpm astro dev status` | Check the background server |
| `corepack pnpm astro dev logs` | Read server logs |
| `corepack pnpm astro dev stop` | Stop the background server |
| `corepack pnpm check` | Check Astro and TypeScript |
| `corepack pnpm test` | Run automated tests |
| `corepack pnpm build` | Check and build the static site into `dist/` |
| `corepack pnpm audit:site` | Audit the existing build's links and metadata |
| `corepack pnpm build:deploy` | Validate the deployment origin, build, and audit |
| `corepack pnpm preview` | Preview the static build locally |

## Environment variables

`.env.example` is the committed template. Copy it to `.env` for local values if `.env` does not already exist; actual environment files must stay out of Git.

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Production HTTPS origin used for canonical URLs and the sitemap; required by `build:deploy` |
| `SITE_INDEXING` | Keep `false` while sample content remains; set `true` when ready for search indexing |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms public access key for the confirmed receiving email; leave unset until configured |
| `GEMINI_API_KEY` | Private Google Gemini API secret for the chapter chatbot; configure in Vercel, never as a `PUBLIC_` variable |
| `GEMINI_CHAT_MODEL` | Optional server-side Gemini model override; defaults to `gemini-flash-latest` |

`SITE_URL` must contain only the HTTPS origin, with no additional path, query, or fragment. The development default is `http://localhost:4321`.

The deployment validation script reads shell environment variables directly. For a local deployment build in PowerShell, replace the example domain with your actual production domain:

```powershell
$env:SITE_URL = 'https://YOUR_PROJECT.vercel.app'
$env:SITE_INDEXING = 'false'
corepack pnpm build:deploy
```

The Web3Forms key is intentionally browser-facing. To connect the form to a personal inbox and receive messages in Gmail:

1. Open [web3forms.com](https://web3forms.com) and enter the Google/personal email address that should receive chapter messages.
2. Confirm the activation email from Web3Forms, then copy the access key shown for that form.
3. Put the key in `.env` locally as `PUBLIC_WEB3FORMS_ACCESS_KEY=<your-access-key>`, or add the same variable in Vercel Project Settings → Environment Variables for Production and Preview.
4. Restart the dev server or redeploy. Submit a real test message and confirm it arrives in the receiving inbox (check spam once).

The form sends the visitor's email as `replyto`, so replying to the received message goes back to the visitor. Web3Forms handles delivery; no SMTP password, Google app password, or Google API key is required. Mocked form tests do not verify email delivery. Never commit `.env` or paste the access key into source files.

## Vercel deployment

Connect the GitHub repository to a Vercel project and use:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Root directory | Repository root (`./`) |
| Node.js version | `22.x` |
| Install command | `corepack pnpm install --frozen-lockfile` |
| Build command | `corepack pnpm build:deploy` |
| Output directory | `dist` |

Set `ENABLE_EXPERIMENTAL_COREPACK=1` in Vercel along with the environment variables above. Use the actual assigned production domain for `SITE_URL`. Keep indexing disabled while dummy content is published. No Vercel adapter is needed for this static build.

The global chapter guide uses the Astro `/api/chat` server endpoint and a public, curated `/chat-knowledge.json` snapshot generated from the Astro content collections and chapter data. Add `GEMINI_API_KEY` in Vercel Project Settings → Environment Variables for Production and Preview. Keep it server-only and redeploy after changing it. The `GEMINI_API_KEY` entry in `.env.example` is intentionally blank. The endpoint also works in the normal `astro dev` server at port 4321 after it is restarted. The function limits message/history size, checks request origin, throttles per function instance, and times out API calls; configure Vercel Firewall or another durable rate limit if you need a shared limit across instances.

Netlify configuration has been removed. There is currently no `vercel.json`; platform-specific rules, including blocking `/dev/*`, are not configured. After deployment, check navigation, mobile layouts, dialogs, unknown-path handling, and contact delivery when enabled.

## Content and assets

| Location | Purpose |
| --- | --- |
| `src/content/` | Events, speakers, team, gallery, story, and partner collections |
| `src/content/schemas.ts` | Content field validation |
| `src/data/site.ts` | Chapter information, navigation, community and social links |
| `src/data/contact.ts` | FAQs and contact-related copy |
| `src/data/story.ts` | Chapter origins and story configuration |
| `src/data/stats.ts` | Homepage statistics |
| `src/assets/` | Source images, including build-optimized gallery photos |
| `src/components/` | Page sections, shared UI, motion, layouts, and brand shapes |
| `src/layouts/` | Shared document and page layouts |
| `src/pages/` | Public routes and development review pages |
| `src/lib/` | Content, form, image, and SEO utilities |
| `public/` | Logo lockups, fonts, SVG artwork, favicon, and static assets |
| `scripts/` | Deployment validation, site audits, and font tooling |
| `tests/` | Automated checks |

Confirmed collection records replace sample entries. Keep dummy content labelled and avoid inventing chapter statistics, contact details, or affiliations. Obtain approval before publishing names, photos, and partner logos.

Raster images placed directly in `public/images/` are also discovered automatically and included in the gallery; a separate JSON record is not required. They receive a generic community-photo caption and the `Community` album. Use a gallery JSON record instead when an image needs a custom caption, album, date, event link, dimensions, or accessibility text. The contact map uses a free OpenStreetMap embed for the saved IBA Google location; the link below it still opens the original Google Maps location.

For optimized gallery photos, place raster files in `src/assets/gallery/` and reference them as `/src/assets/gallery/filename.jpg` in gallery records. Astro generates responsive image variants through Sharp. Public SVGs remain vector artwork; public and remote image URLs pass through without this local optimization.

Useful shareable URLs include `/events?event=sample-workshop`, `/speakers?speaker=sample-speaker`, and `/gallery?photo=sample-talk`. Contact subject links accept `general`, `partnership`, `speaker`, `team`, and `other`.

The brand kit supplies the visual vocabulary; the DSU chapter reference informed layout and motion. Its chapter content and assets were not copied. Asset provenance is documented in `public/brand/README.md`, `public/images/README.md`, and `public/3d/README.md`.

The implementation instructions and brand-kit PDF are local reference files, intentionally ignored by Git and not required to build the site. See [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) for the release audit checklist; hosting configuration for this repository is described above.

The chapter disclaimer is:

> Google Developer Groups are community-run groups for developers interested in Google technologies. This chapter is not an official Google site.

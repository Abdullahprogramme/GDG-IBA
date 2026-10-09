# Release checklist

Phase I implements the 404 and technical release preparation. Dummy content and environment values remain intentionally unset at the owner's request. A live deployment has not been made.

1. Replace labelled samples in `src/content/{events,speakers,team,gallery,story,partners}` with approved chapter records. Record permission for each person's name/photo and each partner logo before publishing it. Keep `sample: true` on demonstrations; confirmed records automatically replace them.
2. Confirm chapter links, contact information and campus map in `src/data/site.ts`, statistics in `src/data/stats.ts`, and FAQ answers in `src/data/contact.ts`. Do not use example.com fixture links as real chapter links.
3. Create or connect the chapter's Netlify project to this repository. The checked-in `netlify.toml` uses Node 22, pinned pnpm, `build:deploy`, and the `dist` output. No server adapter is needed for this static website. Development fixtures are blocked by a forced 404 rule on hosting.
4. Set `SITE_URL` to the confirmed HTTPS production origin, without a path, query or fragment. Configure the approved custom domain in Netlify and its DNS provider; the default Netlify domain can be used first. `build:deploy` rejects a missing or localhost origin.
5. Create the Web3Forms public access key for the receiving chapter email and set `PUBLIC_WEB3FORMS_ACCESS_KEY` in the hosting build environment. Configure provider domain restrictions if available for the account. This project uses Web3Forms, so EmailJS's Allowed Origins setting does not apply. Rebuild after any environment change.
6. Keep `SITE_INDEXING=false` while dummy content remains. After content approval, set it to `true` in the production build environment. Both robots.txt and page metadata follow this setting. Deploy previews and branch deployments remain noindex. Development pages and the 404 are always excluded from the sitemap.
7. Run `corepack pnpm test`, `corepack pnpm build:deploy`, then inspect the built sitemap, robots.txt, canonical URLs and 1200×630 social preview. Validate real Event JSON-LD with Google's Rich Results Test. Sample events emit no Event schema; rich-result eligibility for future event detail pages needs separate validation.
8. Re-run mobile Lighthouse on `/`, `/events` and `/gallery` after real photographs replace illustrations. Target performance ≥90, accessibility ≥95, LCP <2.5 seconds and CLS <0.05. Review all eight pages at 320, 375, 768, 1024, 1440 and 1920px, including the mobile navigation, carousel, masonry and timeline. Test with a human screen reader as well as the automated accessibility checks.
9. Smoke-test the live Home, Events, Speakers, Team, Gallery, Our Story, Contact and an unknown URL. Confirm the unknown URL returns HTTP 404 with the branded recovery page; `/dev/*` must also return 404. Check navigation, query prefills, filters, dialogs, keyboard focus, reduced motion and image loading. Submit one real Contact message and verify its receipt, then verify error/retry handling. Local tests use mocked delivery and cannot prove email receipt.

## Local audit tools

`corepack pnpm audit:site` checks the built eight-page site for metadata, H1s, image alt attributes, route/anchor links, safe new-tab attributes, JSON-LD and sitemap exclusions. Run it after building.

Lighthouse and axe-core are development dependencies. Browser review reports are saved under the ignored `.astro/` directory. They contain no real contact delivery credentials.

Compact WOFF2 fonts are generated from the repository's original Google fonts by `scripts/optimize-fonts.py` (requires Python fonttools and brotli). Latin, punctuation, arrow and symbol ranges use WOFF2; other script ranges retain the original TTF faces. Originals and official logo assets remain untouched.

References: [Astro on Netlify](https://docs.astro.build/en/guides/deploy/netlify/), [Netlify file configuration](https://docs.netlify.com/build/configure-builds/file-based-configuration/), [Google Event structured data](https://developers.google.com/search/docs/appearance/structured-data/event), [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview).

## Phase I measured results

Mobile Lighthouse against the local production preview (simulated mobile throttling):

| Page | Performance | Accessibility | Best practices | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 83 | 100 | 100 | 3.9s | 0.002 |
| Events | 83 | 100 | 100 | 4.2s | 0 |
| Gallery | 85 | 100 | 100 | 4.0s | 0.001 |

Performance ?90 and LCP <2.5s remain open release targets; these runs must not be described as meeting them. Home transfer fell from approximately 6,673 KiB to 463 KiB after font and hydration changes. Local SEO scores are 69 because search indexing is deliberately blocked while dummy content remains. Live-host scores and real email delivery have not been measured. HTML/JSON Lighthouse reports are in `.astro/lighthouse-{home,events,gallery}.report.*`.

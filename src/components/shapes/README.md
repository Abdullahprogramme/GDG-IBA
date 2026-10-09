# Brand shape library

Import components from `@/components/shapes` or their individual files. These
are TypeScript React components; static SVG artwork renders as HTML in Astro
without hydration. Hydrate `NotchCard`, `PhotoFrame`, or their containing island
when responsive pixel geometry is needed, and `Toggle` for interaction.

```astro
---
import { Globe, Slashes, NotchCard } from "@/components/shapes";
---
<Globe width={96} height={96} />
<Slashes theme="yellow" variant="outline" width={132} height={120} />
<NotchCard client:visible theme="blue" type="tab" label="Event">
  <h2>Sample event</h2>
</NotchCard>
```

`themes.ts` exports the four colourways in blue, green, yellow, pink order,
their exact pastel/halftone/core values, and `themeStyle()` for a parent element.
Shapes inherit those custom properties. `theme` overrides the inherited family;
`tone` selects a fill. Use the theme's halftone for friendly shapes and core for
dense shapes. Line artwork has no fill, a 1.5px ink stroke, and non-scaling
strokes. Decorative SVGs stay hidden from assistive technology.

`NotchCard` supports `type="step"`, `notches` at all four corners, and
`type="tab"` with a top-left or bottom-left tab. A unique SVG clip path and
the visible outline use the same generated geometry. `ResizeObserver` updates
the actual width and height. Normalized clipping also works before hydration.
Initial dimensions provide server-rendered geometry and a minimum height;
set `style` for a different minimum height. Keep text in the padded body and
place decorative artwork in the free corners as siblings.

`PhotoFrame` and `AvatarFrame` require a source and meaningful alt text.
`PhotoFrame` reserves a pastel border and two corner slots; `logoCorner={false}`
uses only the bottom-right icon. The demo uses explicitly labelled geometric
sample artwork, not real people or chapter photos.

`Toggle` requires an accessible `label` and supports controlled `checked` /
`onCheckedChange` or uncontrolled `defaultChecked`. It is a native button with
switch semantics, keyboard support and a visible focus ring.

`PatternMosaic` and `LanyardStrip` supply static compositions. Reusable animation
wrappers come in step 5. `Chevrons` preserves the exact paths of Google's
official SVG; its source is recorded in `public/brand/README.md`. Supply the
actual chapter lockups for step 6. The original kit is still needed for a
side-by-side visual comparison.

Review all variants at `/dev/shapes`. This temporary route is marked noindex
and excluded from the sitemap; remove it before release. Run `pnpm test` for
the notch geometry tests and `pnpm build` for type checking and the static build.

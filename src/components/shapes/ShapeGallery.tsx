import { useState, type ReactNode } from "react";
import {
  Pill, TripleCircle, Slashes, Asterisk, Globe, People, Arrow, Brace, Quote,
  Chevrons, Pin, Hash, Scallop, Comma, DonutArc, Lines, Bars, CodeHeart,
  FourDots, Toggle, NotchCard, PhotoFrame, AvatarFrame, PatternMosaic,
  LanyardStrip, themes, THEME_ORDER, themeStyle,
} from "./index";
import { NOTCH_POSITIONS } from "./notchGeometry";

function ShapeTile({ label, children }: { label: string; children: ReactNode }) {
  return <figure className="shape-review__tile"><div className="shape-review__art">{children}</div><figcaption>{label}</figcaption></figure>;
}

export function ShapeGallery() {
  const [outlines, setOutlines] = useState(false);
  const [compact, setCompact] = useState(false);
  const variant = outlines ? "outline" : "filled";
  return <>
    <div className="shape-review__controls">
      <label><input type="checkbox" checked={outlines} onChange={event => setOutlines(event.target.checked)} /> Outline shapes</label>
      <label><input type="checkbox" checked={compact} onChange={event => setCompact(event.target.checked)} /> Compact card review</label>
    </div>
    {THEME_ORDER.map((theme, index) => <section key={theme} id={theme} data-theme={theme} className="shape-review__theme" style={themeStyle(theme)} aria-labelledby={`${theme}-title`}>
      <header className="shape-review__theme-heading">
        <div><p className="shape-review__eyebrow">0{index + 1} / COLOURWAY</p><h2 id={`${theme}-title`}>{theme === "pink" ? "Pink / Red" : theme.charAt(0).toUpperCase() + theme.slice(1)}</h2></div>
        <dl className="shape-review__swatches">
          {(["pastel", "halftone", "core"] as const).map(tone => <div key={tone}><dt><span style={{ background: themes[theme][tone] }} />{tone}</dt><dd>{themes[theme][tone]}</dd></div>)}
        </dl>
      </header>
      <div className="shape-review__grid">
        <ShapeTile label="Pill / horizontal"><Pill variant={variant} /></ShapeTile>
        <ShapeTile label="Pill / vertical"><Pill orientation="vertical" variant={variant} /></ShapeTile>
        <ShapeTile label="Triple circles / row"><TripleCircle variant={variant} /></ShapeTile>
        <ShapeTile label="Triple circles / stack"><TripleCircle layout="stack" variant={variant} /></ShapeTile>
        <ShapeTile label="Merged circles / row"><TripleCircle merged variant={variant} /></ShapeTile>
        <ShapeTile label="Merged circles / stack"><TripleCircle merged layout="stack" variant="outline" /></ShapeTile>
        <ShapeTile label="Slashes / filled"><Slashes variant={variant} /></ShapeTile>
        <ShapeTile label="Slashes / outline"><Slashes variant="outline" /></ShapeTile>
        <ShapeTile label="Asterisk / eight points"><Asterisk /></ShapeTile>
        <ShapeTile label="Globe"><Globe /></ShapeTile>
        <ShapeTile label="People / three"><People /></ShapeTile>
        <ShapeTile label="People / four"><People count={4} /></ShapeTile>
        {(["right", "left", "up", "down"] as const).map(dir => <ShapeTile key={`line-${dir}`} label={`Line arrow / ${dir}`}><Arrow dir={dir} /></ShapeTile>)}
        {(["right", "left", "up", "down"] as const).map(dir => <ShapeTile key={`block-${dir}`} label={`Block arrow / ${dir}`}><Arrow variant="block" dir={dir} /></ShapeTile>)}
        <ShapeTile label="Brace / thin"><Brace /><Brace side="right" /></ShapeTile>
        <ShapeTile label="Brace / block"><Brace variant="block" /><Brace variant="block" side="right" /></ShapeTile>
        <ShapeTile label="Brace / coil"><Brace variant="coil" /><Brace variant="coil" side="right" /></ShapeTile>
        <ShapeTile label="Quotes / open"><Quote variant={variant} /></ShapeTile>
        <ShapeTile label="Quotes / close"><Quote kind="close" variant="outline" /></ShapeTile>
        <ShapeTile label="Chevrons / theme"><Chevrons theme={theme} /></ShapeTile>
        <ShapeTile label="Location pin"><Pin variant={variant} /></ShapeTile>
        <ShapeTile label="Hash"><Hash variant={variant} /></ShapeTile>
        <ShapeTile label="Scallops / up"><Scallop /></ShapeTile>
        <ShapeTile label="Scallops / down"><Scallop dir="down" /></ShapeTile>
        <ShapeTile label="Comma"><Comma variant={variant} /></ShapeTile>
        <ShapeTile label="Semicolon"><Comma semicolon variant={variant} /></ShapeTile>
        <ShapeTile label="Donut arc"><DonutArc variant={variant} /></ShapeTile>
        <ShapeTile label="Lines / two"><Lines /></ShapeTile>
        <ShapeTile label="Lines / three"><Lines count={3} /></ShapeTile>
        <ShapeTile label="Bars"><Bars variant={variant} /></ShapeTile>
        <ShapeTile label="Code heart"><CodeHeart /></ShapeTile>
        <ShapeTile label="Four dots / fixed order"><FourDots /></ShapeTile>
        <ShapeTile label="Toggle / keyboard operable"><Toggle theme={theme} label={`${theme} sample toggle`} /></ShapeTile>
      </div>
      <div className="shape-review__section-heading"><h3>Cards with a little character.</h3><p>Continuous outlines. Rounded inner joins. Room for the story.</p></div>
      <div className={`shape-review__cards ${compact ? "shape-review__cards--compact" : ""}`}>
        {NOTCH_POSITIONS.map(position => <NotchCard key={position} notch={position} initialWidth={560} initialHeight={240} data-review-notch={position}>
          <p className="shape-review__eyebrow">STEP / {position.replaceAll("-", " ")}</p>
          <h4>Learn. <b>Build.</b> Belong.</h4><p>Sample content for GDG on Campus IBA.</p>
        </NotchCard>)}
        <NotchCard notches={["top-right", "bottom-right"]} initialWidth={560} initialHeight={280}><p className="shape-review__eyebrow">STEP / TWO CORNERS</p><h4>Space for <b>ideas.</b></h4><p>Sample content. Both corners share one outline and one crop.</p></NotchCard>
        <NotchCard notches={NOTCH_POSITIONS} initialWidth={560} initialHeight={280}><p className="shape-review__eyebrow">STEP / FOUR CORNERS</p><h4>Make it <b>yours.</b></h4><p>Sample content to review every concave join.</p></NotchCard>
        <NotchCard type="tab" label="Event" initialWidth={560} initialHeight={240}><p className="shape-review__eyebrow">TAB / TOP LEFT</p><h4>A place to <b>build.</b></h4><p>Sample event card with a raised label tab.</p></NotchCard>
        <NotchCard type="tab" tabPosition="bottom-left" label="Attendee" fill={themes[theme].core} initialWidth={560} initialHeight={240}><p className="shape-review__eyebrow">TAB / BOTTOM LEFT</p><h4>Find your <b>people.</b></h4><p>Sample role badge in the colourway’s core tint.</p></NotchCard>
      </div>
      <div className="shape-review__section-heading"><h3>Framed for the community.</h3><p>Sample artwork stands in for photos until chapter images are supplied.</p></div>
      <div className="shape-review__frames">
        {(["asterisk", "code-heart", "arrow", "globe"] as const).map(icon => <figure key={icon}><PhotoFrame theme={theme} icon={icon} src="/shapes/sample-frame.svg" alt={`Sample frame study with ${icon} corner artwork`} /><figcaption>Photo frame / {icon}</figcaption></figure>)}
        <figure className="shape-review__avatar"><AvatarFrame theme={theme} src="/shapes/sample-frame.svg" alt="Sample avatar frame study" /><figcaption>Avatar / layered tabs</figcaption></figure>
      </div>
      <div className="shape-review__section-heading"><h3>A pattern worth repeating.</h3><p>The three-row mosaic and the lanyard’s exact nine-symbol sequence.</p></div>
      <PatternMosaic theme={theme} />
      <LanyardStrip />
    </section>)}
    <section className="shape-review__neutral" aria-labelledby="mark-title">
      <div className="shape-review__section-heading"><h2 id="mark-title">The mark, on light and dark.</h2><p>Official path geometry, full colour and monochrome treatments.</p></div>
      <div className="shape-review__mark-grid">
        <ShapeTile label="Light surface / full colour"><Chevrons /></ShapeTile>
        <div className="shape-review__dark"><ShapeTile label="Dark surface / full colour"><Chevrons surface="dark" /></ShapeTile></div>
        <ShapeTile label="Monochrome / solid"><Chevrons monochrome /></ShapeTile>
        <ShapeTile label="Monochrome / outline"><Chevrons variant="outline" monochrome /></ShapeTile>
      </div>
    </section>
  </>;
}

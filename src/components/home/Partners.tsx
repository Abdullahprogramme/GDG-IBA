import { Marquee } from "../motion";
import { confirmedExternalUrl } from "../../data/site";
import { fillTrack, type PartnerProfile } from "../../lib/home";
export function Partners({ partners }: { partners: PartnerProfile[] }) {
  return <Marquee label="Community and partner logos" speed={40} interactive className="partners-marquee">
    <div className="partner-tile partner-tile--chapter"><img src="/brand/logo-horizontal-light.svg" width={320} height={65} alt="Google Developer Groups on Campus Institute of Business Administration" loading="lazy"/><span className="mono-label">OUR COMMUNITY NETWORK</span></div>
    {fillTrack(partners, 7).map(({ item: partner, copy }, index) => {
      const url = confirmedExternalUrl(partner.url);
      const content = <><img src={partner.logo} width={220} height={100} alt={partner.name} loading="lazy" decoding="async"/>{partner.sample && <span className="sample-badge">SAMPLE / NOT A CONFIRMED PARTNER</span>}</>;
      return <div key={`${partner.id}-${copy}`} className="track-copy" data-marquee-copy={copy > 0 ? "" : undefined} aria-hidden={copy > 0 ? true : undefined}>{url ? <a className={`partner-tile partner-tile--${index % 4}`} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${partner.name} (opens in a new tab)`}>{content}</a> : <div className={`partner-tile partner-tile--${index % 4}`}>{content}</div>}</div>;
    })}
  </Marquee>;
}

import { Marquee } from "../motion";
import { confirmedExternalUrl } from "../../data/site";
import type { PartnerProfile } from "../../lib/home";
import { resolveLocalAsset } from "../../lib/local-assets";

const PARTNER_ROW_COUNT = 3;

export function Partners({ partners }: { partners: PartnerProfile[] }) {
  const rows = Array.from({ length: PARTNER_ROW_COUNT }, (_, row) =>
    partners.filter((_, index) => index % PARTNER_ROW_COUNT === row),
  );

  return (
    <div className="partners-grid">
      {rows.map((row, rowIndex) => (
        <Marquee
          key={rowIndex}
          label={`Community and partner logos, row ${rowIndex + 1}`}
          speed={30}
          direction={rowIndex % 2 === 0 ? "left" : "right"}
          interactive
          className={`partners-marquee partners-marquee--${rowIndex % 2}`}
        >
          {row.map((partner, index) => {
            const url = confirmedExternalUrl(partner.url);
            const src = partner.logo ? resolveLocalAsset("partners", partner.logo) : "";
            const content = (
              <>
                {src ? (
                  <img
                    src={src}
                    width={220}
                    height={100}
                    alt={partner.name}
                    loading="eager"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.hidden = true;
                      event.currentTarget.nextElementSibling?.removeAttribute("hidden");
                    }}
                  />
                ) : (
                  <span className="partner-tile__wordmark" aria-label={partner.name}>
                    {partner.name}
                  </span>
                )}
                {src && (
                  <span className="partner-tile__wordmark" hidden aria-label={partner.name}>
                    {partner.name}
                  </span>
                )}
                {partner.sample && (
                  <span className="sample-badge">SAMPLE / NOT A CONFIRMED PARTNER</span>
                )}
              </>
            );
            const className = `partner-tile partner-tile--${(rowIndex * 2 + index) % 4}`;
            return url ? (
              <a
                key={partner.id}
                className={className}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${partner.name} (opens in a new tab)`}
              >
                {content}
              </a>
            ) : (
              <div key={partner.id} className={className}>
                {content}
              </div>
            );
          })}
        </Marquee>
      ))}
    </div>
  );
}

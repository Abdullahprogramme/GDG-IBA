import { CountUp, Stagger, StaggerItem } from "../motion";
import { People, Asterisk, Quote, CodeHeart } from "../shapes";
import { stats, establishedYear } from "../../data/stats";
const icons = [People, Asterisk, Quote, CodeHeart, Asterisk, Quote, CodeHeart, People];
const themes = ["blue", "yellow", "pink", "green", "pink", "green", "blue", "yellow"] as const;
export function Stats() {
  return <section id="stats" className="home-stats" data-theme="green" aria-labelledby="stats-title">
    <div className="site-container">
      <div className="stats-heading"><h2 id="stats-title" className="mono-label">Small beginnings. Shared possibilities.</h2></div>
      <Stagger className="stats-grid">{stats.map((stat, index) => {
        const Icon = icons[index % icons.length];
        return <StaggerItem key={stat.label}><div className="stat-tile" data-theme={themes[index]}>
          <Icon width={38} height={38} aria-hidden="true"/><p className="stat-value">{stat.value == null ? <span aria-label="Not yet confirmed">—</span> : <CountUp value={stat.value} suffix={stat.suffix ?? ""}/>}</p><h3 className="mono-label">{stat.label}</h3>
        </div></StaggerItem>;
      })}</Stagger>
      {establishedYear != null && <p className="established-label mono-label">Building together since {establishedYear}</p>}
    </div>
  </section>;
}

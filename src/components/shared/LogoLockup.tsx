export interface LogoLockupProps { surface?: "light" | "dark"; layout?: "horizontal" | "stacked"; compact?: boolean; className?: string }
export function LogoLockup({ surface = "light", layout = "horizontal", compact = false, className = "" }: LogoLockupProps) {
  return <span className={`chapter-logo ${compact ? "chapter-logo--compact" : ""} ${className}`}>
    <img src={`/brand/${compact ? `mark-${surface}` : `logo-${layout}-${surface}`}.svg`}
      alt={compact ? "" : "Google Developer Groups on Campus Institute of Business Administration"}
      width={compact ? 40 : layout === "horizontal" ? 320 : 180} height={compact ? 25 : layout === "horizontal" ? 65 : 249} />
    {compact && <span>GDG on Campus IBA</span>}
  </span>;
}

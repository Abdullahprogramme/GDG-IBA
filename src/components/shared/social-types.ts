export type SocialPlatform = "instagram" | "facebook" | "linkedin" | "github" | "youtube";
export interface SocialLink { platform: SocialPlatform; label: string; href: string }

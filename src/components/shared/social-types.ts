export type SocialPlatform = "instagram" | "facebook" | "linkedin" | "github" | "youtube" | "community";
export interface SocialLink { platform: SocialPlatform; label: string; href: string }

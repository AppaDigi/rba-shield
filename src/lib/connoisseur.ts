// Connoisseur Level System
// XP is earned through logging cigars, writing reviews, and completing trades.

export interface ConnoisseurTier {
    level: number;
    title: string;
    minXp: number;
    maxXp: number;
    color: string;
    description: string;
}

export const TIERS: ConnoisseurTier[] = [
    { level: 1, title: "Novice", minXp: 0, maxXp: 499, color: "#88827C", description: "Just lighting up" },
    { level: 2, title: "Apprentice", minXp: 500, maxXp: 1499, color: "#C0A0A0", description: "Learning the leaf" },
    { level: 3, title: "Aficionado", minXp: 1500, maxXp: 3999, color: "#D4AF37", description: "A refined palate" },
    { level: 4, title: "Connoisseur", minXp: 4000, maxXp: 9999, color: "#E8C84A", description: "Master of the smoke" },
    { level: 5, title: "Grand Master", minXp: 10000, maxXp: Infinity, color: "#FFD700", description: "The ultimate aficionado" },
];

export function getTier(xp: number): ConnoisseurTier {
    return TIERS.slice().reverse().find((t) => xp >= t.minXp) ?? TIERS[0];
}

export function getLevelProgress(xp: number): number {
    const tier = getTier(xp);
    if (tier.maxXp === Infinity) return 100;
    const range = tier.maxXp - tier.minXp;
    const progress = xp - tier.minXp;
    return Math.min(100, Math.round((progress / range) * 100));
}

// XP rewards
export const XP_REWARDS = {
    LOG_CIGAR: 25,
    WRITE_REVIEW: 50,
    COMPLETE_TRADE: 100,
    GAIN_FOLLOWER: 10,
    DAILY_LOGIN: 5,
};

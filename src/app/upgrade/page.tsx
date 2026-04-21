"use client";

import { useSession } from "next-auth/react";
import DesktopLayout from "@/components/DesktopLayout";
import Navbar from "@/components/Navbar";
import { Check, Zap, Crown, Leaf } from "lucide-react";
import { getTier, TIERS } from "@/lib/connoisseur";
import styles from "./page.module.css";

const PLANS = [
    {
        id: "free",
        name: "Cigar Swap",
        price: "Free",
        period: "forever",
        icon: Leaf,
        color: "#88827C",
        description: "Everything you need to join the community and start trading.",
        features: [
            "Social feed & posts",
            "Knowledge encyclopedia",
            "The Exchange — swaps & humidor",
            "Cigar Societies",
            "Live auction viewing",
            "Basic XP & tier progression",
        ],
        cta: "Current Plan",
        ctaHref: null,
        highlight: false,
    },
    {
        id: "pro",
        name: "Connoisseur Pro",
        price: "$9",
        period: "per month",
        icon: Zap,
        color: "#D4AF37",
        description: "For the serious aficionado. Verified status, priority access, and advanced tools.",
        features: [
            "Everything in Cigar Swap",
            "Verified Trader badge",
            "Exclusive auction participation",
            "Priority swap listings",
            "Advanced humidor analytics",
            "Direct concierge messaging",
            "Early access to new features",
        ],
        cta: "Coming Soon",
        ctaHref: null,
        highlight: true,
    },
    {
        id: "grandmaster",
        name: "Grand Master",
        price: "$24",
        period: "per month",
        icon: Crown,
        color: "#FFD700",
        description: "White-glove access for the collector who accepts nothing but the finest.",
        features: [
            "Everything in Connoisseur Pro",
            "Grand Master tier badge",
            "Private society access",
            "Authentication & provenance services",
            "Dedicated account manager",
            "Curated acquisition recommendations",
            "Annual Grand Master smoker invite",
        ],
        cta: "Join Waitlist",
        ctaHref: "mailto:concierge@cigarswap.app?subject=Grand Master Waitlist",
        highlight: false,
    },
];

export default function UpgradePage() {
    const { data: session } = useSession();
    const currentTier = session?.user?.xp !== undefined ? getTier(session.user.xp) : null;

    return (
        <DesktopLayout>
            <div className={styles.container}>
                {/* Hero */}
                <div className={styles.hero}>
                    <h1 className={styles.heroTitle}>Choose Your Level</h1>
                    <p className={styles.heroSubtitle}>
                        The finest tobacco deserves the finest platform. Select the membership that matches your passion.
                    </p>
                    {currentTier && (
                        <div className={styles.currentBadge} style={{ borderColor: currentTier.color, color: currentTier.color }}>
                            You are currently: <strong>{currentTier.title}</strong>
                        </div>
                    )}
                </div>

                {/* XP Tiers reference */}
                <div className={styles.xpRow}>
                    {TIERS.map(tier => (
                        <div
                            key={tier.level}
                            className={`${styles.xpTier} ${currentTier?.level === tier.level ? styles.xpTierActive : ""}`}
                            style={currentTier?.level === tier.level ? { borderColor: tier.color } : undefined}
                        >
                            <span className={styles.xpTierDot} style={{ background: tier.color }} />
                            <span className={styles.xpTierName} style={currentTier?.level === tier.level ? { color: tier.color } : undefined}>
                                {tier.title}
                            </span>
                            <span className={styles.xpTierXp}>{tier.minXp === 0 ? "0" : tier.minXp.toLocaleString()}+ XP</span>
                        </div>
                    ))}
                </div>

                {/* Plan cards */}
                <div className={styles.plans}>
                    {PLANS.map(plan => {
                        const Icon = plan.icon;
                        return (
                            <div
                                key={plan.id}
                                className={`${styles.card} ${plan.highlight ? styles.cardHighlight : ""}`}
                                style={plan.highlight ? { borderColor: plan.color } : undefined}
                            >
                                {plan.highlight && (
                                    <div className={styles.popularBadge} style={{ background: plan.color }}>
                                        Most Popular
                                    </div>
                                )}

                                <div className={styles.cardHeader}>
                                    <div className={styles.planIcon} style={{ color: plan.color, background: `${plan.color}18` }}>
                                        <Icon size={22} />
                                    </div>
                                    <div>
                                        <h2 className={styles.planName}>{plan.name}</h2>
                                        <div className={styles.planPrice}>
                                            <span className={styles.price}>{plan.price}</span>
                                            <span className={styles.period}>{plan.period}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className={styles.planDesc}>{plan.description}</p>

                                <ul className={styles.featureList}>
                                    {plan.features.map(f => (
                                        <li key={f} className={styles.featureItem}>
                                            <Check size={14} style={{ color: plan.color, flexShrink: 0 }} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {plan.ctaHref ? (
                                    <a href={plan.ctaHref} className={styles.ctaBtn} style={{ background: plan.color }}>
                                        {plan.cta}
                                    </a>
                                ) : (
                                    <button
                                        className={styles.ctaBtn}
                                        disabled={plan.id === "free" || plan.cta === "Coming Soon"}
                                        style={
                                            plan.id === "free"
                                                ? { background: "var(--bg-subtle)", color: "var(--text-secondary)", cursor: "default" }
                                                : plan.cta === "Coming Soon"
                                                ? { background: "var(--bg-subtle)", color: "var(--text-secondary)", cursor: "not-allowed" }
                                                : { background: plan.color }
                                        }
                                    >
                                        {plan.id === "free" && session ? "Your Current Plan" : plan.cta}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                <p className={styles.footnote}>
                    XP is earned by posting, completing trades, and engaging in the community — your tier rises automatically.
                    Paid memberships unlock exclusive features on top of your earned tier.
                </p>

                <div className="lg:hidden"><Navbar /></div>
            </div>
        </DesktopLayout>
    );
}

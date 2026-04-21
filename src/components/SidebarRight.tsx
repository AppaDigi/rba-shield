"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./Sidebar.module.css";
import UserCard from "./UserCard";
import { Users, Loader2 } from "lucide-react";

interface Suggestion {
    id: string;
    username: string;
    name: string | null;
    avatar: string | null;
    xp: number;
    _count: { followers: number };
}

export default function SidebarRight() {
    const { data: session } = useSession();
    const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);

    useEffect(() => {
        if (!session?.user?.id) return;

        let cancelled = false;

        fetch(`/api/social/connections/${session.user.id}?type=suggestions`)
            .then((r) => r.json())
            .then((data) => {
                if (cancelled) return;
                setSuggestions(Array.isArray(data) ? data : []);
            })
            .catch(() => {
                if (!cancelled) setSuggestions([]);
            });

        return () => {
            cancelled = true;
        };
    }, [session?.user?.id]);

    return (
        <aside className={styles.sidebarContainer}>
            {/* Trends Section */}
            <div className={styles.sectionTitle}>Cigar Market</div>
            <div className={styles.trendItem}>
                <div className={styles.trendCategory}>Top Gainer</div>
                <div className={styles.trendTitle}>Padron 1964 Anniv.</div>
                <div className={styles.trendMeta}>+22% Demand • 312 Trades</div>
            </div>
            <div className={styles.trendItem}>
                <div className={styles.trendCategory}>Trending Auction</div>
                <div className={styles.trendTitle}>Custom Humidor: Gatsby Edition</div>
                <div className={styles.trendMeta}>Current Bid: $1250 • Ends in 2h</div>
            </div>

            {/* People You May Know */}
            {session?.user && (
                <>
                    <div className={styles.sectionTitle} style={{ marginTop: "1.5rem" }}>
                        <Users size={14} style={{ display: "inline", marginRight: "0.4rem" }} />
                        People You May Know
                    </div>
                    {suggestions === null ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
                            <Loader2 size={18} style={{ animation: "spin 0.8s linear infinite", color: "var(--text-dim)" }} />
                        </div>
                    ) : suggestions.length > 0 ? (
                        <div className={styles.suggestionList}>
                            {suggestions.map((user) => (
                                <UserCard key={user.id} user={user} showFollow />
                            ))}
                        </div>
                    ) : (
                        <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", padding: "0.5rem 0.75rem" }}>
                            No suggestions right now. Explore Cigar Swap!
                        </p>
                    )}
                </>
            )}

            {/* Upcoming Event */}
            <div className="mt-8 px-4">
                <div className="bg-[#2C241B] p-4 rounded-lg border border-[#3E3228]">
                    <h4 className="text-white font-bold text-sm mb-1">Live Events Coming Soon</h4>
                    <p className="text-gray-400 text-xs mb-2">We’re setting the stage for tastings, auctions, and masterclasses.</p>
                    <div className="flex items-center gap-2 text-gold text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-gold"></span> Schedule drops soon
                    </div>
                </div>
            </div>
        </aside>
    );
}

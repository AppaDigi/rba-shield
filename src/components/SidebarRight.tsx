"use client";

import styles from "./Sidebar.module.css";
import Image from "next/image";

export default function SidebarRight() {
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

            {/* Online Lounge */}
            <div className={styles.sectionTitle}>In The Lounge (12)</div>

            <div className={styles.friendList}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={styles.friendItem}>
                        <div className={styles.avatar}>
                            <img src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-9 h-9 rounded-full object-cover border border-[#3E3228]" />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1A120B]"></div>
                        </div>
                        <div>
                            <div className={styles.friendName}>{["Winston C.", "The Duke", "Aficionado Jane", "Baron Von Smoke", "Lady Leaf", "Gentleman Jack"][i]}</div>
                            <div className="text-[10px] text-green-400 font-medium">Smoking: Cohiba BHK</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upcoming Event Snippet */}
            <div className="mt-8 px-4">
                <div className="bg-[#2C241B] p-4 rounded-lg border border-[#3E3228]">
                    <h4 className="text-white font-bold text-sm mb-1">Cigar Rolling Live</h4>
                    <p className="text-gray-400 text-xs mb-2">Join us for a masterclass with Arturo Fuente rollers.</p>
                    <div className="flex items-center gap-2 text-gold text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-gold"></span> Starts in 45m
                    </div>
                </div>
            </div>
        </aside>
    );
}

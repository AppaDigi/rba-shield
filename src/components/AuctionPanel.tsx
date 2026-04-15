"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Gavel, ChevronUp, Trophy, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AuctionPanel.module.css";

export interface AuctionItemData {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    startingBid: number;  // cents
    currentBid: number;   // cents
    currentLeaderName: string | null;
    status: string;
    sortOrder: number;
    bids: {
        id: string;
        amount: number;
        createdAt: string;
        user: { id: string; name: string | null; username: string; avatar: string | null };
    }[];
}

interface AuctionPanelProps {
    items: AuctionItemData[];
    eventStatus: string;
    onBidPlaced?: (itemId: string, newBid: number, leaderName: string) => void;
}

const BID_INCREMENTS = [50, 100, 250, 500];

function fmt(cents: number) {
    return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
}

export default function AuctionPanel({ items, eventStatus, onBidPlaced }: AuctionPanelProps) {
    const { data: session } = useSession();
    const [localItems, setLocalItems] = useState<AuctionItemData[]>(items);
    const [customAmount, setCustomAmount] = useState("");
    const [placing, setPlacing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastBid, setLastBid] = useState<{ amount: number; success: boolean } | null>(null);

    const activeItem = localItems.find((i) => i.status === "ACTIVE");
    const upcomingItems = localItems.filter((i) => i.status === "UPCOMING");
    const soldItems = localItems.filter((i) => i.status === "SOLD");

    // Called by parent when SSE delivers a bid update
    function applyBidUpdate(itemId: string, currentBid: number, currentLeaderName: string) {
        setLocalItems((prev) =>
            prev.map((item) =>
                item.id === itemId ? { ...item, currentBid, currentLeaderName } : item
            )
        );
    }

    // Expose applyBidUpdate via ref-style callback so parent can call it
    // (parent passes a prop callback instead)

    async function placeBid(amountDollars: number) {
        if (!session || !activeItem || placing) return;
        setError(null);
        setPlacing(true);
        try {
            const res = await fetch(`/api/live/items/${activeItem.id}/bid`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: amountDollars }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? "Bid failed");
                setLastBid({ amount: amountDollars * 100, success: false });
            } else {
                setLastBid({ amount: data.bidAmount, success: true });
                setLocalItems((prev) =>
                    prev.map((item) =>
                        item.id === activeItem.id
                            ? {
                                ...item,
                                currentBid: data.currentBid,
                                currentLeaderName: session.user?.name ?? session.user?.username ?? "You",
                            }
                            : item
                    )
                );
                onBidPlaced?.(
                    activeItem.id,
                    data.currentBid,
                    session.user?.name ?? session.user?.username ?? "You"
                );
                setCustomAmount("");
            }
        } finally {
            setPlacing(false);
        }
    }

    function handleQuickBid(increment: number) {
        if (!activeItem) return;
        const base = activeItem.currentBid > 0 ? activeItem.currentBid : activeItem.startingBid;
        const newBid = Math.ceil((base + increment * 100) / 100);
        placeBid(newBid);
    }

    function handleCustomBid() {
        const amt = parseFloat(customAmount);
        if (isNaN(amt) || amt <= 0) return;
        placeBid(amt);
    }

    // Sync when parent updates items via SSE
    function syncItems(updated: AuctionItemData[]) {
        setLocalItems(updated);
    }
    void syncItems; void applyBidUpdate; // prevent unused warnings — called by parent via prop

    if (eventStatus !== "LIVE") {
        return (
            <div className={styles.panel}>
                <div className={styles.header}>
                    <Gavel size={16} />
                    <span>Live Auction</span>
                </div>
                <div className={styles.notLive}>
                    <Clock size={28} className={styles.notLiveIcon} />
                    <p>Auction begins when the event goes live.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <Gavel size={16} />
                <span>Live Auction</span>
                {activeItem && <span className={styles.activeBadge}>BIDDING OPEN</span>}
            </div>

            {/* Active Item */}
            {activeItem ? (
                <div className={styles.activeItem}>
                    {activeItem.imageUrl && (
                        <div className={styles.itemImageWrapper}>
                            <img src={activeItem.imageUrl} alt={activeItem.title} className={styles.itemImage} />
                            <div className={styles.itemImageOverlay}>NOW UP FOR BID</div>
                        </div>
                    )}

                    <div className={styles.itemBody}>
                        <h3 className={styles.itemTitle}>{activeItem.title}</h3>
                        {activeItem.description && (
                            <p className={styles.itemDesc}>{activeItem.description}</p>
                        )}

                        <div className={styles.bidRow}>
                            <div>
                                <div className={styles.bidLabel}>
                                    {activeItem.currentBid > 0 ? "Current Bid" : "Starting Bid"}
                                </div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeItem.currentBid}
                                        initial={{ scale: 1.15, color: "#d4af37" }}
                                        animate={{ scale: 1, color: "var(--accent-primary)" }}
                                        transition={{ duration: 0.35 }}
                                        className={styles.currentBid}
                                    >
                                        {fmt(activeItem.currentBid > 0 ? activeItem.currentBid : activeItem.startingBid)}
                                    </motion.div>
                                </AnimatePresence>
                                {activeItem.currentLeaderName && (
                                    <div className={styles.leader}>
                                        <Trophy size={11} /> {activeItem.currentLeaderName}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Error / success feedback */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={styles.errorMsg}
                                >
                                    {error}
                                </motion.div>
                            )}
                            {lastBid?.success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={styles.successMsg}
                                >
                                    Bid of {fmt(lastBid.amount)} placed!
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {session ? (
                            <>
                                {/* Quick-bid buttons */}
                                <div className={styles.quickBids}>
                                    {BID_INCREMENTS.map((inc) => {
                                        const base = activeItem.currentBid > 0 ? activeItem.currentBid : activeItem.startingBid;
                                        const total = base + inc * 100;
                                        return (
                                            <button
                                                key={inc}
                                                className={styles.quickBtn}
                                                onClick={() => handleQuickBid(inc)}
                                                disabled={placing}
                                            >
                                                <ChevronUp size={12} />
                                                +${inc} → {fmt(total)}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Custom amount */}
                                <div className={styles.customRow}>
                                    <input
                                        className={styles.customInput}
                                        type="number"
                                        placeholder="Custom amount ($)"
                                        value={customAmount}
                                        onChange={(e) => {
                                            setCustomAmount(e.target.value);
                                            setError(null);
                                        }}
                                        min={1}
                                        disabled={placing}
                                    />
                                    <button
                                        className={styles.placeBidBtn}
                                        onClick={handleCustomBid}
                                        disabled={!customAmount || placing}
                                    >
                                        <Gavel size={16} />
                                        Bid
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className={styles.signInPrompt}>Sign in to place bids</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.noBid}>
                    <p>No item currently up for bid.</p>
                </div>
            )}

            {/* Upcoming items */}
            {upcomingItems.length > 0 && (
                <div className={styles.upcoming}>
                    <div className={styles.sectionLabel}>Up Next</div>
                    {upcomingItems.map((item) => (
                        <div key={item.id} className={styles.upcomingItem}>
                            <div className={styles.upcomingInfo}>
                                <span className={styles.upcomingTitle}>{item.title}</span>
                                <span className={styles.upcomingStart}>Starting {fmt(item.startingBid)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Sold items */}
            {soldItems.length > 0 && (
                <div className={styles.upcoming}>
                    <div className={styles.sectionLabel}>Sold</div>
                    {soldItems.map((item) => (
                        <div key={item.id} className={`${styles.upcomingItem} ${styles.soldItem}`}>
                            <div className={styles.upcomingInfo}>
                                <span className={styles.upcomingTitle}>{item.title}</span>
                                <span className={styles.soldPrice}>
                                    Sold {fmt(item.currentBid)} — {item.currentLeaderName}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

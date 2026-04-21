"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { ArrowLeftRight, MessageCircle, Trash2, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import styles from "./SwapCard.module.css";

interface Author {
    id: string;
    name: string | null;
    username: string;
    avatar: string | null;
    xp: number;
}

interface Offer {
    id: string;
    offeringName: string;
    message: string | null;
    status: string;
    createdAt: string;
    offerer: Author;
}

export interface SwapListingData {
    id: string;
    offeringName: string;
    offeringImage: string | null;
    wantDescription: string;
    message: string | null;
    status: string;
    createdAt: string;
    author: Author;
    _count: { offers: number };
    offers?: Offer[];
}

interface SwapCardProps {
    listing: SwapListingData;
    onDelete?: (id: string) => void;
    onOfferMade?: (listingId: string) => void;
}

export default function SwapCard({ listing, onDelete, onOfferMade }: SwapCardProps) {
    const { data: session } = useSession();
    const [showOfferForm, setShowOfferForm] = useState(false);
    const [offeringName, setOfferingName] = useState("");
    const [offerMessage, setOfferMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [offerSent, setOfferSent] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const isOwner = session?.user?.id === listing.author.id;
    const timeAgo = formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true });

    const statusColor: Record<string, string> = {
        OPEN: "var(--accent-primary)",
        IN_NEGOTIATION: "#f59e0b",
        COMPLETED: "#22c55e",
        CANCELLED: "var(--text-secondary)",
    };

    async function submitOffer(e: React.FormEvent) {
        e.preventDefault();
        if (!offeringName.trim() || submitting) return;
        setSubmitting(true);
        try {
            const res = await fetch(`/api/swaps/${listing.id}/offer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ offeringName: offeringName.trim(), message: offerMessage.trim() }),
            });
            if (res.ok) {
                setOfferSent(true);
                setShowOfferForm(false);
                onOfferMade?.(listing.id);
            }
        } finally {
            setSubmitting(false);
        }
    }

    async function deleteListing() {
        await fetch(`/api/swaps/${listing.id}`, { method: "DELETE" });
        onDelete?.(listing.id);
    }

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            layout
        >
            {/* Image */}
            {listing.offeringImage && (
                <div className={styles.imageWrapper}>
                    <img src={listing.offeringImage} alt={listing.offeringName} className={styles.image} />
                    <div className={styles.statusBadge} style={{ color: statusColor[listing.status] }}>
                        {listing.status.replace("_", " ")}
                    </div>
                </div>
            )}

            <div className={styles.body}>
                {/* Author */}
                <div className={styles.authorRow}>
                    <Link href={`/profile/${listing.author.username}`} className={styles.author}>
                        <img
                            src={listing.author.avatar ?? `https://api.dicebear.com/7.x/initials/svg?seed=${listing.author.name}`}
                            alt={listing.author.name ?? listing.author.username}
                            className={styles.authorAvatar}
                        />
                        <span className={styles.authorName}>{listing.author.name ?? listing.author.username}</span>
                    </Link>
                    <span className={styles.time}>{timeAgo}</span>
                    {isOwner && (
                        <div style={{ position: "relative", marginLeft: "auto" }}>
                            <button className={styles.menuBtn} onClick={() => setShowMenu(v => !v)}>···</button>
                            {showMenu && (
                                <div className={styles.dropdown} onMouseLeave={() => setShowMenu(false)}>
                                    <button className={styles.dropdownItem} onClick={deleteListing}>
                                        <Trash2 size={13} /> Cancel Listing
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Offering */}
                <div className={styles.offering}>{listing.offeringName}</div>

                {/* Swap arrow + want */}
                <div className={styles.swapRow}>
                    <ArrowLeftRight size={14} className={styles.swapIcon} />
                    <div>
                        <div className={styles.wantLabel}>In exchange for</div>
                        <div className={styles.wantText}>{listing.wantDescription}</div>
                    </div>
                </div>

                {listing.message && <p className={styles.message}>{listing.message}</p>}

                {/* Footer */}
                <div className={styles.footer}>
                    <span className={styles.offerCount}>
                        <MessageCircle size={13} />
                        {listing._count.offers} offer{listing._count.offers !== 1 ? "s" : ""}
                    </span>

                    {!isOwner && session && listing.status === "OPEN" && !offerSent && (
                        <button
                            className={styles.offerBtn}
                            onClick={() => setShowOfferForm(v => !v)}
                        >
                            Make Offer
                        </button>
                    )}
                    {offerSent && (
                        <span className={styles.offerSentBadge}>
                            <CheckCircle size={13} /> Offer sent
                        </span>
                    )}
                </div>

                {/* Offer form */}
                <AnimatePresence>
                    {showOfferForm && (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={styles.offerForm}
                            onSubmit={submitOffer}
                        >
                            <input
                                className={styles.offerInput}
                                placeholder="What are you offering? (e.g., Cohiba Siglo VI)"
                                value={offeringName}
                                onChange={e => setOfferingName(e.target.value)}
                                maxLength={200}
                                required
                            />
                            <textarea
                                className={styles.offerTextarea}
                                placeholder="Add a note (optional)"
                                value={offerMessage}
                                onChange={e => setOfferMessage(e.target.value)}
                                maxLength={500}
                                rows={2}
                            />
                            <div className={styles.offerFormBtns}>
                                <button type="button" className={styles.cancelOfferBtn} onClick={() => setShowOfferForm(false)}>
                                    <XCircle size={14} /> Cancel
                                </button>
                                <button type="submit" className={styles.submitOfferBtn} disabled={!offeringName.trim() || submitting}>
                                    <CheckCircle size={14} /> Send Offer
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

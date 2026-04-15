"use client";

import { useState, useEffect, useCallback } from "react";
import DesktopLayout from "@/components/DesktopLayout";
import Navbar from "@/components/Navbar";
import SwapCard, { type SwapListingData } from "@/components/SwapCard";
import { ArrowLeftRight, Plus, BookOpen, Loader2, X } from "lucide-react";
import styles from "./page.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";

type FilterTab = "all" | "mine" | "incoming";

export default function SwapsPage() {
    const { data: session } = useSession();
    const [filter, setFilter] = useState<FilterTab>("all");
    const [listings, setListings] = useState<SwapListingData[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    // Create listing form state
    const [offeringName, setOfferingName] = useState("");
    const [offeringImage, setOfferingImage] = useState("");
    const [wantDescription, setWantDescription] = useState("");
    const [listingMessage, setListingMessage] = useState("");
    const [creating, setCreating] = useState(false);

    const fetchListings = useCallback(async (tab: FilterTab, cursorId?: string) => {
        const params = new URLSearchParams({ filter: tab, limit: "12" });
        if (cursorId) params.set("cursor", cursorId);
        const res = await fetch(`/api/swaps?${params}`);
        return res.json() as Promise<{ listings: SwapListingData[]; nextCursor: string | null }>;
    }, []);

    useEffect(() => {
        setLoading(true);
        setListings([]);
        setCursor(null);
        setHasMore(true);
        fetchListings(filter).then(({ listings: items, nextCursor }) => {
            setListings(items);
            setCursor(nextCursor);
            setHasMore(!!nextCursor);
            setLoading(false);
        });
    }, [filter, fetchListings]);

    async function loadMore() {
        if (!hasMore || loadingMore || !cursor) return;
        setLoadingMore(true);
        const { listings: more, nextCursor } = await fetchListings(filter, cursor);
        setListings(prev => [...prev, ...more]);
        setCursor(nextCursor);
        setHasMore(!!nextCursor);
        setLoadingMore(false);
    }

    async function createListing(e: React.FormEvent) {
        e.preventDefault();
        if (!offeringName.trim() || !wantDescription.trim() || creating) return;
        setCreating(true);
        try {
            const res = await fetch("/api/swaps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    offeringName: offeringName.trim(),
                    offeringImage: offeringImage.trim() || null,
                    wantDescription: wantDescription.trim(),
                    message: listingMessage.trim() || null,
                }),
            });
            if (res.ok) {
                const newListing: SwapListingData = await res.json();
                setListings(prev => [newListing, ...prev]);
                setShowCreate(false);
                setOfferingName(""); setOfferingImage(""); setWantDescription(""); setListingMessage("");
            }
        } finally {
            setCreating(false);
        }
    }

    return (
        <DesktopLayout>
            <div className={styles.container}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.headerTop}>
                        <div>
                            <div className={styles.titleRow}>
                                <h1 className={styles.title}>The Exchange</h1>
                                <ArrowLeftRight size={22} className={styles.titleIcon} />
                            </div>
                            <p className={styles.subtitle}>Curated trades for the discerning connoisseur.</p>
                        </div>
                        <div className={styles.headerActions}>
                            {session && (
                                <Link href="/swaps/humidor" className={styles.humidorBtn}>
                                    <BookOpen size={15} /> My Humidor
                                </Link>
                            )}
                            {session && (
                                <button className={styles.createBtn} onClick={() => setShowCreate(v => !v)}>
                                    <Plus size={15} /> New Listing
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter tabs */}
                    <div className={styles.tabs}>
                        {(["all", "mine", "incoming"] as FilterTab[]).map(tab => (
                            <button
                                key={tab}
                                className={`${styles.tab} ${filter === tab ? styles.tabActive : ""}`}
                                onClick={() => setFilter(tab)}
                            >
                                {tab === "all" ? "All Listings" : tab === "mine" ? "My Listings" : "Incoming Offers"}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Create listing inline form */}
                <AnimatePresence>
                    {showCreate && (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={styles.createForm}
                            onSubmit={createListing}
                        >
                            <div className={styles.createFormHeader}>
                                <span className={styles.createFormTitle}>New Swap Listing</span>
                                <button type="button" onClick={() => setShowCreate(false)} className={styles.closeBtn}>
                                    <X size={16} />
                                </button>
                            </div>
                            <div className={styles.formGrid}>
                                <div className={styles.formField}>
                                    <label className={styles.label}>I&apos;m Offering *</label>
                                    <input className={styles.input} placeholder="e.g., Cohiba Behike 56 (Box of 10)"
                                        value={offeringName} onChange={e => setOfferingName(e.target.value)} required maxLength={200} />
                                </div>
                                <div className={styles.formField}>
                                    <label className={styles.label}>In Exchange For *</label>
                                    <input className={styles.input} placeholder="e.g., Padrón 50th Anniversary"
                                        value={wantDescription} onChange={e => setWantDescription(e.target.value)} required maxLength={200} />
                                </div>
                                <div className={styles.formField}>
                                    <label className={styles.label}>Image URL (optional)</label>
                                    <input className={styles.input} placeholder="https://..."
                                        value={offeringImage} onChange={e => setOfferingImage(e.target.value)} />
                                </div>
                                <div className={styles.formField}>
                                    <label className={styles.label}>Additional Notes</label>
                                    <textarea className={styles.textarea} placeholder="Condition, quantity, storage details..."
                                        value={listingMessage} onChange={e => setListingMessage(e.target.value)} rows={2} maxLength={500} />
                                </div>
                            </div>
                            <div className={styles.createFormFooter}>
                                <button type="submit" className={styles.submitBtn} disabled={!offeringName.trim() || !wantDescription.trim() || creating}>
                                    {creating ? <Loader2 size={15} className={styles.spin} /> : <Plus size={15} />}
                                    Post Listing
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Grid */}
                {loading ? (
                    <div className={styles.loading}><Loader2 size={28} className={styles.spin} /></div>
                ) : listings.length === 0 ? (
                    <div className={styles.empty}>
                        <p>{filter === "mine" ? "You have no active listings." : filter === "incoming" ? "No incoming offers yet." : "No open swap listings."}</p>
                        {session && filter !== "mine" && <button className={styles.createBtn} onClick={() => setShowCreate(true)}><Plus size={14} /> Be the first</button>}
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {listings.map(listing => (
                            <SwapCard
                                key={listing.id}
                                listing={listing}
                                onDelete={id => setListings(prev => prev.filter(l => l.id !== id))}
                                onOfferMade={() => {}}
                            />
                        ))}
                    </div>
                )}

                {hasMore && !loading && (
                    <div className={styles.loadMoreRow}>
                        <button className={styles.loadMoreBtn} onClick={loadMore} disabled={loadingMore}>
                            {loadingMore ? <><Loader2 size={14} className={styles.spin} /> Loading...</> : "Load more"}
                        </button>
                    </div>
                )}

                <div className="lg:hidden"><Navbar /></div>
            </div>
        </DesktopLayout>
    );
}

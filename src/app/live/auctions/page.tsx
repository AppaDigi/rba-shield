"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DesktopLayout from "@/components/DesktopLayout";
import Navbar from "@/components/Navbar";
import { Gavel, Loader2, Trophy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import styles from "./page.module.css";

interface MyBid {
    id: string;
    amount: number;
    createdAt: string;
    item: {
        id: string;
        title: string;
        currentBid: number;
        currentLeaderName: string | null;
        status: string;
        event: {
            id: string;
            title: string;
            status: string;
        };
    };
}

export default function MyAuctionsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bids, setBids] = useState<MyBid[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") { router.replace("/auth/login?callbackUrl=/live/auctions"); return; }
        if (status !== "authenticated") return;

        fetch("/api/live/my-bids")
            .then(r => r.ok ? r.json() : [])
            .then((data: MyBid[]) => setBids(Array.isArray(data) ? data : []))
            .finally(() => setLoading(false));
    }, [status, router]);

    const winning = bids.filter(b => b.item.currentLeaderName === session?.user?.name || b.item.currentLeaderName === session?.user?.username);
    const outbid = bids.filter(b => b.item.currentLeaderName !== session?.user?.name && b.item.currentLeaderName !== session?.user?.username);

    if (status === "loading" || loading) {
        return (
            <DesktopLayout>
                <div className={styles.loadingState}><Loader2 size={28} className={styles.spin} /></div>
            </DesktopLayout>
        );
    }

    return (
        <DesktopLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.titleRow}>
                        <Gavel size={22} className={styles.titleIcon} />
                        <h1 className={styles.title}>My Auctions</h1>
                    </div>
                    <p className={styles.subtitle}>Your active bids and live auction history.</p>
                </header>

                {bids.length === 0 ? (
                    <div className={styles.empty}>
                        <Gavel size={40} className={styles.emptyIcon} />
                        <p>You haven&apos;t placed any bids yet.</p>
                        <Link href="/live" className={styles.ctaBtn}>Browse Live Auctions</Link>
                    </div>
                ) : (
                    <>
                        {winning.length > 0 && (
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <Trophy size={16} style={{ color: "var(--accent-primary)" }} /> Currently Winning
                                </h2>
                                <div className={styles.list}>
                                    {winning.map(bid => <BidRow key={bid.id} bid={bid} isWinning />)}
                                </div>
                            </section>
                        )}

                        {outbid.length > 0 && (
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Outbid</h2>
                                <div className={styles.list}>
                                    {outbid.map(bid => <BidRow key={bid.id} bid={bid} isWinning={false} />)}
                                </div>
                            </section>
                        )}
                    </>
                )}

                <div className="lg:hidden"><Navbar /></div>
            </div>
        </DesktopLayout>
    );
}

function BidRow({ bid, isWinning }: { bid: MyBid; isWinning: boolean }) {
    const statusColor = bid.item.status === "SOLD" ? "#22c55e" : bid.item.status === "ACTIVE" ? "var(--accent-primary)" : "var(--text-secondary)";

    return (
        <div className={styles.bidRow}>
            <div className={styles.bidInfo}>
                <div className={styles.bidItem}>{bid.item.title}</div>
                <div className={styles.bidEvent}>{bid.item.event.title}</div>
                <div className={styles.bidMeta}>
                    <span>Your bid: <strong>${(bid.amount / 100).toLocaleString()}</strong></span>
                    <span>Current: <strong>${(bid.item.currentBid / 100).toLocaleString()}</strong></span>
                    <span style={{ color: statusColor }}>{bid.item.status}</span>
                    <span>{formatDistanceToNow(new Date(bid.createdAt), { addSuffix: true })}</span>
                </div>
            </div>
            <div className={styles.bidRight}>
                <span className={`${styles.badge} ${isWinning ? styles.badgeWinning : styles.badgeOutbid}`}>
                    {isWinning ? "Winning" : "Outbid"}
                </span>
                {bid.item.event.status === "LIVE" && (
                    <Link href={`/live/${bid.item.event.id}`} className={styles.liveLink}>
                        <ExternalLink size={13} /> Join Live
                    </Link>
                )}
            </div>
        </div>
    );
}

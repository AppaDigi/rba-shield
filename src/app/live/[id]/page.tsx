"use client";

import { use, useState, useEffect, useCallback } from "react";
import DesktopLayout from "@/components/DesktopLayout";
import Navbar from "@/components/Navbar";
import StreamPlayer from "@/components/StreamPlayer";
import LiveChat from "@/components/LiveChat";
import AuctionPanel, { type AuctionItemData } from "@/components/AuctionPanel";
import { UserCheck, Loader2 } from "lucide-react";
import styles from "./page.module.css";

interface LiveEventData {
    id: string;
    title: string;
    description: string | null;
    muxPlaybackId: string | null;
    youtubeId: string | null;
    status: string;
    viewerCount: number;
    hostName: string | null;
    items: AuctionItemData[];
}

export default function LiveEventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [event, setEvent] = useState<LiveEventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [viewerCount, setViewerCount] = useState(0);

    useEffect(() => {
        fetch(`/api/live/events/${id}`)
            .then((r) => r.json())
            .then((data) => {
                setEvent(data);
                setViewerCount(data.viewerCount ?? 0);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleBidUpdate = useCallback(
        (data: { itemId: string; currentBid: number; currentLeaderName: string }) => {
            setEvent((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    items: prev.items.map((item) =>
                        item.id === data.itemId
                            ? { ...item, currentBid: data.currentBid, currentLeaderName: data.currentLeaderName }
                            : item
                    ),
                };
            });
        },
        []
    );

    if (loading) {
        return (
            <DesktopLayout>
                <div className={styles.loading}>
                    <Loader2 size={32} className={styles.spinner} />
                </div>
            </DesktopLayout>
        );
    }

    if (!event) {
        return (
            <DesktopLayout>
                <div className={styles.loading}>
                    <p style={{ color: "var(--text-secondary)" }}>Event not found.</p>
                </div>
            </DesktopLayout>
        );
    }

    return (
        <DesktopLayout>
            <div className={styles.container}>

                {/* Main content: video + info + auction */}
                <div className={styles.mainCol}>

                    <StreamPlayer
                        muxPlaybackId={event.muxPlaybackId}
                        youtubeId={event.youtubeId}
                        title={event.title}
                        status={event.status}
                        viewerCount={viewerCount}
                    />

                    <div className={styles.infoBar}>
                        <div className={styles.infoLeft}>
                            <h1 className={styles.title}>{event.title}</h1>
                            {event.hostName && (
                                <div className={styles.host}>
                                    <div className={styles.hostAvatar} />
                                    <span>Hosted by {event.hostName}</span>
                                    <UserCheck size={15} style={{ color: "var(--accent-primary)" }} />
                                </div>
                            )}
                            {event.description && (
                                <p className={styles.desc}>{event.description}</p>
                            )}
                        </div>
                    </div>

                    {/* Auction panel (below video on mobile, right column on desktop) */}
                    <div className={styles.auctionMobile}>
                        <AuctionPanel
                            items={event.items}
                            eventStatus={event.status}
                            onBidPlaced={(itemId, newBid, leaderName) =>
                                handleBidUpdate({ itemId, currentBid: newBid, currentLeaderName: leaderName })
                            }
                        />
                    </div>

                </div>

                {/* Right rail: chat + auction (desktop) */}
                <div className={styles.rightRail}>
                    <div className={styles.auctionDesktop}>
                        <AuctionPanel
                            items={event.items}
                            eventStatus={event.status}
                            onBidPlaced={(itemId, newBid, leaderName) =>
                                handleBidUpdate({ itemId, currentBid: newBid, currentLeaderName: leaderName })
                            }
                        />
                    </div>
                    <div className={styles.chatWrapper}>
                        <LiveChat
                            eventId={id}
                            viewerCount={viewerCount}
                            onBid={handleBidUpdate}
                            onViewerChange={setViewerCount}
                        />
                    </div>
                </div>

            </div>

            <div className="lg:hidden">
                <LiveChat
                    eventId={id}
                    viewerCount={viewerCount}
                    onBid={handleBidUpdate}
                    onViewerChange={setViewerCount}
                />
                <Navbar />
            </div>
        </DesktopLayout>
    );
}

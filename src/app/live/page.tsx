"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import { Play, Calendar, Users, Zap, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import DesktopLayout from "@/components/DesktopLayout";

interface LiveEventSummary {
    id: string;
    title: string;
    description: string | null;
    status: string;
    viewerCount: number;
    hostName: string | null;
    youtubeId: string | null;
    muxPlaybackId: string | null;
    _count: { items: number };
}

function thumbnailUrl(event: LiveEventSummary): string | null {
    if (event.youtubeId) {
        return `https://img.youtube.com/vi/${event.youtubeId}/hqdefault.jpg`;
    }
    return null;
}

export default function LiveHub() {
    const [events, setEvents] = useState<LiveEventSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/live/events")
            .then((r) => r.json())
            .then(setEvents)
            .finally(() => setLoading(false));
    }, []);

    const liveEvents = events.filter((e) => e.status === "LIVE");
    const scheduledEvents = events.filter((e) => e.status === "SCHEDULED");
    const featured = liveEvents[0] ?? scheduledEvents[0];

    return (
        <DesktopLayout>
            <div className={styles.container}>

                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
                        <Loader2 size={28} style={{ animation: "spin 0.7s linear infinite", color: "var(--accent-primary)" }} />
                    </div>
                ) : (
                    <>
                        {/* Featured / Hero */}
                        {featured && (
                            <motion.div
                                initial={{ scale: 0.97, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                className={styles.hero}
                                style={{
                                    backgroundImage: thumbnailUrl(featured)
                                        ? `url(${thumbnailUrl(featured)})`
                                        : "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div className={styles.heroContent}>
                                    {featured.status === "LIVE" && (
                                        <div className={styles.liveBadge}>
                                            <span className={styles.liveDot} />
                                            LIVE NOW
                                        </div>
                                    )}
                                    <h1 className={styles.title}>{featured.title}</h1>
                                    <p className={styles.meta}>
                                        {featured.hostName && `Hosted by ${featured.hostName}`}
                                        {featured.status === "LIVE" && ` • ${featured.viewerCount.toLocaleString()} Watching`}
                                    </p>
                                    <Link href={`/live/${featured.id}`} className={styles.watchBtn}>
                                        <Play size={18} fill="black" />
                                        {featured.status === "LIVE" ? "Watch Now" : "View Event"}
                                    </Link>
                                </div>
                                <div className={styles.heroOverlay} />
                            </motion.div>
                        )}

                        {/* Live Channels */}
                        {liveEvents.length > 0 && (
                            <>
                                <h2 className={styles.sectionTitle}>
                                    <Zap size={18} style={{ color: "var(--accent-primary)" }} />
                                    Live Now
                                </h2>
                                <div className={styles.grid}>
                                    {liveEvents.map((event, index) => (
                                        <motion.div
                                            key={event.id}
                                            className={styles.card}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.08 }}
                                        >
                                            <Link href={`/live/${event.id}`} className={styles.cardLink}>
                                                <div
                                                    className={styles.thumbnail}
                                                    style={{
                                                        backgroundImage: thumbnailUrl(event)
                                                            ? `url(${thumbnailUrl(event)})`
                                                            : undefined,
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                    }}
                                                >
                                                    <div className={styles.thumbLive}>LIVE</div>
                                                    <div className={styles.thumbViewers}>
                                                        <Users size={11} /> {event.viewerCount.toLocaleString()}
                                                    </div>
                                                    <div className={styles.playOverlay}>
                                                        <Play size={28} fill="white" />
                                                    </div>
                                                </div>
                                                <div className={styles.cardInfo}>
                                                    <h3 className={styles.cardTitle}>{event.title}</h3>
                                                    <p className={styles.cardHost}>
                                                        {event.hostName ?? "Live Stream"}
                                                        {event._count.items > 0 && ` • ${event._count.items} lots`}
                                                    </p>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Scheduled Events */}
                        {scheduledEvents.length > 0 && (
                            <>
                                <h2 className={styles.sectionTitle} style={{ marginTop: "2rem" }}>
                                    <Calendar size={18} style={{ color: "var(--accent-primary)" }} />
                                    Upcoming
                                </h2>
                                <div className={styles.grid}>
                                    {scheduledEvents.map((event, index) => (
                                        <motion.div
                                            key={event.id}
                                            className={styles.card}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.08 }}
                                        >
                                            <Link href={`/live/${event.id}`} className={styles.cardLink}>
                                                <div className={styles.thumbnail} style={{ background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Calendar size={32} style={{ color: "var(--text-secondary)", opacity: 0.5 }} />
                                                    <div className={styles.thumbScheduled}>UPCOMING</div>
                                                </div>
                                                <div className={styles.cardInfo}>
                                                    <h3 className={styles.cardTitle}>{event.title}</h3>
                                                    <p className={styles.cardHost}>
                                                        {event.hostName ?? "Upcoming Event"}
                                                        {event._count.items > 0 && ` • ${event._count.items} lots`}
                                                    </p>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}

                        {events.length === 0 && (
                            <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-secondary)" }}>
                                No live events scheduled. Check back soon.
                            </div>
                        )}
                    </>
                )}

                <div className="lg:hidden" style={{ height: "5rem" }}>
                    <Navbar />
                </div>
            </div>
        </DesktopLayout>
    );
}

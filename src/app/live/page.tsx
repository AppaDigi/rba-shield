"use client";

import styles from "./LiveHub.module.css";
import Navbar from "@/components/Navbar";
import { Play, Calendar, Users, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import DesktopLayout from "@/components/DesktopLayout";


export default function LiveHub() {
    return (
        <DesktopLayout>
            <div className={styles.container}>
                {/* Featured Stream */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={styles.hero}
                >
                    <div className={styles.heroContent}>
                        <div className={styles.liveBadge}>LIVE NOW</div>
                        <h1 className={styles.title}>The Great Duck Race</h1>
                        <p className={styles.meta}>Featuring rare Opus X raffles • 1.2k Viewing</p>
                        <Link href="/live/demo" className={styles.watchBtn}>
                            <Play size={20} fill="black" />
                            Watch Stream
                        </Link>
                    </div>
                    {/* Placeholder for background video/image */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(45deg, #111, #333)', zIndex: 0 }} />
                </motion.div>

                {/* Upcoming Channels */}
                <h2 className={styles.sectionTitle}>
                    <Zap className="text-gold" />
                    Live Channels
                </h2>

                <div className={styles.grid}>
                    {[1, 2, 3].map((i, index) => (
                        <motion.div
                            key={i}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                            <div className={styles.thumbnail}>
                                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">LIVE</div>
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">124 viewers</div>
                            </div>
                            <div className={styles.cardInfo}>
                                <h3 className={styles.cardTitle}>Late Night Lounge: Davidoff Special</h3>
                                <p className={styles.cardHost}>Hosted by The Gentry</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ height: '2rem' }} />

                {/* Scheduled Events */}
                <h2 className={styles.sectionTitle}>
                    <Calendar className="text-gold" />
                    Upcoming Schedules
                </h2>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <div className={styles.thumbnail} style={{ background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="text-gray-500 font-bold text-2xl">OCT 14</span>
                        </div>
                        <div className={styles.cardInfo}>
                            <h3 className={styles.cardTitle}>Havana Club: Cuban Rolling Masterclass</h3>
                            <p className={styles.cardHost}>8:00 PM EST • RSVP Required</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.thumbnail} style={{ background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="text-gray-500 font-bold text-2xl">OCT 16</span>
                        </div>
                        <div className={styles.cardInfo}>
                            <h3 className={styles.cardTitle}>Padron Anniversary Release Party</h3>
                            <p className={styles.cardHost}>9:00 PM EST • Public Event</p>
                        </div>
                    </div>
                </div>

                <div className="lg:hidden">
                    <Navbar />
                </div>
            </div>
        </DesktopLayout>
    );
}

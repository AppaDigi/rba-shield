"use client";

import DesktopLayout from "@/components/DesktopLayout";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { Gavel, Heart, Send, DollarSign, UserCheck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LiveEvent {
    id: number;
    user: string;
    type: string;
    text?: string;
    amount?: string;
}

const DUMMY_COMMENTS: LiveEvent[] = [
    { id: 1, user: "J.P. Morgan", text: "Stunning craftsmanship.", type: "chat" },
    { id: 2, user: "Winston C.", text: "I'll take the lot.", type: "chat" },
];

export default function LiveDemoPage() {
    const [comments, setComments] = useState(DUMMY_COMMENTS);
    const [bidAmount, setBidAmount] = useState(550);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [comments]);

    // Simulate chat/bids
    useEffect(() => {
        const interval = setInterval(() => {
            const type = Math.random() > 0.8 ? "bid" : "chat";
            const newComment: LiveEvent = {
                id: Date.now(),
                user: ["Anonymous", "Colonel P.", "Lady M.", "The Gent"][Math.floor(Math.random() * 4)],
                type: type as string,
                ...(type === "chat"
                    ? { text: ["Splendid!", "Go number 4!", "Raise the stakes!", "Indeed."][Math.floor(Math.random() * 4)] }
                    : { amount: `$${bidAmount + 50}` }
                )
            };
            if (newComment.type === "bid") setBidAmount(prev => prev + 50);

            // Fix: correctly update state with new comment
            setComments(prev => [...prev.slice(-20), newComment as any]);
        }, 1500);
        return () => clearInterval(interval);
    }, [bidAmount]);

    return (
        <DesktopLayout>
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <div className={styles.videoContainer}>
                        {/* YouTube Embed for Duck Race Demo */}
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/P4uAvBXYNDA?autoplay=1&mute=1&loop=1&playlist=P4uAvBXYNDA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="absolute top-0 left-0 w-full h-full object-cover"></iframe>

                        <div className={styles.videoOverlay}>
                            <div className={styles.liveIndicator} />
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '1px' }}>LIVE • 15.4k</span>
                        </div>
                    </div>

                    <div className={styles.infoBar}>
                        <h1 className={styles.title}>The Great Annual Duck Race - Opus X Grand Prize</h1>
                        <div className={styles.host}>
                            <div className={styles.hostAvatar} style={{ background: '#333' }} />
                            <span>Hosted by The Metropolitan Cigar Society</span>
                            <UserCheck size={16} className="text-accent" />
                        </div>
                    </div>
                </div>

                <div className={styles.chatPanel}>
                    <div className={styles.chatHeader}>Live Stream Chat</div>
                    <div className={styles.chatStream} ref={scrollRef}>
                        <AnimatePresence initial={false}>
                            {comments.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={msg.type === "bid" ? styles.bidMessage : styles.chatMessage}
                                >
                                    {msg.type === "bid" ? (
                                        <>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Gavel size={14} className="text-accent" />
                                                <span className={styles.chatUser}>{msg.user}</span>
                                            </div>
                                            <span className={styles.bidAmount}>BID: {msg.amount}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className={styles.chatUser}>{msg.user}:</span>
                                            <span className={styles.chatText}>{msg.text}</span>
                                        </>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.inputRow}>
                            <input type="text" placeholder="Cheer for your duck..." className={styles.input} />
                            <button className={styles.bidButton}><Heart size={20} fill="currentColor" /></button>
                        </div>
                        <button className={styles.bidButton} style={{ background: 'var(--accent-primary)', color: '#000', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                            <DollarSign size={20} /> Place Bet
                        </button>
                    </div>
                </div>

                <div className="lg:hidden">
                    <Navbar />
                </div>
            </div>
        </DesktopLayout>
    );
}
